"""Render the ACTUAL GitHub checkout's Greek app. Never generate concept imagery."""
import os
from pathlib import Path
from playwright.sync_api import sync_playwright
URL=os.environ.get("GREEK_PREVIEW_URL","http://127.0.0.1:8765/research/greek-v144/")
OUTPUT=Path(os.environ.get("GREEK_PREVIEW_OUT","/tmp/verba-greek-v144"));OUTPUT.mkdir(parents=True,exist_ok=True)
cases=[
("01-mobile-light.png",390,844,"light",None),
("02-mobile-dark.png",390,844,"dark",None),
("03-mobile-timeline.png",390,844,"light","history"),
("04-mobile-evidence-desk.png",390,844,"light","evidence"),
("05-small-phone-light.png",320,770,"light",None),
("06-small-phone-dark.png",320,770,"dark",None),
("07-desktop-light.png",1280,900,"light",None),
("08-desktop-dark.png",1280,900,"dark",None),
]
with sync_playwright() as p:
 browser=p.chromium.launch(headless=True,args=['--no-sandbox'])
 for name,width,height,mode,section in cases:
  page=browser.new_page(viewport={'width':width,'height':height},device_scale_factor=1)
  page.goto(URL,wait_until='networkidle')
  assert page.locator("h1").inner_text().startswith("Greek has")
  assert page.locator("#periodList > li").count()==8
  assert page.locator("#attach").is_disabled()
  assert page.locator("#propose").is_disabled()
  if mode=="dark":page.locator("#mode").click()
  assert page.locator('body').get_attribute('data-mode')==mode
  assert page.evaluate("document.documentElement.scrollWidth <= window.innerWidth+1"),"Horizontal overflow at "+str(width)
  if section:page.locator('#'+section).scroll_into_view_if_needed()
  if section=="evidence":
   page.locator("#create").click()
   assert "Case requires" in page.locator("#message").inner_text() # No citation by default
   page.locator("#sourceId").fill("synthetic classroom case")
   page.locator("#create").click()
   assert '"historical_voice_attested"' not in page.locator("#audit").inner_text()
   assert '"ancient_voice_attested": false' in page.locator("#audit").inner_text()
  page.screenshot(path=str(OUTPUT/name),full_page=(section is None),animations='disabled')
  page.close()
 browser.close()
assert len(list(OUTPUT.glob("*.png")))==8,"Expected eight genuine browser screenshots"
print("Greek research UI Chromium snapshots: 8/8, no overflow, no ancient-voice claim")
