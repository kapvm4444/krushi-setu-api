const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const mongoose = require('mongoose');

process.on('uncaughtException', (error) => {
  console.log(`Uncaught Exception [SYNTAX!] 💥🔹`);
  console.log(`${error.name} => ${error.message}`);
});

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log('CLOUD Database Connected Successfully');
  });

const app = require('./app');

const port = process.env.PORT || 5050;
const server = app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});

process.on('unhandledRejection', (error) => {
  console.log(`Unhandled Rejection 💥`);
  console.log(`${error.name} => ${error.message}`);
  server.close(() => {
    process.exit(1);
  });
});
