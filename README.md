# graphql-server

node index.js  

Dashboard: http://localhost:3000/graphql  

Listening on: http://localhost:3000  


### 1 - Create a GraphQL schema 4:16

* > yarn init -y (generates package.json)
* > yarn add graphql
* create index.js file for ou first schema   

* index.js: require graphql, buildSchema
* index.js: next build out the Schema with buildSchema
* index.js: add Query and Schema   

* We've created a description of our GraphQL server
* Schema is a definition of queries, mutations and subscriptions
* Query type allows us to query our schema for foo and get back a String
* The way it knows what alue to return is the idea of a Resolver   

* index.js: create const resolvers = { foo: () => 'bar' }
* index.js: create const query for foo
* use the GraphQL function required earlier graphql
* index.js: graphql(schema, query, resolvers)
* this returns a promise result and error    

* Summary: we're making a Query, it's matched to the Schema, Resolved and then an OBJECT is returned to the console   

* > node index.js  
* Response: { data: { foo: 'bar' } }

### 2 - GraphQL primitive types

* index.js: id, title, duration, wacthed
* add new types to Resolvers
* add fields to Query
* > node index.js
* Response:{ data: { id: '1', title: 'bar', duration: 180, watched: true } }

### 3 - GraphQL Object type for Basic types refactors Query to have the object name Video


* Instead of having a Query type we can just make up a new object - call it Video
* index: type Video { }
* Then, in Query type we add video: Video
* In Resolvers we can have a video field
* Inside the Resolvers' video field we add in the fields:   video: () => ({ id: '1', title: 'foo', duration: '180', watched: true,})
* Next we update our Query, instead of querying fields, we query the Object with the same fields inside.
* > node index.js  
* Response: { data: { video: { id: '1', title: 'foo', duration: 180, watched: true } } }

### 4 - Use GraphQL's List Type for Collections - this allow us Query list of multiple records

* We have a Query type of video but sometmies we need to query the GraphQL server for a collection or list of a type
* We could add a new Query type call videos
* index.js - videos: [Video]
* Now we hook up a Resolver for videos
* Create a const videoA and videoB
* Create a const videos [videoA, videoB]
* Now we will update our resolvers
* index.js - videos: () => videos
* Next we update our Query to be videos
* > node index.js  
* Response: { data: { videos: [ [Object], [Object] ] } }

### 5 - Serve a GraphQL Schema as Middleware in Express

* We're going to see how to use GraphQL in Express
* We need to add a couple dependencies
* > yarn add express express-graphql
* require oth modules
* add PORT variable
* const PORT = process.env.PORT || 3000; const server  express();
* remove graphql utility function (bottom of script)
* add server.use('/graphql', graphqlHTTP({}))
* >node index.js
* Listening on http://localhost:3000
* http://localhost:3000/graphql
* index.js: under server.use rootValue: resolvers
* quite server, save index file, restart
* http://localhost:3000/graphql
* { videos { title }}

### 6 - Write a GraphQL Schema in JavaScript

* We're currently using the buildSchema function
* We can also do this with javascript
* We'll first change the require functions
* Add new type in the require area
* Add new schema in pure javascript (without the buildSchema)
* Define queryType and fields
* Define videoType and fields
* Remove the old schema and resolvers.
* In server remove the root value
* > node index.js
* http://localhost:3000/graphql
* {
  video {
    id
    title
    duration
    watched
  }
}

### 7 - Use Arguments in a GraphQL Query

* We have a GraphQL schema with one query statement
* we can add more arguments with args key (inside fields: video:)
* Add id
* Now when we start our server * http://localhost:3000/graphql
* .... we pass in: { video(id:"a") { title } }
* this gets the record title
* create a new file: src\data\index.js
* cut and paste the original videoA and videoB info into it
* create  a helper function getVideoByID
* const getVideoByID = (id) => new Promise ((resolve) => {})
* fill in resolve function
* exports.getVideoByID = getVideoByID;
* require in index.js
* update resolve statement, instead of resolving a static object
* write out resolve as a function
* resolve(\_, args) => { return getVideoByID(args.id); };     (note: remove escape in argument)
* Now when we start our server * http://localhost:3000/graphql
* .... we pass in: { video(id:"a") { title } }    
*

### 6 - Serve a GraphQL Schema as Middleware in Express
### 6 - Serve a GraphQL Schema as Middleware in Express
### 6 - Serve a GraphQL Schema as Middleware in Express
