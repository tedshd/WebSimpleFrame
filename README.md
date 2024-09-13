# load_frame

A Lightweight Web Framework Design

This framework is designed to be lightweight by avoiding the use of heavy libraries.

## feature

* Native JavaScript: Utilizes standard JavaScript without relying on external libraries.
* JavaScript Modules: Uses native JavaScript modules [JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
* Load Fetch Functionality: Implements a loadFetch function similar to jQuery's load() method.
* Internationalization (i18n): Built-in support for multiple languages.
* SimpleStore: Provides a global data storage solution with methods for managing data:

## Struct

* components/: Contains UI component pages.
* locale/: Holds language JSON files for internationalization.
* utils/: Includes utility JavaScript functions.
* index.html: The main HTML file for the application.
* script.js: The main JavaScript file for the application.
* style.css: The main CSS file for the application.

## Flexibility

* Page Placement: Place your main pages in the root folder.
* UI Components: Store UI component pages in the components folder.
* Language Files: Place language JSON files in the locale folder.
* Utility Functions: Put JavaScript functions in the utils folder.
* Styling: You can either:
  * Include all styles in `style.css`, or
  * Create a `styles` folder for additional CSS files and use `@import` to include them in style.css. [Learn more about CSS @import](https://developer.mozilla.org/en-US/docs/Web/CSS/@import).

## Recommended Development Approach

Each page should be independent.

For example: `index.html`, `member.html`, `setting.html`.

Each page should include `script.js` and `style.css`.

JavaScript specific to each page should be included directly within the individual page files, as shown in the examples below.

```html
<!-- index.html -->
<script type="module">
// put index JavaScript
</script>

<!-- setting.html -->
<script type="module">
// put setting JavaScript
</script>
```

JavaScript for individual components should also be placed within the respective component files, following the example usage as demonstrated above.

If you need to perform initialization tasks (such as setting up configurations) at the beginning, you can include the necessary code in the initialization function within `script.js`.

Styles for components can be kept separate to facilitate easier adjustments.

Use `simpleStore` for global data management.

CSS naming conventions should ideally follow a modular approach (such as OOCSS, SMACSS, BEM, etc.).

## Function

### loadFetch

* loadFetch(parentDom, path): `parentDom` is the container where the content will be placed, and `path` is the HTML file path.

### simpleStore

* simpleStore.set(key, value): Store a value associated with a key.
* simpleStore.get(key): Retrieve the value associated with a key.
* simpleStore.delete(key): Remove the value associated with a key.
* simpleStore.list(): List all stored keys and their associated values.

### translate

* translate.getLangKey(key): `key` is the language file JSON key.
* translate.getLangKey(key, object): `key` is the language file JSON key, and `object` is a JSON object used to match keys in the language JSON.

example:

```javascript
var index = 1;
translate.getLangKey('current_page', {
    'current_index': index
})
```

`en-US.json`

```json
{
    "current_page": "This is page {current_index}"
}
```