#!/usr/bin/env python3
"""Builds the KCE SAT Prep one-page course (index.html) and the lock list inside sat-gate.js.

One source of truth: MODULES below. Every module unlocks once the one before it is finished
(no minimum score). Code 9110 opens a locked module, or every module on a device (teacher mode).
Run from the repo root:  python3 tools/build_course.py
"""
import json, html, os, re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# (id, file, section, kind, label, title, description, meta)
MODULES = [
    ("baseline", "baseline.html", "start", "diagnostic", "SAT Baseline Assessment", "SAT Baseline Assessment",
     "Your starting point. Reading &amp; Writing first, then Math, in one sitting. Your results go to your instructor.",
     "49 questions · 32 + 35 minutes · about 70 minutes"),
    ("w01-lesson", "week-01-lesson.html", 1, "lesson", "Week 1 Lesson", "Orientation &amp; Core Method",
     "The full map of the SAT, the core toolkit for Reading &amp; Writing and Math, and the Vocabulary Lab.", "Live lesson · 60 minutes"),
    ("desmos", "desmos-tutorial.html", 1, "tutorial", "Desmos Tutorial", "How to Use Desmos on the SAT",
     "Learn the built-in graphing calculator you get on test day: graph, find intersections, roots and vertices, use tables, sliders and regression, and know when to skip it.",
     "Interactive tutorial · about 30 minutes"),
    ("w01-mid", "week-01-midweek.html", 1, "midweek", "Week 1 Mid-Week", "Math — Keeping Algebra Warm",
     "Five quick questions between lessons. Your results are emailed to your instructor.", "Mid-week · about 15 minutes"),
    ("w02-lesson", "week-02-lesson.html", 2, "lesson", "Week 2 Lesson", "Heart of Algebra",
     "Linear equations, inequalities and systems: isolate, then check.", "Live lesson · 60 minutes"),
    ("w02-mid", "week-02-midweek.html", 2, "midweek", "Week 2 Mid-Week", "Reading &amp; Writing — Words in Context",
     "Five quick questions between lessons. Your results are emailed to your instructor.", "Mid-week · about 15 minutes"),
    ("exam1", "SAT Practice Exam 1 (KCE).html", 2, "exam", "Practice Exam 1", "Full-Length Practice Exam 1",
     "The whole test in one sitting: two Reading &amp; Writing modules, a 10-minute break, then two Math modules with the built-in Desmos calculator.",
     "98 questions · about 2 hours 25 minutes with the break"),
    ("w03-lesson", "week-03-lesson.html", 3, "lesson", "Week 3 Lesson", "Advanced Math",
     "Quadratics, functions and exponents: factor, then solve.", "Live lesson · 60 minutes"),
    ("w03-mid", "week-03-midweek.html", 3, "midweek", "Week 3 Mid-Week", "Math — Quadratics in Focus",
     "Five quick questions between lessons. Your results are emailed to your instructor.", "Mid-week · about 15 minutes"),
    ("w04-lesson", "week-04-lesson.html", 4, "lesson", "Week 4 Lesson", "Geometry &amp; Trigonometry",
     "The angle rules that repeat and three triangle tools.", "Live lesson · 60 minutes"),
    ("w04-mid", "week-04-midweek.html", 4, "midweek", "Week 4 Mid-Week", "Reading &amp; Writing — Words &amp; Evidence",
     "Five quick questions between lessons. Your results are emailed to your instructor.", "Mid-week · about 15 minutes"),
    ("exam2", "SAT Practice Exam 2 (KCE).html", 4, "exam", "Practice Exam 2", "Full-Length Practice Exam 2",
     "The whole test in one sitting: two Reading &amp; Writing modules, a 10-minute break, then two Math modules with the built-in Desmos calculator.",
     "98 questions · about 2 hours 25 minutes with the break"),
    ("w05-lesson", "week-05-lesson.html", 5, "lesson", "Week 5 Lesson", "Problem-Solving &amp; Data Analysis",
     "Ratios, percents, units and data: find the unit, then scale.", "Live lesson · 60 minutes"),
    ("w05-mid", "week-05-midweek.html", 5, "midweek", "Week 5 Mid-Week", "Math — Data &amp; Word Problems",
     "Five quick questions between lessons. Your results are emailed to your instructor.", "Mid-week · about 15 minutes"),
    ("w06-lesson", "week-06-lesson.html", 6, "lesson", "Week 6 Lesson", "Reading — Craft, Structure &amp; Ideas",
     "Read for the point and let the sentence define the word.", "Live lesson · 60 minutes"),
    ("w06-mid", "week-06-midweek.html", 6, "midweek", "Week 6 Mid-Week", "Reading &amp; Writing — Cross-Text",
     "Five quick questions between lessons. Your results are emailed to your instructor.", "Mid-week · about 15 minutes"),
    ("exam3", "SAT Practice Exam 3 (KCE).html", 6, "exam", "Practice Exam 3", "Full-Length Practice Exam 3",
     "The whole test in one sitting: two Reading &amp; Writing modules, a 10-minute break, then two Math modules with the built-in Desmos calculator.",
     "98 questions · about 2 hours 25 minutes with the break"),
    ("w07-lesson", "week-07-lesson.html", 7, "lesson", "Week 7 Lesson", "Writing — Expression of Ideas",
     "Transitions and synthesis: name the logic, pick the word.", "Live lesson · 60 minutes"),
    ("w07-mid", "week-07-midweek.html", 7, "midweek", "Week 7 Mid-Week", "Math — Mixed Review",
     "Five quick questions between lessons. Your results are emailed to your instructor.", "Mid-week · about 15 minutes"),
    ("w08-lesson", "week-08-lesson.html", 8, "lesson", "Week 8 Lesson", "Writing — Standard English Conventions",
     "Where a sentence ends and matching the verb to the real subject.", "Live lesson · 60 minutes"),
    ("w08-mid", "week-08-midweek.html", 8, "midweek", "Week 8 Mid-Week", "Reading &amp; Writing — Grammar",
     "Five quick questions between lessons. Your results are emailed to your instructor.", "Mid-week · about 15 minutes"),
    ("exam4", "SAT Practice Exam 4 (KCE).html", 8, "exam", "Practice Exam 4", "Full-Length Practice Exam 4",
     "The whole test in one sitting: two Reading &amp; Writing modules, a 10-minute break, then two Math modules with the built-in Desmos calculator.",
     "98 questions · about 2 hours 25 minutes with the break"),
    ("w09-lesson", "week-09-lesson.html", 9, "lesson", "Week 9 Lesson", "Full Practice Test &amp; Error Analysis",
     "Why test conditions matter, and how to sort every miss so it doesn't happen again.", "Live lesson · 60 minutes"),
    ("w09-mid", "week-09-midweek.html", 9, "midweek", "Week 9 Mid-Week", "Math — Targeted Gaps",
     "Five quick questions between lessons. Your results are emailed to your instructor.", "Mid-week · about 15 minutes"),
    ("w10-lesson", "week-10-lesson.html", 10, "lesson", "Week 10 Lesson", "Final Review, Pacing &amp; Test Day",
     "Run the clock, don't let it run you, and never leave a blank.", "Live lesson · 60 minutes"),
    ("w10-mid", "week-10-midweek.html", 10, "midweek", "Week 10 Mid-Week", "Final Timed Mini — All Domains",
     "A final five across every domain, lightly timed. Your results are emailed to your instructor.", "Mid-week · about 15 minutes"),
    ("exam5", "SAT Practice Exam 5 (KCE).html", 10, "exam", "Practice Exam 5", "Full-Length Practice Exam 5",
     "The whole test in one sitting: two Reading &amp; Writing modules, a 10-minute break, then two Math modules with the built-in Desmos calculator.",
     "98 questions · about 2 hours 25 minutes with the break"),
]

WEEKS = {
    1: ("Orientation", "The map of the test, your core method, and the Desmos calculator."),
    2: ("Heart of Algebra", "Linear equations and systems, then your first full practice exam."),
    3: ("Advanced Math", "Quadratics, functions and exponents."),
    4: ("Geometry &amp; Trigonometry", "Angles, triangles and circles, then Practice Exam 2."),
    5: ("Problem-Solving &amp; Data Analysis", "Ratios, percents, units and data."),
    6: ("Reading — Craft, Structure &amp; Ideas", "Reading for the point, then Practice Exam 3."),
    7: ("Writing — Expression of Ideas", "Transitions and rhetorical synthesis."),
    8: ("Writing — Standard English Conventions", "Boundaries and agreement, then Practice Exam 4."),
    9: ("Full Practice Test &amp; Error Analysis", "Test conditions and sorting every miss."),
    10: ("Final Review, Pacing &amp; Test Day", "Pacing, test-day plan, then Practice Exam 5."),
}

KIND = {
    "diagnostic": ("Baseline", "t-diag", "Start the Baseline"),
    "lesson": ("Live lesson", "t-lesson", "Open lesson"),
    "tutorial": ("Tutorial", "t-tool", "Open the tutorial"),
    "midweek": ("Mid-week", "t-mid", "Open mid-week"),
    "exam": ("Full-length exam", "t-exam", "Start the exam"),
}

def plain(s):
    return html.unescape(re.sub("<[^>]+>", "", s))

def gate_list():
    out = []
    for i, (mid, f, sec, kind, label, *_rest) in enumerate(MODULES):
        out.append({"id": mid, "f": f, "label": plain(label), "req": [MODULES[i - 1][0]] if i else []})
    return out

def card(m):
    mid, f, sec, kind, label, title, desc, meta = m
    tagname, tagcls, btn = KIND[kind]
    big = kind in ("diagnostic", "exam")
    href = html.escape(f.replace(" ", "%20"), quote=True)
    return (f'<article class="card{" milestone" if big else ""}" data-id="{mid}">'
            f'<div class="wk">{label}</div><h3>{title}</h3><p class="sub">{desc}</p>'
            f'<div class="meta">{meta}</div>'
            f'<div class="tags"><span class="tag {tagcls}">{tagname}</span></div>'
            f'<div class="links"><a class="btn primary" href="{href}">{btn}</a></div></article>')

def build_index():
    parts = []
    parts.append('<section class="block"><div class="fl"></div><h2>Start here</h2>'
                 '<p>Take the Baseline before Week 1. It opens your first lesson.</p></section>'
                 '<div class="grid">' + "".join(card(m) for m in MODULES if m[2] == "start") + '</div>')
    for w in range(1, 11):
        name, blurb = WEEKS[w]
        parts.append(f'<section class="block"><div class="fl"></div><h2>Week {w} · {name}</h2><p>{blurb}</p></section>'
                     '<div class="grid">' + "".join(card(m) for m in MODULES if m[2] == w) + '</div>')
    body = "\n".join(parts)
    tpl = open(os.path.join(ROOT, "tools", "index.template.html"), encoding="utf-8").read()
    return tpl.replace("<!--MODULES-->", body).replace("<!--COUNT-->", str(len(MODULES)))

def main():
    open(os.path.join(ROOT, "index.html"), "w", encoding="utf-8").write(build_index())
    gp = os.path.join(ROOT, "sat-gate.js")
    g = open(gp, encoding="utf-8").read()
    new = "var LIST = " + json.dumps(gate_list(), ensure_ascii=False) + ";"
    g2, n = re.subn(r"var LIST = .*?;\n", lambda _: new + "\n", g, count=1, flags=re.S)
    assert n == 1, "LIST marker not found in sat-gate.js"
    open(gp, "w", encoding="utf-8").write(g2)
    for m in MODULES:
        assert os.path.exists(os.path.join(ROOT, m[1])), m[1]
    print("built index.html and sat-gate.js:", len(MODULES), "modules")

if __name__ == "__main__":
    main()
