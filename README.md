# hLightbox

A Simple jQuery Lightbox, only 1.73KB gzipped.

> This is a jQuery wrapper of [basicSlider](https://github.com/electerious/basicSlider).

## Contents

- [Codepen Demos](https://codepen.io/hrsetyono/pen/aPPEWa)
- [Setup](#setup)
- [Options](#options)
- [Href Formats](#href-formats)
- [Requirements](#requirements)

## Setup

1. Include the CSS files before `</head>`. Change the path to fit your project directory.

	```html
	<link rel="stylesheet" href="dist/hlightbox.min.css">
	```

1. Include the JS files before `</body>`. You can ignore the jQuery if you already added it.

	```html
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
	<script src="dist/hlightbox.min.js"></script>
	```

1. Apply hLightbox to anchor link. It will read the **href** attribute.

	```html
	<a href="https://picsum.photos/600/450" data-lightbox>
	  <img src="https://picsum.photos/400/300">
	</a>
	```

	```js
	$('[data-lightbox]').hLightbox({
		closeButton: true,
	});
	```

## Options

Available options for hSlider are:

- **closable** - Enable or disable closing lightbox when clicking outside. Default: true.
- **closeButton** - Show or hide close button. Default: false.
- **className** - Space-separated classes to be added to the lightbox container. Default: ''.
- **onOpen** - Callback before lightbox is being opened. Parameters: `( instance )`.
- **onClose** - Callback 	before lightbox is being closed. Parameters: `( instance )`.

## Href Formats

The lightbox content is auto-detected from the format of `href` attribute. Here are the variations:

1. **IMAGE** - If the Href is URL that ends with jpg / jpeg / png / gif / svg.

	```html
	<a href="https://mysite.com/cute-cat.jpg"> Click here </a>
	```

1. **HTML TEMPLATE** - If the Href is an ID, look for the element with that ID and copy the content.

	```html
	<a href="#my-content"> Click here </a>

	<template id="my-content">
	  <article>
	    <h2>Hello World</h2>
		  <p>Lorem ipsum dolor sit amet</p>
	  </article>
	</template>
	```

	We recommend using `<template>` tag and adds a single wrapper just like `<article>` above. You will then need to style that wrapper since we only add sizing-related CSS.

1. **IFRAME** - If the Href is URL that has `width` and `height` parameters, it will be shown inside iframe with that specified size.

	```html
	<a href="https://wikipedia.com?width=720&height=480"> Open Wikipedia </a>
	```

## Requirements

hLightbox depends on **jQuery**. Tested working on version 1.12.4.

hLightbox also depends on the following browser features and APIs:

- [Array.from](https://www.ecma-international.org/ecma-262/6.0/#sec-array.from)
- [Object.assign](http://www.ecma-international.org/ecma-262/6.0/#sec-object.assign)
- [requestAnimationFrame](https://www.w3.org/TR/animation-timing/#dom-windowanimationtiming-requestanimationframe)

Some of these APIs are capable of being polyfilled in older browsers. Check the linked resources above to determine if you must polyfill to achieve your desired level of browser support.