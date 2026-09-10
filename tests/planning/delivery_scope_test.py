"""Scope guardrails must reject missing requirements, deferred edges and cycles."""
from pathlib import Path
import copy,json,sys,unittest
sys.path.insert(0,str(Path(__file__).resolve().parents[2]/'tools/analysis'))
from delivery_scope import validate
class DeliveryScopeTests(unittest.TestCase):
 def setUp(self):
  self.manifest=json.loads(Path('tasks/task_manifest.json').read_text());self.ids={t['id']:t for t in self.manifest['tasks']}
 def test_current_scope_valid(self):self.assertTrue(validate(self.manifest)['passed'])
 def test_unclassified_remaining_fails(self):
  self.ids['TASK-0168'].pop('deliveryClassification');self.assertFalse(validate(self.manifest)['passed'])
 def test_deferred_dependency_fails(self):
  self.ids['TASK-0168']['dependencies'].append('TASK-0151');self.assertFalse(validate(self.manifest)['passed'])
 def test_cycle_fails(self):
  self.ids['TASK-0168']['dependencies'].append('TASK-0168');self.assertFalse(validate(self.manifest)['passed'])
 def test_deferred_figma_dragon_cannot_pass(self):
  self.ids['TASK-0243']['deliveryClassification']='DEFERRED_POST_DELIVERY';self.assertFalse(validate(self.manifest)['passed'])
 def test_required_task_detached_from_gate_fails(self):
  self.ids['TASK-0237']['dependencies'].remove('TASK-0246');self.assertFalse(validate(self.manifest)['passed'])
 def test_stale_source_review_fails(self):
  self.manifest['delivery']['sourceHashes']['docs/tz/Реклама в приложениях.md']='0'*64;self.assertFalse(validate(self.manifest)['passed'])
if __name__=='__main__':unittest.main()
