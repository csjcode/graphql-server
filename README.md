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

* returns: { data: { foo: 'bar' } }

### 2 - GraphQL primitve types 1:57
