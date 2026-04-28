const {articles, users, comments} = require('./data');

const resolvers = {
  Query: {
    articles: () => {
      return articles;
    },

    article: (_, args) => {
      return articles.find((a) => a.id === args.id) || null;
    }
  },

  Mutation: {
    createArticle: (_, args) => {
      const newArticle = {
        id: String(articles.length + 1),
        title: args.title,
        content: args.content,
        authorId: args.authorId
      };

      articles.push(newArticle);
      return newArticle;
    }
  },

  Article: {
    author: (parent) => {
      return users.find((u) => u.id === parent.authorId);
    },

    comments: (parent) => {
      return comments.filter((c) => c.articleId === parent.id);
    }
  }
};

module.exports = {resolvers};
