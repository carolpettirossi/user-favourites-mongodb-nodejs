const { gql } = require('apollo-server');

export const typeDef = gql`
  type SavedSearch {
    _id: String!
    application_id: String!
    user_id: String!
    name: String!
    search_path: String!
    date: String!
  }

  extend type Query {
    savedSearches: [SavedSearch!]!
  }

  extend type Mutation {
    addSavedSearch(search_path: String!, name: String!): SavedSearch!
    deleteSavedSearch(_id: String!): Boolean!
  }
`;
