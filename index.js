'use strict'

const express = require ('express');
const graphqlHTTP = require ('express-graphql');
const {getVideoById} = require ('./src/data/');

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
}  = require ('graphql');

const PORT = process.env.PORT || 3000;
const server = express();

const videoType = new GraphQLObjectType ({
  name: 'Video',
  description: 'A video on the website',
  fields: {
    id: {
      type: GraphQLID,
      description: 'The id of the video'
    },
    title: {
      type: GraphQLString,
      description: 'The Title of the video'
    },
    duration: {
      type: GraphQLInt,
      description: 'The duration of the video (in seconds)'
    },
    watched: {
      type: GraphQLBoolean,
      description: 'Whether the viewerhs watched the video'
    }
  }
});

const queryType = new GraphQLObjectType ({
  name: 'QueryType',
  description: 'The root query type',
  fields:  {
    video: {
      type: videoType,
      args: {
        id: {
          type: GraphQLID,
          description: 'The id of the video.'
        }
      },
      resolve: (_, args) => {
        return getVideoById(args.id);
      }
    }
  }
});

const schema = new GraphQLSchema ({
  query: queryType
});




server.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`)
});

server.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))
