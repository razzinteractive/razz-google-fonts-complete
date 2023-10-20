const fs = require('fs');
const _ = require('lodash');

/**
 * This script lets you find the legacy fonts Google no longer publishes but still supports.  Run this
 * script to generate that list for including in the new main fonts file.
 *
 * 1. Make a copy of the previous google-fonts.json file named google-fonts-old.json
 * 2. Run `npm run generateFonts` (to generate the new google-fonts.json file)
 * 3. Run `npm run generateLegacyFonts` (to get a list of fonts used in the old file but missing in the latest)
 * 4. Append the json from google-fonts-legacy.json to google-fonts.json
 *
 * The final google-fonts.json file will include the latest google fonts while including support for deprecated fonts.
 */
function compareFontLists(oldFilePath, newFilePath) {
    try {
        const oldFonts = JSON.parse(fs.readFileSync(oldFilePath, {encoding: 'utf8'}));
        const oldFontsKeys = _.keys(oldFonts);
        const newFontsKeys = _.keys(JSON.parse(fs.readFileSync(newFilePath, {encoding: 'utf8'})));

        const missingInNew = _.difference(oldFontsKeys, newFontsKeys);
        console.log('Fonts missing in the latest Google Fonts version....');
        _.each((missingInNew), (key, index) => {
            console.log(`${index + 1}. ${key}`);
        });

        console.log('----------------------------\n');

        console.log('Generating legacy fonts json....');

        const missing = {};
        if (_.isEmpty(missingInNew)) {
            missing.message = 'No missing fonts';
        }
        else {
            _.each((missingInNew), (key) => {
                missing[key] = oldFonts[key];
            });
        }

        fs.writeFileSync('google-fonts-legacy.json', JSON.stringify(missing, null, 4));

        console.log(`Finished.  Added ${missingInNew.length} fonts to google-fonts-legacy.json.`);
        console.log('Instructions:');
        console.log('Append the fonts in this file to the end of the google-fonts.json file to continue support for apps using legacy fonts.\n');

    } catch(err) {
        console.log('Error in legacy fonts generator:', err);
    }
}
compareFontLists('google-fonts-old.json', 'google-fonts.json');
