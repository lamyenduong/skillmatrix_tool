const MongoClient = require("mongodb").MongoClient;

const db_conn =
  "mongodb+srv://lamyenduong:Yen.Duong.2002@lamyenduong.jmhil0n.mongodb.net/?retryWrites=true&w=majority";
const db_name = "SkillMatrixTool";

let db_client;

async function connectToMongoDB() {
  try {
    db_client = await MongoClient.connect(db_conn, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

function getDb() {
  if (!db_client) {
    throw new Error("MongoDB client is not connected.");
  }
  return db_client.db(db_name);
}

module.exports = {
  connectToMongoDB,
  getDb,
};
