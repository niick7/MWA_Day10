const mongoose = require("mongoose");

const locationSchema = mongoose.Schema({
  address: {
    type: String,
    require: true
  },
  city: {
    type: String,
    require: true
  },
  state: {
    type: String,
    require: true
  },
  zip: {
    type: String,
    require: true
  }
});

const jobSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
    unique: true
  },
  salary: {
    type: Number,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  experience: {
    type: String,
    require: true
  },
  skills: [String],
  postDate: Date,
  location: locationSchema
});

mongoose.model("Job", jobSchema, "jobs");