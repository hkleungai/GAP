# GAP

- [Introduction](#introduction)
- [Data Retrieval](#data-retrieval)
- [UI Example](#ui-example)
- [Compilation](#compilation)

## Introduction

The project __GAP__, or Git-as-Application-Update, 
is opened for exploring the possiblity of 
using git commit to replace manual update logging in an application.

## Data Retrieval

Thanks to the great idea of git-interception from [this stackoverflow post](https://stackoverflow.com/questions/3284292/can-a-git-hook-automatically-add-files-to-the-commit/10181026#10181026),
for inspring the below "automatic" git logging mechanism. 

- Application developers make a commit on current changed codes.
- Pre-defined commit hooks will be run to intercept git workflow.
- During git-interception, log data in source files will be updated.
- Any needed scripts will then be rebuilt.
- At the end of interception step, changed files will be added back without creating new commit.

In this sense, app update is done whenever a new commit is made.
Hence no more manual update logging is needed from developer side!!

## UI Example 

An example html page is pre-implemented in `src/` and [this github-io link](https://hkleungai.github.io/GAP).
One may also check [my another-repo](https://github.com/hkleungai/mini-web-component-demo) to see my way of generating dynamic UI.

## Compilation

Install necessary packages via `yarn`.
```sh
yarn install
```

Clean up compiled js scripts in case one needs a fresh start.
```sh
yarn clean
```

Develop renderers in typescipt. 
Build js scripts by `tsc`.
```sh
yarn build
```

Optionally the watch mode can be switched on.
```sh
yarn build:watch
```

Reference the compiled script correctly in `index.html`.
Expose `src` to local server.
```sh
yarn start
```

Open `http://localhost:8080` to view the site.
