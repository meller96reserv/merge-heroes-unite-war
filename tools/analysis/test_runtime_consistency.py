"""Negative acceptance fixtures for the runtime migration gate."""
import unittest
from runtime_consistency import executable_graph,obsolete_lines

def task(i,deps=(),**kw):return dict(id=i,dependencies=list(deps),**kw)
class RuntimeGate(unittest.TestCase):
 def test_cycle_and_dangling(self):
  self.assertFalse(executable_graph([task('A',['B']),task('B',['A'])])['acyclic'])
  self.assertEqual(executable_graph([task('A',['missing'])])['badDependencies'],[('A','missing')])
 def test_retired_dependency_is_not_satisfied_by_historical_pass(self):
  g=executable_graph([task('old',status='COMPLETED',executionScope='HISTORICAL'),task('new',['old'])])
  self.assertEqual(g['badDependencies'],[('new','old')])
 def test_valid_parallel_tasks(self):
  g=executable_graph([task('old',executionScope='HISTORICAL'),task('A'),task('B',['A']),task('C',['A'])])
  self.assertTrue(g['acyclic']);self.assertEqual(g['topologicalOrder'],['A','B','C'])
 def test_production_requirements_rejected_historical_paths_retained(self):
  for s in ['Cocos owns rendering.','Build mobile-shell/src/HostBridge.ts','Wait for game.ready then app.initialize','Use SpriteFrame UUIDs.']:
   self.assertTrue(obsolete_lines(s),s)
  self.assertFalse(obsolete_lines('Evidence retained in `spikes/rn-cocos/audio-results.md`.'))
if __name__=='__main__':unittest.main()
