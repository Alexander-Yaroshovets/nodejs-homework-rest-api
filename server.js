const app = require("./app");

// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000");
// });

// BI8Px77Z84duJ8Sp

// mongodb+srv://alexyaroshovets:BI8Px77Z84duJ8Sp@cluster0.bcfzb4n.mongodb.net/test

// const DB_HOST =
//   "mongodb+srv://alexyaroshovets:BI8Px77Z84duJ8Sp@cluster0.bcfzb4n.mongodb.net/contacts_reader?retryWrites=true&w=majority";

const { DB_HOST, PORT = 3000 } = process.env;

const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(app.listen(PORT))
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
