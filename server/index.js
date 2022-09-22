require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const errorMiddleware = require('./error-middleware');
const pg = require('pg');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();
app.use(express.json());
app.use(staticMiddleware);

app.get('/api/hello', (req, res) => {
  res.json({ hello: 'world' });
});

app.post('/api/entries', (req, res, next) => {
  const sql = `
      insert into "entries" ("content", "weather", "date", "userId")
      values ($1, $2, $3, $4)
      returning content
    `;
  const params = [req.body.content, req.body.weather, req.body.date, req.body.userId];
  db.query(sql, params)
    .then(result => {
      res.status(201).json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.get('/api/entries', (req, res, next) => {
  const sql = `
    select "content",
           "date",
           "weather"
      from "entries"
     where "userId" = $1
     order by "entryId" desc
  `;
  const params = [req.body.userId];
  db.query(sql, params)
    .then(result => {
      res.status(200).json(result.rows);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
