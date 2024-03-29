/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
import { PolymerElement } from '/v3/polymer-element.js';
import { templatize } from '/v3/templatize.js';
import { Debouncer } from '/v3/debounce.js';
import { enqueueDebouncer, flush } from '/v3/flush.js';
import { microTask } from '/v3/async.js';
import { root } from '/v3/path.js';
import { wrap } from '/v3/wrap.js';
import { hideElementsGlobally } from '/v3/hide-template-controls.js';
/**
 * The `<dom-if>` element will stamp a light-dom `<template>` child when
 * the `if` property becomes truthy, and the template can use Polymer
 * data-binding and declarative event features when used in the context of
 * a Polymer element's template.
 *
 * When `if` becomes falsy, the stamped content is hidden but not
 * removed from dom. When `if` subsequently becomes truthy again, the content
 * is simply re-shown. This approach is used due to its favorable performance
 * characteristics: the expense of creating template content is paid only
 * once and lazily.
 *
 * Set the `restamp` property to true to force the stamped content to be
 * created / destroyed when the `if` condition changes.
 *
 * @customElement
 * polymer
 * @extends PolymerElement
 * @summary Custom element that conditionally stamps and hides or removes
 *   template content based on a boolean flag.
 */

export class DomIf extends PolymerElement {
  // Not needed to find template; can be removed once the analyzer
  // can find the tag name from customElements.define call
  static get is() {
    return 'dom-if';
  }

  static get template() {
    return null;
  }

  static get properties() {
    return {
      /**
       * Fired whenever DOM is added or removed/hidden by this template (by
       * default, rendering occurs lazily).  To force immediate rendering, call
       * `render`.
       *
       * @event dom-change
       */

      /**
       * A boolean indicating whether this template should stamp.
       */
      if: {
        type: Boolean,
        observer: '__debounceRender'
      },

      /**
       * When true, elements will be removed from DOM and discarded when `if`
       * becomes false and re-created and added back to the DOM when `if`
       * becomes true.  By default, stamped elements will be hidden but left
       * in the DOM when `if` becomes false, which is generally results
       * in better performance.
       */
      restamp: {
        type: Boolean,
        observer: '__debounceRender'
      }
    };
  }

  constructor() {
    super();
    this.__renderDebouncer = null;
    this.__invalidProps = null;
    this.__instance = null;
    this._lastIf = false;
    this.__ctor = null;
    this.__hideTemplateChildren__ = false;
  }

  __debounceRender() {
    // Render is async for 2 reasons:
    // 1. To eliminate dom creation trashing if user code thrashes `if` in the
    //    same turn. This was more common in 1.x where a compound computed
    //    property could result in the result changing multiple times, but is
    //    mitigated to a large extent by batched property processing in 2.x.
    // 2. To avoid double object propagation when a bag including values bound
    //    to the `if` property as well as one or more hostProps could enqueue
    //    the <dom-if> to flush before the <template>'s host property
    //    forwarding. In that scenario creating an instance would result in
    //    the host props being set once, and then the enqueued changes on the
    //    template would set properties a second time, potentially causing an
    //    object to be set to an instance more than once.  Creating the
    //    instance async from flushing data ensures this doesn't happen. If
    //    we wanted a sync option in the future, simply having <dom-if> flush
    //    (or clear) its template's pending host properties before creating
    //    the instance would also avoid the problem.
    this.__renderDebouncer = Debouncer.debounce(this.__renderDebouncer, microTask, () => this.__render());
    enqueueDebouncer(this.__renderDebouncer);
  }
  /**
   * @override
   * @return {void}
   */


  disconnectedCallback() {
    super.disconnectedCallback();
    const parent = wrap(this).parentNode;

    if (!parent || parent.nodeType == Node.DOCUMENT_FRAGMENT_NODE && !wrap(parent).host) {
      this.__teardownInstance();
    }
  }
  /**
   * @override
   * @return {void}
   */


  connectedCallback() {
    super.connectedCallback();

    if (!hideElementsGlobally()) {
      this.style.display = 'none';
    }

    if (this.if) {
      this.__debounceRender();
    }
  }
  /**
   * Forces the element to render its content. Normally rendering is
   * asynchronous to a provoking change. This is done for efficiency so
   * that multiple changes trigger only a single render. The render method
   * should be called if, for example, template rendering is required to
   * validate application state.
   * @return {void}
   */


  render() {
    flush();
  }

  __render() {
    if (this.if) {
      if (!this.__ensureInstance()) {
        // No template found yet
        return;
      }

      this._showHideChildren();
    } else if (this.restamp) {
      this.__teardownInstance();
    }

    if (!this.restamp && this.__instance) {
      this._showHideChildren();
    }

    if (this.if != this._lastIf) {
      this.dispatchEvent(new CustomEvent('dom-change', {
        bubbles: true,
        composed: true
      }));
      this._lastIf = this.if;
    }
  }

  __ensureInstance() {
    let parentNode = wrap(this).parentNode; // Guard against element being detached while render was queued

    if (parentNode) {
      if (!this.__ctor) {
        let template =
        /** @type {HTMLTemplateElement} */
        wrap(this).querySelector('template');

        if (!template) {
          // Wait until childList changes and template should be there by then
          let observer = new MutationObserver(() => {
            if (wrap(this).querySelector('template')) {
              observer.disconnect();

              this.__render();
            } else {
              throw new Error('dom-if requires a <template> child');
            }
          });
          observer.observe(this, {
            childList: true
          });
          return false;
        }

        this.__ctor = templatize(template, this, {
          // dom-if templatizer instances require `mutable: true`, as
          // `__syncHostProperties` relies on that behavior to sync objects
          mutableData: true,

          /**
           * @param {string} prop Property to forward
           * @param {*} value Value of property
           * @this {DomIf}
           */
          forwardHostProp: function (prop, value) {
            if (this.__instance) {
              if (this.if) {
                this.__instance.forwardHostProp(prop, value);
              } else {
                // If we have an instance but are squelching host property
                // forwarding due to if being false, note the invalidated
                // properties so `__syncHostProperties` can sync them the next
                // time `if` becomes true
                this.__invalidProps = this.__invalidProps || Object.create(null);
                this.__invalidProps[root(prop)] = true;
              }
            }
          }
        });
      }

      if (!this.__instance) {
        this.__instance = new this.__ctor();
        wrap(parentNode).insertBefore(this.__instance.root, this);
      } else {
        this.__syncHostProperties();

        let c$ = this.__instance.children;

        if (c$ && c$.length) {
          // Detect case where dom-if was re-attached in new position
          let lastChild = wrap(this).previousSibling;

          if (lastChild !== c$[c$.length - 1]) {
            for (let i = 0, n; i < c$.length && (n = c$[i]); i++) {
              wrap(parentNode).insertBefore(n, this);
            }
          }
        }
      }
    }

    return true;
  }

  __syncHostProperties() {
    let props = this.__invalidProps;

    if (props) {
      for (let prop in props) {
        this.__instance._setPendingProperty(prop, this.__dataHost[prop]);
      }

      this.__invalidProps = null;

      this.__instance._flushProperties();
    }
  }

  __teardownInstance() {
    if (this.__instance) {
      let c$ = this.__instance.children;

      if (c$ && c$.length) {
        // use first child parent, for case when dom-if may have been detached
        let parent = wrap(c$[0]).parentNode; // Instance children may be disconnected from parents when dom-if
        // detaches if a tree was innerHTML'ed

        if (parent) {
          parent = wrap(parent);

          for (let i = 0, n; i < c$.length && (n = c$[i]); i++) {
            parent.removeChild(n);
          }
        }
      }

      this.__instance = null;
      this.__invalidProps = null;
    }
  }
  /**
   * Shows or hides the template instance top level child elements. For
   * text nodes, `textContent` is removed while "hidden" and replaced when
   * "shown."
   * @return {void}
   * @protected
   * @suppress {visibility}
   */


  _showHideChildren() {
    let hidden = this.__hideTemplateChildren__ || !this.if;

    if (this.__instance) {
      this.__instance._showHideChildren(hidden);
    }
  }

}
customElements.define(DomIf.is, DomIf);