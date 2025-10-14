# week 1 # 
We’re so excited to welcome you to the first week of the Technigo JavaScript Developer Bootcamp! On this page, you will find all the information about the intro week and links to some video material we expect you to watch during self-study sessions.



What you will learn this week
Structuring content with HTML
Styling websites with CSS
How to work in a team using mob-programming
What's in a developer's toolbox
Agile methodology
And more...
Project brief: Build your first project using mob programming
The topic for this project will be your team. The idea is to present your team and the members in it, to the rest of the class using this first website. We will present this project more during the Intro week.

1. Make a plan and sketch

2. Pick one person to fork and clone the repository from GitHub + open up a collaboration using VS Code's Live Share extension.

3. When everybody has joined the collaboration session in VS Code, start working together using a mob program approach.

Requirements
The finished project should (at least) include:

One HTML file with:
Image(s)
Headings
Paragraphs
Links
One CSS file with:
Styling


# week 2 # 
Time to get our hands dirty 👩‍💻
Now that you've learnt the basics of HTML and CSS, you will deepen your knowledge by focusing on responsive web design (to make sure it will look good on all devices) and how to layout using CSS Grid and Flexbox (so your website doesn’t look like a boring old Word document). All of this will be put into use and will be the foundation of the project that we will work on for the rest of this course: a responsive business site with a working hamburger menu. But the best part about this is that you decide what the business site will be about - maybe pottery classes, dog adoption or hiking trips? Your imagination is the limit!


What you will learn this week
✓ How to style webpages using CSS (including Box Model, Grid, Flexbox)
✓ How to create responsive webpages for mobile, tablet and desktop
✓ Deploying websites

Project instructions
This week, you will start a new project that we will continue to build on for 3 weeks. It will result in a responsive business site with a working hamburger menu. This week, we want you to build the following parts of your business site:

A grid of products or news about the business
A navigation bar that's visible on desktop but hidden on mobile and tablet (will be completed later)
👉 Fork and clone this repo to get started.

Requirements
Should be responsive, e.g. showing one column on mobile, two columns on tablet and four columns on desktop. Make it look good on devices from 320px width up to at least 1600px.
Include a navigation bar and a grid of cards/articles
Use both CSS Grid and Flexbox
Deploy 🚀
Although you will not hand in this project until the end of the sprint, we want you to go live - or deploy it - already now. It's a part of the agile methodology to deploy and then continue to work on it. Follow this guide to  Netlify. PS. Don't forget to add the Netlify link to your Readme file in the repo.
Tips & tricks
Planning

Before you get started, we want you to take a step back from the screen, grab a pen and paper, and start sketching out your page. Have the box model in mind, and create wrapping boxes for the different elements on your page.

Start by drawing an outer wrapper, a box wrapping the entire page. Then, continue by filling this box with content: A header box, a main box, a box for navigation, etc. The final sketch should consist of a box, within a box, within a box, within a box. Tip! Use markers to highlight the different boxes to clarify which box is wrapping the other.

HTML

Once you finish sketching, you’ll have a ‘recipe’ for your HTML document! Every box on your sketch represents a container, a div/section/main, or other element. Add your containers and content from the sketch into your HTML document, starting from the top and the outside, going in. Continue to add content by creating the HTML elements you need. Don't forget to start thinking about classes already to be able to style more easily when it comes to that.

CSS
A common question this week is "When should I use Flexbox and when should I use Grid?". It's up to you, but a good rule of thumb is to use Grid for the page layout and flexbox for smaller components, such as how stuff should align within a card. Again - this is up to you, so feel free to play around.

Inspiration

Want to find some nice images to use? Check in the Image resources from the Toolbox.
Want to see some examples of former students’ work on Flexbox and CSS Grid? Have a look at Nadia’s Maple News, Åsa’s Therapy a la Gucci or Christoffer’s Daily Ziko.
Not a designer? Get some design inspiration for your grid 👇
The site magazine
Mike McQuade
Stretch goals

Add a box-shadow to make the cards look like polaroids
Align the cards to the centre of the page
Add some CSS animations to your project

# week 3 #
Sign me up ✍️
Now that you’ve mastered the basics of web design, it's time to level up by diving into the world of HTML forms and validation. This week, you’ll learn how to create forms that not only look great but also work seamlessly for users. You’ll also focus on clean code practices, which will make your code easier to read, maintain, and improve accessibility for all users. This will result in the possibility of collecting input from clients or customers on your business site.

After this week, you will also give and receive your first code reviews! More about that later.

What you will learn this week
✓ How to use HTML forms
✓ How to style a hero image/video
✓ How to write clean code
✓ How to do code reviews

Project instructions
This week, you will continue on the project and build the following parts of your business site:

A header with responsive image/video (i.e. hero image)
A signup form with at least three different input types. Examples:
Text fields
A password field
Set of radio buttons
Set of checkboxes
Submit button
Requirements
Include a header with a responsive image/video and a form with at least three different input types
Submit the structured form data by changing the form action to https://httpbin.org/anything and the method to post
Everything should be fully responsive and look good on devices from 320px up to at least 1600px
Follow the guidelines on how to write clean code
Tips & tricks
As last week, we suggest that you start by planning what you want to build this week. When you've coded your form, set the form action to post to https://httpbin.org/anything and the method set to post. This means that httpbin will show you how this response would look like if you sent this to a server.

Try submitting your form to see how the response from httpbin looks:

How does the textfields look like?
What response do you get from the password field?
Try select one or a few of the radio buttons & submit again. What changes?
Select none of the radio buttons & submit.
Check the checkboxes & submit.
Leave the checkboxes unchecked & submit.
Inspiration

Confetti uses a video as their header
Signup form design ideas found on Dribbble
Pexels - Free videos
Mobbin - Design inspiration (thanks team earth 😉)
Stretch goals

Add a focus effect on the input tags (Using the CSS :focus pseudo-selector). Make the border or the background of the field change colour and add a glow effect.
Add some validation to the form.



# week 4 #
Hey there, explorers! ✍
This week, we're diving into the world of programming with JavaScript. You'll tackle data types, variables, and you'll explore the DOM. This will make it possible to add some interactivity to our business site! So, get ready to immerse yourself in JavaScript, lay your foundation, and set the stage for an exciting coding journey. We're here to guide you all the way!


What you will learn this week
✓ Different datatypes
✓ How to use variables in JavaScript
✓ Know some string methods to modify strings
✓ How to modify the DOM using JavaScript

Project instructions
This week, you will finish the project and build the following parts of your business site:

A working hamburger menu:
Visible on mobile devices
Interactive functionality via DOM manipulation
Requirements
Include a responsive hamburger menu that's visible on smaller screens but hidden on bigger screens.
Make it interactive using JavaScript so that when you click, all links in your navbar become visible, and when you click again, they are hidden
Tips & tricks
Just like last week, start by planning what you want your hamburger menu to do! Here are a few questions to help you break down the challenge:

What will your menu items look like?
What should happen when you click the hamburger icon?
How will you show and hide the menu?
It's called a hamburger menu because the three lines look like a hamburger. You decide if you want to create your own hamburger menu (using e.g. a div with spans) or if you want to use an SVG icon.

Inspiration

Beats by Dre
Technigo
Procreate

Stretch goals

Add some CSS animations to your project, e.g. a slide-in effect when the hamburger menu expands.
Make the hamburger more intuitive, by indicating if it’s expanded or collapsed by changing the icon (feel free to be inspired by technigo.io)
Add some more JavaScript to your page, e.g. toggling dark mode/light mode




# week5 #
Hi coders! 🤖
This week is all about diving deeper into JavaScript. You've got the basics, and now you're levelling up with functions. Functions allow you to organise your code, making it efficient and elegant. As you master functions, you'll be equipped to solve more complex challenges and create greater projects. Apart from this you will also learn about conditional statements, to be able to control the flow of your script.

Project instructions
This week, you will start building a Recipe Library app, which we will continue to develop over the next three weeks. By the end of the sprint, it will be a fully functional web app that helps users find recipes based on different filters and sorting options. This first week, you will create the foundation of your recipe library by:

Building the HTML structure:
Input fields for filters and sorting options
A placeholder recipe card
Styling your app as close as you can to this Figma design
Writing JavaScript functions to handle user selections.
Using conditional statements to display a message to the user, based on the input
This week is all about doing the groundwork. Later on, we'll work with real-life data from an API (which will be introduced in week 7), but until then - we have compiled a list of filters and sorting options you can choose from.

Filters
Diets
Vegan
Vegetarian
Gluten-free
Dairy-free
Cuisine
Mediterranean
Middle Eastern
Asian
Italian
Mexican
Cooking time filters
Under 15 min
15-30 min
30-60 min
Over 60 min
Amount of ingredients
Under 5 ingredients
6-10 ingredients
11-15 ingredients
Over 16 ingredients
Sorting options
Sort by cooking time
Sort by popularity
Sort by price per serving
Sort by the amount of ingredients
👉 Fork and clone this repo to get started.

Requirements
Users should be able to select at least one filter
Users should be able to select at least one sorting option
Use functions to:
Get the selected filter
Check conditions (e.g. if the user selects "vegetarian", return "falafel")
Should be responsive and look good on devices from 320px width up to at least 1600px.
💡 Here is an example of how it can look like after this week.

Tips & tricks
Before coding, ask yourself:
1️⃣ What filter(s) and sorting option(s) should the user be able to select?
2️⃣ What HTML elements do you need for the filters?
3️⃣ How will you store user input inside JavaScript?
4️⃣ What conditions will you check? (e.g., "If the user selects Vegan, return Avocado Toast").
5️⃣ How will you update the recipe card dynamically?
6️⃣ Will you use Flexbox or CSS Grid for the recipe cards?



# week 6 #

Hi! 📚
This week, we will cover how to use objects and arrays. By the end, you will confidently create and manipulate objects and arrays and effectively use loops to iterate through arrays. Let's explore these fundamental building blocks and enhance your JavaScript programming skills!



What you will learn
✓ How to use objects in JavaScript
✓ How to use arrays in JavaScript
✓ How to manipulate arrays in JavaScript
✓ How to access arrays through their index
✓ How to access objects through dot notation
✓ How to use array methods such as forEach() and filter()



💡 Here is an example of how it can look like after this week.

If you scroll to the bottom of this page, you will find an array of mockup recipes you can use this week.

Project instructions
Last week, you built the foundation for your Recipe Library App, setting up the HTML structure and handling basic user selections. This week, it's time to make things more dynamic! You'll start working with arrays, objects, and loops to display real recipes and allow users to filter and sort them based on their selections.

By the end of the week, a user should be able to:

filter amongst the recipes in the array
sort the recipes in the array
get a random recipe from the array
Requirements
Display all of the recipes (and their information) in the array when the website is loaded (using JavaScript)
Be able to filter the recipes based on at least one of the following filters: cuisine, diets, cooking time and amount of ingredients and update the results in the DOM. Please push yourself to do more though 💪
Be able to sort on one property, and update the results in the DOM, e.g.
from most to least ingredients and vice versa
from longest to shortest cooking time and vice versa
Feature a button that selects a random recipe, and your page should display the selected item
Have an empty state, e.g. if there are no recipes matching the filter - show a meaningful message to the user
Should be responsive and look good on devices from 320px width up to at least 1600px.


Tips & tricks
Before coding, ask yourself:

How will you loop through the recipes to display them on the page?
Stretch goal: What happens if multiple filters are selected at the same time?
How will you structure your functions to handle sorting and filtering separately?
How will you ensure the UI updates when users change filters or sorting?


# weeek 7 #


Hey, chef! 🧑🏼‍🍳
This week, we'll start working with APIs to fetch external data to our websites. The knowledge of how to use external data and public APIs will open up a whole new world of websites and services that you can build. If you want to stretch your skills even more, google public APIs and get inspired!

After this week, you'll also do your second code review. As last time, you decide in your team who reviews whose code.

What you will learn
✓ What an API is, and how to use it
✓ Basic JSON
✓ How to use fetch() in JavaScript
✓ How to use Promise object in JavaScript



What you’ll be doing
Instead of relying on static mock data, you will:

Fetch real recipes from Spoonacular’s API (/recipes/random or /recipies/complexSearch with some extra parameters to it.)
Dynamically update the UI with the fetched recipes.
Handle API limits (only 150  50 requests per day).
Adjust filtering and sorting logic to match the new API response format.
Deal with missing or inconsistent data (e.g., how dietary properties are structured).


Project instructions
How to get started
Sign up for an account with the Spoonacular API.
Begin with putting together the URL that you will fetch from. We will use the recipes/random endpoint. Example fetch of one recipe:
const URL = `https://api.spoonacular.com/recipes/random?number=1&apiKey=${YOUR_API_KEY}`
After you've fetched the data, a good idea is to log the data to the console and familiarise yourself with it. Compare the structure of the data to last week's mockup data. Will you need to change anything? In our example URL, we're only fetching one recipe. You can increase the number when you feel comfortable.
💡 Remember that Spoonacular has a daily quota of 150 50 requests. If you scroll to the bottom of this page, we created an exampleResponse with one recipe, that you can use if you hit your daily limit.

Another idea would be to cache the data by storing the fetched recipes in localStorage. Something like:
localStorage.setItem("recipes", JSON.stringify(fetchedRecipes))
const storedRecipes = localStorage.getItem("recipes")

...and then make a conditional statement to check if you have stored recipes, use them, otherwise fetch recipes and use them.

Once you've familiarised yourself with the data structure, it's time to get real! Loop through the recipes and display them on your page. Check so that all your filters/sorting options work as they should and continue to develop this recipe library.


Requirements
Apart from the requirements from previous weeks, you should:

Fetch real recipe data from Spoonacular's API
Display dynamic recipe cards based on the API data
Adapt filtering & sorting to match the API response format
Show a useful message to the user in case the daily quota has been reached 😎
Stretch goals
Make your filters and sorting options work together so that the user, for example, can filter on vegetarian & popular recipes or Italian vegan recipes
Implement local storage caching to reduce API requests
Show a loading state while fetching data
Allow users to search for specific recipe names or ingredients
Allow users to save/like recipes and store them in local storage. This includes adding a heart button to the recipe card and adding a "View favourites" button that only shows favourite recipes.
Implement pagination for large results or infinite scrolling (e.g. fetching more recipes when the user has reached the bottom)



# week 8 #
Hey, sunshine! ☀️
It's an exciting week – we're finally diving into TypeScript! You'll build a strongly-typed Weather App that showcases TypeScript's powerful features. We have the great joy to let you know that we will have guest developers from SMHI joining us during these weeks, specifically to present their API and how to work with it. You will also present you projects to them on Friday 24th! 🌥️



For these next two weeks we will continue to practise how to work with external APIs and start adding TypeScript to the mix. You will work on the project for these weeks together in teams, first week in more of a mob programming approach whereas during the second week we will learn more about how to split the work up between developers and work with github and git branches.

.
What you will learn
✓ Deepen your knowledge about APIs 
✓ Practice teamwork and mob programming
✓ Understand the role of TypeScript in web development 
✓ How to set up a basic TypeScript project 
✓ How to write strongly-typed variables and functions 
✓ How to use TypeScript interfaces 
✓ How to work with union types and optional properties 
✓ How to work with the Date() object in JavaScript

Project instructions
This week, you will work on a group project using TypeScript. It’s going to result in a working weather app that uses a weather API to tell today's weather and temperature and a 4-day forecast. We've asked a couple of different designers to do their take on this project. It's a great practice to implement someone else's design. You will find their designs here. Decide together which design you want to implement - and follow the design as closely as you can. Here are also two examples of what it might look like live:

Live Demo - Weather app 1
Live Demo - Weather app 2


👉 Pick one person to fork and clone this repo to get started. Add the rest of the team as collaborators



Requirements
Your project should use TypeScript
You should fetch data from the API using fetch()
The app should have: city name, current temperature, weather description, 4-day forecast
The presentation of the data should be in the specified format. However, you can choose how to display the forecast - perhaps you want to show the min and max temperature for each day, or perhaps you want to show the temperature from the middle of the day, or the humidity, what it feels like and so on. Just make sure to make it all fit nicely with your chosen design.
Make your app responsive (it should look good on devices from 320px width up to at least 1600px)
Follow one of the designs as closely as you can
Follow the guidelines on how to write clean code
Tips, tricks and todo’s
Familiarise with the SMHI API documentation before you try to implement it
Decide on a design together. The first design has conditional styling based on the weather, and the second has conditional styling based on time of day.
Plan your tasks and time together. Break the project down into smaller chunks before you start coding.
Remember to commit often, at least at the end of each coding session. When you’re ready don’t forget to deploy it to Netlify and open a pull request.

Stretch goals
Feature: Sunrise & Sunset 🌅 Use the sunrise/sunset API to display when the sun rises and sets.
Feature: More cities 🏙️ Give the user the option to choose between a couple of your favourite cities, or create a searchbar where the user can search for a specific city.
Feature: Use your location 🗺️ Use the Geolocation API that is built into your browser to fetch the city that you are located in at the moment and show the weather for your location.
Feature: Add more data 💽 Explore the API and use another endpoint of the API to include supplementary information.
Feature: CSS Animations ☀️ Add some CSS animations to your app, e.g. pulsating sun/raindrops.


# week 9 #
Hey team players! 💪
We’re continuing our TypeScript journey this week. Still working on your Weather App, but now taking things up a notch! This week is all about collaboration: you’ll learn how to split up work within your team, use Git branches effectively, explain code to eachother and and handle merges and conflicts that comes with it.

By the end of the week, you’ll not only have improved your TypeScript skills, but also learned how real dev teams organise their workflow and manage shared codebases. 🚀



What you will learn
✓ Deepen your knowledge about APIs 
✓ Practice teamwork and mob programming
✓ Understand the role of TypeScript in web development 
✓ How to set up a basic TypeScript project 
✓ How to write strongly-typed variables and functions 
✓ How to use TypeScript interfaces 
✓ How to work with union types and optional properties 
✓ How to work with the Date() object in JavaScript



Tips, tricks and todo’s
Plan your tasks and time together. Break the project down into smaller chunks before you start coding.
Create branches for each feature, merge often.
Make sure to demo your code to each other and also to code review each others code while you merge.


