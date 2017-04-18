Electrode Explorer
================

> An electrode application that allows you to view all the components in your organization, play with the components, read the component docs, view the different versions of the component, and more - All in your browser.
[View The Live Demo](https://electrode-explorer.herokuapp.com/)

<img src="/data/screenshot.png" height="500px"/>

## Prerequisites

* node: ">=4.2.0"
* npm: ">=3.0.0"
* Github access token

## Overview

This is a central place where you can view

* demos of all the components under the organizations you specified
* documentations of your components
* dependencies your components have (dependencies)
* other components/applications that depend on your components (usages)

There are 2 ways the components can update dynamically:

1. Add github hooks to send POST requests to `/api/update/{org}/{repoName}` when a new tag is created
2. Enable `./server/poll` plugin to set up cron job that sends the POST requests every day

After the server receives the POST request, it will fetch the `package.json` file under `yourGithubUrl/org/repoName`,
update [data/orgs.json] and `data/{org}/{repoName}.json` files. If there is a newer version, it will try to download the
new component through npm ([scripts/install-module.sh]) after a waiting period, babel transpile, and webpack the demo module ([scripts/post-install-module.sh]).

To make the server update immediately or force an update, add a url parameter to the POST request, `/api/update/{org}/{repoName}?updateNow=1`.

This post processing script works well with all electrode components (meaning components using our [archetype]). If you have non-electrode components, you can modify your [scripts/post-install-module.sh]. See our [wiki] page for more details.

## Config

```js
// config/default.json
{
  "plugins": {
    "./server/poll": {
      "options": {
        "enable": true
      }
    }
  },

  "githubApi": {
    "version": "3.0.0",
    "pathPrefix": "/api/v3",
    "protocol": "https",
    "host": "github.com"
  },

  "ORGS": [
    // org/user names under which components will be included in the explorer
    // for example, put ["xxx", "yyy"] to include every repo under github.com/xxx and github.com/yyy
  ],

  "REPOS_INCLUDE": [
    // components need to contain one of these substrings to be included in usages
    // for example, put ["react"] so consumers named /*react*/ will be included in usages
  ],

  "REPOS_USAGE_INCLUDE": [
    // consumers need to contain one of these substrings to be included in usages
    // for example, put ["react"] so consumers named /*react*/ will be included in usages
  ],

  "REPOS_USAGE_EXCLUDE": [
    // consumers containing any of these substrings won't be included in usages
    // for example, put ["training"] so consumers named /*training*/ will be excluded in usages
  ],

  "MODULE_PREFIXES_INCLUDE": [
    // only module names beginning with one of these strings will be included in dependencies
    // for example, put ["react"] so only modules with name starting with "react" will be included in dependencies
  ],

  "NPM_WAITING_TIME": 300000, // wait for 5 minutes before `npm install`

  "GHACCESS_TOKEN_NAME": "GHACCESS_TOKEN" // github token variable name, your token would be accessible via `process.env["GHACCESS_TOKEN"]`
}
```

## Start server

First install dependencies
```sh
npm i
```

Export github access token or set it as an environment variable
```sh
export GHACCESS_TOKEN=YOUR_GITHUB_TOKEN
```

For development mode
```sh
gulp dev
```
or
```sh
GHACCESS_TOKEN=YOUR_GITHUB_TOKEN gulp dev
```

For production mode
```sh
gulp build
```
and
```sh
NODE_ENV=production node .
```
or
```sh
GHACCESS_TOKEN=YOUR_GITHUB_TOKEN NODE_ENV=production node .
```

## Deploy

Since this is an electrode app, it can be deployed the same way as any other electrode app. Just remember to set your github token as an environment variable.

## Learn more

Wish to learn more? Check our [wiki] page!

Built with :heart: by [Team Electrode](https://github.com/orgs/electrode-io/people) @WalmartLabs.

[archetype]: https://github.com/electrode-io/electrode-archetype-react-component
[data/orgs.json]: https://github.com/electrode-io/electrode-explorer/blob/master/data/orgs.json
[scripts/install-module.sh]: https://github.com/electrode-io/electrode-explorer/blob/master/scripts/install-module.sh
[scripts/post-install-module.sh]: https://github.com/electrode-io/electrode-explorer/blob/master/scripts/post-install-module.sh
[wiki]: https://github.com/electrode-io/electrode-explorer/wiki

