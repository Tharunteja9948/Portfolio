import os
import subprocess
import fitz
import shutil

edge_path = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if not os.path.exists(edge_path):
    edge_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

def make_html(title, summary, skills_rows, projects, internships, education, certs):
    skills_html = "".join([f"""<tr><td class="skill-label">{label}:</td><td class="skill-val">{val}</td></tr>""" for label, val in skills_rows])
    
    projects_html = ""
    for p in projects:
        bullets = "".join([f"<li>{b}</li>" for b in p['bullets']])
        projects_html += f"""
        <div class="entry">
          <div class="entry-header">
            <span class="entry-title">{p['title']}</span>
            <span class="entry-right">{p['tech']}</span>
          </div>
          <ul class="bullets">{bullets}</ul>
        </div>
        """
        
    internships_html = ""
    for item in internships:
        bullets = "".join([f"<li>{b}</li>" for b in item['bullets']])
        internships_html += f"""
        <div class="entry">
          <div class="entry-header">
            <span class="entry-title">{item['role']}</span>
            <span class="entry-right">{item['period']}</span>
          </div>
          <div class="entry-sub">{item['company']}</div>
          <ul class="bullets">{bullets}</ul>
        </div>
        """

    education_html = ""
    for edu in education:
        education_html += f"""
        <div class="entry" style="margin-bottom: 3px;">
          <div class="entry-header">
            <span class="entry-title">{edu['degree']}</span>
            <span class="entry-right">{edu['period']}</span>
          </div>
          <div class="entry-sub">{edu['institution']} &nbsp;|&nbsp; <strong>{edu['score']}</strong></div>
        </div>
        """

    certs_html = "<div class='cert-list'>"
    for c in certs:
        certs_html += f"<div class='cert-item'>• <strong>{c['name']}</strong> — {c['issuer']} <span style='color:#64748b;'>({c['details']})</span></div>"
    certs_html += "</div>"

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>{title} - Seddam Tarun Theja</title>
<style>
@page {{
  size: A4 portrait;
  margin: 0;
}}
* {{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}}
body {{
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  color: #0f172a;
  background: #ffffff;
  width: 210mm;
  height: 297mm;
  padding: 24px 34px 18px 34px;
  margin: 0 auto;
  line-height: 1.32;
  font-size: 8.85pt;
  -webkit-font-smoothing: antialiased;
}}
.header {{
  text-align: center;
  margin-bottom: 4px;
}}
.name {{
  font-size: 19pt;
  font-weight: 800;
  letter-spacing: 0.5px;
  color: #0f172a;
  margin-bottom: 2px;
}}
.contact-line {{
  font-size: 8.6pt;
  color: #475569;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}}
.contact-line a {{
  color: #0369a1;
  text-decoration: none;
  font-weight: 500;
}}
.contact-line .sep {{
  color: #94a3b8;
}}
hr.header-sep {{
  border: none;
  border-top: 1.5px solid #0f172a;
  margin: 5px 0 6px 0;
}}
.section-title {{
  font-size: 9.8pt;
  font-weight: 800;
  text-transform: uppercase;
  color: #0f172a;
  letter-spacing: 0.4px;
  border-bottom: 1px solid #1e293b;
  padding-bottom: 1px;
  margin-top: 6px;
  margin-bottom: 3.5px;
}}
p.summary {{
  font-size: 8.6pt;
  color: #334155;
  text-align: justify;
  margin-bottom: 4px;
  line-height: 1.32;
}}
.skills-table {{
  width: 100%;
  font-size: 8.6pt;
  border-collapse: collapse;
  margin-bottom: 3.5px;
}}
.skills-table td {{
  padding: 1px 0;
  vertical-align: top;
}}
.skills-table td.skill-label {{
  width: 125px;
  font-weight: 700;
  color: #0f172a;
}}
.skills-table td.skill-val {{
  color: #334155;
}}
.entry {{
  margin-bottom: 4.5px;
}}
.entry-header {{
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  font-size: 8.9pt;
}}
.entry-title {{
  font-weight: 700;
  color: #0f172a;
}}
.entry-right {{
  font-size: 8.3pt;
  color: #475569;
  font-weight: 600;
}}
.entry-sub {{
  font-size: 8.3pt;
  color: #475569;
  font-style: italic;
  margin-bottom: 1px;
}}
ul.bullets {{
  padding-left: 14px;
  margin: 1px 0 0 0;
}}
ul.bullets li {{
  font-size: 8.4pt;
  color: #334155;
  line-height: 1.28;
  margin-bottom: 1.5px;
}}
.cert-list {{
  display: flex;
  flex-direction: column;
  gap: 1.5px;
}}
.cert-item {{
  font-size: 8.4pt;
  color: #334155;
}}
.cert-item strong {{
  color: #0f172a;
}}
</style>
</head>
<body>

<div class="header">
  <div class="name">SEDDAM TARUN THEJA</div>
  <div class="contact-line">
    <span>Ongole, Andhra Pradesh, India</span>
    <span class="sep">|</span>
    <span>+91-7989470772</span>
    <span class="sep">|</span>
    <a href="mailto:siddemtharunteja@gmail.com">siddemtharunteja@gmail.com</a>
    <span class="sep">|</span>
    <a href="https://www.linkedin.com/in/seddam-tarun-theja-348341246" target="_blank">LinkedIn</a>
    <span class="sep">|</span>
    <a href="https://github.com/Tharunteja9948" target="_blank">GitHub</a>
  </div>
</div>
<hr class="header-sep">

<div class="section-title">Professional Summary</div>
<p class="summary">{summary}</p>

<div class="section-title">Technical Skills</div>
<table class="skills-table">
  {skills_html}
</table>

<div class="section-title">Technical Projects</div>
{projects_html}

<div class="section-title">Internships &amp; Job Simulations</div>
{internships_html}

<div class="section-title">Education</div>
{education_html}

<div class="section-title">Certifications &amp; Coursework</div>
{certs_html}

</body>
</html>"""

# ==========================================
# 1. PYTHON & SOFTWARE ENGINEERING RESUME
# ==========================================
summary_python = "Detail-oriented Computer Science & Engineering undergraduate at QIS College with hands-on proficiency in Python programming, Object-Oriented Programming (OOP), and full-stack software development. Proven experience in designing scalable backend architectures, implementing RESTful APIs, and optimizing relational MySQL database schemas. Adept in Data Structures, Algorithms, and clean code principles, backed by verified virtual internship experience with EduSkills building end-to-end Python web platforms. Seeking a Python Developer or Software Engineer role to engineer reliable, production-ready systems."

skills_python = [
    ("Languages", "Python, SQL, JavaScript (ES6+), HTML5, CSS3"),
    ("Frameworks & Web", "Django, RESTful APIs, Bootstrap, Responsive Web Design"),
    ("Databases & Tools", "MySQL (Schema Design, Query Optimization, Joins, Indexing), Git, GitHub, VS Code, Google Colab"),
    ("Core CS Concepts", "Data Structures & Algorithms (DSA), Object-Oriented Programming (OOP), Relational DBMS")
]

projects_python = [
    {
        "title": "AI Interview Platform",
        "tech": "Python, JavaScript, HTML5/CSS3, MySQL, REST APIs",
        "bullets": [
            "Engineered an automated interview simulation platform enabling candidates to configure customized role-based practice rounds across 11 technical career tracks.",
            "Built browser-level real-time hardware diagnostics for camera readiness and microphone audio input verification.",
            "Architected dynamic sequential Q&amp;A pipeline with browser speech synthesis readouts and securely persisted candidate response logs in MySQL."
        ]
    },
    {
        "title": "Leftover Food Recipe Generator",
        "tech": "Python, MySQL, HTML5, CSS3, JavaScript, Responsive Design",
        "bullets": [
            "Designed a web recommendation system matching on-hand kitchen ingredients to recipe workflows to reduce domestic food waste.",
            "Architected normalized MySQL relational tables and wrote indexed lookup queries retrieving step-by-step cooking instructions with low latency.",
            "Engineered multi-category ingredient filtering (vegetables, proteins, spices, grains) with instant client-side tag selection."
        ]
    },
    {
        "title": "AI Calls & Emergency Data Analytics Dashboard",
        "tech": "Python, MySQL, HTML5/CSS3, JavaScript, Chart.js",
        "bullets": [
            "Developed an interactive dashboard visualizing multi-district emergency dispatch call records across Andhra Pradesh.",
            "Segmented incident logs by classification (Crime, Traffic, Medical) and rendered temporal trend charts to assist dispatch decision-making."
        ]
    }
]

internships_python = [
    {
        "role": "Python Fullstack Developer Virtual Internship",
        "company": "EduSkills Foundation (Supported by AICTE & Ministry of Education)",
        "period": "June – August 2026 (8 Weeks)",
        "bullets": [
            "Constructed end-to-end Python full-stack modules connecting responsive frontend interfaces to relational database backends.",
            "Implemented RESTful API endpoints, request handling, and database connection pools; evaluated with Grade O (Outstanding: 90–100)."
        ]
    },
    {
        "role": "Web Full Stack Developer Virtual Internship",
        "company": "EduSkills Foundation (Supported by NEAT Cell, AICTE)",
        "period": "April – June 2025 (10 Weeks)",
        "bullets": [
            "Completed hands-on practical training in responsive web design, semantic HTML5, modern CSS3 layouts, and Git version control."
        ]
    },
    {
        "role": "Data Analytics Job Simulation",
        "company": "Deloitte (Issued by Forage)",
        "period": "April – May 2026",
        "bullets": [
            "Executed practical corporate tasks in enterprise data analysis and forensic technology investigation."
        ]
    }
]

education_common = [
    {
        "degree": "B.Tech in Computer Science and Engineering",
        "institution": "QIS College of Engineering and Technology, Prakasam",
        "period": "2023 – 2027",
        "score": "CGPA: 7.33 / 10.0"
    },
    {
        "degree": "Intermediate (MPC)",
        "institution": "Sri Chaitanya Junior College",
        "period": "2021 – 2023",
        "score": "Board Score: 80.5%"
    }
]

certs_python = [
    {"name": "Python Programming", "issuer": "Microsoft through Skill India Digital Hub", "details": "40 Hours Verified Coursework"},
    {"name": "Front-end Web Development", "issuer": "Reliance Foundation Skilling Academy / Skill India", "details": "240 Hours Intensive Curriculum"},
    {"name": "Data Analytics with Python", "issuer": "NPTEL • IIT Roorkee / Swayam", "details": "12-Week Rigorous Course · Elite Grade · 67%"}
]

# ==========================================
# 2. DATA ANALYST RESUME
# ==========================================
summary_data = "Analytical Computer Science & Engineering undergraduate at QIS College with hands-on proficiency in Exploratory Data Analysis (EDA), statistical modeling, and data visualization using Python and SQL. Experienced in processing large-scale incident and financial datasets, developing predictive time-series forecasting models, and crafting actionable dashboards. Holds verified credentials from NPTEL (IIT Roorkee, Elite 67%) and Deloitte/Tata Group in enterprise analytics simulations. Seeking a Data Analyst / BI Analyst role to derive impactful intelligence from complex datasets."

skills_data = [
    ("Data & Analytics", "Exploratory Data Analysis (EDA), Data Cleaning & Wrangling, Time-Series Forecasting, Statistical Modeling, Predictive Analytics"),
    ("Libraries & Tools", "Pandas, NumPy, Matplotlib, Microsoft Excel (Formulas, Pivot Tables), Google Colab, Jupyter Notebook"),
    ("Languages & DB", "Python, SQL (Complex Queries, Joins, Aggregations, Subqueries, Optimization), MySQL"),
    ("Visualization & BI", "Chart.js, Interactive KPI Trend Dashboards, Incident Hotspot Mapping, Executive Data Storytelling")
]

projects_data = [
    {
        "title": "AI Calls & Emergency Data Analytics Dashboard",
        "tech": "Python, MySQL, Pandas, JavaScript, Chart.js, Predictive Modeling",
        "bullets": [
            "Analyzed emergency dispatch call logs across Andhra Pradesh districts, categorizing records into Crime, Traffic, and Medical emergencies.",
            "Rendered temporal trend visualizations and district hotspot mapping to support situational awareness and resource allocation.",
            "Engineered a predictive time-series forecasting script in Python to estimate next-month call surges based on historical trends."
        ]
    },
    {
        "title": "AI Interview Platform (Evaluation & Diagnostics Analytics)",
        "tech": "Python, MySQL, JavaScript, Rubric Scoring Architecture",
        "bullets": [
            "Architected evaluation telemetry capturing candidate response timestamps and scoring across 8 rubric dimensions.",
            "Designed normalized MySQL schemas persisting candidate session metrics, difficulty tiers, and diagnostic records."
        ]
    },
    {
        "title": "Leftover Food Recipe Matcher (Query Optimization)",
        "tech": "Python, MySQL, SQL Relational Filtering, JavaScript",
        "bullets": [
            "Developed relational queries optimizing multi-attribute ingredient filtering and pantry inventory matching with low latency."
        ]
    }
]

internships_data = [
    {
        "role": "GenAI Powered Data Analytics Job Simulation",
        "company": "TATA Group (Issued by Forage)",
        "period": "April – May 2026",
        "bullets": [
            "Executed Exploratory Data Analysis (EDA) and financial risk profiling to predict customer delinquency patterns with AI.",
            "Synthesized analytical findings into executive business presentations with data storytelling for collections strategy."
        ]
    },
    {
        "role": "Data Analytics Job Simulation",
        "company": "Deloitte (Issued by Forage)",
        "period": "April – May 2026",
        "bullets": [
            "Completed practical corporate simulation covering enterprise data analysis, forensic technology, and forensic reporting."
        ]
    },
    {
        "role": "Python Fullstack Developer Virtual Internship",
        "company": "EduSkills Foundation (Supported by AICTE & Ministry of Education)",
        "period": "June – August 2026 (8 Weeks)",
        "bullets": [
            "Built data processing pipelines, backend connection pools, and database queries in Python; awarded Grade O (Outstanding)."
        ]
    }
]

certs_data = [
    {"name": "Data Analytics with Python", "issuer": "NPTEL • IIT Roorkee / Swayam", "details": "12-Week Rigorous Course · Elite Grade · 67% · Roll: NPTEL26CS86S651601730"},
    {"name": "Python Programming", "issuer": "Microsoft through Skill India Digital Hub", "details": "40 Hours Verified Coursework"},
    {"name": "Coursework Foundations", "issuer": "QIS College of Engineering and Technology", "details": "Relational Database Management (RDBMS), DSA, Quantitative Analytics"}
]

# ==========================================
# 3. ALL-IN-ONE COMPREHENSIVE RESUME
# ==========================================
summary_all = "Versatile Computer Science & Engineering undergraduate at QIS College with hands-on expertise spanning Python programming, relational database engineering (MySQL), and exploratory data analytics. Proven track record in building AI-powered web applications, implementing predictive forecasting models, and developing RESTful APIs. Possesses strong fundamentals in Data Structures, Algorithms, and Object-Oriented Programming (OOP) complemented by verified virtual internships with EduSkills, Deloitte, and Tata Group. Seeking an entry-level Software Engineer, Python Developer, or Data Analyst role."

skills_all = [
    ("Languages & DB", "Python, SQL, JavaScript (ES6+), HTML5, CSS3, MySQL (Relational Schema Design, Joins, Indexing)"),
    ("Web & Frameworks", "Django, RESTful APIs, Bootstrap, Responsive Web Architecture"),
    ("Data & Analytics", "Pandas, NumPy, Matplotlib, Exploratory Data Analysis (EDA), Data Cleaning, Time-Series Forecasting, Excel"),
    ("Tools & Core CS", "Git, GitHub, VS Code, Google Colab, Object-Oriented Programming (OOP), Data Structures & Algorithms (DSA), RDBMS")
]

projects_all = [
    {
        "title": "AI Interview Platform",
        "tech": "Python, JavaScript, HTML5/CSS3, MySQL, Web APIs",
        "bullets": [
            "Engineered an automated technical mock interview platform with role customization and real-time hardware diagnostics (camera & mic).",
            "Developed sequential questioning pipeline with browser speech synthesis and persisted evaluation records in MySQL."
        ]
    },
    {
        "title": "AI Calls & Emergency Data Analytics Dashboard",
        "tech": "Python, MySQL, JavaScript, Chart.js, Time-Series ML",
        "bullets": [
            "Analyzed emergency dispatch records across Andhra Pradesh districts with incident segmentation (Crime, Traffic, Medical).",
            "Built temporal trend graphs and a Python predictive time-series model forecasting next-month dispatch surges."
        ]
    },
    {
        "title": "Leftover Food Recipe Generator",
        "tech": "Python, MySQL, HTML5/CSS3, JavaScript",
        "bullets": [
            "Built a smart recommendation engine matching pantry ingredients to recipes, backed by optimized MySQL lookup queries."
        ]
    }
]

internships_all = [
    {
        "role": "Python Fullstack Developer Virtual Internship",
        "company": "EduSkills Foundation (AICTE & Ministry of Education)",
        "period": "June – August 2026 (8 Weeks)",
        "bullets": [
            "Built modular Python web services, connected relational database schemas, and handled version control; Grade O (Outstanding)."
        ]
    },
    {
        "role": "Enterprise Data Analytics Job Simulations",
        "company": "Deloitte & TATA Group (Issued by Forage)",
        "period": "April – May 2026",
        "bullets": [
            "Conducted exploratory data analysis, financial risk profiling, delinquency prediction with AI, and forensic technology tasks."
        ]
    },
    {
        "role": "Web Full Stack Developer Virtual Internship",
        "company": "EduSkills Foundation (NEAT Cell, AICTE)",
        "period": "April – June 2025 (10 Weeks)",
        "bullets": [
            "Trained in modern responsive web standards, semantic front-end layouts, and full-stack API integration."
        ]
    }
]

education_all = [
    {
        "degree": "B.Tech in Computer Science and Engineering",
        "institution": "QIS College of Engineering and Technology, Prakasam",
        "period": "2023 – 2027",
        "score": "CGPA: 7.33 / 10.0"
    },
    {
        "degree": "Intermediate (MPC)",
        "institution": "Sri Chaitanya Junior College",
        "period": "2021 – 2023",
        "score": "Board Score: 80.5%"
    },
    {
        "degree": "Secondary School Certificate (SSC)",
        "institution": "CRR Residential High School",
        "period": "2021",
        "score": "Final Grade: 100%"
    }
]

certs_all = [
    {"name": "Data Analytics with Python", "issuer": "NPTEL • IIT Roorkee / Swayam", "details": "12-Week Rigorous Course · Elite Grade · 67%"},
    {"name": "Python Programming", "issuer": "Microsoft through Skill India Digital Hub", "details": "40 Hours Verified Coursework"},
    {"name": "Front-end Web Development", "issuer": "Reliance Foundation Skilling Academy / Skill India", "details": "240 Hours Intensive Curriculum"}
]

resumes = [
    ("Tarun_Theja_Python_Software_Engineer_Resume", "Python & Software Engineering Resume", summary_python, skills_python, projects_python, internships_python, education_common, certs_python),
    ("Tarun_Theja_Data_Analyst_Resume", "Data Analyst Resume", summary_data, skills_data, projects_data, internships_data, education_common, certs_data),
    ("Tarun_Theja_Comprehensive_Resume", "Comprehensive (All-in-One) Resume", summary_all, skills_all, projects_all, internships_all, education_all, certs_all)
]

for file_slug, title, summary, skills_rows, projects, internships, education, certs in resumes:
    html_content = make_html(title, summary, skills_rows, projects, internships, education, certs)
    html_path = f"resumes/{file_slug}.html"
    pdf_path = f"resumes/{file_slug}.pdf"
    pub_pdf_path = f"public/resumes/{file_slug}.pdf"
    
    with open(html_path, "w", encoding="utf-8") as f:
        f.write(html_content)
        
    abs_html = os.path.abspath(html_path)
    abs_pdf = os.path.abspath(pdf_path)
    cmd = [edge_path, "--headless", "--disable-gpu", f"--print-to-pdf={abs_pdf}", "--no-pdf-header-footer", f"file:///{abs_html}"]
    subprocess.run(cmd, check=True)
    
    # Check page count
    doc = fitz.open(abs_pdf)
    print(f"[{file_slug}] Page count: {len(doc)}")
    
    # Copy to public folder
    abs_pub_pdf = os.path.abspath(pub_pdf_path)
    shutil.copyfile(abs_pdf, abs_pub_pdf)
    
print("All 3 resumes generated and verified successfully!")
