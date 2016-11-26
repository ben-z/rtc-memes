const express = require('express');

const app = express();

app.use(express.static('./'));

const server = app.listen(3000, () => {
  console.log(`Server listening on port ${server.address().port}`);
});
