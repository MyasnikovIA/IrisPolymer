/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
'use strict';

import ApplyShim from '/v3/apply-shim.js';
import templateMap from '/v3/template-map.js';
import { getIsExtends, toCssText, elementHasBuiltCss } from '/v3/style-util.js';
import * as ApplyShimUtils from '/v3/apply-shim-utils.js';
import { getComputedStyleValue, updateNativeProperties } from '/v3/common-utils.js';
import { CustomStyleInterfaceInterface } from '/v3/custom-style-interface.js'; // eslint-disable-line no-unused-vars

import { nativeCssVariables, nativeShadow, cssBuild, disableRuntime } from '/v3/style-settings.js';
/** @const {ApplyShim} */

const applyShimEdit = new ApplyShim();

class ApplyShimInterface {
  constructor() {
    /** @type {?CustomStyleInterfaceInterface} */
    this.customStyleInterface = null;
    applyShimEdit['invalidCallback'] = ApplyShimUtils.invalidate;
  }

  ensure() {
    if (this.customStyleInterface) {
      return;
    }

    if (window.ShadyCSS.CustomStyleInterface) {
      this.customStyleInterface =
      /** @type {!CustomStyleInterfaceInterface} */
      window.ShadyCSS.CustomStyleInterface;

      this.customStyleInterface['transformCallback'] = style => {
        applyShimEdit.transformCustomStyle(style);
      };

      this.customStyleInterface['validateCallback'] = () => {
        requestAnimationFrame(() => {
          if (this.customStyleInterface['enqueued']) {
            this.flushCustomStyles();
          }
        });
      };
    }
  }
  /**
   * @param {!HTMLTemplateElement} template
   * @param {string} elementName
   */


  prepareTemplate(template, elementName) {
    this.ensure();

    if (elementHasBuiltCss(template)) {
      return;
    }

    templateMap[elementName] = template;
    let ast = applyShimEdit.transformTemplate(template, elementName); // save original style ast to use for revalidating instances

    template['_styleAst'] = ast;
  }

  flushCustomStyles() {
    this.ensure();

    if (!this.customStyleInterface) {
      return;
    }

    let styles = this.customStyleInterface['processStyles']();

    if (!this.customStyleInterface['enqueued']) {
      return;
    }

    for (let i = 0; i < styles.length; i++) {
      let cs = styles[i];
      let style = this.customStyleInterface['getStyleForCustomStyle'](cs);

      if (style) {
        applyShimEdit.transformCustomStyle(style);
      }
    }

    this.customStyleInterface['enqueued'] = false;
  }
  /**
   * @param {HTMLElement} element
   * @param {Object=} properties
   */


  styleSubtree(element, properties) {
    this.ensure();

    if (properties) {
      updateNativeProperties(element, properties);
    }

    if (element.shadowRoot) {
      this.styleElement(element);
      let shadowChildren =
      /** @type {!ParentNode} */
      element.shadowRoot.children || element.shadowRoot.childNodes;

      for (let i = 0; i < shadowChildren.length; i++) {
        this.styleSubtree(
        /** @type {HTMLElement} */
        shadowChildren[i]);
      }
    } else {
      let children = element.children || element.childNodes;

      for (let i = 0; i < children.length; i++) {
        this.styleSubtree(
        /** @type {HTMLElement} */
        children[i]);
      }
    }
  }
  /**
   * @param {HTMLElement} element
   */


  styleElement(element) {
    this.ensure();
    let {
      is
    } = getIsExtends(element);
    let template = templateMap[is];

    if (template && elementHasBuiltCss(template)) {
      return;
    }

    if (template && !ApplyShimUtils.templateIsValid(template)) {
      // only revalidate template once
      if (!ApplyShimUtils.templateIsValidating(template)) {
        this.prepareTemplate(template, is);
        ApplyShimUtils.startValidatingTemplate(template);
      } // update this element instance


      let root = element.shadowRoot;

      if (root) {
        let style =
        /** @type {HTMLStyleElement} */
        root.querySelector('style');

        if (style) {
          // reuse the template's style ast, it has all the original css text
          style['__cssRules'] = template['_styleAst'];
          style.textContent = toCssText(template['_styleAst']);
        }
      }
    }
  }
  /**
   * @param {Object=} properties
   */


  styleDocument(properties) {
    this.ensure();
    this.styleSubtree(document.body, properties);
  }

}

if (!window.ShadyCSS || !window.ShadyCSS.ScopingShim) {
  const applyShimInterface = new ApplyShimInterface();
  let CustomStyleInterface = window.ShadyCSS && window.ShadyCSS.CustomStyleInterface;
  /** @suppress {duplicate} */

  window.ShadyCSS = {
    /**
     * @param {!HTMLTemplateElement} template
     * @param {string} elementName
     * @param {string=} elementExtends
     */
    prepareTemplate(template, elementName, elementExtends) {
      // eslint-disable-line no-unused-vars
      applyShimInterface.flushCustomStyles();
      applyShimInterface.prepareTemplate(template, elementName);
    },

    /**
     * @param {!HTMLTemplateElement} template
     * @param {string} elementName
     * @param {string=} elementExtends
     */
    prepareTemplateStyles(template, elementName, elementExtends) {
      window.ShadyCSS.prepareTemplate(template, elementName, elementExtends);
    },

    /**
     * @param {!HTMLTemplateElement} template
     * @param {string} elementName
     */
    prepareTemplateDom(template, elementName) {},

    // eslint-disable-line no-unused-vars

    /**
     * @param {!HTMLElement} element
     * @param {Object=} properties
     */
    styleSubtree(element, properties) {
      applyShimInterface.flushCustomStyles();
      applyShimInterface.styleSubtree(element, properties);
    },

    /**
     * @param {!HTMLElement} element
     */
    styleElement(element) {
      applyShimInterface.flushCustomStyles();
      applyShimInterface.styleElement(element);
    },

    /**
     * @param {Object=} properties
     */
    styleDocument(properties) {
      applyShimInterface.flushCustomStyles();
      applyShimInterface.styleDocument(properties);
    },

    /**
     * @param {Element} element
     * @param {string} property
     * @return {string}
     */
    getComputedStyleValue(element, property) {
      return getComputedStyleValue(element, property);
    },

    flushCustomStyles() {
      applyShimInterface.flushCustomStyles();
    },

    nativeCss: nativeCssVariables,
    nativeShadow: nativeShadow,
    cssBuild: cssBuild,
    disableRuntime: disableRuntime
  };

  if (CustomStyleInterface) {
    window.ShadyCSS.CustomStyleInterface = CustomStyleInterface;
  }
}

window.ShadyCSS.ApplyShim = applyShimEdit;