const fs = require('fs');
const path = require('path');

const stylesPath = path.join(__dirname, 'styles');
const bundlePath = path.join(__dirname, 'project-dist', 'bundle.css');
const arrOfStyles = [];

fs.open(bundlePath, 'w', (error) => {
  console.error(error);
});

fs.readdir(stylesPath, (error, files) => {
  if (error) {
    console.error(error);
  }
  files.forEach((file) => {
    let filePath = path.join(stylesPath, file);

    fs.stat(filePath, (error, stats) => {
      if (error) {
        console.error(error);
      }
      if (stats.isFile() && path.extname(filePath) === '.css') {
        fs.readFile(filePath, 'utf-8', (error, data) => {
          if (error) {
            console.error(error);
          }
          arrOfStyles.push(data);
          
          fs.writeFile(bundlePath, arrOfStyles.join(''), (error) => {
            if (error) {
              console.error(error);
            }
          });
        });
      }
    });
  });
});
