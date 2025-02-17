'use server'
import puppeteer from 'puppeteer-extra';
const stealthplugin = require('puppeteer-extra-plugin-stealth');
import { executablePath } from 'puppeteer';
import { JSDOM } from 'jsdom';
import { CookieJar } from 'tough-cookie';
const keyword_extractor = require("keyword-extractor");


export const extractHtml = async (url) => {
    try {
        puppeteer.use(stealthplugin);
        const browser = await puppeteer.launch({ headless: "true", executablePath: executablePath() });
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'domcontentloaded' });
        
        const html = await page.content();
        await browser.close();
        return html;

    } catch (error) {
        return {error: 'resolver not responding'};
    }
}

export const translateHtml = async (url) => {
    const html = await domExtract(url);
    const cookieJar = new CookieJar();
    const dom = new JSDOM(html, { cookieJar });
    const document = dom.window.document;
    const googleAnalyticScript = document.querySelectorAll('script[src="//www.google-analytics.com/analytics.js"]');
    googleAnalyticScript.forEach(e => e.remove());
    const head = document.getElementsByTagName('head')[0];
    const headHtml = head.innerHTML;
    const body = document.getElementsByTagName('body')[0];
    const bodyHtml = body.innerHTML;
    const newUrl = new URL(url);
    const actualHtml = `<!DOCTYPE html><head><meta name="viewport" content="width=300, initial-scale=0.8, maximum-scale=1.0, minimum-scale=0.8"><base href="https://` + newUrl.hostname + `/"></base>` + headHtml + `</head><body>` + bodyHtml + `</body><html></html>`

    return actualHtml;
}

export const domExtract = async (url) => {
    const res = await fetch(url);
    const html = await res.text();
    return html;
}

export const extractResults = async (html) => {
    const results = [];
    const dom = new JSDOM(html);
    const document = dom.window.document;
    const titles = document.querySelectorAll('.N54PNb');
    const unRe = document.querySelectorAll('span.LEwnzc');
    unRe.forEach(e => e.remove());

    titles.forEach(function (node) {
        const title = node.querySelector('.LC20lb')?.innerHTML;
        const favUrl = node.querySelector('.Vwoesf img')?.src;
        const cite = node.querySelector('.GvPZzd')?.innerHTML;
        const siteName = node.querySelector('.VuuXrf')?.innerHTML;
        const targetUrl = node.querySelector('.yuRUbf div span a').href;
        const desc = node.querySelector('.r025kc span')?.innerHTML;
        // for title 
        const titlestr = title.toString();
        const striptitle = titlestr.replace(/(<([^>]+)>)/ig, '');
        const finaltitle = striptitle.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()|–.]/g, "").replace(/\&nbsp;/g, '');
        // for description
        const str = desc?.toString();
        const stripdesc = str?.replace(/(<([^>]+)>)/ig, '');
        const finaldesc = stripdesc?.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()|–.]/g, "").replace(/\&nbsp;/g, '');
        // for siteName
        const siteStr = siteName?.toString();
        const finalSiteName = siteStr?.replace(/(<([^>]+)>)/ig, '').replace(/\&nbsp;/g, '').replace(/[.,\/#!$%\^&\*;:{}=\-_`~()|–.]/g, "");;
        // extract terms
        const desc_terms = keyword_extractor.extract(finaldesc, {
            language: "english",
            remove_digits: true,
            return_changed_case: true,
            remove_duplicates: false
        });

        const title_terms = keyword_extractor.extract(finaltitle, {
            language: "english",
            remove_digits: true,
            return_changed_case: true,
            remove_duplicates: false
        });

        const name_terms = keyword_extractor.extract(finalSiteName, {
            language: "english",
            remove_digits: true,
            return_changed_case: true,
            remove_duplicates: false
        });

        const terms = [...desc_terms,...title_terms,...name_terms];

        const item = {
            title: title,
            favUrl: favUrl,
            cite: cite,
            siteName: siteName,
            targetUrl: targetUrl,
            desc: desc,
            keywords: terms,
        }

        results.push(item);
    })

    return results;

}