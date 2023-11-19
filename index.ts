import express from 'express';
import path from 'path';
import fs from 'fs';

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

function anchorData(dirent: fs.Dirent) {
  return {name: dirent.name, href: `/${dirent.name}/`};
}

app.get('/api/navigation', function (req, res) {
  const srcPath = path.join(__dirname, 'src');
  
  const subdirectories = fs.readdirSync(srcPath, { withFileTypes: true })
                           .filter(dirent => dirent.isDirectory())
                           .map(dirent => anchorData(dirent));
  
  res.json(subdirectories);
});

app.listen(port, () => {
  console.log('listening');
});
