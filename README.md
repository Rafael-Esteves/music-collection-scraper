# music-collection-scraper
A javascript program to quickly transfer your music collection from any platform to Youtube Music.

It's possible to adapt this to be used with other music platforms with changes to the specifics of wach website.

I've used a Google Chrome plug-in called <a href="https://simplescraper.io/">Simple Scraper</a> to retrieve my music collection from Deezer because I found this to be the easiest for me. Alternatively, it's possible to do it programatically using puppeteer.

This program uses pupeteer to control a headless version of chrome (chromium), to install it just run
npm i puppeteer
or go to https://pptr.dev/ for official documentation.

It also uses some plug-ins to make it stealthy

npm install puppeteer-extra
npm install puppeteer-extra-plugin-stealth

