# graphql-server

* Reference: http://graphql.org/learn/

### Notes

* Facebook: "When we built Facebook's mobile applications, we needed a data-fetching API powerful enough to describe all of Facebook, yet simple enough to be easy to learn and use by our product developers. We developed GraphQL three years ago to fill this need."  

* GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data. GraphQL provides a complete and understandable description of the data in your API, gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time, and enables powerful developer tools.  

* A GraphQL query is a string that is sent to a server to be interpreted and fulfilled, which then returns JSON back to the client.  

* Defines a data shape: The first thing you'll notice is that GraphQL queries mirror their response.  

* Hierarchical, Strongly typed, Protocol (not storage) Introspective (GraphQL server can be queried for the types it supports.)

* Relay, React Native, and GraphQL are designed as parts of a complete development stack built around the focus of the product designer and developer  

* Send a GraphQL query to your API and get exactly what you need  


### How to Start Server

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

### 8 - Use GraphQLNonNull for Required Fields

* We start our server * http://localhost:3000/graphql
* If we pass in: { video { title } }   
* We will get null as a response
* Add GraphQLNonNull in require
* In QueryType args at GraphQLNonNull
* change GraphQLID to new GraphQLNonNull(GraphQLID)
* We start our server * http://localhost:3000/graphql
* If we pass in: { video { title } }   
* Returns: message": "Field \"video\" argument \"id\" of type \"ID!\" is required

### 9 - Use GraphQLList with GraphQLObject Types

* We may want to retrieve the full list of videos liek earlier
* Add field called videos
* Go into data/index.js
* Helper: Add helper function for the list
* const getVideos = () => new Promise((resolve) => resolve(videos));
* exports.getVideos = getVideos;
* index.js: require  getVideos
* index.js: require GraphQLList
* add videos to field
* { videos{ title } }
* returns list of titles

### 10 - Write a GraphQL Mutation
* If we got to GraphiQL we can get the type definitions
* We should see two query types video and videos
* We use a mutation to add more videos to our platform
* Create new GraphQLObjectType with name, description, fields
* In fields, createVideo
* Add in title, duration, released (type and description) for each
* Add in a resolve handler
* In data/index.js add a Helper for creating the video - createVideo
* Export at bottom of file
* Go back into index.js: require at top
* Now go back to Mutation
* Rename variable to mutationType
* Add to schema by passing it into mutation field
* We start our server * http://localhost:3000/graphql
* There is now a new Mutation type in GraphiQL
* If we pass in: mutation M { createVideo(title:"Foo",duration: 300,released:false){ id, title }}
* RESULT: {"data": {"createVideo": {"id": "Rm9v","title": "Foo"}}}
* { videos{ title } }
* Verified record added

### 11 - Create an Input Object Type for Complex Mutations

* An INPUT TYPE can capture all the arguments in the createVideo
* Replace (save for later) all the args with type: new GraphQLNonNull(videoInputType),
* Make new const videoInputType = new GraphQLInputObjectType({
* Import at top of file
* Copy the args into the fields area
* Update to: return createVideo(args.video);
* We start our server * http://localhost:3000/graphql
* See inside Mutation the correct fields createVideo(video: videoInput!): Video
* If we pass in:  mutation M { createVideo(video: {title: "Foo", duration: 300, released: false}) { id, title }}

### 12 - Add an Interface to a GraphQL Schema

* We have a videoType with ID, GraphQLID. If we added an instructorType we might also want it to have that field
* So to do this we make a GraphQLInterfaceType
* Create file src\node.js
* Import from graphql necessary modules
* Create const nodeInterface
* export nodeInterface
* import in index.js - const nodeInterface = require ('./src/node.js');
* Add interfacesfield to videoType object
* this allows us to use the interface fields when we have SHARED FIELDS between types
* define an instructorType with fields and interfaces
* comment out instructorType
* try to run server: node index.js
* ERROR: we get an error becasue the resolver has not been set up in the interface
* Let's go into node.js
* Add method:  resolveType: (object) => {
* return videoType;
* index.js - we are exporting videoType: exports.videoType = videoType;
* node.js - import at top
* try to run server: node index.js
* ERROR: we get an error because interface is not following id correctly
* index.js - change videoType id to GraphQLNonNull(GraphQLID)
* try to run server: node index.js
* ERROR: we get an error because forgot the preceding new - Cannot call a class as a function
* should have been: new GraphQLNonNull(GraphQLID),
* try to run server: node index.js

### 13 - Add a Relay Node Interface to a GraphQL Schema - NOTES on RELAY

* "While GraphQL and Relay are often pushed in the same sentence (and are treated like a package by Facebook and many other advocates), they are actually two very different parts of a greater mechanism. GraphQL is, fundamentally, a way to model and expose data in the native application. That is to say that GraphQL is the methodology by which all of its extended functionality is prepared for fetching and interaction." - nordicapis http://nordicapis.com/the-power-of-relay-the-entry-point-to-graphql/

* "Relay, on the other hand, is the client-side data-fetching solution that ties into this stated model to render data efficiently for the end user. Relay is a JavaScript framework crafted to build React.js services. It was designed as a component to Facebook’s GraphQL. Relay is very fast, very efficient, and more important, extensible" - nordicapis

* "The development of GraphQL and Relay comes from the idea that there’s something fundamentally wrong or done poorly in REST, a prospect that not everyone agrees with. Let’s state upfront that almost everything that GraphQL does can be done in REST, though perhaps less efficiently."... "In this case, for many people, it’s a case of killing weeds with a flamethrower — yes, it’s a solution, but it’s an over-engineered one."

### 13 - Add a Relay Node Interface to a GraphQL Schema

* "The Node root field, in combination with globally unique IDs, comes into play when Relay needs to refetch an object. Refetching occurs when you call this.props.relay.forceFetch() or when you add fields to the query for an object whose global ID is known because it has already been partially fetched." -
https://stackoverflow.com/questions/33399901/in-relay-what-role-do-the-node-interface-and-the-global-id-spec-play

* (1) Each object must have a globally unique ID, or be identified by a type/ID pair (globalIdField helper does this and produces a base64 encoded string)
* (2) The server must know how to resolve an object from a globally unique ID, and vice versa. This is what the nodeDefinitions are for.
* (3) Any object that hopes to be refetchable using this system must implement the nodeInterface.
* https://facebook.github.io/relay/docs/graphql-object-identification.html#content

* We're going to refetching objects - our videoType
* yarn add graphql-relay
* Next, node.js: update our nodeInterface
* node.js: Comment out the import from graphql section, we'll be adding from graphql-relay
* const { nodeDefinitions, fromGlobalID, } = require ('graphql-relay');
* const { nodeInterface, nodeField} methodology with globalId, object
* data/index.js: add helper function const getObjectById
* data/index.js: exports.getObjectById = getObjectById;
* node.js: we can delete our old interface
* node.js: exports.nodeInterface = nodeInterface;
* node.js: exports.nodeField = nodeField;
* index.js - const globalIdField = require ('graphql-relay');
* index.js - const { nodeInterface, nodeField } = require ('./src/node.js');
* index.js - add globalIdField to videoType, and get rid of old Id
* lastly update query type
* add node: nodeField, to queryType fields  

* try to run server: node index.js
* graphql: { videos { id, title }}
* pass with node interface: { node(id:"VmlkZW86YQ=="){ ... on Video { title } } }
* ERROR: "message": "types[type] is not a function",
* Update node.js: return getObjectById(type.toLowerCase(), id);
* ERROR: "message": "Abstract type Node must resolve to an Object type at runtime for field QueryType.node with value \"[object Object]\"
* Switch videoType require from top to inside the nodeInterface nodeDefinitions method

### 14 - Convert GraphQL List Type to a Relay Connection Type

* We need to page through collections of items
* In this case a collection of videos - in Relay it's called connections
* Convert videos field into a connection, update what we are grabbing from the GraphQL-RelayPackage
* Define VideoConnection index.js - const { connectionType: VideoConnection } = connectionDefinitions
* Next update videos type - type: VideoConnection, args, resolve
* try to run server: node index.js
* { videos { edges {node {id,title,duration}}}}
* Returns all data for those fields
* How to get totalCount?
* go to index.js: const { connectionType: VideoConnection }
* return conn.edges.length;
* {  videos {		totalCount  }}
* Returns object count
* You can also put in videos(first:1)
* {  videos(first:1) {    edges {      node {        title      }    }  }}
* this can be changed to last
* 

### 15 - Write a GraphQL Mutation
