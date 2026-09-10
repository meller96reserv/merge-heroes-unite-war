# Planning tools

Current consistency command: `python tools/analysis/validate_planning.py --implementation`. Add `--report <path>` to retain full results. Run `python tools/analysis/test_runtime_consistency.py` for negative gate tests. Python dependencies are listed in existing planning setup.

Historical `author_*.py`, `task_catalog.py` and `plan_common.py` describe the original package generation, not current production authority. Do not rerun package authors: ADR-007 requires targeted edits and the current manifest. Asset extraction/calibration/validation tools and immutable semantic metadata remain reusable.
