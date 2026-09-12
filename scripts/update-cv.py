"""Refresh the CV while retaining all sections from the prior PDF."""
from pathlib import Path
import re
import unicodedata
from xml.sax.saxutils import escape
from pypdf import PdfReader
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, KeepTogether
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4

root = Path(__file__).resolve().parents[1]
backup = root / 'output/pdf/rabin-ale-cv-before-2026-09-12.pdf'
backup.parent.mkdir(parents=True, exist_ok=True)
if not backup.exists():
    backup.write_bytes((root / 'public/rabin-ale-cv.pdf').read_bytes())
text = '\n'.join(page.extract_text() for page in PdfReader(backup).pages)
text = unicodedata.normalize('NFKC', text).replace('–', '-').replace('—', '-').replace('✓', '')
sections = ['Professional Summary', 'Education', 'Technical Skills', 'Work Experience', 'Projects', 'Certifications & Training', 'Soft Skills', 'Languages', 'Interests']
content = {}
for i, heading in enumerate(sections):
    start = re.search(r'^' + re.escape(heading) + r'\s*$', text, re.MULTILINE).end()
    end = re.search(r'^' + re.escape(sections[i+1]) + r'\s*$', text, re.MULTILINE).start() if i+1 < len(sections) else len(text)
    content[heading] = text[start:end].strip()

styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name='CVBody', fontName='Helvetica', fontSize=9.3, leading=13, textColor=HexColor('#334155'), spaceAfter=6))
styles.add(ParagraphStyle(name='CVSection', fontName='Helvetica-Bold', fontSize=12, leading=16, textColor=HexColor('#4338ca'), spaceBefore=13, spaceAfter=7, keepWithNext=True))
styles.add(ParagraphStyle(name='CVEntry', fontName='Helvetica-Bold', fontSize=10, leading=14, textColor=HexColor('#0f172a'), spaceBefore=5, spaceAfter=3, keepWithNext=True))
styles.add(ParagraphStyle(name='CVName', fontName='Helvetica-Bold', fontSize=28, leading=32, textColor=HexColor('#0f172a'), spaceAfter=5))
story = []
def para(value, style='CVBody'):
    return Paragraph(escape(value), styles[style])
def entry(title, detail, url=None):
    group = [para(title, 'CVEntry'), para(detail)]
    if url:
        group.append(Paragraph(f'<link href="{escape(url)}" color="#4338ca">{escape(url)}</link>', styles['CVBody']))
    story.append(KeepTogether(group))

story += [para('Rabin Ale', 'CVName'), para('Full-Stack & Flutter Developer | Co-Founder, TypingOwl'),
    Paragraph('alejunov@gmail.com | +977 9826175904 / +977 9766608807<br/>Vyas-1, Damauli, Tanahun, Nepal<br/><link href="https://rabinale.com.np" color="#4338ca">rabinale.com.np</link> | <link href="https://github.com/labinale45" color="#4338ca">GitHub: labinale45</link> | <link href="https://www.linkedin.com/in/rabin-ale-07650a1a3/" color="#4338ca">LinkedIn</link>', styles['CVBody'])]

new_projects = [
 ('Wigo - Never Go Alone | Flutter / Android', 'Built and published a Flutter app on Google Play for nearby companions, activity discovery, ride sharing and fare splitting. Features include in-app chat and calls, optional verification, opt-in location sharing and SOS alerts.', 'https://play.google.com/store/apps/details?id=com.rabinale.wigo'),
 ('HomeCostGuide | Next.js', 'Built a US home-improvement research site with cost guides, interactive project estimators, regional comparisons and maintenance guidance supported by a published methodology.', 'https://homecostguide.rabinale.com.np/'),
 ('JCalc | Next.js', 'Built a browser-based calculator suite for loans, ROI, percentages, profit, break-even, cash flow, growth and unit economics, with formula explanations and examples.', 'https://jcalc.rabinale.com.np/'),
 ('ReflexPeak | Next.js', 'Built a browser-based personal-performance platform with reaction time, click speed, aim, sequence and visual memory, and choice reaction tests. Includes Daily Peak challenges and locally stored personal bests.', 'https://reflexpeak.com/'),
]
entry_starts = {
 'Education': ['Aadikavi Bhanubhakta Campus', 'Caribbean Secondary School'],
 'Work Experience': ['TypingOwl -', 'Galaxy Education -', 'Inpro -', 'Damauli Future Star Boarding School'],
 'Projects': ['TypingOwl -', 'Press Management System', 'ResultAayo -', 'Chat-App with', 'Online Test with'],
 'Certifications & Training': ['Work Experience Certificate -', 'Full Stack Web Development Training -', 'Elements of AI -', 'Networking and Telecommunication Internship -', 'Computer Teacher Certification'],
}
for section in sections:
    story.append(para(section, 'CVSection'))
    source = content[section]
    if section == 'Projects':
        for item in new_projects: entry(*item)
    if section == 'Professional Summary':
        story.append(para(' '.join(source.split()) + ' Built and published Wigo with Flutter on Google Play, alongside live web products HomeCostGuide, JCalc and ReflexPeak.'))
    elif section in entry_starts:
        pattern = '(?m)^(?=' + '|'.join(re.escape(s) for s in entry_starts[section]) + ')'
        for block in re.split(pattern, source):
            lines = block.strip().splitlines()
            if lines:
                if lines[0].count('(') > lines[0].count(')') and len(lines) > 1:
                    lines = [lines[0] + ' ' + lines[1]] + lines[2:]
                entry(lines[0], ' '.join(' '.join(lines[1:]).split()))
    else:
        if section == 'Technical Skills': source += '\nMobile Development: Flutter, Android app publishing (Google Play)'
        for line in source.splitlines():
            if line.strip(): story.append(para(line.strip()))

output = root / 'output/pdf/rabin-ale-cv.pdf'
def footer(canvas, doc):
    canvas.setStrokeColor(HexColor('#e2e8f0'))
    canvas.line(42, 35, A4[0]-42, 35)
    canvas.setFont('Helvetica', 8)
    canvas.setFillColor(HexColor('#64748b'))
    canvas.drawString(42, 23, 'Rabin Ale | Updated September 2026')
    canvas.drawRightString(A4[0]-42, 23, str(doc.page))
SimpleDocTemplate(str(output), pagesize=A4, rightMargin=42, leftMargin=42, topMargin=36, bottomMargin=47, title='Rabin Ale - Curriculum Vitae', author='Rabin Ale').build(story, onFirstPage=footer, onLaterPages=footer)
print(output)
