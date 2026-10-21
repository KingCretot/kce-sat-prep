# KingCretot Experience — SAT Prep Program

Live at **https://sat.kingcretot.com/** (GitHub Pages). The whole course is one page, `index.html`.

## How the course works

27 modules in one chain: the SAT Baseline, then each week's live lesson and mid-week practice,
the Desmos Tutorial in Week 1, and a full-length practice exam after Weeks 2, 4, 6, 8 and 10.

- A module opens once the module before it is **finished** (no minimum score).
- Code **9110** opens a locked module from its lock screen, or every module on a device
  ("Open every module on this device" on the course page).
- Progress is saved per device and browser (localStorage `kce_sat_progress_v1`).

What counts as finished:

| Module | Finished when |
|---|---|
| Baseline | the student finishes it (results email automatically) |
| Live lesson | the Homework section is reached |
| Mid-week | "Save & email my results" is sent |
| Desmos Tutorial | the last step is done |
| Practice exam | "Save & email my results" is sent from the score report |

## Files

- `index.html` — the course page. **Generated**: edit `tools/build_course.py` (module list) or
  `tools/index.template.html` (layout), then run `python3 tools/build_course.py`.
- `sat-gate.js` — the lock. Its module list is written by the build script.
- `sat-desmos.js` — the Calculator button on Math Modules 1 and 2 of every practice exam. It opens the
  College Board version of the Desmos graphing calculator, the one on the digital SAT
  (`https://www.desmos.com/testing/cb-digital-sat/graphing`).
- `desmos-tutorial.html` — Week 1 Desmos Tutorial (10 steps with an embedded calculator).
- `baseline.html`, `week-NN-lesson.html`, `week-NN-midweek.html`, `SAT Practice Exam N (KCE).html`.

Workbooks, teacher guides and quizzes are delivered through Google Classroom, not this repo.
All results go to Formspree `mpqgdkww`.
