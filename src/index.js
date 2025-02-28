
const app = require('express')()
const cors = require('cors');
const { Tasks } = require('./models/tasks');

require("./db").connect();

(async () => {
  try {
    await Tasks.sync();
    return res.status(200).send(">>> Tables Synced Successfully");
  } catch (error) {
    return res.status(500).send(">>> Failed to Sync Tables: " + error);
  }
})();

app.use(cors());

require("./routes/main")(app);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`server listening on port ${process.env.SERVER_PORT}`)
});
