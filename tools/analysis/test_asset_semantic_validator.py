"""Import safety regression cases against the immutable source fixtures."""
import copy
import json
import unittest
from asset_semantic_validator import ROOT, validate


class SemanticValidationTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        load = lambda name: json.loads((ROOT / 'analysis/figma' / name).read_text())
        cls.semantic = load('semantic_map.json')
        cls.sources = load('asset_manifest.json')
        cls.screens = load('screen_map.json')

    def check_error(self, mutate, expected):
        data = copy.deepcopy(self.semantic)
        mutate(data)
        self.assertTrue(any(expected in e for e in validate(data, self.sources, self.screens)))

    def test_current_inventory_including_transparent_padding(self):
        self.assertEqual(validate(self.semantic, self.sources, self.screens), [])

    def test_duplicate_id(self):
        self.check_error(lambda a: a[1].update(semanticId=a[0]['semanticId']), 'duplicate semantic ID')

    def test_orphan_source(self):
        self.check_error(lambda a: a[0].update(sourceHash='missing'), 'orphan source')

    def test_source_escape(self):
        self.check_error(lambda a: a[0].update(sourceFile='../outside.png'), 'outside immutable')

    def test_trim_metadata(self):
        self.check_error(lambda a: a[0].update(trimmedDimensions=[1, 1]), 'trim dimensions mismatch')

    def test_unknown_screen(self):
        self.check_error(lambda a: a[0].update(screens=['SCREEN-999']), 'Unknown screen')

    def test_unknown_scope(self):
        self.check_error(lambda a: a[0].update(scope='ASSUMED_PRODUCTION'), 'Unknown scope/category')

    def test_runtime_orphan(self):
        errors = validate(self.semantic, self.sources, self.screens, ['does_not_exist'])
        self.assertTrue(any('Orphan runtime selection' in e for e in errors))

    def test_reference_cannot_be_selected_for_runtime(self):
        sid = next(a['semanticId'] for a in self.semantic if a['scope'] == 'UNUSED_OR_REFERENCE_ONLY')
        errors = validate(self.semantic, self.sources, self.screens, [sid])
        self.assertTrue(any('excludes post-MVP/reference-only' in e for e in errors))

    def test_mvp_selection_does_not_claim_distribution_rights(self):
        sid = next(a['semanticId'] for a in self.semantic if a['scope'] == 'USED_IN_MVP' and a['category'] != 'reference')
        self.assertEqual(validate(self.semantic, self.sources, self.screens, [sid]), [])


if __name__ == '__main__':
    unittest.main()
