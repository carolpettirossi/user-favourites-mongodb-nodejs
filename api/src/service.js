require('dotenv').config()
var bodyParser = require('body-parser')

const { ApolloServer, AuthenticationError, gql } = require('apollo-server');
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

import { makeExecutableSchema } from 'graphql-tools';
import { merge } from 'lodash';

import { typeDef as bookmarkTypeDef } from './graphql/bookmark/types.js';
import { resolvers as bookmarkResolvers } from './graphql/bookmark/resolvers.js';

import { typeDef as savedSearchTypeDef } from './graphql/savedSearch/types.js';
import { resolvers as savedSearchResolvers } from './graphql/savedSearch/resolvers.js';

const mongoConnect = require('./mongoose');
const db = mongoConnect();

const blankSchema = gql`
  type Query {
    _blank: String
  }
  
  type Mutation {
    _blank : String
  }    
`;

const schema = makeExecutableSchema({
  typeDefs: [ blankSchema, bookmarkTypeDef, savedSearchTypeDef ],
  resolvers: merge(bookmarkResolvers, savedSearchResolvers),
});

const client = jwksClient({
  jwksUri: process.env.AUTH0_DOMAIN + '.well-known/jwks.json'
});

const getKey = (header, callback) => {
  client.getSigningKey(header.kid, (err, key) => {
    if (err) callback(err)
    
    var signingKey = key.publicKey || key.rsaPublicKey
    callback(null, signingKey)
  })
};

const server = new ApolloServer({
  schema,
  context: ({ req }) => {
    const token = req.headers.authorization || '';
    
    if (!token) throw new AuthenticationError('You must be logged in. Missing authorization token.');

    const clientId = req.headers.client_id;

    const options = {
      audience: clientId,
      issuer: process.env.AUTH0_DOMAIN,
      algorithms: ['RS256']
    };

    const tokenDecoded = new Promise((resolve, reject) => {
      jwt.verify(token, getKey, options, (err, decoded) => {
        if(err) {
          return reject(err);
        }
        resolve(decoded);
      });
    });

    return {
      tokenDecoded,
      clientId
    };
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});