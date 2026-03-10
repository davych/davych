const { chromium } = require('playwright');
(async ()=>{
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto('https://github.com/davych', {waitUntil:'networkidle'});
  await page.screenshot({path:'profile.png', fullPage:true});
  console.log('screenshot saved');
  await browser.close();
})();
