/**
 * Copyright 2017 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Search developers.google.com/web for articles tagged
 * "Headless Chrome" and scrape results from the results page.
 */

'use strict';

const puppeteer = require('puppeteer');

// (async() => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();

//   await page.goto('https://developers.google.com/web/');

//   // Type into search box.
//   await page.type('#searchbox input', 'Headless Chrome');

//   // Wait for suggest overlay to appear and click "show all results".
//   const allResultsSelector = '.devsite-suggest-all-results';
//   await page.waitForSelector(allResultsSelector);
//   await page.click(allResultsSelector);

//   // Wait for the results page to load and display the results.
//   const resultsSelector = '.gsc-results .gsc-thumbnail-inside a.gs-title';
//   await page.waitForSelector(resultsSelector);

//   // Extract the results from the page.
//   const links = await page.evaluate(resultsSelector => {
//     const anchors = Array.from(document.querySelectorAll(resultsSelector));
//     return anchors.map(anchor => {
//       const title = anchor.textContent.split('|')[0].trim();
//       return `${title} - ${anchor.href}`;
//     });
//   }, resultsSelector);
//   console.log(links.join('\n'));

//   await browser.close();
// })();

(async() => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  const urls = ['https://platerate.guru/', 'http://localhost:3003/']

  const timeout = 1000 * 60 * 30


  await page.goto(urls[0], timeout)
  const loginButton = 'a[href="/users/login"]'
  await page.waitForSelector(loginButton, timeout)
  await page.click(loginButton)

  const emailInputSelector = 'input[type="email"]'
  await page.waitForSelector(emailInputSelector, timeout)
  await page.type(emailInputSelector, 'palmtreerooskee@gmail.com')

  const passInputSelector = 'input[type="password"]'
  await page.waitForSelector(passInputSelector, timeout)
  await page.type(passInputSelector, 'Pirho1')

  const submitButton = 'button[type="submit"]'
  await page.waitForSelector(submitButton, timeout)
  await page.click(submitButton)

  const restaurantTab = '#toRestaurant'
  await page.waitForSelector(restaurantTab, timeout)
  await page.click(restaurantTab)

  // There is a bug in the search functionality where if a user is logged in and searches for restaurants, an error alert pops up.  The user (this only happens to logged in users) must wait for the auto-search to return a list of nearby restaurants before being able to manually input another search.  So puppeteer here waits for the '.results-wrapper', see below, before proceeding with the search 

  const results = '.results-wrapper'

  process.on("unhandledRejection", (reason, p) => {
    console.error("Unhandled Rejection at: Promise", p, "reason:", reason);
    browser.close();
  });

  await page.waitForSelector(results, true, false, timeout)

  // await page.type('#search', 'Hetman')

  // const submitButton2 = 'button[type="submit"]'
  // await page.waitForSelector(submitButton2)
  // await page.click(submitButton2)

  await page.screenshot({path: 'platerate.png', fullPage: true});


  // console.log("loginButton = ", loginButton.innerHTML)

  // await page.click(loginButton)

  // const emailInputSelector = '.group-email.col-sm-8.form-control .login-input'
  // await page.waitForSelector(emailInputSelector)
  // await page.type(emailInputSelector, 'palmtreerooskee@gmail.com')

  // const passInputSelector = '.group-password.col-sm-8.form-control .login-input'
  // await page.waitForSelector(passInputSelector)
  // await page.type(passInputSelector, 'Pirho1')

  // const loginSubmitButton = '.login .btn .btn-login .green .loginBtn'
  // await page.waitForSelector(loginSubmitButton)
  // await page.click(loginSubmitButton)

  // const userName = '.loggedin-text.green'
  // await page.waitForSelector(userName)

  // console.log("user name = ", userName.textContent)

  await browser.close()
})();