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
require('dotenv').config()

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

//   const links = await page.evaluate(resultsSelector => {
//     const anchors = Array.from(document.querySelectorAll(resultsSelector));
//     return anchors.map(anchor => {
//       const title = anchor.textContent.split('|')[0].trim();
//     });
//   }, resultsSelector);
//   console.log(links.join('\n'));

//   await browser.close();
// })();

(async() => {

  const email = [process.env.pacoEmail, process.env.garretEmail, process.env.sujenEmail]
  const pass = [process.env.pacoPass, process.env.garretPass, process.env.sujenPass]

  const folderName = 'autoRegressionTester'

  // launch browser, open brower page
  const t = () => ((new Date()).toTimeString()).slice(0,8)
  const tn = () => (new Date()).getTime()
  const t1 = t()
  const tn1 = tn()
  console.log(`puppeteer: Hi, I'm the puppeteer.  I will now test your website.  The time is ${t1}\n`)
  const browser = await puppeteer.launch()
  const t2 = t()
  console.log(`puppeteer: I launched the Chromium browser at ${t2}.\n`)
  const page = await browser.newPage()
  const t3 = t()
  console.log(`puppeteer: I opened a Chromium browser tab at ${t3}.\n`)
  const urls = ['https://staging.platerate.guru/', 'http://localhost:3003/']

  // Navigate to URL
  const timeout = 1000 * 60 * 5
  await page.goto(urls[0], timeout)
  const t4 = t()
  console.log(`puppeteer: I navigated to ${urls[0]} at ${t4}.\n`)

  // Click on login button
  const loginButton = 'a[href="/users/login"]'
  await page.waitForSelector(loginButton, true, false, timeout)
  await page.click(loginButton)
  const t5 = t()
  console.log(`puppeteer: I clicked on the login button at ${t5}.\n`)

  // Type email
  const emailInputSelector = 'input[type="email"]'
  await page.waitForSelector(emailInputSelector, true, false, timeout)
  await page.type(emailInputSelector, email[0])//put your email
  const t6 = t()
  console.log(`puppeteer: I typed the email in the email input at ${t6}.\n`)

  // Type password
  const passInputSelector = 'input[type="password"]'
  await page.waitForSelector(passInputSelector, true, false, timeout)
  await page.type(passInputSelector, pass[0])
  const t7 = t()
  console.log(`puppeteer: I typed the password in the password input at ${t7}.\n`)

  // Click on submit
  const submitButton = 'button[type="submit"]'
  await page.waitForSelector(submitButton, true, false, timeout)
  await page.click(submitButton)
  const t8 = t()
  console.log(`puppeteer: I clicked on the submit button at ${t8}.\n`)
  
  //default food tab for finding a food
  const foodInput = '.item-input'
  await page.waitForSelector(foodInput,true,false,timeout)
  await page.type(foodInput, 'Pizza')
  const t9 = t()
  console.log(`puppeteer: I typed 'Pizza' in to the input at ${t9}.\n`)
  
  // Type zipcode
  const locationInput = '#locationinput'
  await page.waitForSelector(locationInput, true, false, timeout)
  await page.type(locationInput, `19406`)
  const t10 = t()
  console.log(`puppeteer: I typed the zip code 19406 into the location input at ${t10 }.\n`)
  
  // Click on Search food & drink
  const searchbutton = 'button[id="searchbutton"]'
  await page.waitForSelector(searchbutton, true, false, timeout)
  await page.click(searchbutton)
  const t11 = t()
  const tn11 = tn()
  console.log(`puppeteer: I clicked on the search button at ${t11}.\n`)
  

 /* //Click on Restaurant Tab
  const restaurantTab = '#toRestaurant'
  await page.waitForSelector(restaurantTab, true, false, timeout)
  await page.click(restaurantTab)
  const t12 = t()
  console.log(`puppeteer: I clicked on the restaurant tab at ${t12}.\n`)

   //Type name of restaurant
  const restaurantInput = '.restaurant-input'
  await page.waitForSelector(restaurantInput, true, false, timeout)
  await page.type(restaurantInput, `Hetman's`)
  const t13 = t()
  console.log(`puppeteer: I typed 'Hetman's' into the input at ${t13}.\n`)

  // Type zipcode
  const locationInput = '#locationinput'
  await page.waitForSelector(locationInput, true, false, timeout)
  await page.type(locationInput, `11385`)
  const t14 = t()
  console.log(`puppeteer: I typed the zip code 11835 into the location input at ${t14}.\n`)

  // Click on Search
  const searchbutton = '#searchbutton'
  await page.waitForSelector(searchbutton, true, false, timeout)
  await page.click(searchbutton)
  const t15 = t()
  console.log(`puppeteer: I clicked on the search button at ${t15}.\n`)
 

  // Click on 'View This restaurant'
  const viewVenueBtn = '.view-venue-btn'
  await page.waitForSelector(viewVenueBtn, true, false, timeout)
  await page.click(viewVenueBtn)
  console.log(`puppeteer: I clicked on the 'VIEW THIS RESTAURANT' button at ${t12}.\n`)
  */
   

  // Upload Restaurant picture
  /*const submitAphotoButton = await page.$('input[type=file]')
  await submitAphotoButton.uploadFile('./pic.jpg')
  const t13 = t()
  const tn13 = tn()
  console.log(`puppeteer: I uploaded a restaurant picture at ${t13}.\n`)*/


  const fileName = 'platerate.png'
  await page.screenshot({path: fileName, fullPage: true})

  console.log(`puppeteer: I took a screenshot: to view it, look for the file named ${fileName} in my root folder (${folderName}).\n`)

  console.log(`puppeteer: I will now close the browser.  From launch to close, ${tn11-tn1} milliseconds, or ${(tn11-tn1)/1000} seconds or ${(tn11-tn1)/(1000 * 60)} minutes have elapsed \n`)

  process.on("unhandledRejection", (reason, p) => {
    console.error("Unhandled Rejection at: Promise", p, "reason:", reason);
    browser.close()
  })

  await browser.close()
})()