"""Real Chromium tests/screenshots of committed interaction HTML/CSS/JS, not art generation."""
from pathlib import Path
from playwright.sync_api import sync_playwright
import os
URL=os.environ.get("VERBA_UI_URL","http://127.0.0.1:8765/research/interaction-v145/")
OUT=Path(os.environ.get("VERBA_UI_PREVIEW_DIR","/tmp/verba-v145-screens"))
OUT.mkdir(parents=True,exist_ok=True)
def no_overflow(page):
    assert page.evaluate("document.documentElement.scrollWidth <= innerWidth + 1"),"Horizontal viewport overflow"
def snapshot(browser,name,width,height,mode,tab,script=None,text=None):
    page=browser.new_page(viewport={"width":width,"height":height},device_scale_factor=1)
    errors=[]
    page.on("pageerror",lambda e:errors.append(str(e)))
    page.goto(URL,wait_until="networkidle")
    page.locator("#themeSelect").count()==1
    assert page.locator("#startMic").is_visible()
    if mode=="dark":page.locator("#themeSwitch").click()
    if tab!="talk":page.locator('[data-tab="'+tab+'"]').click()
    if script:page.locator("#scriptSelect").select_option(script)
    if text:
        page.locator("#message").fill(text);page.locator("#messageForm button[type=submit]").click()
        assert page.locator(".turn-text").last.inner_text()==text
        assert page.locator("#conversationCount").inner_text().startswith("1 message")
    assert page.locator("html").get_attribute("data-theme")==mode
    no_overflow(page)
    if script in ["ar","he"]:
        assert page.locator("#readingSample").get_attribute("dir")=="rtl"
    page.screenshot(path=str(OUT/name),animations="disabled")
    assert not errors,errors
    page.close()

with sync_playwright() as p:
    browser=p.chromium.launch(headless=True,args=["--no-sandbox","--use-fake-ui-for-media-stream","--use-fake-device-for-media-stream"])
    for cfg in [
        ("01-talk-mobile-light.png",390,844,"light","talk",None,None),
        ("02-talk-mobile-dark.png",390,844,"dark","talk",None,"Estou a pensar em viajar."),
        ("03-read-greek-light.png",390,844,"light","read","el",None),
        ("04-read-arabic-dark.png",390,844,"dark","read","ar",None),
        ("05-read-hebrew-light.png",390,844,"light","read","he",None),
        ("06-settings-mobile-dark.png",390,844,"dark","settings",None,None),
        ("07-small-mobile-320.png",320,720,"light","talk",None,None),
        ("08-desktop-1024.png",1024,800,"light","talk",None,None)]:
        snapshot(browser,*cfg)
    # Test real Chrome fake-microphone ownership, not real person or neural inference.
    context=browser.new_context(permissions=["microphone"],viewport={"width":390,"height":844})
    page=context.new_page()
    page.add_init_script("""(() => {
      window.__streams=[];
      const orig=navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
      navigator.mediaDevices.getUserMedia=async (...args)=>{const s=await orig(...args);window.__streams.push(s);return s};
    })()""")
    page.goto(URL,wait_until="networkidle")
    page.locator("#startMic").click()
    page.wait_for_function("document.getElementById('micStatus').textContent.includes('Listening')",timeout=12000)
    assert page.evaluate("window.__streams.length") == 1
    assert page.evaluate("window.__streams[0].getAudioTracks()[0].readyState")=="live"
    page.locator("#muteMic").click()
    assert "Muted" in page.locator("#micStatus").inner_text()
    assert page.evaluate("window.__streams[0].getAudioTracks()[0].readyState")=="ended"
    page.locator("#muteMic").click()
    page.wait_for_function("document.getElementById('micStatus').textContent.includes('Listening')",timeout=12000)
    assert page.evaluate("window.__streams.length")==2
    assert page.evaluate("window.__streams[1].getAudioTracks()[0].readyState")=="live"
    page.locator('[data-tab="read"]').click()
    assert page.evaluate("window.__streams[1].getAudioTracks()[0].readyState")=="ended"
    page.close();context.close();browser.close()
assert len(list(OUT.glob("*.png")))==8
print("PASS: 8 genuine Chromium renders, 320/390/1024px, dark/light, RTL, no overflow, mic stop/reacquire")
