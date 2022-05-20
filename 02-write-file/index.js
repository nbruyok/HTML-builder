const fs = require('fs');
const path = require('path');
const { stdin, stdout } = require('process');

const stream = fs.createWriteStream(path.join(__dirname, 'text.txt'));

stdout.write('Write some text:\n');

stdin.on('data', function (chunk) {
  stream.write(chunk);

  if (chunk.toString().includes('exit')) {
    process.exit();
  }
});

process.on('exit', () => {
  stdout.write('\nBye, see you!\n');
});

process.on('SIGINT', () => {
  process.exit();
});
