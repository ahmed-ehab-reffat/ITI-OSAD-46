const {Users} = require('../models');

async function create(data) {
  return await Users.create(data);
}

async function getAll() {
  return await Users.find({}, {firstName: 1, _id: 0}).exec();
}

async function deleteByID(id) {
  return await Users.deleteOne({_id: id}).exec();
}

async function edit(id, data) {
  return await Users.findOneAndUpdate({_id: id}, data, {
    returnDocument: 'after'
  });
}

module.exports = {create, getAll, deleteByID, edit};
