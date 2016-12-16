'use strict'

const express = require ('express');
const graphqlHTTP = require ('express-graphql');
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
}  = require ('graphql');
const {getVideoById, getVideos, createVideo} = require ('./src/data/');

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
    videos: {
      type: new GraphQLList(videoType),
      resolve: getVideos
    },
    video: {
      type: videoType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
          description: 'The id of the video.'
        }
      },
      resolve: (_, args) => {
        return getVideoById(args.id);
      }
    }
  }
});

const videoInputType = new GraphQLInputObjectType({
  name:'videoInput',
  fields:{
    title: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The title of the video',
    },
    duration: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'Duration in seconds',
    },
    released: {
      type: new GraphQLNonNull(GraphQLBoolean),
      description: 'The video is released',
    },
  }
});

const mutationType = new GraphQLObjectType({
  name:'Mutation',
  description:'The root Mutation type',
  fields: {
    createVideo: {
      type: videoType,
      args: {
        video: {
          type: new GraphQLNonNull(videoInputType),
        },
      },
      resolve: (_, args) => {
        return createVideo(args.video);
      }
    },
  }
});

const schema = new GraphQLSchema ({
  query: queryType,
  mutation: mutationType
});




server.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`)
});

server.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))
