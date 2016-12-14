# graphql-server

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

### 2 - GraphQL primitve types 1:57

* index.js: id, title, duration, wacthed
* add new types to Resolvers
* add fields to Query
* > node index.js
* Response:{ data: { id: '1', title: 'bar', duration: 180, watched: true } }

### 3 - GraphQL Object type for Basic types 1:57 - refactors Query to have the object name Video


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
