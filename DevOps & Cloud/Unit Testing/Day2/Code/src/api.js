const axios = require('axios');

async function fetchPost(id) {
  const { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
  if (!data) throw new Error('Post not found');
  return { id: data.id, title: data.title };
}

module.exports = { fetchPost };