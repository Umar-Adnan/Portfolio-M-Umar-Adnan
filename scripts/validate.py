import html.parser
import json
import xml.etree.ElementTree as ET
import os
import sys

# Ensure UTF-8 output on Windows consoles
if sys.platform == 'win32':
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

def validate_all():
    errors = []

    # 1. Validate index.html
    html_path = 'index.html'
    if os.path.exists(html_path):
        with open(html_path, 'r', encoding='utf-8') as f:
            content = f.read()

        class Validator(html.parser.HTMLParser):
            def __init__(self):
                super().__init__()
                self.in_json_ld = False
                self.json_ld_content = ""
                self.json_lds = []

            def handle_starttag(self, tag, attrs):
                attr_dict = dict(attrs)
                if tag == 'script' and attr_dict.get('type') == 'application/ld+json':
                    self.in_json_ld = True
                    self.json_ld_content = ""

            def handle_data(self, data):
                if self.in_json_ld:
                    self.json_ld_content += data

            def handle_endtag(self, tag):
                if tag == 'script' and self.in_json_ld:
                    self.in_json_ld = False
                    self.json_lds.append(self.json_ld_content.strip())

        v = Validator()
        try:
            v.feed(content)
            print("[PASS] index.html HTML syntax valid")
        except Exception as e:
            errors.append(f"HTML error in index.html: {e}")

        # Validate JSON-LD blocks
        for idx, jtext in enumerate(v.json_lds):
            try:
                json.loads(jtext)
                print(f"[PASS] JSON-LD block {idx+1} valid")
            except Exception as e:
                errors.append(f"JSON-LD error in block {idx+1}: {e}")

    # 2. Validate JSON files
    json_files = ['vercel.json', 'package.json', 'public/manifest.json', 'public/particlesjs-config.json', 'src/data/particlesConfig.json']
    for jf in json_files:
        if os.path.exists(jf):
            try:
                with open(jf, 'r', encoding='utf-8') as f:
                    json.load(f)
                print(f"[PASS] {jf} JSON valid")
            except Exception as e:
                errors.append(f"JSON error in {jf}: {e}")

    # 3. Validate XML files
    xml_files = ['public/sitemap.xml']
    for xf in xml_files:
        if os.path.exists(xf):
            try:
                ET.parse(xf)
                print(f"[PASS] {xf} XML valid")
            except Exception as e:
                errors.append(f"XML error in {xf}: {e}")

    if errors:
        print("\n[FAIL] VALIDATION ERRORS DETECTED:")
        for err in errors:
            print(f"  - {err}")
        sys.exit(1)
    else:
        print("\n[OK] ALL SYNTAX CHECKS PASSED!\n")

if __name__ == '__main__':
    validate_all()
