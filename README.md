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

## Future Development
There are some things I would like to handle better and research further with more time. I used the syntax if templates with the {{firstName}} entries, but didn't use them properly. I would want to either find a cleaner solution elsewhere or find a way to use that syntax properly instead of just finding and replacing. (Works fine, just not what I want to do.)

In many cases, I am checking if information exists and, if it doesn't, rendering some sort of placeholder. I would prefer to do conditional render in these cases and not even render the section at all if the information is missing.

## Technology
Created using JavaScript ES6, CSS3, React, and styled-components.