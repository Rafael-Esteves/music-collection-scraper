//using puppeteer extra and puppeteer extra stealth to reduce the chance of detection by Youtube Music
const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

//Import your songs from the other app in this format. I used a chrome plug-in called simple scraper to grab this data in JSON format and then converted it to this javascript array.

var songs = [{Title:"I Feel Like I'm Drowning",Artist:"Two Feet"},{Title:"Hollywood",Artist:"Vintage Culture"},{Title:"Pour Over",Artist:"Vintage Culture, Adam K"},{Title:"Wild Kidz",Artist:"Vintage Culture, Ricci"}];

//Youtube music log-in url
var destination_url = 'https://accounts.google.com/signin/v2/identifier?ltmpl=music&service=youtube&uilel=3&passive=true&continue=https%3A%2F%2Fwww.youtube.com%2Fsignin%3Faction_handle_signin%3Dtrue%26app%3Ddesktop%26hl%3Dpt%26next%3Dhttps%253A%252F%252Fmusic.youtube.com%252F%26feature%3D__FEATURE__&hl=pt-BR&flowName=GlifWebSignIn&flowEntry=ServiceLogin';


async function main() {
  //The following arguments and options are meant to reduce even more the chance of detection by Google. It sometimes still detects and blocks the login, wich is fine, just try again until it works.
  const args = [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-infobars',
    '--disable-notifications',
    '--window-position=0,0',
    '--ignore-certifcate-errors',
    '--ignore-certifcate-errors-spki-list',
];
    const browser = await puppeteer.launch({
        args,
        headless: false, //I set this to false so I can watch what happens, set to true if you want it to run in the background
        ignoreDefaultArgs: ["--enable-automation"],
        slowMo: 10,
        defaultViewport: null,
        devtools: true,
        ignoreHTTPSErrors: true,
        executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
    });
//This block logs in to YTMusic
//I set long timeouts between some functions to ensure that all elements will be loaded when those functions run, you can play with those values or remove them completely, but it might crash the application
    const page = await browser.newPage();
    await page.goto(destination_url);
    await page.type('#identifierId', 'YOUT_YT_MUSC_ACC');
    await page.waitForTimeout(2000); // wait for 2 seconds
    await page.click('.VfPpkd-RLmnJb');
    await page.waitForTimeout(2000); // wait for 2 seconds
    await page.type('input[name="password"]', 'YOUR_YT_MUSIC_PASSWORD');
    await page.waitForTimeout(2000); // wait for 2 seconds
    await page.click('.VfPpkd-RLmnJb');
    await page.waitForNavigation();

//This is the loop that searches each song and likes them.
    for(let i = 0; i < songs.length; i++){
      await page.click('.search-container');
      await page.type('#input', songs[i]['Title'] + ' ' + songs[i]['Artist']);
      await page.keyboard.press('Enter');
      page.waitForNavigation({ waitUntil: 'networkidle0' });
      await page.waitForTimeout(4000); 
      page.click('ytmusic-responsive-list-item-renderer.ytmusic-shelf-renderer', {
        button: 'right',
      });
      await page.waitForTimeout(1000);
      await page.click('tp-yt-paper-listbox#items :nth-child(5)');
      await page.waitForTimeout(1000);
      await page.click('tp-yt-paper-icon-button#clear');
      await page.waitForTimeout(1000); 
    }
    await browser.close();
}
main();