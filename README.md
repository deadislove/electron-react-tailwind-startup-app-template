# Electron + Rreact + TailwindCSS

![License](https://img.shields.io/badge/License-MIT-blue.svg)

> This project is based on the official implementation Electron tutorial. I also added the popular React and Redux packages. You will find out the react entry point is based on the index.html to implement it, and I use the dotenv library and the @redux/toolkit library to improve the redux ecology when the state is complex. In the security part, the project turns on the CSP, so you will find out the .env file has API URL and other values, but it has passed the ipcRender and through ipcMain to return the related value. When the electron app runs on the product environment, the ipcMain return value won't directly call or watch in the dev tool's console dashboard.

#### Project related version information

Electron version: 33+

React version: 18+

# How to use it

Step 1 Install npm packages
```
npm install
```

Step 2 Run the project.
```
npm start
```

# Setup 

- Step 1 Setup Electron app (Official Tutorial)
- Step 2 Adding React in the Electron app proejct

### Electron part:
```
// main.js
const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            devTools: true, // Enable DevTools
        }
    });

    mainWindow.loadFile('index.html'); // Load the React entry point
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
```

```
<!--index.html-->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Electron React App</title>
</head>
<body>
    <div id="root"></div> <!-- React will mount here -->
    <script src="./dist/bundle.js"></script> <!-- Will be created by Webpack/Vite -->
</body>
</html>
```

### React part:

Step 2.1 Install React and ReactDOM
```
npm install react react-dom
```
Step 2.2 Install development tools:
```
npm install --save-dev @babel/core @babel/preset-env @babel/preset-react webpack webpack-cli webpack-dev-server babel-loader
```
Step 2.3 Create ```src``` folder and React entry poing:
```
// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';

function App() {
    return <h1>Hello, Electron with React!</h1>;
}

ReactDOM.render(<App />, document.getElementById('root'));

```
- Step 3 Configure Webpack part:

Step 3.1 Create ```webpack.config.js``` under the root folder.
```
const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    mode: 'development',
};
```
Step 3.2 Configure Babel - Create ```.babelrc```:
```
{
    "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```
- Step 4 Adding scripts to ```package.json```
```
"scripts": {
   "start": "webpack && electron .",
   "dev": "webpack --watch & electron ."
}

```

- Step 5 Adding the Tailwind CSS in the Electron app wtih React
Step 5.1 Install Tailwind CSS
```
npm install tailwindcss postcss autoprefixer --save-dev
npm install style-loader css-loader postcss-loader --save-dev
```
Step 5.2 Initialize Tailwind Configuartion which will create two files: ```tailwind.config.js``` (Tailwind's configuration) and ```postcss.config.js``` (for PostCSS processing)
```
npx tailwindcss init -p
```
Step 5.3 Configurae ```tailwind.config.js```:
```
// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",  // Scan all JS/JSX files in src
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```
Step 5.4 Adding the Tailwind Directives to the project CSS file:

5.4.1 Create the ```src/styles.csss```
```
/* src/styles.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

5.4.2 Import this CSS into your React entry point(```src/index.js```)
```
import React from "react";
import ReactDOM from 'react-dom/client'
import App from "./components/App";
import './styles.css'

// Create a root container
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component
root.render(
  <React.StrictMode>
    <App />    
  </React.StrictMode>
);
```
5.4.3 Update Wepack Configuration (if needed)

Ensure Webpack processes CSS files using PostCSS. Update your webpack.config.js to include a rule for CSS:
```
const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/,  // Add this rule
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    mode: 'development',
};
```
5.4.4 Verify PostCSS Configuration

Ensure postcss.config.js is set up correctly:
```
// postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  }
}
```

- Step 6 Solve Content Security Policy(CSP) issues

6.1 Define CSP in ```index.html```
```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="Content-Security-Policy" content="
    default-src 'self'; 
    script-src 'self'; 
    style-src 'self' 'unsafe-inline'; 
    font-src 'self'; 
    img-src 'self' data:;
    connect-src 'self';">
  <title>Electron App</title>
</head>
<body>
  <div id="root"></div>
  <script src="./bundle.js"></script> <!-- Your compiled React/Electron bundle -->
</body>
</html>
```
6.2 Set CSP via Electron's ```main.js```

You can also set CSP headers programmatically in your Electron main.js by modifying the webPreferences when creating the browser window:

```
const { app, BrowserWindow } = require('electron');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, 'preload.js'),  // Optional
      // Set CSP for all loaded pages
      webSecurity: true,
    }
  });

  mainWindow.loadFile('index.html');
}

app.on('ready', createWindow);
```

6.3 Setup ```devtool``` value in `webpack.config.js`:
```
...
devtool: source-map' // devtool can set source-map in the dev env. If the prod env, devtool value only false
...
```

> [!TIP]
> You also can edit script in package.json
>
> ```"start": "webpack && electron . --devtool soruce-map"```

- Step 5 Runs your app
```
npm start
```

> [!TIP]
> You can run webpack to bundle your react code
>
> ``` npx webpack```
