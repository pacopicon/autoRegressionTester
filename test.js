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
require('dotenv').config();

(async() => {

  const email = [process.env.pacoEmail, process.env.garretEmail, process.env.sujenEmail]
  const pass = [process.env.pacoPass, process.env.garretPass, process.env.sujenPass]

  const folderName = 'autoRegressionTester'

  // launch browser, open brower page
  const t = () => ((new Date()).toTimeString()).slice(0,8)
  const tn = () => (new Date()).getTime()
  const tn1 = tn()
  console.log(`puppeteer: Hi, I'm the puppeteer.  I will now test your website.  The time is ${t()}\n`)
  const browser = await puppeteer.launch()
  console.log(`puppeteer: I launched the Chromium browser at ${t()}.\n`)
  const page = await browser.newPage()
  console.log(`puppeteer: I opened a Chromium browser tab at ${t()}.\n`)
  const urls = ['https://staging.platerate.guru/', 'http://localhost:3003/']

  // Navigate to URL
  const timeout = 1000 * 60 * 5
  await page.goto(urls[0], timeout)
  console.log(`puppeteer: I navigated to ${urls[0]} at ${t()}.\n`)

  const click = async (elem, title) => {
    await page.waitForSelector(elem, true, false, timeout)
    await page.click(elem)
    console.log(`puppeteer: I clicked on the ${title} at ${t()}.\n`)
  }

  // Click on login button
  const loginButton = 'a[href="/users/login"]'
  await page.waitForSelector(loginButton, true, false, timeout)
  await page.click(loginButton)
  console.log(`puppeteer: I clicked on the login button at ${t()}.\n`)

  // Type email
  const emailInputSelector = 'input[type="email"]'
  await page.waitForSelector(emailInputSelector, true, false, timeout)
  await page.type(emailInputSelector, email[0])//put your email
  console.log(`puppeteer: I typed the email in the email input at ${t()}.\n`)

  // Type password
  const passInputSelector = 'input[type="password"]'
  await page.waitForSelector(passInputSelector, true, false, timeout)
  await page.type(passInputSelector, pass[0])
  console.log(`puppeteer: I typed the password in the password input at ${t()}.\n`)

  // Click on submit
  const submitButton = 'button[type="submit"]'
  await page.waitForSelector(submitButton, true, false, timeout)
  await page.click(submitButton)
  console.log(`puppeteer: I clicked on the submit button at ${t()}.\n`)

  // Click on the navbar toggle
  const navbarToggle = '.navbar-toggle'
  await page.waitForSelector(navbarToggle, true, false, timeout)
  await page.click(navbarToggle)
  console.log(`puppeteer: I clicked on the navbar toggle at ${t()}.\n`)

  // Click on My PlateRate Link
  const myPlateRateLink = 'a[href="/users/profile"]'
  await page.waitForSelector(myPlateRateLink, true, false, timeout)
  await page.click(myPlateRateLink)
  console.log(`puppeteer: I clicked on the My PlateRate link at ${t()}.\n`)

  // Click on Name and Email accordion
  const nameAndEmail = 'a:nth-child(1)'
  await page.waitForSelector(nameAndEmail, true, false, timeout)
  await page.click(nameAndEmail)
  console.log(`puppeteer: I clicked on the name and email accordion at ${t()}.\n`)

  //
  // Click on Personal Information 
  const personalInfo = 'a:nth-child(2)'
  await page.waitForSelector(personalInfo, true, false, timeout)
  await page.click(personalInfo)
  console.log(`puppeteer: I clicked on the personal information accordion at ${t()}.\n`)

  //
  // Click on Dietary Preferences 
  const dietPref = 'a:nth-child(3)'
  await page.waitForSelector(dietPref, true, false, timeout)
  await page.click(dietPref)
  console.log(`puppeteer: I clicked on the dietary preferences accordion at ${t()}.\n`)

  //
  // Click on Sensory Experience 
  const sensoryExp = 'a:nth-child(4)'
  await page.waitForSelector(sensoryExp, true, false, timeout)
  await page.click(sensoryExp)
  console.log(`puppeteer: I clicked on the Sensory Experience accordion at ${t()}.\n`)

  //
  // Click on Restaurant Preferences 
  const restPref = 'a:nth-child(5)'
  await page.waitForSelector(restPref, true, false, timeout)
  await page.click(restPref)
  console.log(`puppeteer: I clicked on the Restaurant Preferences accordion at ${t()}.\n`)

  //
  // Click on Past Ratings 
  const pastRatings = 'a:nth-child(6)'
  await page.waitForSelector(pastRatings, true, false, timeout)
  await page.click(pastRatings)
  console.log(`puppeteer: I clicked on the Past Ratings accordion at ${t()}.\n`)

  //
  // Click on Account Settings 
  const acctSettings = 'a:nth-child(7)'
  await page.waitForSelector(acctSettings, true, false, timeout)
  await page.click(acctSettings)
  console.log(`puppeteer: I clicked on the Account Settings accordion at ${t()}.\n`)

  //
  // Click on Home/Search Link
  const homeSearchLink = 'a[href="/"]'
  await page.waitForSelector(homeSearchLink, true, false, timeout)
  await page.click(homeSearchLink)
  console.log(`puppeteer: I clicked on the navbar toggle at ${t()}.\n`)

  // Click on Share Link
  const socialShareLink = 'a[href="/socialshare"]'
  await page.waitForSelector(socialShareLink, true, false, timeout)
  await page.click(socialShareLink)
  console.log(`puppeteer: I clicked on the social share link at ${t()}.\n`)

  ///
  // Click on Feedback link
  const feedbackLink = '#feedback'
  await page.waitForSelector(feedbackLink, true, false, timeout)
  await page.click(feedbackLink)
  console.log(`puppeteer: I clicked on the feedback link at ${t()}.\n`)

  ///
  // Click on Home/Search Link
  const homeSearchLink = 'a[href="/"]'
  await page.waitForSelector(homeSearchLink, true, false, timeout)
  await page.click(homeSearchLink)
  console.log(`puppeteer: I clicked on the navbar toggle at ${t()}.\n`)

  //default food tab for finding a food
  const foodInput = '.item-input'
  await page.waitForSelector(foodInput,true,false,timeout)
  await page.type(foodInput, 'Pizza')
  console.log(`puppeteer: I typed 'Pizza' in to the input at ${t()}.\n`)
  
  // Type zipcode
  const locationInput = '#locationinput'
  await page.waitForSelector(locationInput, true, false, timeout)
  await page.type(locationInput, `19406`)
  console.log(`puppeteer: I typed the zip code 19406 into the location input at ${t() }.\n`)
  
  // Click on Search food & drink
  const searchbutton = 'button[id="searchbutton"]'
  await page.waitForSelector(searchbutton, true, false, timeout)
  await page.click(searchbutton)
  const tn11 = tn()
  console.log(`puppeteer: I clicked on the search button at ${t()}.\n`)

  ///
  // Click on Home/Search Link
  const homeSearchLink = 'a[href="/"]'
  await page.waitForSelector(homeSearchLink, true, false, timeout)
  await page.click(homeSearchLink)
  console.log(`puppeteer: I clicked on the navbar toggle at ${t()}.\n`)
  

 /* //Click on Restaurant Tab
  const restaurantTab = '#toRestaurant'
  await page.waitForSelector(restaurantTab, true, false, timeout)
  await page.click(restaurantTab)
  console.log(`puppeteer: I clicked on the restaurant tab at ${t()}.\n`)

   //Type name of restaurant
  const restaurantInput = '.restaurant-input'
  await page.waitForSelector(restaurantInput, true, false, timeout)
  await page.type(restaurantInput, `Hetman's`)
  console.log(`puppeteer: I typed 'Hetman's' into the input at ${t()}.\n`)

  // Type zipcode
  const locationInput = '#locationinput'
  await page.waitForSelector(locationInput, true, false, timeout)
  await page.type(locationInput, `11385`)
  console.log(`puppeteer: I typed the zip code 11835 into the location input at ${t()}.\n`)

  // Click on Search
  const searchbutton = '#searchbutton'
  await page.waitForSelector(searchbutton, true, false, timeout)
  await page.click(searchbutton)
  console.log(`puppeteer: I clicked on the search button at ${t()}.\n`)
 

  // Click on 'View This restaurant'
  const viewVenueBtn = '.view-venue-btn'
  await page.waitForSelector(viewVenueBtn, true, false, timeout)
  await page.click(viewVenueBtn)
  console.log(`puppeteer: I clicked on the 'VIEW THIS RESTAURANT' button at ${t()}.\n`)
  */
   

  // Upload Restaurant picture
  /*const submitAphotoButton = await page.$('input[type=file]')
  await submitAphotoButton.uploadFile('./pic.jpg')
  const tn13 = tn()
  console.log(`puppeteer: I uploaded a restaurant picture at ${t()}.\n`)*/

  // Click on logout link
  const logoutLink = '#logout'
  await page.waitForSelector(logoutLink, true, false, timeout)
  await page.click(logoutLink)
  console.log(`puppeteer: I clicked on the logout link at ${t()}.\n`)


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