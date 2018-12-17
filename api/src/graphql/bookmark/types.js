const { gql } = require('apollo-server');

export const typeDef = gql`
  type Bookmark {
    _id: String!
    application_id: String!
    user_id: String!
    content_id: Int!
    date: String!
  }

  extend type Query {
    bookmarks: [Bookmark!]!
  }

  extend type Mutation {
    addBookmark(content_id: Int!): Bookmark!
    deleteBookmark(content_id: Int!): Boolean!
  }
`;
