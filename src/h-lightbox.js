/**
 * hLightbox v2.1.0
 * https://github.com/hrsetyono/hLightbox
 * @license MIT
 */
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).basicLightbox=e()}}(function(){return function i(u,c,a){function s(n,e){if(!c[n]){if(!u[n]){var t="function"==typeof require&&require;if(!e&&t)return t(n,!0);if(l)return l(n,!0);var o=new Error("Cannot find module '"+n+"'");throw o.code="MODULE_NOT_FOUND",o}var r=c[n]={exports:{}};u[n][0].call(r.exports,function(e){return s(u[n][1][e]||e)},r,r.exports,i,u,c,a)}return c[n].exports}for(var l="function"==typeof require&&require,e=0;e<a.length;e++)s(a[e]);return s}({1:[function(e,n,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var c=function(e){var n=1<arguments.length&&void 0!==arguments[1]&&arguments[1],t=document.createElement("div");return t.innerHTML=e.trim(),!0===n?t.children:t.firstChild},a=function(e,n){var t=e.children;return 1===t.length&&t[0].tagName===n},u=t.visible=function(e){return null!=(e=e||document.querySelector(".hLightbox"))&&!0===e.ownerDocument.body.contains(e)};t.create=function(e,o){var r=function(e,n){var t=c('\n\t\t<div class="hLightbox '+n.className+'">\n\t\t\t<div class="hLightbox-content" role="dialog"></div>\n\t\t</div>\n\t'),o=t.querySelector(".hLightbox-content");e.forEach(function(e){return o.appendChild(e)});var r=a(o,"IMG"),i=a(o,"VIDEO"),u=a(o,"IFRAME");return!0===r&&t.classList.add("hLightbox--img"),!0===i&&t.classList.add("hLightbox--video"),!0===u&&t.classList.add("hLightbox--iframe"),t}(e=function(e){var n="string"==typeof e,t=e instanceof HTMLElement==1;if(!1===n&&!1===t)throw new Error("Content must be a DOM element/node or string");return!0===n?Array.from(c(e,!0)):"TEMPLATE"===e.tagName?[e.content.cloneNode(!0)]:Array.from(e.children)}(e),o=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};if(null==(e=Object.assign({},e)).closable&&(e.closable=!0),null==e.className&&(e.className=""),null==e.onShow&&(e.onShow=function(){}),null==e.onClose&&(e.onClose=function(){}),"boolean"!=typeof e.closable)throw new Error("Property `closable` must be a boolean");if("string"!=typeof e.className)throw new Error("Property `className` must be a string");if("function"!=typeof e.onShow)throw new Error("Property `onShow` must be a function");if("function"!=typeof e.onClose)throw new Error("Property `onClose` must be a function");return e}(o)),n=function(e){return!1!==o.onClose(i)&&(t=function(){if("function"==typeof e)return e(i)},(n=r).classList.remove("hLightbox--visible"),setTimeout(function(){return!1===u(n)||n.parentElement.removeChild(n),t()},410),!0);var n,t};!0===o.closable&&r.addEventListener("click",function(e){e.target===r&&n()});var i={element:function(){return r},visible:function(){return u(r)},show:function(e){return!1!==o.onShow(i)&&(n=r,t=function(){if("function"==typeof e)return e(i)},document.body.appendChild(n),setTimeout(function(){requestAnimationFrame(function(){return n.classList.add("hLightbox--visible"),t()})},10),!0);var n,t},close:n};return i}},{}]},{},[1])(1)});


/*
  Create a popup when clicking an element

  @param targets (Node / NodeList) - lightbox link element, from querySelector()
  @param args (obj) - lightbox configuration
*/
function hLightbox( targets, args = {} ) {
  if( !targets ) {
    console.error( "hLightbox Error: Target element not found" );
    return false;
  }

  // if NodeList
  if( NodeList.prototype.isPrototypeOf( targets ) ) {
    for( let t of targets ) {
      initLightbox( t );
    }
  }
  // if single Node
  else {
    initLightbox( targets );
  }


  /////


  function initLightbox( target ) {
    target.addEventListener( 'click', createInstance );
  }


  /*
    Create lightbox on click
  */
  function createInstance( e ) {
    e.preventDefault();
    let href = e.currentTarget.getAttribute( 'href' );

    // if need to add close button
    if( args.closeButton ) {
      args.onShow = addCloseButton;
    }

    // if not closable, add class to remove the pointer cursor
    if( args.closable != null && !args.closable ) {
      args.className += ' hLightbox--unclosable';
    }

    getContent( href ).then( content => {
      let instance = basicLightbox.create( content, args );
      instance.show();
    });
  }


  /*
    Get lightbox content based on HREF
    @param href (string) - URL or ID. For iframe, it requires parameter width and height. Example: https://mysite.com?width=720&height=480
    @param args (array) - The basicLightbox arguments

    @return mixed - String or HTML element
  */
  function getContent( href ) {
    var content = '';
    var imageRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+(?:png|jpg|jpeg|gif|svg)/;
    var iframeRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+\?(width|height)\S+$/;
    var urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

    if( href == null ) { 
      console.error("hLightbox Error: Target element doesn't have HREF attribute");
      return false;
    }

    // if Image create <img> tag
    // TODO: Picsum gives base64 image, do a non-hardcoded regex check!
    if( href.match( imageRegex ) || href.match('picsum.photos') ) {
      return new Promise( (resolve) => {
        resolve( `<img src="${ href }">` );
      });
    }

    // if Iframe
    else if( href.match( iframeRegex ) ) {
      var hrefParsed = new URL( href );
      var width = hrefParsed.searchParams.get('width'),
      height = hrefParsed.searchParams.get('height');

      return new Promise( (resolve) => {
        resolve( `<iframe width="${ width }" height="${ height }" src="${ href }" frameborder="0"></iframe>` );
      });
    }
    
    // if URL, do ajax
    else if( href.match( urlRegex ) ) {
      return window.fetch( href, {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
      });
    }

    // else if ID
    else {
      return new Promise( (resolve) => {
        resolve( document.querySelector( href ) );
      });
    }
  }


  /*
    Add close button and listener to activate it
  */
  function addCloseButton( instance ) {
    args.onOpen ? args.onOpen( instance ) : ''; // run the onOpen command, if exist

    var el = instance.element();
    el.querySelector('.hLightbox-content').innerHTML += ` <a class="hLightbox-close" href="#close">Close</a> `;
    el.querySelector('.hLightbox-close').onclick = instance.close;
  }
}

/*
  jQuery extension for hLightbox

  EXAMPLE

      $('.my-link').hLightbox( {
        closeButton: true
      } );
*/
if( window.jQuery ) {
  jQuery.fn.extend( {
    hLightbox: function( args = {} ) {
      let $targets = this;

      $targets.each( function() {
        hLightbox( $(this).get(0), args );
      });
    }
  });
}