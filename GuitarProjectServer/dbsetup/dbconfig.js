const { connect } = require("mongoose");
const { insertAdmin } = require("../models/user.model");
const { insert_categories_toDB } = require("./categories_insert");
const { insert_guitars_toDB } = require("./guitars_insert");


const ConnectToDb = async () => {
  try {
    connect("mongodb://localhost/GuitarShop", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log("Connected to mongo.");
  } catch (error) {
    console.log(error);
  }
};

const insert_data_to_db = async () => {
  await insertAdmin()
  await insert_categories_toDB()
  await insert_guitars_toDB()

}

module.exports = { ConnectToDb, insert_data_to_db };
