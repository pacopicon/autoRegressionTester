
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
_
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

  const findElement = async (elem, title, action, input) => {
    let package = { elem }
    if (typeof elem !== 'undefined') {
      await page.waitForSelector(elem, true, false, timeout)
      let callBack = action === 'typed' ? type(elem, input, title) : (action === 'clicked' ? click(elem, title) : clickclickCheckbox(elem, title))
      callBack()
      let msg = `puppeteer: I ${action} on the ${title}`
      package.success = true
      package.msg = msg
      return package
    } else {
      let msg = `puppeteer: Could not find the DOM element for the ${title}`
      console.log(msg)
      const fileName = `${title}.png`
      await page.screenshot({path: fileName, fullPage: true})
      package.success = false
      package.msg = msg
      return package
    }
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
  await findElement('a[href="/users/login"]', 'Login Button', 'clicked')
  // Type email
  await type('input[type="email"]', 'email', 'typed', email[0],)
  // Type password
  await type('input[type="password"]', 'password', 'typed', pass[0],)
  // Click on submit
  await findElement('button[type="submit"]', 'Submit Button', 'clicked')
  // Click on the navbar toggle
  await findElement('.navbar-toggle', 'Navbar Toggle', 'clicked')
  // Click on My PlateRate Link
  await findElement('a[href="/users/profile"]', 'My PlateRate link', 'clicked')
  // In case of Error pop-up, Click on Cancel button

    let optElemExists = 
  condClick('button.cancel')
  // Click on Name and Email accordion
  await findElement('a:nth-child(1)', 'Name and Email accordion', 'clicked')
  // Upload picture
  const uploadInput = page.$('#fileInput')
  await uploadInput.uploadFile('selfie.jpeg')
  // Type First Name
  await type('input#firstName', 'First Name', 'typed', 'Bob')
  // Type Last Name
  await type('input#lastName', 'Last Name', 'typed', 'Johnson',)
  // Type Email
  await type('input#email', 'Email', 'typed', 'BobJohnson@gmail.com')
  // Click on Personal Information
  await findElement('a:nth-child(2)', 'Personal Information, 'clicked' accordion')
  // Type Street
  await type('input#street', 'Street', 'typed', '500 West 42nd Street')
  // Type City
  await type('input#city', 'City', 'typed', 'New York')
  // Type Zip code
  await type('input#postalCode', 'Zip Code', 'typed', '10036')
  // Type Country
  await type('input#country', 'Country', 'typed', 'USA')
  // Type Phone
  await type('input#phone', 'Phone', 'typed', '555-5555')
  // Type Birthday
  await type('input#birthday', 'Birthday', 'typed', '05/05/2000')
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
  await findElement('a:nth-child(3)', 'Dietary Preferences, 'clicked' accordion')
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
  await findElement('a:nth-child(4)', 'Sensory Experience accordion', 'clicked')
  // Set Sweet Slider
  await type('input#sweet', 'sweet slider', 'typed', '0, 10')
  // Set Salty Slider
  await type('input#salty', 'salty slider', 'typed', '10, 20')
  // Set Umami Slider
  await type('input#savory', 'umami slider', 'typed', '20, 30')
  // Set Bitter Slider
  await type('input#bitter', 'Bitter slider', 'typed', '30, 40')
  // Set sour Slider
  await type('input#sour', 'sour slider', 'typed', '40, 50')
  // Set spicy Slider
  await type('input#spicy', 'spicy slider', 'typed', '50, 60')
  // Set healthy Slider
  await type('input#healthy', 'healthy slider', 'typed', '60, 70')
  // Set presentation Slider
  await type('input#presentation', 'presentation slider', 'typed', '70, 80')
  // Set Portion Size Slider
  await type('input#quantity', 'Portion Size slider', 'typed', '80, 90')
  // Set Value for Price Slider
  await type('input#value_for_price', 'Value for Price slider', 'typed', '90, 100')
  
  
  // Click on Restaurant Preferences
  await findElement('a:nth-child(5)', 'Restaurant Preferences, 'clicked' accordion') 
  // Set Noise level Slider
  await type('input#noise_level', 'Noise level slider', 'typed', '0, 10')
  // Set Service Slider
  await type('input#service_rating', 'Service slider', 'typed', '10, 20')
  // Set Ambiance Slider
  await type('input#classy_ambience', 'Ambiance slider', 'typed', '20, 30')
  // Set Ambiance Slider
  await type('input#cleanliness', 'Ambiance slider', 'typed', '30, 40')

  //
  // Click on Past Ratings
  await findElement('a:nth-child(6)', 'Past Ratings accordion'), 'clicked' 
  
  //
  // Click on Account Settings
  await findElement('a:nth-child(7)', 'Account Settings accordion'), 'clicked' 
  //
  // Click on Home/Search Link
  await findElement('a[href="/"]', 'Navbar Toggle', 'clicked')

  // Click on Share Link
  await findElement('a[href="/socialshare"]', 'Social Share link', 'clicked')
  
  ///
  // Click on Feedback link
  await findElement('#feedback', 'Feedback link', 'clicked')
  
  ///
  // Click on Home/Search Link
  await findElement('a[href="/"]', 'Home/Search link', 'clicked')
  
  //default food tab for finding a food
  await type('.item-input', 'Pizza', '\'Pizza\'', 'typed',)
  // Type zipcode
  await type('#locationinput', '19406', 'zip code \'19406\'', 'typed',)
  // Click on Search food & drink
  await findElement('button[id="searchbutton"]', 'Search Button', 'clicked')
 
  ///
  // Click on Home/Search Link
  await findElement('a[href="/"]', 'Navbar Toggle', 'clicked')
  
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