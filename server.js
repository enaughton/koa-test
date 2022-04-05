//Import Koa
const path = require("path");
const koa = require("koa");
const Router = require("koa-router");
const PORT = process.env.PORT || 4000;
const EJS = require("koa-ejs");

//Create Koa Application
const app = new koa();
// Create a router
const router = new Router();

//EJS
EJS(app, {
  root: path.join(__dirname, "views"),
  layout: "layout",
  viewExt: "ejs",
  cache: false,
  debug: true,
});

//create a route
router
  .get("/", (ctx, next) => {
    //
    ctx.body = {
      hello: "World",
    };
  })
  // Note the use of an async function for this route
  .get("/cool/:param", async (ctx, next) => {
    // We pass a string of which ejs file from views to render and an object with some data to use in the template
    await ctx.render("index", {
      param: ctx.params.param,
    });
  });

//Register Routes with the app
app.use(router.routes());

//listening to server
app.listen(PORT, () => {
  console.log(`The Server is listening on ${PORT}`);
});
