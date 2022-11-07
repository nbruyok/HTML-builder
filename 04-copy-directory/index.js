const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, 'files');
const destPath = path.join(__dirname, 'files-copy');

function copyFolder() {
  fs.mkdir(destPath, { recursive: true }, (error) => {
    if (error) {
      console.error(error);
    }

    fs.readdir(destPath, (error, files) => {
      if (error) {
        console.error(error);
      }
      files.forEach((file) => {
        fs.unlink(path.join(destPath, file), (error) => {
          if (error) {
            console.error(error);
          }
        });
      });
    });

    fs.readdir(folderPath, { withFileTypes: true }, (error, files) => {
      if (error) {
        console.error(error);
      }
      files.forEach((file) => {
        fs.copyFile(
          path.join(folderPath, file.name),
          path.join(destPath, file.name),
          (error) => {
            if (error) {
              console.error(error);
            }
          }
        );
      });
    });
  });
}

copyFolder();
