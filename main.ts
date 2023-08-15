import { DOM } from "https://deno.land/x/deno_dom@v0.1.38/src/dom/selectors/nwsapi-types.ts";
import puppeteer from "https://deno.land/x/puppeteer@16.2.0/mod.ts";

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.goto("file:///D:/MEGA/GitHub/alaminkouser/deno-mermaid/inputs/index-00000001.html");
//await page.goto('https://example.com'); // Replace with your webpage URL

  // Evaluate JavaScript in the context of the page to extract SVG elements
  const svgElements = await page.evaluate(() => {
    const svgArray: string[] = [];
    const svgNodes = document.querySelectorAll('svg'); // Change the selector as needed

    svgNodes.forEach(svgNode => {
      svgArray.push(svgNode.outerHTML); // Store the outerHTML of each SVG element
    });

    return svgArray;
  });

  await Deno.mkdir("./svgFiles")
  for(let i = 0; i < svgElements.length; i ++) {
    await Deno.writeTextFile("./svgFiles/" + i + ".svg", svgElements[i]);
  }

await browser.close();
