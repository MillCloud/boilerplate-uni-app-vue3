/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';

console.log('Patching dist/mp-alipay/pages/**/*.axml ...');

const handleAddPageMeta = (pagesDirPath: string) => {
  // make sure exist
  if (!fs.existsSync(pagesDirPath)) {
    console.log('Done with not exist.');
    return;
  }

  // get pages dir
  const pagesDir = fs.readdirSync(pagesDirPath);

  // deal with .axml
  const axmls = pagesDir.filter((item) => item.endsWith('.axml'));
  axmls.forEach((axml) => {
    const axmlPath = path.resolve(pagesDirPath, axml);
    const axmlContent = fs.readFileSync(axmlPath, {
      encoding: 'utf-8',
    });
    if (!axmlContent.startsWith('<page-meta root-font-size="16px"></page-meta>')) {
      fs.writeFileSync(axmlPath, `<page-meta root-font-size="16px"></page-meta>${axmlContent}`);
    }
  });

  // deal with folder
  const dirs = pagesDir.filter((item) => !item.includes('.'));
  dirs.forEach((dir) => {
    handleAddPageMeta(path.resolve(pagesDirPath, dir));
  });
  console.log('Done with exists.');
};

handleAddPageMeta(path.resolve('dist', 'mp-alipay', 'pages'));
/* eslint-enable no-console */