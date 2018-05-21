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

  // Public Vars
  const email = [process.env.pacoEmail, process.env.garretEmail, process.env.sujenEmail]
  const pass = [process.env.pacoPass, process.env.garretPass, process.env.sujenPass]
  const folderName = 'autoRegressionTester'

  // Public functions
  const t = () => ((new Date()).toTimeString()).slice(0,8)
  const tn = () => (new Date()).getTime()
  const tn1 = tn()

  const click = async (elem, title) => {
    await page.waitForSelector(elem, true, false, timeout)
    await page.click(elem)
    console.log(`puppeteer: I clicked on the ${title} at ${t()}.\n`)
  }
  const type = async(elem, input, title) => {
    await page.waitForSelector(elem, true, false, timeout)
    await page.type(elem, input, title)
    console.log(`puppeteer: I typed the ${title} in the ${title} input at ${t()}.\n`)
  }
  const clickCheckbox = (elem, title) => {
    const checkbox = await page.$(elem)
    await checkbox.click()
    const checked = await page.evaluate(checkbox => checkbox.checked, checkbox)
    console.log(`${title} was ${!checked ? 'NOT' : ''} checked`)
  }


  // launch browser, open brower page
  

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

  // Click on login button
  await click('a[href="/users/login"]', 'Login Button')
  // Type email
  await type('input[type="email"]', email[0], 'email')
  // Type password
  await type('input[type="password"]', email[0], 'password')
  // Click on submit
  await click('button[type="submit"]', 'Submit Button')
  // Click on the navbar toggle
  await click('.navbar-toggle', 'Navbar Toggle')
  // Click on My PlateRate Link
  await click('a[href="/users/profile"]', 'My PlateRate link')
  // Click on Name and Email accordion
  await click('a:nth-child(1)', 'Name and Email accordion')
  // Upload picture
  const uploadInput = page.$('#fileInput')
  await uploadInput.uploadFile('selfie.jpeg')
  // Type First Name
  await type('input#firstName', 'Bob', 'First Name')
  // Type Last Name
  await type('input#lastName', 'Johnson', 'Last Name')
  // Type Email
  await type('input#email', 'BobJohnson@gmail.com', 'Email')
  // Click on Personal Information
  await click('a:nth-child(2)', 'Personal Information accordion')
  // Type Street
  await type('input#street', '500 West 42nd Street', 'Street')
  // Type City
  await type('input#city', 'New York', 'City')
  // Type Zip code
  await type('input#postalCode', '10036', 'Zip Code')
  // Type Country
  await type('input#country', 'USA', 'Country')
  // Type Phone
  await type('input#phone', '555-5555', 'Phone')
  // Type Birthday
  await type('input#birthday', '05/05/2000', 'Birthday')
  // Type Gender
  await page.waitForSelector('select#gender', true, false, timeout)
  await page.click('select#gender', 'Other')
  console.log(`puppeteer: I selected 'Other' as my gender at ${t()}.\n`)
  // Check Contact Preferences: By Email
  clickCheckbox('input#byEmail', 'By Email')
  // Check Contact Preferences: By Sms
  clickCheckbox('input#bySms', 'By Text Message')
  // Check Contact Preferences: By Sms
  clickCheckbox('input#never', 'Please don\'t contact me')

  // Click on Dietary Preferences
  await click('a:nth-child(3)', 'Dietary Preferences accordion')
  // Check Dietary Preferences
  for (let i = 0; i<47; i++) {
    const selector = `input:nth-child(${i}).diet-options`
    console.log(`Clicking ${selector}`)
    const checkbox = await page.$(selector)
    await checkbox.click()
    const checked = await page.evaluate(checkbox => checkbox.checked, checkbox)
    console.log(`${selector} is checked`, checked)
  }

  // Click on Sensory Experience
  await click('a:nth-child(4)', 'Sensory Experience accordion')
  // Set Sweet Slider
  await type('input#sweet', '0, 10', 'sweet slider')
  // Set Salty Slider
  await type('input#salty', '10, 20', 'salty slider')
  // Set Umami Slider
  await type('input#savory', '20, 30', 'umami slider')
  // Set Bitter Slider
  await type('input#bitter', '30, 40', 'Bitter slider')
  // Set sour Slider
  await type('input#sour', '40, 50', 'sour slider')
  // Set spicy Slider
  await type('input#spicy', '50, 60', 'spicy slider')
  // Set healthy Slider
  await type('input#healthy', '60, 70', 'healthy slider')
  // Set presentation Slider
  await type('input#presentation', '70, 80', 'presentation slider')
  // Set Portion Size Slider
  await type('input#quantity', '80, 90', 'Portion Size slider')
  // Set Value for Price Slider
  await type('input#value_for_price', '90, 100', 'Value for Price slider')
  
  
  // Click on Restaurant Preferences
  await click('a:nth-child(5)', 'Restaurant Preferences accordion') 
  // Set Noise level Slider
  await type('input#noise_level', '0, 10', 'Noise level slider')
  // Set Service Slider
  await type('input#service_rating', '10, 20', 'Service slider')
  // Set Ambiance Slider
  await type('input#classy_ambience', '20, 30', 'Ambiance slider')
  // Set Cleanliness Slider
  await type('input#cleanliness', '30, 40', 'Cleanliness slider')

  //
  // Click on Past Ratings
  await click('a:nth-child(6)', 'Past Ratings accordion') 
  
  //
  // Click on Account Settings
  await click('a:nth-child(7)', 'Account Settings accordion') 
  //
  // Click on Home/Search Link
  await click('a[href="/"]', 'Navbar Toggle')

  // Click on Share Link
  await click('a[href="/socialshare"]', 'Social Share link')
  
  ///
  // Click on Feedback link
  await click('#feedback', 'Feedback link')
  
  ///
  // Click on Home/Search Link
  await click('a[href="/"]', 'Home/Search link')
  
  //default food tab for finding a food
  await type('.item-input', 'Pizza', '\'Pizza\'')
  // Type zipcode
  await type('#locationinput', '19406', 'zip code \'19406\'')
  // Click on Search food & drink
  await click('button[id="searchbutton"]', 'Search Button')
 
  ///
  // Click on Home/Search Link
  await click('a[href="/"]', 'Navbar Toggle')
  
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