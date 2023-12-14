const ChuongHoc = require("../models/ChuongHoc");
const PhanMuc = require("../models/PhanMuc");
const PhanLoai = require("../models/PhanLoai");
const BaiHoc = require("../models/BaiHoc");
const AppError = require("../utils/app_error");
const catchAsync = require("../utils/catch_async");

const neo4j = require("neo4j-driver");
const ObjectId = require("mongodb").ObjectId;
const driver = neo4j.driver("bolt://44.213.126.205:7687", neo4j.auth.basic("neo4j", "bunches-fireball-preserver"));

const session = driver.session({ database: "neo4j" });

exports.getSearch = catchAsync(async (req, res, next) => {
  const search = req.query.search;
  var queryNeo4js = "";

  // handle input from frontend
  const listSearchInput= search.split(",");
  const listSearchNeo4js = listSearchInput.map(item => item.trim());

  // get the type of query.
  if (listSearchNeo4js.length === 1) {
    queryNeo4js = `MATCH path = shortestPath((node1:Content{name:"`+ listSearchNeo4js[0] +`" })-[*]-(node2:Title_Lesson{}))
    WITH nodes(path) AS nodesOnPath
    WITH nodesOnPath, [node IN nodesOnPath | CASE WHEN "Title_Lesson" IN labels(node) THEN node.ID ELSE NULL END] AS titleLessonNodeIDs
    RETURN titleLessonNodeIDs;`;
  } else if (listSearchNeo4js.length === 2) {
    queryNeo4js = `MATCH path = shortestPath((node1:Content{name:"`+ listSearchNeo4js[0] +`" })-[*]-(node2:Content{name:"`+listSearchNeo4js[1] +`" }))
    WITH nodes(path) AS nodesOnPath
    WITH nodesOnPath, [node IN nodesOnPath | CASE WHEN "Title_Lesson" IN labels(node) THEN node.ID ELSE NULL END] AS titleLessonNodeIDs
    RETURN titleLessonNodeIDs;`;
  } else {
    console.log("else");
  }

  // get the list id result when query on Neo4js.
  const listIdNode = await session
    .run(queryNeo4js)
    .then((result) => {
      return result.records.map((record) => {
        console.log(record._fields[0]);
        return record._fields[0].filter((value) => value !== null).map((value) => new ObjectId(value));
      });
    })
    .catch((error) => {
      console.error(error);
    });

  // To get data in mongodb base on the list id result when query in Neo4js.
  const dataPhanLoai = PhanLoai.find({ _id: { $in: listIdNode } });
  const dataChuongHoc = ChuongHoc.find({ _id: { $in: listIdNode } });
  const dataPhanMuc = PhanMuc.find({ _id: { $in: listIdNode } });
  const dataBaiHoc = BaiHoc.find({ _id: { $in: listIdNode } });
  const data = await Promise.all([dataPhanLoai, dataChuongHoc, dataPhanMuc, dataBaiHoc]);

  return res.status(200).json({
    status: "success",
    data: {
      dataPhanLoai: data[0],
      chuongHoc: data[1],
      phanMuc: data[2],
      baiHoc: data[3],
    },
    meta: {
      search,
    },
  });
});
