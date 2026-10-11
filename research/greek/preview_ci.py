"""Chromium screenshots from real committed Greek HTML/CSS/JS, not generated imagery.
The GitHub Actions job serves files from this branch using python http.server.
"""
import os
from pathlib import Path
from playwright.sync_api import sync_playwright
URL=os.environ.get('GREEK_PREVIEW_URL','http://127.0.0.1:8765/')
OUT=Path(os.environ.get('GREEK_PREVIEW_OUT','/tmp/greek-v144-previews'))
OUT.mkdir(parents=True,exist_ok=True)
def capture(page,name):
    page.screenshot(path=str(OUT/name),full_page=True,animations='disabled')
def check(page):
    page.goto(URL,wait_until='networkidle',timeout=20000)
    page.locator('#periods .period').first.wait_for(timeout=12000)
    assert page.locator('#periods .period').count()==8,'Eight dated periods did not render'
    assert page.locator('#theme').is_visible()
    assert page.evaluate('document.documentElement.scrollWidth<=window.innerWidth'),'Horizontal overflow'
def main():
    with sync_playwright() as p:
        browser=p.chromium.launch(headless=True)
        context=browser.new_context(viewport={'width':390,'height':844},device_scale_factor=1,reduced_motion='reduce')
        page=context.new_page();errors=[]
        page.on('pageerror',lambda e:errors.append(str(e)))
        check(page);capture(page,'01-mobile-light-chronology.png')
        page.locator('#theme').click()
        assert page.locator('body').get_attribute('data-theme')=='dark'
        capture(page,'02-mobile-dark-chronology.png')
        page.locator('#theme').click()
        page.locator('#create').click()
        assert page.locator('#state').inner_text().startswith('UNVERIFIED')
        page.locator('#witness').click()
        assert 'Illustrative witnesses' in page.locator('#report').inner_text()
        page.locator('#ipa').fill('[a]')
        page.locator('#argument').fill('A synthetic demo cannot authenticate ancient pronunciation.')
        page.locator('#limits').fill('No dated real witness.')
        page.locator('#hypothesis').click()
        assert 'Synthetic/unreviewed' in page.locator('#message').inner_text()
        assert '0 manually argued' in page.locator('#report').inner_text()
        capture(page,'03-mobile-guarded-evidence.png')
        page.locator('#theme').click()
        capture(page,'04-mobile-dark-evidence.png')
        page.locator('#casePeriod').select_option('roman')
        page.locator('#create').click()
        assert 'Koine varied by place' in page.locator('#report').inner_text()
        capture(page,'05-koine-period-warning.png')
        assert not errors,'Browser script errors: '+str(errors)
        context.close()
        for width,dark,name in [(1280,False,'06-desktop-light.png'),(1280,True,'07-desktop-dark.png'),(320,False,'08-small-phone.png')]:
            c=browser.new_context(viewport={'width':width,'height':900},device_scale_factor=1,reduced_motion='reduce')
            pg=c.new_page();check(pg)
            if dark:pg.locator('#theme').click()
            capture(pg,name);c.close()
        browser.close()
    assert len(list(OUT.glob('*.png')))==8,'Missing one or more screenshot artifacts'
    print('PASS: 8 GitHub Chromium previews generated from committed code. No model inference or ancient voice claims.')
if __name__=='__main__':main()
