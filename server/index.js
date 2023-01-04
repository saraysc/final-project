require('dotenv/config');
const path = require('path');
const pg = require('pg');
const express = require('express');
const ClientError = require('./client-error');

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
app.use(staticMiddleware);
app.use(express.json());

app.post('/api/groups', uploadsMiddleware, (req, res, next) => {
  const { groupName, caption } = req.body;
  if (!caption || !groupName) {
    throw new ClientError(400, 'caption is a required field');
  }
  const url = path.join('/images', req.file.filename);
  const sql = `
  insert into "groups" ("groupName","url","caption")
  values ($1,$2,$3)
  returning *
  `;
  const params = [groupName, url, caption];
  db.query(sql, params)
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

app.get('/api/groups/', (req, res, next) => {
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
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
