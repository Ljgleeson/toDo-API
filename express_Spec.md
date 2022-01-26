# Express.js
---
After outlining my main criteria, I believe that Express, a backend web application framework for Node, is the best framework for JSON REST API development. I will go into detail for my reasoning as well as show my proof of concepts for those applicable. I did not include 'if the framework supports JSON' or 'if they can follow REST principles' in my criteria as that was expected.

### My Criteria
---
- The programming language
- Scalability
- Testability
- Performance
- Can it apply the SOLID Princples
- Community / Resources available
- Database support 
- Personal benefits
---

### The Programming Language
All modern programming languages and application platforms provide support for producing and consuming JSON data, whether natively or via libaries. However, an argument can be made against using a language like Java or C# as its not as convient to work with JSON in these languages that favor static typed classes over the use of hash maps or dictionary objects. 
When it comes to the support of parsing JSON data, Javascript is a strong choice as the data format translates directly to an object literal in the language. It is efficient, has ease of use, and has simple functions for managing JSON.
```
Sources:
- restfulapi.net
- developer.mozilla.org
```


### Scalability
A programs ability to be scalable is ideal for projects. Node.js builds highly scalable apps due to the non-blocking I/O and event-driven models that handle concurrent request. Since Express works alongside Node.js, scalability is guarenteed. Express derives various features from Node.js which includes the non-blocking servers that can handle user requests better. Node.js also pushes communication among the parts of the applications, making it run faster which gives the opporunity to scale apps without decreasing speed or performance. 
```
Sources:
- bairesdev.com
- fireart.studio
- simform.com
```
### Testability
`Please see express_Testing branch for proof of concept.`
Similar to Node.js, there are many defined practices for conducting test in Express apps. There are various automated testing tools/frameworks like Mocha, Jest, Ava, and Postman. Combining these with libraries like Chai, Supertest, and Sinon, allow developers to automate APIs and middleware test of an Express app. 
```
Sources:
- simform.com
- dev.to
```

### Performance
`Please see express_Performance branch for proof of concept.`
Being a simple framework, Express is easy to configure and customize for faster development time. On top of this, Node.js interprets the JavaScript code through Googles v8 engine that is complied into machine code, which helps with efficiency and performance. There are also some practices that Express has that improves performance and reliability. Setting the NODE_ENV environment variable to production will make your Express.js application run three times faster. Express also allows for unified logs across the application which structures and collects logs in a central location. 
```
Sources:
- bairesdev.com
- dynatrace.com
- sematext.com 
```

### Can it apply the SOLID Princples
`Please see the express_SOLID.js branch for proof of concept.`
JavaScript is a mulit-paradigm programming language that can apply the SOLID princples. On top of this, the unopinionated structure of express makes it capable of following the SOLID principles. There are multiple guides to assist developers with following the SOLID principles with Node specifically using the Express framework.
```
Sources:
- dev.to
- blog.wolksoftware.com
- medium.com
```


### Community / Resources available
Being able to use guides, toolkits, and online forums is crucial in development. A popular language will always a lot of tutorials, development guides, and previously asked questions that can help a developer whenever they get stuck or confused.

As mentioned, Express is a backend web application framework for Node.js. As Node.js is an open-source technology, there is a massive community of collaboration from highly creative and engaged developers. Just on stack overflow, there are over 83,000 different questions relating to express specifically. There are also over 221,900 websites worldwide that have been developed using Express and over 700,000 modules in Node that can help as well. Finally, Express was ranked the 4th most popular backend framework  in 2021. These statistics help show the massive popularity and therefore amount of resources available for Express.
```
Sources:
- stackoverflow.com
- similartech.com
- npmjs.com
- statisticsanddata.org
```

### Database Support
`Please see the express_Database branch for proof of concept.`

As Express is a minimalistic framework, it doesn't come with database integration among its core features and doesn't promote using any particular database. This feature allows developers to connect with most databases' desired, simply by loading a Node.js driver in the app. The ability to choose between at least 10 different databases helps show the flexiblity of Express. There are also guides for creating and maintaing each of these databases. 
```
Sources:
- simform.com
- expressjs.com
- geeksforgeeks.org
```

### Personal Benefits
I'm honestly not sure if this should be something that should be given any thought while deciding a framework but I figured I'd leave it in anyways to get feedback.

The expansion of ones technical skills by learning a new language, framework, and/or environment would appeal to most developers as it can help them down the line in life. Developers can use the opporuntity of working with new tools to help expand their skillset and/or work on personal projects. Being that Node.js is a widely popular back-end environment and Express is one of their most popular frameworks, it fits the criteria of appealing to developers.  
