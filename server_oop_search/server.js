const mongoose = require("mongoose");
const dotenv = require("dotenv");

const http = require("http");

const app = require("./app");

const neo4j = require('neo4j-driver');

const server = http.createServer(app);

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log("Error: ", err);
  console.log(err.name, err.message);
  process.exit(1);
});
dotenv.config({ path: "./config.env" });

// npm install --save neo4j-driver
// node example.js

const driver = neo4j.driver('bolt://44.213.126.205:7687',
                  neo4j.auth.basic('neo4j', 'bunches-fireball-preserver'), 
                  {/* encrypted: 'ENCRYPTION_OFF' */});

const query =
  `
  MATCH path = shortestPath((node1:Content{name:'module-oriented programming'})-[*]-(node2:Content{name:'Ưu điểm'}))
WITH nodes(path) AS nodesOnPath
WITH nodesOnPath, [node IN nodesOnPath | CASE WHEN 'Title_Lesson' IN labels(node) THEN node.ID ELSE NULL END] AS titleLessonNodeIDs
RETURN titleLessonNodeIDs;
  `;

// const params = {"limit": "10"};

const session = driver.session({database:"neo4j"});

session.run(query)
  .then((result) => {
    result.records.forEach((record) => {
      console.log(record._fields[0]);
    });
    session.close();
    driver.close();
  })
  .catch((error) => {
    console.error(error);
  });


const DB = process.env.DATABASE;
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connected");
  });

const port = process.env.PORT || 8081;

server.listen(port, () => {
  console.log("Server đang chay tren cong", port);
});
process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log("Error: ", err);
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
