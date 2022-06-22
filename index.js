// pull in memory db
const persist = require("./persist/memory");

//pull in mongo db
const mongodb = require("./persist/mongo");

//pull in server/app
const app = require("./server");

//put in command line flags
//npm install flags
const flags = require("flags");
flags.defineNumber("port", 3000, "ports for the https server to listen on ");
flags.parse();

// put in env vars
//npm install dotenv --save
const dotenv = require("dotenv");
const port = flags.get("port") || process.env.PORT || 4000;

mongodb.setUpConnectionHandlers(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
mongodb.connect();
