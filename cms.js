(function() {
  "use strict";
  var FoxxApplication = require("org/arangodb/foxx").Application,
    app = new FoxxApplication(applicationContext);

  var structs = app.createRepository(
    "structs",
    {
      repository: "repositories/structures"
    }
  );

  app.get('/list', function (req, res) {
    res.json(structs.getMonitored());
  })
  .summary("List all.")
  .notes("Gets a List of all monitored collections.");

  app.get('/structs/:name', function (req, res) {
    var name = req.params("name");
    res.json(structs.getStructs(name));
  })
  .pathParam("name", {
    description: "The name of a monitored collection",
    dataType: "string",
    required: true,
    multiple: false
  })
  .summary("Get Structs of collection")
  .notes("Gets the structural information of the given collection.");

  app.get('/content/:name', function (req, res) {
    var name = req.params("name");
    res.json(structs.getContent(name));
  })
  .summary("Get the content")
  .notes("Collects the complete content of one collection.");

  app.put("/content/:name/:key", function (req, res) {
    var name = req.params("name"),
      key = req.params("key"),
      data = JSON.parse(req.requestBody);
    res.json(structs.updateDoc(name, key, data));
  })
  .summary("Edit one entry")
  .notes("Edit one item of a collection.");

  app.del("/content/:name/:key", function (req, res) {
    var name = req.params("name"),
      key = req.params("key");
    res.json(structs.deleteDoc(name, key));
  })
  .summary("Delete one entry")
  .notes("Delete one item of a collection.");

  app.post("/content/:name/", function (req, res) {
    var name = req.params("name"),
      data = JSON.parse(req.requestBody);
    res.json(structs.createDoc(name, data));
  })
  .summary("Create a new entry")
  .notes("Create a new item in a collection.");


  app.get('/test/list', function (req, res) {
    res.json([{
      name: "String"
    },{
      name: "Number"
    }])
  })
  .summary("Test List")
  .notes("Test for List");


  app.get('/test/structs/:name', function (req, res) {
    var name = req.params("name");
    switch(name) {
      case "String":
        res.json({
          attributes: {
            name : {
              type: "string"
            }
          }
        });
        break;
      case "Number":
        res.json({
          attributes: {
            int : {
              type: "number"
            },
            double: {
              type: "number"
            }
          }
        });
        break;
      case "All":
        res.json({
          attributes: {
            int : {
              type: "number"
            },
            double: {
              type: "number"
            },
            name : {
              type: "string"
            }
          }
        });
        break;
      default:
        res.json("Error has to be done!");
    }
  })
  .summary("Test Structs")
  .notes("Test for Structs");

  app.get('/test/content/:name', function (req, res) {
    var name = req.params("name");
    switch(name) {
      case "String":
        res.json([{
          _id: "String/1",
          _rev: "1",
          _key: "1",
          name: "Test"
        }]);
        break;
      case "Number":
        res.json([{
          _id: "Number/1",
          _rev: "1",
          _key: "1",
          int: 4,
          double: 4.5
        }]);
        break;
      case "All":
        res.json([{
          _id: "All/1",
          _rev: "1",
          _key: "1",
          int: 4,
          double: 4.5,
          name: "Test"
        },{
          _id: "All/2",
          _rev: "2",
          _key: "2",
          int: 14,
          double: 14.5,
          name: "foxx"
        }]);
        break;
      default:
        res.json("Error has to be done!");
    }
  })
  .summary("Test Content")
  .notes("Test for Content");

}());
