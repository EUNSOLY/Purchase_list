// express연결
const express = require("express");
const app = express();

// 전달 받은 내용을 객체형태로 받을 수 있도록 해주는 (bodyparser대신사용?)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// mehotod연결
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

//몽고db
const { MongoClient } = require("mongodb");
const url =
  "mongodb+srv://EUNSOLY:Meunsol9632!!@cluster0.2n5a39e.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);

//ejs 문법사용, 정적폴더명연결
app.set("view engine", "ejs");
app.use("/public", express.static("public"));

// 라우트하기
async function main() {
  try {
    await client.connect();
    const postCollection = client.db("project3").collection("post");
    const counterCollection = client.db("project3").collection("counter");
    console.log("서버에 연결됬다");

    //GET
    app.get("/", async (req, res) => {
      // const query = {};
      const cursor = postCollection.find({});
      const result = (await cursor.toArray()).sort().reverse();
      res.render("index.ejs", { post: result });
    });

    app.get("/write", (req, res) => {
      res.render("write.ejs");
    });

    app.get("/detail/:id", async function (req, res) {
      const result = await postCollection.findOne({
        _id: parseInt(req.params.id),
      });
      console.log(result);
      res.render("detail.ejs", { data: result });
    });

    app.get("/edit/:id", async function (req, res) {
      const result = await postCollection.findOne({
        _id: parseInt(req.params.id),
      });
      res.render("edit.ejs", { post: result });
    });

    //POST
    app.post("/add", async function (req, res) {
      console.log(req.body.currentDate);
      const {
        productName,
        ProductAmount,
        ProductUrl,
        ProductExplanation,
        currentDate,
      } = req.body;
      const { totalcounter } = await counterCollection.findOne({
        name: "counter",
      });

      await postCollection.insertOne({
        _id: totalcounter + 1,
        name: productName,
        Amount: ProductAmount,
        Url: ProductUrl,
        Explanation: ProductExplanation,
        currentDate: currentDate,
      });
      await counterCollection.updateOne(
        { name: "counter" },
        { $inc: { totalcounter: 1 } }
      );
      res.redirect("/");
    });

    // DELETE
    app.delete("/delete", async function (req, res) {
      req.body._id = parseInt(req.body._id);
      await postCollection.deleteOne(req.body);
      res.status(200).send({ message: "성공" });
    });

    //PUT
    app.put("/edit", async (req, res) => {
      const { id, productName, ProductAmount, ProductUrl, ProductExplanation } =
        req.body;

      await postCollection.updateOne(
        { _id: parseInt(id) },
        {
          $set: {
            name: productName,
            Amount: ProductAmount,
            Url: ProductUrl,
            Explanation: ProductExplanation,
          },
        }
      );
      console.log("수정완료");
      res.redirect("/");
    });
  } finally {
    console.log("마무리");
  }
}

main().catch(console.dir);

app.listen(8080, function () {
  console.log("8080서버 출력중");
});
