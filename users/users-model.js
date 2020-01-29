const db = require("../data/dbConfig");

module.exports = {
  findUsers,
  add,
  findBy,
  findById
};

function findUsers() {
  return db("users").select("id", "username", "department");
}

function findBy(filter) {
  return db("users")
    .select("id", "username", "password", "department")
    .where(filter);
}

function add(user) {
  return db("users")
    .insert(user, "id")
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}

function findById(id) {
  return db("users")
    .select("id", "username", "department")
    .where({ id })
    .first();
}
