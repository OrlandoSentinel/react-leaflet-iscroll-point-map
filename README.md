# GeoJSON point map powered by React, Leaflet and iScroll
It's responsive and fast-loading. It's easily customizable. It's a work in progress.

## Technology
+ Derives from this [React template](https://github.com/OrlandoSentinel/react-webpack-single-page-app)
+ Node.js >= 4.2.0
+ [React.js](https://facebook.github.io/react/)
+ [Leaflet.js](http://leafletjs.com/)
+ [iScroll.js](https://github.com/cubiq/iscroll)
+ [React iScroll](https://www.npmjs.com/package/react-iscroll)

## Prior knowledge recommended
+ [Sass](http://sass-lang.com/) and [BEM](http://getbem.com/introduction/)
+ Check out this [ES6 breakdown](https://github.com/lukehoban/es6features)
+ Check out this [React tutorial](https://facebook.github.io/react/docs/tutorial.html)
+ Check out these [Webpack demos](https://github.com/ruanyf/webpack-demos)
+ Watch all 24 hours of [this video](http://24hoursofhappy.com/)

## Getting started
1. Download the repository
2. Install dependencies: `npm install`
3. Open **/src/json/data.json** and replace it with your GeoJSON. Add whatever information you want to appear in info boxes to a feature's properties. (Note: this template only supports the Line geometry type.)
4. Open **/src/components/List.js**. In the `render()` method of the List component, send the relevant props to each ListItem component.
5. In the same file, edit the ListItem component to display the props you just passed it.
6. If you want the map dots colored based on GeoJSON properties, open **/src/components/Map.js**. Then, find the `getPointColor()` method and edit it accordingly.
7. Start the development server: `npm run dev`. This will run the project on port 3000 and enable hot-module replacement thanks to Webpack.
8. At this point, you'll probably want to adjust the styles (if you don't, that's weird because everything is OS-specific). This project uses Sass, and the base file lives in **/src/scss/app.scss**. Component-specific partials are imported. You'll notice that app.scss is `require`d in the root component (**/src/components/App.js**). This is so styles will also be hot reloaded.
9. Happy? Build for production: `npm run prod`. This will bundle your JavaScript together and transform it from ES6 JSX to ES5 JavaScript. It will also combine all styles into a single stylesheet that has vendor prefixes added by PostCSS's iteration of Autoprefixer.
10. Everything you need for production is now in the **/public/** directory.

## Notes
We know there is a [Leaflet component](https://github.com/PaulLeCam/react-leaflet) for React. In a few attempts, we haven't found it as easy as just using plain Leaflet and attaching a map to the DOM. But we'll keep checking back.

The info boxes have a default width of 200px and height of 195px. You might need to adjust these in **/src/scss/_list.scss** if you add lots of stuff to each info box. Also note that the box width and margin between each box are used in **/src/components/List.js** to calculate the width of the iScroll slider. If you need to change them, look for the variables in **/src/constants.js**.

We have the page header hard-coded in **/public/index.html** with embedded styles. This is for page performance and SEO.

The map overlay with the "View map" button is for usability. It's annoying when you visit a page, scroll down and then accidentally move the map center to the middle of Antarctica. Here, the map is locked until a user is ready to use it.

If you're including images in the info boxes, only put the file name in the GeoJSON. The path goes in the image source in **/src/components/List.js**. This is so Webpack doesn't freak out.

## Stuff to do
+ Add arrows to the map that move it to the next point
+ Add a Key component that automatically builds a map key based on the GeoJSON

## License
MIT