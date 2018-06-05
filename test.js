
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
  const email = ['plateratetester@gmail.com', '	plateratetesteralt@gmail.com'] // passwords for these accounts = ['This is not a password', 'This is a password']
  const pass = ['Bloop!', 'Wham!']
  const folderName = 'autoRegressionTester'
  const street = ['1 5th Avenue', '1 Broadway']
  const city = ['New York', 'New York']
  const zip = ['10012', '10004']
  const country = ['USA', 'USA']
  const phone = ['555-5555', '444-4444']
  const birthDay = ['01/01/1970', '03/12/2015']

  // Public functions
  const t = () => ((new Date()).toTimeString()).slice(0,8)
  const tn = () => (new Date()).getTime()
  const tn1 = tn()
_
  const click = async (elem, title) => {
      await page.waitForSelector(elem, true, false, timeout)
      await page.click(elem)
      return `${title} was clicked at ${t()}.\n`
  }

  const type = async(elem, input, title) => {
    await page.waitForSelector(elem, true, false, timeout)
    await page.type(elem, input, title)
    return `${title} was typed in the ${title} input at ${t()}.\n`
  }

  const clickCheckbox = (elem, title) => {
    const checkbox = await page.$(elem)
    await checkbox.click()
    const checked = await page.evaluate(checkbox => checkbox.checked, checkbox)
    return `${title} was rendered ${!checked ? 'UN-' : ''}checked`
  }

  const upload = (elem, title, pic) => {
    const uploadInput = page.$(elem)
    await uploadInput.uploadFile(pic)
    return `${pic} was uploaded to ${title}`
  }

  const takeApic = (title, isFullPage) => {
    const fn = `${title}.png`
    await page.screenshot( {path: fn, fullPage: isFullPage} )
    console.log(`A picture of ${title} was taken`)
  }

  const findElement = async (elem, title, action, input) => {
    let package = { elem }, callback, msg
    if (typeof elem !== 'undefined') {
      await page.waitForSelector(elem, true, false, timeout)

      if (action === 'typed') {
        msg = type(elem, input, title)
      } else if (action === 'clicked') {
        msg = click(elem, title)
      } else if (action === 'checked') {
        msg = clickCheckbox(elem, title)
      } else if (action === 'uploaded') {
        msg = upload(elem, title, input)
      }
      console.log(msg)
      package.success = true
      package.msg = msg
      return package
    } else {
      let msg = `puppeteer: Could not find: ${elem} -- the DOM element for the ${title}`
      console.log(msg)
      takeApic(title, true)
      package.success = false
      package.msg = msg
      return package
    }
  }

  const clickErrorPopup = () => {
    await findElement('button.confirm', 'Error Pop-up confirm button', 'clicked')
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
  await findElement('input[type="email"]', 'email', 'typed', email[0],)
  // Type password
  await findElement('input[type="password"]', 'password', 'typed', pass[0],)
  // Click on submit
  await findElement('button[type="submit"]', 'Submit Button', 'clicked')
  // Click on the navbar toggle
  await findElement('.navbar-toggle', 'Navbar Toggle', 'clicked')
  // Click on My PlateRate Link
  await findElement('a[href="/users/profile"]', 'My PlateRate link', 'clicked')

  // In case of Error pop-up, Click on Cancel button
  await clickErrorPopup()

  // Click on Name and Email accordion
  await findElement('a:nth-child(1)', 'Name and Email accordion', 'clicked')
  // Upload picture
  await findElement('#fileInput', 'avatar upload', 'uploaded', 'selfie.jpeg')
  // Type First Name
  await findElement('input#firstName', 'First Name', 'typed', 'Deep')
  // Type Last Name
  await findElement('input#lastName', 'Last Name', 'typed', 'Mind',)
  // Type Email
  await findElement('input#email', 'Email', 'typed', email[1])
  // Click on Personal Information
  await findElement('a:nth-child(2)', 'Personal Information accordion', 'clicked')
  // Type Street
  await findElement('input#street', 'Street', 'typed', street[0])
  // Type City
  await findElement('input#city', 'City', 'typed', city[0])
  // Type Zip code
  await findElement('input#postalCode', 'Zip Code', 'typed', zip[0])
  // Type Country
  await findElement('input#country', 'Country', 'typed', country[0])
  // Type Phone
  await findElement('input#phone', 'Phone', 'typed', phone[0])
  // Type Birthday
  await findElement('input#birthday', 'Birthday', 'typed', birthDay[0])
  // Type Gender
  await page.waitForSelector('select#gender', true, false, timeout)
  await page.click('select#gender', 'Other')
  console.log(`puppeteer: I selected 'Other' as my gender at ${t()}.\n`)
  // Check Contact Preferences: By Email
  await findElement('input#byEmail', 'By Email', 'checked')
  // Check Contact Preferences: By Sms
  await findElement('input#bySms', 'By Text Message', 'checked')
  // Check Contact Preferences: By Sms
  await findElement('input#never', 'Please don\'t contact me', 'checked')

  // Click on Dietary Preferences
  await findElement('a:nth-child(3)', 'Dietary Preferences accordion', 'clicked')
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
  await findElement('input#sweet', 'sweet slider', 'typed', '0, 10')
  // Set Salty Slider
  await findElement('input#salty', 'salty slider', 'typed', '10, 20')
  // Set Umami Slider
  await findElement('input#savory', 'umami slider', 'typed', '20, 30')
  // Set Bitter Slider
  await findElement('input#bitter', 'Bitter slider', 'typed', '30, 40')
  // Set sour Slider
  await findElement('input#sour', 'sour slider', 'typed', '40, 50')
  // Set spicy Slider
  await findElement('input#spicy', 'spicy slider', 'typed', '50, 60')
  // Set healthy Slider
  await findElement('input#healthy', 'healthy slider', 'typed', '60, 70')
  // Set presentation Slider
  await findElement('input#presentation', 'presentation slider', 'typed', '70, 80')
  // Set Portion Size Slider
  await findElement('input#quantity', 'Portion Size slider', 'typed', '80, 90')
  // Set Value for Price Slider
  await findElement('input#value_for_price', 'Value for Price slider', 'typed', '90, 100')
  
  // Click on Restaurant Preferences
  await findElement('a:nth-child(5)', 'Restaurant Preferences accordion', 'clicked') 
  // Set Noise level Slider
  await findElement('input#noise_level', 'Noise level slider', 'typed', '0, 10')
  // Set Service Slider
  await findElement('input#service_rating', 'Service slider', 'typed', '10, 20')
  // Set Ambiance Slider
  await findElement('input#classy_ambience', 'Ambiance slider', 'typed', '20, 30')
  // Set Ambiance Slider
  await findElement('input#cleanliness', 'Ambiance slider', 'typed', '30, 40')


  // Click on Past Ratings
  await findElement('a:nth-child(6)', 'Past Ratings accordion', 'clicked')
  // Take picture of past ratings page
  await takeApic('past_ratings', true)


  // Click on Account Settings
  await findElement('a:nth-child(7)', 'Account Settings accordion', 'clicked')
  // Click on Password Change
  await findElement('a[href="/users/password/change"]', 'Password change button', 'clicked') 
  // Type current Password
  await findElement('input[placeholder="Current Password"]', 'Current Password input', 'typed', pass[0])
  // Type New Password
  await findElement('input[placeholder="New Password"]', 'New Password input', 'typed', pass[1])
  // Type Confirm New Password
  await findElement('input[placeholder="Confirm New Password"]', 'Confirm New Password input', 'typed', pass[1])

  // In case of Error pop-up, Click on Cancel button
  await clickErrorPopup()

  // Click on Account Settings a 2nd time
  await findElement('a:nth-child(7)', 'Account Settings accordion', 'clicked')
  // Click on Password Change a 2nd time
  await findElement('a[href="/users/password/change"]', 'Password change button', 'clicked') 
  // Type current Password a 2nd time
  await findElement('input[placeholder="Current Password"]', 'Current Password input', 'typed', pass[1])
  // Type New Password a 2nd time
  await findElement('input[placeholder="New Password"]', 'New Password input', 'typed', pass[0])
  // Type Confirm New Password a 2nd time
  await findElement('input[placeholder="Confirm New Password"]', 'Confirm New Password input', 'typed', pass[0])

  // In case of Error pop-up, Click on Cancel button
  await clickErrorPopup()


  // Click on the Add Referrer Accordion
  await findElement('a:nth-child(8)', 'Add Referrer Accordion', 'clicked')
  // Input referrer e-mail
  await findElement('input#referrer-email', 'Email', 'typed', email[1])
  // Click on Send Invite Button
  await findElement('button.send-referral', 'Send Invite Button', 'clicked')

  
  // Click on Home/Search Link
  await findElement('a[href="/"]', 'Navbar Toggle', 'clicked')

  // Click on Share Link
  await findElement('a[href="/socialshare"]', 'Social Share link', 'clicked')
  // Click on Twitter social share button
  await findElement('iframe.twitter-share-button', 'Twitter social Share button', 'clicked')
  await takeApic('twitterPopup', true)
  // Click on Facebook social share button
  await findElement('iframe[title="fb:share_button Facebook Social Plugin"]', 'Facebook social Share button', 'clicked')
  await takeApic('facebookPopup', true)
  // Click on LinkedIn social share button
  await findElement('span#li_ui_li_gen_1527968981535_0', 'LinkedIn social Share button', 'clicked')
  await takeApic('linkedInPopup', true)
  // Click on Google social share button
  await findElement('iframe[title="G+"]', 'Google social Share button', 'clicked')
  await takeApic('googlePopup', true)
  // Type Social Share E-mail
  await findElement('input#referrer-email', 'Email', 'typed', email[1])
  // Type Social Share E-mail text
  await findElement('textarea.form-control', 'textarea', 'typed', 'Hello, this is a test')
  // Click on Send Invite button
  await findElement('button#sent_invite', 'social share e-mail send button', 'clicked')
  
  
  // Click on Feedback link
  await findElement('#feedback', 'Feedback link', 'clicked')
  // Enter subject on subject line
  await findElement('input#feedback-subject', 'subject line', 'typed', 'testing')
  // Type Social Share E-mail text
  await findElement('textarea.form-control', 'textarea', 'typed', 'Hello, this is the Auto-regression tester.  I\'m testing the feedback e-mail functionality.')
  // Click on Send Feedback
  await findElement('textarea.form-control', 'textarea', 'typed', 'Hello, this is the Auto-regression tester.  I\'m testing the feedback e-mail functionality.')
  await findElement('button[type="submit"]', 'Feedback send button', 'clicked')
  

  // Click on Home/Search Link
  await findElement('a[href="/"]', 'Home/Search link', 'clicked')
  //default food tab for finding a food
  await findElement('.item-input', '\'Pizza\'', 'typed', 'Pizza')
  // Type zipcode
  await findElement('#locationinput', 'zip code \'11385\'', 'typed', '11385')
  // Click on Search food & drink
  await findElement('button[id="searchbutton"]', 'Search Button', 'clicked')
  // Take a picture of the results
  takeApic(title, true)
 
  // Click on Home/Search Link
  await findElement('#toRestaurant', 'Restaurant tab', 'clicked')
  
  //Click on Restaurant Tab
  await findElement('a[href="/"]', 'Navbar Toggle', 'clicked')
  //Type name of restaurant
  await findElement('.restaurant-input', 'Restaurant input', 'typed', 'Hetman\'s')
  // Type zipcode
  await findElement('#locationinput', 'zip code \'11385\'', 'typed', '11385')
  // Click on Search
  await findElement('button[id="searchbutton"]', 'Search Button', 'clicked')
  // Take a picture of the results
  takeApic(title, true)
  
  // Click on 'View This restaurant'
  await findElement('.view-venue-btn', 'view this restaurant button', 'clicked')
  // 
  await findElement('#fileInput', 'restaurant upload', 'uploaded', 'restaurant.jpg')
   

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