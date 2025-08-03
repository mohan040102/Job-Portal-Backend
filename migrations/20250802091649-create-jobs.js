const { v4: uuidv4 } = require("uuid");

module.exports = {
  async up(db) {
    await db.createCollection("jobs", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["_id", "title", "description", "creator_id"],
          properties: {
            _id: {
              bsonType: "string",
              description: "Job ID, must be a UUID string",
            },
            title: {
              bsonType: "string",
              description: "Job title is required",
            },
            description: {
              bsonType: "string",
              description: "Job description is required",
            },
            creator_id: {
              bsonType: "string",
              description: "Must be a valid user ID (user._id)",
            },
          },
        },
      },
    });
  },

  async down(db) {
    await db.collection("jobs").drop();
  },
};
