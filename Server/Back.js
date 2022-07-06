var express = require("express");
var bodyParser = require("body-parser");
var app = express();
const fileupload = require("express-fileupload");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(fileupload());
app.use(express.static("files"));

// var MongoClient = require("mongodb").MongoClient;
// var url = "mongodb://localhost:27017/mydb";

// MongoClient.connect(url, function (err, db) {
//   if (err) throw err;
//   console.log("Database created!");
//   db.close();
// });

// var MongoClient = require("mongodb").MongoClient;
// var url = "mongodb://localhost:27017/";

// MongoClient.connect(url, function (err, db) {
//   if (err) throw err;
//   var dbo = db.db("mydb");
//   dbo.createCollection("Order", function (err, res) {
//     if (err) throw err;
//     console.log("Collection created!");
//     db.close();
//   });
// });

// var MongoClient = require("mongodb").MongoClient;
// var url = "mongodb://localhost:27017/";

// MongoClient.connect(url, function (err, db) {
//   if (err) throw err;
//   var dbo = db.db("mydb");
//   var myquery = { name: "Company Inc" };
//   dbo.collection("customers").deleteOne(myquery, function (err, obj) {
//     if (err) throw err;
//     console.log("1 document deleted");
//     db.close();
//   });
// });

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/users", function (req, res) {
  var MongoClient = require("mongodb").MongoClient;
  var url = "mongodb://localhost:27017/";

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo
      .collection("User")
      .find({})
      .toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        res.json({ result });
        db.close();
      });
  });
});

app.post("/users", function (req, res) {
  var post_body = req.body;
  res.json({ msg: "succesfull" });

  var MongoClient = require("mongodb").MongoClient;
  var url = "mongodb://localhost:27017/";

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myobj = post_body;
    dbo.collection("User").insertOne(myobj, function (err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
  });
});

app.get("/restuarant", function (req, res) {
  var MongoClient = require("mongodb").MongoClient;
  var url = "mongodb://localhost:27017/";

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo
      .collection("Restuarant")
      .find({})
      .toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        res.json({ result });
        db.close();
      });
  });
});

app.post("/restuarant", function (req, res) {
  var post_body = req.body;
  const newpath = __dirname + "/../images/";
  const file = req.files.file;
  console.log(newpath);
  const filename = post_body.resName + "." + req.files.file.name.split(".")[1];
  res.json({ msg: "succesfull" });

  var MongoClient = require("mongodb").MongoClient;
  var url = "mongodb://localhost:27017/";

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myobj = post_body;
    myobj = { ...myobj, path: newpath + filename };
    console.log(myobj);
    dbo.collection("Restuarant").insertOne(myobj, function (err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
  });

  // var MongoClient = require("mongodb").MongoClient;
  // var url = "mongodb://localhost:27017/";

  // MongoClient.connect(url, function (err, db) {
  //   if (err) throw err;
  //   var dbo = db.db("mydb");
  //   dbo.createCollection(post_body.resName, function (err, res) {
  //     if (err) throw err;
  //     console.log("Collection created!");
  //     db.close();
  //   });
  // });

  file.mv(`${newpath}${filename}`, (err) => {
    if (err) throw err;
  });

  const newpath2 = "C:/Users/HP/Desktop/my-app/public/restuarent/";
  file.mv(`${newpath2}${filename}`, (err) => {
    if (err) throw err;
  });

  fs.mkdir(path.join(__dirname + "/../images/", post_body.resName), (err) => {
    if (err) {
      return console.error(err);
    }
    console.log("Directory created successfully!");
  });

  fs.mkdir(
    path.join(
      "C:/Users/HP/Desktop/my-app/public/restuarent/",
      post_body.resName
    ),
    (err) => {
      if (err) {
        return console.error(err);
      }
      console.log("Directory created successfully!");
    }
  );
});

app.post("/restuarantfood", function (req, res) {
  var post_body = req.body;
  const newpath = __dirname + "/../images/" + post_body.resName + "/";
  const file = req.files.file;
  const filename = post_body.foodName + "." + req.files.file.name.split(".")[1];
  res.json({ msg: "succesfull" });

  var MongoClient = require("mongodb").MongoClient;
  var url = "mongodb://localhost:27017/";

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myobj = post_body;
    myobj = { ...myobj, path: newpath + filename };
    console.log(myobj);
    dbo.collection("Food").insertOne(myobj, function (err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
  });

  file.mv(`${newpath}${filename}`, (err) => {
    if (err) throw err;
  });

  const newpath2 =
    "C:/Users/HP/Desktop/my-app/public/restuarent/" + post_body.resName + "/";
  file.mv(`${newpath2}${filename}`, (err) => {
    if (err) throw err;
  });

  // var MongoClient = require("mongodb").MongoClient;
  // var url = "mongodb://localhost:27017/";

  // MongoClient.connect(url, function (err, db) {
  //   if (err) throw err;
  //   var dbo = db.db("mydb");
  //   dbo.createCollection(filename.split(".")[0], function (err, res) {
  //     if (err) throw err;
  //     console.log("Collection created!");
  //     db.close();
  //   });
  // });
});

app.get("/restuarantfood/:name", function (req, res) {
  var MongoClient = require("mongodb").MongoClient;
  var url = "mongodb://localhost:27017/";
  console.log("-------------------------------------");
  console.log(req.params.name);

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo
      .collection("Food")
      .find({ resName: req.params.name })
      .toArray(function (err, result) {
        if (err) throw err;
        res.json({ result });
        db.close();
      });
  });
});

// app.post("/upload", (req, res) => {
//   const newpath = __dirname + "/../images/";
//   const file = req.files.file;

//   const filename = req.body.fileName;

//   file.mv(`${newpath}${filename}`, (err) => {
//     if (err) {
//       res.status(500).send({ message: "File upload failed", code: 200 });
//     }
//     res.status(200).send({ message: "File Uploaded", code: 200 });
//   });
// });

app.post("/order", function (req, res) {
  var post_body = req.body;
  console.log(post_body);
  res.json({ msg: "succesfull" });

  var MongoClient = require("mongodb").MongoClient;
  var url = "mongodb://localhost:27017/";

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myobj = post_body;
    console.log(myobj);
    dbo.collection("Order").insertOne(myobj, function (err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
  });
});

app.get("/order/:name", function (req, res) {
  var MongoClient = require("mongodb").MongoClient;
  var url = "mongodb://localhost:27017/";
  console.log("-------------------------------------");
  console.log(req.params.name);

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo
      .collection("Order")
      .find({ UserName: req.params.name })
      .toArray(function (err, result) {
        if (err) throw err;
        res.json({ result });
        db.close();
      });
  });
});

app.get("/ResOrder/:name", function (req, res) {
  var MongoClient = require("mongodb").MongoClient;
  var url = "mongodb://localhost:27017/";
  console.log("-------------------------------------");
  console.log(req.params.name);

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo
      .collection("Order")
      .find({ resName: req.params.name })
      .toArray(function (err, result) {
        if (err) throw err;
        res.json({ result });
        db.close();
      });
  });
});

app.post("/comment", function (req, res) {
  var post_body = req.body;
  console.log(post_body);
  res.json({ msg: "succesfull" });

  var MongoClient = require("mongodb").MongoClient;
  var url = "mongodb://localhost:27017/";

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myobj = post_body;
    console.log(myobj);
    dbo.collection("Comment").insertOne(myobj, function (err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
  });
});

app.get("/comment/:resname/:foodname", function (req, res) {
  var MongoClient = require("mongodb").MongoClient;
  var url = "mongodb://localhost:27017/";
  console.log("-------------------------------------");
  console.log(req.params.resname);

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo
      .collection("Comment")
      .find({
        resName: req.params.resname,
        foodName: req.params.foodname,
        seen: "1",
      })
      .toArray(function (err, result) {
        if (err) throw err;
        res.json({ result });
        db.close();
      });
  });
});

app.post("/delete", function (req, res) {
  var post_body = req.body;
  console.log(post_body);
  res.json({ msg: "succesfull" });

  var MongoClient = require("mongodb").MongoClient;
  var url = "mongodb://localhost:27017/";

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myquery = { resName: post_body.resName, foodName: post_body.foodName };
    dbo.collection("Food").deleteOne(myquery, function (err, obj) {
      if (err) throw err;
      console.log("1 document deleted");
      db.close();
    });
  });
});

app.post("/updateComment", function (req, res) {
  var post_body = req.body;
  console.log(post_body);
  res.json({ msg: "succesfull" });

  var MongoClient = require("mongodb").MongoClient;
  var url = "mongodb://127.0.0.1:27017/";

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myquery = {
      resName: post_body.resName,
      foodName: post_body.foodName,
      seen: "0",
    };
    var newvalues = { $set: { seen: "1" } };
    dbo
      .collection("Comment")
      .updateOne(myquery, newvalues, function (err, res) {
        if (err) throw err;
        console.log("1 document updated");
        db.close();
      });
  });
});

app.post("/deleteComment", function (req, res) {
  var post_body = req.body;
  console.log(post_body);
  res.json({ msg: "succesfull" });

  var MongoClient = require("mongodb").MongoClient;
  var url = "mongodb://localhost:27017/";

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myquery = {
      resName: post_body.resName,
      foodName: post_body.foodName,
      seen: "0",
    };
    dbo.collection("Comment").deleteOne(myquery, function (err, obj) {
      if (err) throw err;
      console.log("1 document deleted");
      db.close();
    });
  });
});

app.get("/adminComment", function (req, res) {
  var MongoClient = require("mongodb").MongoClient;
  var url = "mongodb://localhost:27017/";
  console.log("-------------------------------------");
  console.log(req.params.resname);

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo
      .collection("Comment")
      .find({
        seen: "0",
      })
      .toArray(function (err, result) {
        if (err) throw err;
        res.json({ result });
        db.close();
      });
  });
});

app.post("/deleteRestuarant", function (req, res) {
  var post_body = req.body;
  console.log(post_body);
  res.json({ msg: "succesfull" });

  var MongoClient = require("mongodb").MongoClient;
  var url = "mongodb://localhost:27017/";

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myquery = {
      resName: post_body.resName,
    };
    dbo.collection("Restuarant").deleteOne(myquery, function (err, obj) {
      if (err) throw err;
      console.log("1 document deleted");
      db.close();
    });
  });
});

app.post("/deleteUser", function (req, res) {
  var post_body = req.body;
  console.log(post_body);
  res.json({ msg: "succesfull" });

  var MongoClient = require("mongodb").MongoClient;
  var url = "mongodb://localhost:27017/";

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myquery = {
      name: post_body.userName,
    };
    dbo.collection("User").deleteOne(myquery, function (err, obj) {
      if (err) throw err;
      console.log("1 document deleted");
      db.close();
    });
  });
});

app.listen(4000, function () {
  console.log("Example app listening on port 4000!");
});
