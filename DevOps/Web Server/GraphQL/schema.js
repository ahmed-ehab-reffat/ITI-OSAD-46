// ============================================================
// SCHEMA.JS — The "contract" of your GraphQL API
//
// 🧠 CONCEPT: The Schema Definition Language (SDL) describes:
//   1. TYPES      → the shape of your data objects
//   2. QUERY      → read operations (like GET in REST)
//   3. MUTATION   → write operations (like POST/PUT/DELETE)
//
// Every GraphQL API starts here. The schema is language-agnostic
// — your frontend devs can read this and know exactly what to
// expect without looking at any resolver or DB code.
// ============================================================

const {gql} = require('graphql-tag');

const typeDefs = gql`
  type User {
    id: ID!
    fullname: String!
    email: String!
    dob: String!
  }

  type Comment {
    id: ID!
    title: String!
    content: String!
  }

  type Article {
    id: ID!
    title: String!
    content: String!
    author: User!
    comments: [Comment!]!
  }

  type Query {
    articles: [Article!]!

    article(id: ID!): Article
  }

  type Mutation {
    createArticle(title: String!, content: String!, authorId: ID!): Article!
  }
`;

module.exports = {typeDefs};
