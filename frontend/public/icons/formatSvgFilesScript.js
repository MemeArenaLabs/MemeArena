const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

// The script is now in the same directory as the SVG files
const svgDir = __dirname;

async function modifySvgFiles() {
  try {
    const files = await readdir(svgDir);

    for (const file of files) {
      if (path.extname(file) === ".svg") {
        const filePath = path.join(svgDir, file);
        let content = await readFile(filePath, "utf8");

        // Remove width and height attributes
        content = content.replace(/width="[^"]*"/, "");
        content = content.replace(/height="[^"]*"/, "");

        // Add width="100%" height="100%"
        content = content.replace(/<svg/, '<svg width="100%" height="100%"');

        // Change fill to currentColor if it's not already
        if (!content.includes('fill="currentColor"')) {
          content = content.replace(/fill="[^"]*"/, 'fill="currentColor"');
          // If there's no fill attribute, add it
          if (!content.includes("fill=")) {
            content = content.replace(/<svg/, '<svg fill="currentColor"');
          }
        }

        await writeFile(filePath, content);
        console.log(`Modified ${file}`);
      }
    }

    console.log("All SVG files have been modified.");
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

modifySvgFiles();
