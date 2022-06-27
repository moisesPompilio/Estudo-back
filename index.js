const express = require('express');
const app = express();
const port = 3000;
const knex = require("./src/config/database")

app.use(express.json());
app.db = knex;

app.get('/', (req, res) => res.send('Hello World 100!'))
app.listen(port, () => console.log(`port ${port}!`))
