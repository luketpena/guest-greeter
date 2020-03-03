# Guest Greeter
This simple application lets you send messages to a prepared list of guests from a prepared list of vendors.

## Set up
Download the .zip file and run 'npm install' from the console to load the dependencies.

## Getting started
Run 'npm start' in the console in the project folder to spin up the client.

## Use
Select a company and a guest and write a message in the text area to send to them.

To use a template message, select one from the template dropdown menu.
 * 'Confirm reservation' displays basic info
 * 'Room ready' has a greeting based on the time of day and basic information
 * 'Confirm times' demonstrates the date formatting from the data provided

After creating a message, click 'Send Greeting' to add it to the message board.

Upon submission, an instance of a message object is created with the parameters of the message to be posted. This list is looped through to render new messages to the DOM.

## Handling Edge-cases
The edge cases I could see would be if incomplete information was available about a company, guest, or reservation. Since preset messages require those, and since those presets were stored in a .json file, I chose to present the user with the fact that information was missing to be manually resolved. Because selecting information about a reservation auto-populated a text area before being sent, it gives the user time to check that information is indeed missing or to modify the message manually in the case that the information simply doesn't exist.

I focused instead on preventing the application from crashing in the case of missing information.

The guests 'No last name' and 'No reservation' are test data to see how it works with some edge cases.

There is also a company in the Companies.JSON file that is missing a company name, and this is simply not rendered.

## Future Development
There are some things I would like to handle better and research further with more time. I used the syntax if templates with the {{firstName}} entries, but didn't use them properly. I would want to either find a cleaner solution elsewhere or find a way to use that syntax properly instead of just finding and replacing. (Works fine, just not what I want to do.)

In many cases, I am checking if information exists and, if it doesn't, rendering some sort of placeholder. I would prefer to do conditional render in these cases and not even render the section at all if the information is missing.

## Technology
Created using JavaScript ES6, CSS3, React, and styled-components.

## Requirements vs Product
**1. Have some sort of structure or object for working with template messages that have placeholders/variables (i.e. firstName, lastName, roomNumber, etc.) embedded in them**

My template messages have those placeholder built in, and I didn't want to commit anything until the message was submitted. I use objects for saving that information to render or move around or do whatever is needed.


**2. Load in message template information from a JSON file that you will have had created. Structure the file however you see fit**

I created the Templates.json file, which uses placeholder words surrounded by double curly braces to denote where a variable will be plugged in.


**3. Load in guest and company information from the JSON files that we have provided**

Done by simply importing them into the App.js.


**4. Support a greeting variable that will change based on the time of day (e.g. "Good morning" / "Good afternoon" / "Good evening")**

Handled by the 'findTime' function in the App.js. Used in the 'Room ready' template.


**5. Allow the user to specify which guest and which company should be used to populate template messages.**

This is required by the form before a message can be submitted.


**6. Allow the user to either select one of the message templates that was loaded in from the JSON file or to enter in a new message template**

If a user does not want to use a template, they can just select a guest and company and start typing. If they select a template, the form will be populated by that information, but they can override it by simply typing in additional information or deleting the templated message altogether.


**7. Generate a final message output that is a result of populating the specified variables of the message template with the correct values from the other data**

This is done live as you select new options (templates, companies, and guests) but is delivered to the final object upon clicking 'Send Greeting'.


## Future Growth
The MessageItem component would be the biggest pain point for expansion in addition to the replace methods run on the message when updating. I would want to find some sort of solution that loops through the existing keys and replaces their values only. But I think that finding a better solution to templates would probably solve most of the problems I have with the process as it stands.

But adding new templates is very simple right now using existing data.