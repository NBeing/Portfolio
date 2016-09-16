This example is a frontend for my Hegel-serve scraper / API.
It is based on the Angular2 Seed repo.

This program depends on having my Hegel serve backend running (https://github.com/BornPosthumous/Portfolio/tree/master/Hegel-serve)
To begin run `npm run start` after installing dependencies, and navigate to http://localhost:5555/hegel

You should see a page with the first section of Hegel's phenomenology of spirit. 
You may then click on any word in the passage and be brought to the corresponding wikipedia page. You can also load terms manually.  Synonyms / Definition / Glossary information will be loaded on the right. 
On the left will be all of the links within that wikipedia page (They are also searchable). On top will be the history of your wikipedia searches. 

Once the wikipedia page is loaded, you can highlight any word with your mouse and be brought to that page. No longer will your wikipedia browsing be dictated by preexisting hyperlinks! This is now the primary way in which I browse wikipedia.

It may take some time for information to come from the web socket!

P.S. : This example was mostly for my own curiousity and I didn't intend to expose it to the public. However, I thought it was a good illustration of the type of work I would like to do with javascript. It also shows I know my way around angular2 and RXJS a bit. 
