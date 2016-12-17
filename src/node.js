'use strict';

// const {
//   GraphQLInterfaceType,
//   GraphQLNonNull,
//   GraphQLID
// } = require ('graphql');

const {
  nodeDefinitions,
  fromGlobalId
} = require ('graphql-relay');
const { getObjectById } = require('./data')

const { nodeInterface, nodeField} = nodeDefinitions(
  (globalId) => {
    const { type,id } = fromGlobalId(globalId);
    // console.log(type, id)
    return getObjectById(type.toLowerCase(), id);
  },
  (object) => {
    const { videoType } = require ('../index.js');
    if(object.title){
      return videoType;
    }
    return null;
  }
);

exports.nodeInterface = nodeInterface;
exports.nodeField = nodeField;