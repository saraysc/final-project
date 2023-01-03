require('dotenv/config');
const path = require('path');
const pg = require('pg');
const ClientError = require('./client-error');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const errorMiddleware = require('./error-middleware');
const uploadsMiddleware = require('./uploads-middleware');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();
const publicPath = path.join(__dirname, 'public');

app.use(staticMiddleware);
app.use(express.static(publicPath));
app.use(express.json());

app.get('/api/groups', uploadsMiddleware, (req, res, next) => {
  const groupData = req.body;
  if (!groupData) {
    throw new ClientError(400, 'input is a required field');
  }
  // const url = path.join('/images', req.file.filename);
  const sql = `
    insert into "groups" ("groupInfo", "groupPicture", "groupName")
    values ($1,$2,$3)
    returning *
  `;
  const params = [groupData];
  db.query(sql, params)
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

app.get('/api/groups', (req, res, next) => {
  const sql = `
    select *
      from "groups"
  `;
  db.query(sql)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
