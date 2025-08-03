const { v4: uuidv4 } = require("uuid");

module.exports = {
  async up(db) {
    await db.createCollection("users", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["_id", "name", "email", "password", "user_type"],
          properties: {
            _id: {
              bsonType: "string",
              description: "Primary user ID, must be a UUID string",
            },
            name: {
              bsonType: "string",
              description: "Name is required",
            },
            email: {
              bsonType: "string",
              description: "Valid email required",
            },
            password: {
              bsonType: "string",
              description: "Password is required",
            },
            user_type: {
              enum: ["employer", "jobseeker"],
              description: "Must be 'employer' or 'jobseeker'",
            },
          },
        },
      },
    });

    await db.collection('users').createIndex({ email: 1 }, { unique: true });
  },

  async down(db) {
    await db.collection("users").drop();
  },
};