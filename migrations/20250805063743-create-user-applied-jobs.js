module.exports = {
  async up(db, client) {
    await db.createCollection("user_applied_jobs", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["job_id", "user_id"],
          properties: {
            job_id: {
              bsonType: "objectId",
              description: "must be a valid ObjectId referring to a job"
            },
            user_id: {
              bsonType: "objectId",
              description: "must be a valid ObjectId referring to a user"
            },
            applied_at: {
              bsonType: "date",
              description: "optional field to track when the job was applied"
            }
          }
        }
      }
    });

    await db.collection("user_applied_jobs").createIndex({ job_id: 1 });
    await db.collection("user_applied_jobs").createIndex({ user_id: 1 });
    await db.collection("user_applied_jobs").createIndex({ user_id: 1, job_id: 1 }, { unique: true });
  },

  async down(db, client) {
    await db.collection("user_applied_jobs").drop();
  }
};
