# Google Fonts Complete

A complete list of Google Fonts and their sources.

## Usage

``` js
var fonts = require('google-fonts-complete');

console.dir(fonts);
```

yields

``` json
{
    "ABeeZee": {
        "category": "sans-serif",
        "lastModified": "2015-04-06",
        "version": "v4",
        "variants": {
            ...
        }
    },
    ...
}
```

This list is generated from the [Google Fonts API].

## Using the generator

Create the `api-response.json` using a script:
```sh
npm run generateList {YOUR_API_KEY}
```
Or use the [Google Fonts API] to create `api-response.json` manually.

Then, use the generator to create `google-fonts.json`.

```sh
npm run generateFonts
```
or

```sh
node ./google-fonts-generator.js
```

[Google Fonts API]: https://developers.google.com/fonts/

## Razz-specific

After completing the generator steps above, an array of legacy fonts can then be generated and 
manually added to the google-fonts.json file.

For this step, use the legacy generator to create `google-fonts-legacy.json`.

```sh
npm run generateLegacyFonts
```
or

```sh
node ./generate-legacy-fonts.js
```

Add any legacy fonts found in google-fonts-legacy.json to the end of the google-fonts.json file.
