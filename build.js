import { readdir, writeFile, stat } from "node:fs/promises";
import http from 'node:http'
import { Buffer } from "node:buffer";
const domain = 'https://boyhack.com/'
const resultMap = [];
async function readDir(rootDir) {
  try {
    const files = await readdir(process.cwd() + "/" + rootDir);
    for (const file of files) {
      const stats = await stat(`${process.cwd()}/${rootDir}/${file}`);
      if (stats.isDirectory()) {
        await readDir(`${rootDir}/${file}`);
      } else {
        resultMap.push(rootDir + "-" + file);
      }
    }
  } catch (err) {
    console.error(err);
  }
}

function generateTemplate(data = []) {

  const menus = {};
  data.forEach((item) => {
    const [key, val] = item.split("-");
    const title = key.split("/").pop();
    const sidebar = val.split(".").shift();
    if (menus.hasOwnProperty(`/${key}/`)) {
      menus[`/${key}/`][0].items.push({
        text: sidebar,
        link: `/${key}/${sidebar}`,
      });
    } else {
      menus[`/${key}/`] = [
        {
          text: `${title}学习日记`,
          items: [{ text: sidebar, link: `/${key}/${sidebar}` }],
        },
      ];
    }
  });

  try {
    const controller = new AbortController();
    const { signal } = controller;
    const data = new Uint8Array(
      Buffer.from(`export default ` + JSON.stringify(menus)),
    );
    writeFile(`${process.cwd()}/.vitepress/theme/sidebar.ts`, data, {
      signal,
    }).then(() => {
      controller.abort();
    });
  } catch (err) {
    console.log(err);
  }
}

readDir("docs").then(() => {
  generateTemplate(resultMap);
});
