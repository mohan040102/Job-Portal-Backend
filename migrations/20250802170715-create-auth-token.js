module.exports = {
  async up(db, client) {
    await db.createCollection("auth_tokens", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["token", "user_id"],
          properties: {
            token: {
              bsonType: "string",
              description: "JWT or session token"
            },
            user_id: {
              bsonType: "string",
              description: "ID of the user"
            }
          }
        }
      }
    });
  },

  async down(db, client) {
    await db.collection("auth_tokens").drop();
  }
};