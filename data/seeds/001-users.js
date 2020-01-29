exports.seed = function(knex) {
  return knex("users").insert([
    { username: "John", password: "pass", department: "HR" },
    { username: "Tom", password: "pass", department: "Sales" },
    { username: "Luke", password: "pass", department: "Logistics" }
  ]);
};
