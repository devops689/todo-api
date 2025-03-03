
const app = require('express')()
const cors = require('cors');
const { Tasks } = require('./models/tasks');

require("./db").connect();

(async () => {
  try {
    await Tasks.sync();
    console.log(">>> Tables Synced Successfully");
  } catch (error) {
    console.log(">>> Failed to Sync Tables: " + error);
    process.exit(1);
  }
})();

app.use(cors());

require("./routes/main")(app);

app.listen(process.env.SERVER_PORT || 3030, () => {
  console.log(`server listening on port ${process.env.SERVER_PORT || 3030}`)
});
