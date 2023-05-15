const app = require("./app");
const mongoose = require("mongoose");
const PORT = 8000;
const MONGO_URI =
  //   "mongodb+srv://chirag:chirag@123@cluster0.uqscvba.mongodb.net/?retryWrites=true&w=majority";
  "mongodb+srv://yash8194:yash8194@cluster0.eefe6vn.mongodb.net/?retryWrites=true&w=majority";

mongoose.connection.on("error", (err) => {
  console.error(err);
});

mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server Listning on ${PORT} ..`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
