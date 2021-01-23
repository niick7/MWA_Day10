const mongoose = require("mongoose");
const dbUrl = "mongodb://localhost:27017/JobsDB";
require("./models/jobs");

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});
mongoose.connection.on("connected", function(){
  console.log("MongoDB connected.");
});
mongoose.connection.on("disconnected", function(){
  console.log("MongoDB disconnected.");
})
mongoose.connection.on("error", function(err){
  console.log("MongoDB error:", err);
})

process.on("SIGINT", function(){
  mongoose.connection.close(function(){
    console("SIGINT: Mongo disconnected by app termination");
    process.exit(0);
  })
})
process.on("SIGTERM", function(){
  mongoose.connection.close(function(){
    console("SIGTERM: Mongo disconnected by app termination");
    process.exit(0);
  })
})
process.on("SIGUSR2", function(){
  mongoose.connection.close(function(){
    console("SIGUSR2: Mongo disconnected by app termination");
    process.kill(process.pid, "SIGUSR2");
  })
})