# hLightbox

A simple and flexible Lightbox / Popup, only 1.7KB gzipped.

**TABLE OF CONTENTS**

- [Demo](#demo)
- [Features](#features)
- [How to Use](#how-to-use)
- [Image Link](#image-link)
- [Template Link](#template-link)
- [Iframe Link](#iframe-link)
- [FAQ](#faq)
- [jQuery Extension](#jquery-extension)
- [Requirements](#requirements)

## Demo

| Name | Link |
| --- | --- |
| Basic Usage | [View in Codepen](https://codepen.io/hrsetyono/pen/aPPEWa) |

## Features

- **Flexible** - Supports any type of content.
- **Lightweight** - Our script is only 1.7 KB gzipped.
- **No dependencies** - Just plain old JS.

## How to Use

Get the CSS and JS files from this repos's `/dist` directory.

```
hLightbox( targets, [args] )
```

- `targets` (Node / NodeList) - The link element to open the lightbox. **Must have HREF attribute.**
- `args` (obj) - Optional - Possible arguments are:

  - **closable** (bool) - Enable or disable closing lightbox when clicking outside. Default: true.
	- **closeButton** (bool) - Show or hide close button. Default: false.
	- **className** (string) - Space-separated classes to be added to the lightbox container. Default: ''.
	- **onOpen** (fn) - Callback before lightbox is being opened. Parameters: `( instance )`.
	- **onClose** (fn) - Callback before lightbox is being closed. Parameters: `( instance )`.


## Image Link

Triggered when the HREF attribute is URL that ends with jpg / jpeg / png / gif / svg.

**EXAMPLE**

```html
<a href="/img/my-larger-image.jpg" class="my-image-link">
  <img src="/img/my-thumbnail-image.jpg">
</a>
```

```js
document.addEventListener('DOMContentLoaded', () => {

  hLightbox( document.querySelectorAll('.my-image-link'), {
    closeButton: true
  } );

});
```

## Template Link

Triggered when the HREF attribute is ID. It will look for `<template>` with that ID.

**EXAMPLE**

```html
<a href="#template-readmore" class="my-template-link"> Read More </a>

<template id="template-readmore">
  <h1>Hello World</h1>
  <p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit.
    Eos eveniet possimus architecto nisi dolor vel adipisci atque magni ut sequi.
  </p>
</template>
```

```js
document.addEventListener('DOMContentLoaded', () => {

  hLightbox( document.querySelectorAll('.my-template-link') );

});
```

## Iframe Link

Triggered when the HREF attribute is URL that has `width` and `height` parameters, it will be shown inside iframe with that specified size.

```html
<a href="https://wikipedia.com?width=720&height=480" class="my-iframe-link">
	Open Wikipedia
</a>
```

```js
document.addEventListener('DOMContentLoaded', () => {

  hLightbox( document.querySelectorAll('.my-iframe-link') );

});
```

## FAQ

1. **How to add image caption?**
	
	Create a HTML template with image and it's caption.

1. **How to add next / prev arrow?**

	Currently this library doesn't support that.

-----

### Requirements

hLightbox depends on the following browser features and APIs:

- [Array.from](https://www.ecma-international.org/ecma-262/6.0/#sec-array.from)
- [Object.assign](http://www.ecma-international.org/ecma-262/6.0/#sec-object.assign)
- [requestAnimationFrame](https://www.w3.org/TR/animation-timing/#dom-windowanimationtiming-requestanimationframe)

Some of these APIs are capable of being polyfilled in older browsers. Check the linked resources above to determine if you must polyfill to achieve your desired level of browser support.

### Credit

This is a fork of [basicSlider](https://github.com/electerious/basicSlider) with some added features. So big thanks to [Tobias Reich](https://github.com/electerious) for creating an awesome basis for this library.