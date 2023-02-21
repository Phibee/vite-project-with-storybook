## React (Typescript) using Vite + Storybook

##### Create React (Typescript) with Vite

Getting Started

```jsx {.numberLines}
    // with NPM:
    npm create vite@latest <my-app-name>
    // or with Yarn:
    yarn create vite <my-app-name>
```

##### Import SVG in a React and Vite app

Install `vite-plugin-svgr` to import and transform SVGs into React components

```typescript {.numberLines}

// install vite-plugin-svgr
yarn add vite-plugin-svgr

// vite.config.js
import svgr from "vite-plugin-svgr";

export default {
      // ...
      plugins: [svgr()],
};

```

then add file `vite-env.d.ts` and reference it to `tsconfig.json`

```typescript {.numberLines}
{
     //...
      "include": ["src", "./src/vite-env.d.ts"],
}
```

```typescript {.numberLines}
// vite-env.d.ts

declare module '*.svg' {
  import * as React from 'react';

  export const ReactComponent: React.FunctionComponent<
    React.ComponentProps<'svg'> & { title?: string }
  >;
}
```

Now we can now import svg file on your react app.

```typescript {.numberLines}
import { ReactComponent as YourSvg } from '/path/to/image.svg';

const App = () => {
  return (
    <div className="App">
      <YourSvg /> // <-- here's your svg component
    </div>
  );
};
export default App;
```

<br/>

#### Storybook for Webpack 5

```typescript {.numberLines}
    cd <my-app-name>

    // to add storybook with webpack5 builder
    npx sb init --builder webpack5
```

##### Import SVG in Storybook

With `Vite` normally you might encountered issue loading the `SVG` on the storybook but works well on your React app. We could fix this by using `webpack` configuration in `.storybook/main.js`. We also need to install `@svgr/webpack` and `file-loader` package.

```jsx {.numberLines}
    // YARN:
    yarn add @svgr/webpack file-loader
```

```diff {.numberLines}
// package.json

 "dependencies": {
+            "@svgr/webpack": "^6.5.1",
+            "file-loader": "^6.2.0",
            "react": "^18.2.0",
            "react-dom": "^18.2.0",
            "vite-plugin-svgr": "^2.4.0"
},
```

now we can extend the Storybook's Webpack config in `.storybook/main.js` by adding the code below.

```diff {.numberLines}
// .storybook/main.js

module.exports = {
       // ...
+      webpackFinal: async (config, { configType }) => {
+                  // disable whatever is already set to load SVGs
+                  config.module.rules
+                      .filter((rule) => rule.test.test(".svg"))
+                      .forEach((rule) => (rule.exclude = /\.svg$/i));
+
+                  // add SVGR instead
+                  config.module.rules.push({
+                      test: /\.svg$/,
+                      use: [
+                              {
+                                  loader: "@svgr/webpack",
+                              },
+                              {
+                                  loader: "file-loader",
+                                  options: {
+                                          name: "static/media/[path][name].[ext]",
+                                  },
+                              },
+                      ],
+                      type: "javascript/auto",
+                      issuer: {
+                              and: [/\.(ts|tsx|js|jsx|md|mdx)$/],
+                      },
+                  });

+                  return config;
+          },
}
```

In addition, you might encounter error on `./storybook/preview.js` you may delete it temporarily. Also having warning saying DocGenPluginDeprecationWarning: .... You might consider adding this to your `.storybook/main.js`

```diff {.numberLines}
// storybook/main.js


module.exports = {
+            typescript: {
+               check: true,
+               reactDocgen: "react-docgen",
+            },

}
```

#### References:

- [Storybook for Webpack 5](https://storybook.js.org/blog/storybook-for-webpack-5/)
- [Vite for Bundler in Storybook](https://miyauchi.dev/posts/storybook-vite/)
