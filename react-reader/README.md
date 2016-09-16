# React Reader - Phenomenology

This example is a frontend for my Hegel-serve scraper / API. It allows you to read Hegel's phenomenology along with Findlay's famous notes on the text.

It is based on my taking of Brian Holt's react course.

This program depends on having my Hegel serve backend running (https://github.com/BornPosthumous/Portfolio/tree/master/Hegel-serve)
To begin run `webpack-dev-server` after installing dependencies, and navigate to http://localhost:8080/#/

This project is meant to show that I can write react with the redux library (with thunks!) as well as create a clean and responsive UX.

The app should be pretty straight forward. Click a section on the table of contents to go to that section. One may press the left or right keys in order to browse the next and previous section. You may also press 'f' to hide or show the Findlay analysis.

Inspect the console to see redux logging.
I still must write tests for this application! However the testing environment is set up and the test files contain the two simplest tests for view and store.

If I were to write this program again I would not use thunks and instead use the Saga middleware, which seems to handle asynchronicity much more cleanly. 
