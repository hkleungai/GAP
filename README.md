# Mini Web Component

- [Introduction](#introduction)
- [Implementation and Usage](#implementation-and-usage)
- [Example](#example)
- [Compilation](#compilation)

## Introduction

This is an experimental implementation of a mini class-based web component.
The main goal is to develop a some sort of logic wrapper 
to build re-usable html constructs for writing static single-page html.

Sometimes when working on simple static html,
I still want some type and even class support for processing script logic.
And at the same time, 
I don't really want to employ external technologies from npm for small project.
Hence, I spend some time to refactor old codes to form this project. 

Just to be clear, I am not doing typescript directly in browser.
Considering that in a small html, bundler seems to be an overkill, 
hence my approach is to locally compile typescript to javascript,
then reference an "index" javascript file in the html.
```html
<script type="module" src="script/js/main.js"></script>
```

For the detailed build command, one may check the [compilation](#compilation) section.

## Implementation and Usage

In my mind, a mini web component should be able to do several things.
- Take `props` in a specific shape.
- Render similar-looking html layout.
- Render dynamic contents according to different props.
- Able to have _events_ attached to its elements.

These idea are put together into a large abstract class `BaseRenderer` in `src/script/js/BaseRenderer.ts`, 
A custom renderer can then be created as follows.
- Import module from url.
  ```typescript
  import BaseRenderer, { BaseProps } from 'https://hkleungai.github.io/mini-web-component/BaseRenderer.js';
  ```
- (_Optional. Only when you want to use typescript for development_) Download and apply types from [this link](https://hkleungai.github.io/mini-web-component/BaseRenderer.d.ts).
- (_Optional. Only when you want to use typescript for development_) Put typings to `src/index.d.ts`.
    ```typescript
    declare module 'https://hkleungai.github.io/mini-web-component/BaseRenderer.js' {
        // Paste the types in here.
    }  
    ```
- Declare a renderer class.
    ```typescript
    interface Props extends BaseProps { ... };
    class Renderer extends BaseRenderer<Props> { ... };
    ```
- Register the renderer in constructor.
    ```typescript
    constructor() { super('Renderer Name'); }
    ```
- Implement `build()`.
    - Design your layout in form of innerHTML.
    - Assign the component to `this.innerHTML`.
    - Do `return this;` to end the implementation,
- Implement `attachEvent()`. 
    - Access rendered elements by `this.fragment`.
    - Apply query-selector and assign event properly.
    - Do `return this;` to end the implementation.

To actually use the renderer, one should do the following.
- Declare one single instance of renderer.
    ```typescript
    let renderer = new Renderer();
    ```
- Call `render()` with props.
    ```typescript
    let props = {}; 
    renderer = renderer.render({});
    ```
- Obtain the rendered innerHTML or document-fragment.
    ```typescript
    let innerHTML = renderer.innerHTML, fragment = renderer.fragment;
    ```

## Example 

Please check source codes in `src/` or check [this github-io link](https://hkleungai.github.io/mini-web-component-demo) for a pre-implemented example.

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
