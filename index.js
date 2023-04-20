const dotenv = require("dotenv")
const express = require("express");
const app = express()
const port = process.env.PORT || 5000
const cluster = require("cluster")
const os = require("node:os")
const { Connection } = require("./db")
dotenv.config()
const { Usermodel } = require("./app/Schemas/UsersSchema")

const cppus = os.cpus().length;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", ["GET", "POST"]);
  res.setHeader("Access-Control-Max-Age", 36000);
  next();
})

if (cluster.isMaster) {
  Connection()
  for (let i = 0; i < cppus; i++) {
    cluster.fork()
  }
}
else {

  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  app.use("/", require("./app/Routes/UserRoutes/UserRouter"))
  app.listen(port,()=>{
    console.log("Listening Worker Process at ", process.pid)
  })

}

// console.log(cluster)



