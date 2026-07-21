const users = [
  {
    id: 'u1',
    fullname: 'Alice Martin',
    email: 'alice@example.com',
    dob: '1990-04-15'
  },
  {
    id: 'u2',
    fullname: 'Bob Hassan',
    email: 'bob@example.com',
    dob: '1985-11-03'
  }
];

const comments = [
  {
    id: 'c1',
    title: 'Great read!',
    content: 'Loved this article.',
    articleId: 'a1'
  },
  {
    id: 'c2',
    title: 'Helpful',
    content: 'Very clear explanation.',
    articleId: 'a1'
  },
  {
    id: 'c3',
    title: 'Nice overview',
    content: 'Good intro to the topic.',
    articleId: 'a2'
  }
];

const articles = [
  {
    id: 'a1',
    title: 'Introduction to GraphQL',
    content: 'GraphQL is a query language for APIs...',
    authorId: 'u1'
  },
  {
    id: 'a2',
    title: 'REST vs GraphQL',
    content: "Let's compare the two approaches...",
    authorId: 'u2'
  }
];

module.exports = {users, comments, articles};
