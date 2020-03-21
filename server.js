/*
This file instantiates a webserver to host our static website.
You shouldn't need to change anything here to add content to the site.
Feel free to change or contact the resposibles for the latests changes.
*/

const port = process.argv[2];

if (port) {
  const express = require("express");

  const app = express();

  app.use(express.static("."));

  app.listen(port, () => console.log(`Listening to ${port}!`);
} else {
  console.error(
    "Please, provide the port number as it follows:\n\n'yarn dev [PORT_NUMBER]'"
  );
}
