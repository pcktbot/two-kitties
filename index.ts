import express from 'express';
import path from 'path';

const app = express();
const port = 3000;

app.get('*', (req, res, next) => {
  console.log(req.path);
  next();
});


app.use(express.static(path.join(__dirname, 'src')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, req.path));
});

app.listen(port, () => {
  console.log('listening');
});
