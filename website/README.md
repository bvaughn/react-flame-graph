This directory contains the source for [react-flame-graph.now.sh](https://react-flame-graph.now.sh).
The website structure was created with [`create-react-app`](https://github.com/facebook/create-react-app), although it has since been ejected in order to add custom Webpack loaders.

## Local development

To run this site locally, first make sure you have NPM linked `react-flame-graph`:

```sh
cd /local/path/to/react-flame-graph
npm link
cd ./website
npm link react-flame-graph
```

Then run the NPM "start" command in the project root to watch for changes to `react-flame-graph`:

```sh
 cd /local/path/to/react-flame-graph
 npm run start
```

Lastly, run the NPM "start" command from this directory to run the local webserver:

```sh
cd /local/path/to/react-flame-graph/website
npm run start
```

## Deployment

To deploy this website to Now, use the NPM "deploy" command from this directory:

```sh
cd /local/path/to/react-flame-graph/website
npm run deploy
```
