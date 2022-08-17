# MiniMin 

This mobile-first web app was created as a capstone projet for Ada Developers Academy, cohort 17. 

MiniMin is a mineralogy teaching tool geared towards hobbyists and students at the secondary and tertiary levels. 

### Features 
There are three primary features of the MiniMin. 

Learn Minerals:
The learner will access unlearned mineral cards, gaining information about the physical and chemical properties of minerals and seeing photos of hand samples. Pushing the "I've learned this mineral" button will add it to the learner's list of minerals to review.

Review Minerals:  
The learner can study the information presented in Learn Minerals. Specific mineral cards can be navigated to using the list at the top of the page. A randomly selected mineral will be shown for review by scrolling down. Clicking the "Show me a new mineral to review" button will display information about a different randomly selected mineral. Clicking the "I've forgotten this mineral" button will move it out of the learner's collection of learned minerals. It will be presented again on the Learn Minerals page.

Quiz: A short quiz of 5 questions will be generated to test the learner's knowledge of their learned minerals, including the ability to identify them from a photo. Feedback after each question and a score at the end will be provided. A new quiz will be generated with the "Give me a different quiz" button, which is offered when the quiz score is shown.

In order to access the mineral cards and quiz features, learners must register an account at the Register page and use the Login page to log in. 
This allows the app to keep track of which minerals have been learned. 

Additional pages include Home and About. 
Home describes the motivation for the app and the intended audience.
About includes descriptions of the features and credits for the images, icons, and mineral data. 

### Dependencies

The dependencies include axios, react and react router. 
A full list of dependences can be found in package.json. 

### Setting Up

It is recommended to install with yarn (https://yarnpkg.com/).

1. Clone this git repository 
2. Use 'yarn install' to install dependencies
3. Use 'yarn start' to run on local port

