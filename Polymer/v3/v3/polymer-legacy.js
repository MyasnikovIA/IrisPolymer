/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
import { LegacyElementMixin } from '/v3/legacy-element-mixin.js';
export { Polymer } from '/v3/polymer-fn.js';
/* template elements */

import '/v3/templatizer-behavior.js';
import '/v3/dom-bind.js';
import '/v3/dom-repeat.js';
import '/v3/dom-if.js';
import '/v3/array-selector.js';
/* custom-style */

import '/v3/custom-style.js';
/* bc behaviors */

import '/v3/mutable-data-behavior.js';
/* import html-tag to export html */

export { html } from '/v3/html-tag.js'; // bc

export const Base = LegacyElementMixin(HTMLElement).prototype;