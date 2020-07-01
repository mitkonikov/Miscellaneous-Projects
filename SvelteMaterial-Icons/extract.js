/**
 * Run this script using Node to extract all the Icons from Material UI as Svelte Components
 * 
 * You will need to download the Material UI repo from Github and set the ICONS_DIR
 * DEST_DIR is the destination directory of the Svelte Components
 * 
 * Material UI can change its documentation anytime, 
 * so there is NO guarantee that this will work.
 * 
 * The given svelte component AccessAlarm is the first icon, thus making it an example.
 */

const fs = require("fs");
const ICONS_DIR = 'C:/GitHub/material-ui-next/packages/material-ui-icons/src';
const DEST_DIR = 'C:/GitHub/Miscellaneous-Projects/SvelteMaterial-Icons/icons';

String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

const main = () => {
    let start = new Date();

    let dirContents = fs.readdirSync(ICONS_DIR);
    const template = fs.readFileSync(`${DEST_DIR}/_template.svelte`).toString();
    // console.log(template);

    for (let i = 0; i < dirContents.length; ++i) {
        if (dirContents[i] === "utils") continue;

        let fileContent = fs.readFileSync(`${ICONS_DIR}/${dirContents[i]}`).toString();
        let fileName = dirContents[i].replace(".js", ".svelte");
        fileContent = fileContent.replace(/\n/g, '');

        let pathObj = fileContent.match(/createSvgIcon\((.*?)\,/g);
        if (!pathObj) {
            // this happens on the index.js
            // so, nothing to really worry about
            if (fileName === "index.svelte") continue;
            console.log("Problem with file: ", fileName);
            continue;
        } else {
            pathObj = pathObj[0];
        }

        pathObj = pathObj.replace('createSvgIcon(', '');
        pathObj = pathObj.replaceAt(pathObj.length - 1, ' ');
        pathObj = pathObj.replace('<React.Fragment>', '');
        pathObj = pathObj.replace('</React.Fragment>', '');
        pathObj = pathObj.replace('</ React.Fragment>', '');
        pathObj = pathObj.trim();
        // console.log(pathObj);

        let data = template.replace("<!-- PLACE -->", pathObj);
        fs.writeFileSync(`${DEST_DIR}/${fileName}`, data);

        console.log(`Written icon ${fileName}`);
    }

    let end = new Date() - start;
    console.info('Execution time: %dms', end);
}

main();