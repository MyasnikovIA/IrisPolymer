/**
 @license @nocompile
 Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 Code distributed by Google as part of the polymer project is also
 subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */
(function () {
    'use strict';
    var aa = new Set("annotation-xml color-profile font-face font-face-src font-face-uri font-face-format font-face-name missing-glyph".split(" "));

    function g(b) {
        var a = aa.has(b);
        b = /^[a-z][.0-9_a-z]*-[\-.0-9_a-z]*$/.test(b);
        return !a && b
    }

    function l(b) {
        var a = b.isConnected;
        if (void 0 !== a) return a;
        for (; b && !(b.__CE_isImportDocument || b instanceof Document);) b = b.parentNode || (window.ShadowRoot && b instanceof ShadowRoot ? b.host : void 0);
        return !(!b || !(b.__CE_isImportDocument || b instanceof Document))
    }

    function p(b, a) {
        for (; a && a !== b && !a.nextSibling;) a = a.parentNode;
        return a && a !== b ? a.nextSibling : null
    }

    function q(b, a, d) {
        d = void 0 === d ? new Set : d;
        for (var c = b; c;) {
            if (c.nodeType === Node.ELEMENT_NODE) {
                var e = c;
                a(e);
                var f = e.localName;
                if ("link" === f && "import" === e.getAttribute("rel")) {
                    c = e.import;
                    if (c instanceof Node && !d.has(c)) for (d.add(c), c = c.firstChild; c; c = c.nextSibling) q(c, a, d);
                    c = p(b, e);
                    continue
                } else if ("template" === f) {
                    c = p(b, e);
                    continue
                }
                if (e = e.__CE_shadowRoot) for (e = e.firstChild; e; e = e.nextSibling) q(e, a, d)
            }
            c = c.firstChild ? c.firstChild : p(b, c)
        }
    }

    function t(b, a, d) {
        b[a] = d
    };

    function u() {
        this.a = new Map;
        this.f = new Map;
        this.c = [];
        this.b = !1
    }

    function ba(b, a, d) {
        b.a.set(a, d);
        b.f.set(d.constructorFunction, d)
    }

    function v(b, a) {
        b.b = !0;
        b.c.push(a)
    }

    function w(b, a) {
        b.b && q(a, function (a) {
            return x(b, a)
        })
    }

    function x(b, a) {
        if (b.b && !a.__CE_patched) {
            a.__CE_patched = !0;
            for (var d = 0; d < b.c.length; d++) b.c[d](a)
        }
    }

    function y(b, a) {
        var d = [];
        q(a, function (a) {
            return d.push(a)
        });
        for (a = 0; a < d.length; a++) {
            var c = d[a];
            1 === c.__CE_state ? b.connectedCallback(c) : z(b, c)
        }
    }

    function A(b, a) {
        var d = [];
        q(a, function (a) {
            return d.push(a)
        });
        for (a = 0; a < d.length; a++) {
            var c = d[a];
            1 === c.__CE_state && b.disconnectedCallback(c)
        }
    }

    function B(b, a, d) {
        d = void 0 === d ? {} : d;
        var c = d.u || new Set, e = d.h || function (a) {
            return z(b, a)
        }, f = [];
        q(a, function (a) {
            if ("link" === a.localName && "import" === a.getAttribute("rel")) {
                var d = a.import;
                d instanceof Node && (d.__CE_isImportDocument = !0, d.__CE_hasRegistry = !0);
                d && "complete" === d.readyState ? d.__CE_documentLoadHandled = !0 : a.addEventListener("load", function () {
                    var d = a.import;
                    if (!d.__CE_documentLoadHandled) {
                        d.__CE_documentLoadHandled = !0;
                        var f = new Set(c);
                        f.delete(d);
                        B(b, d, {u: f, h: e})
                    }
                })
            } else f.push(a)
        }, c);
        if (b.b) for (a =
                          0; a < f.length; a++) x(b, f[a]);
        for (a = 0; a < f.length; a++) e(f[a])
    }

    function z(b, a) {
        if (void 0 === a.__CE_state) {
            var d = a.ownerDocument;
            if (d.defaultView || d.__CE_isImportDocument && d.__CE_hasRegistry) if (d = b.a.get(a.localName)) {
                d.constructionStack.push(a);
                var c = d.constructorFunction;
                try {
                    try {
                        if (new c !== a) throw Error("The custom element constructor did not produce the element being upgraded.");
                    } finally {
                        d.constructionStack.pop()
                    }
                } catch (m) {
                    throw a.__CE_state = 2, m;
                }
                a.__CE_state = 1;
                a.__CE_definition = d;
                if (d.attributeChangedCallback) for (d = d.observedAttributes, c = 0; c < d.length; c++) {
                    var e =
                        d[c], f = a.getAttribute(e);
                    null !== f && b.attributeChangedCallback(a, e, null, f, null)
                }
                l(a) && b.connectedCallback(a)
            }
        }
    }

    u.prototype.connectedCallback = function (b) {
        var a = b.__CE_definition;
        a.connectedCallback && a.connectedCallback.call(b)
    };
    u.prototype.disconnectedCallback = function (b) {
        var a = b.__CE_definition;
        a.disconnectedCallback && a.disconnectedCallback.call(b)
    };
    u.prototype.attributeChangedCallback = function (b, a, d, c, e) {
        var f = b.__CE_definition;
        f.attributeChangedCallback && -1 < f.observedAttributes.indexOf(a) && f.attributeChangedCallback.call(b, a, d, c, e)
    };

    function C(b) {
        var a = document;
        this.c = b;
        this.a = a;
        this.b = void 0;
        B(this.c, this.a);
        "loading" === this.a.readyState && (this.b = new MutationObserver(this.f.bind(this)), this.b.observe(this.a, {
            childList: !0,
            subtree: !0
        }))
    }

    function D(b) {
        b.b && b.b.disconnect()
    }

    C.prototype.f = function (b) {
        var a = this.a.readyState;
        "interactive" !== a && "complete" !== a || D(this);
        for (a = 0; a < b.length; a++) for (var d = b[a].addedNodes, c = 0; c < d.length; c++) B(this.c, d[c])
    };

    function ca() {
        var b = this;
        this.b = this.a = void 0;
        this.c = new Promise(function (a) {
            b.b = a;
            b.a && a(b.a)
        })
    }

    function E(b) {
        if (b.a) throw Error("Already resolved.");
        b.a = void 0;
        b.b && b.b(void 0)
    };

    function F(b) {
        this.c = !1;
        this.a = b;
        this.j = new Map;
        this.f = function (a) {
            return a()
        };
        this.b = !1;
        this.i = [];
        this.o = new C(b)
    }

    F.prototype.l = function (b, a) {
        var d = this;
        if (!(a instanceof Function)) throw new TypeError("Custom element constructors must be functions.");
        if (!g(b)) throw new SyntaxError("The element name '" + b + "' is not valid.");
        if (this.a.a.get(b)) throw Error("A custom element with name '" + b + "' has already been defined.");
        if (this.c) throw Error("A custom element is already being defined.");
        this.c = !0;
        try {
            var c = function (a) {
                var b = e[a];
                if (void 0 !== b && !(b instanceof Function)) throw Error("The '" + a + "' callback must be a function.");
                return b
            }, e = a.prototype;
            if (!(e instanceof Object)) throw new TypeError("The custom element constructor's prototype is not an object.");
            var f = c("connectedCallback");
            var m = c("disconnectedCallback");
            var k = c("adoptedCallback");
            var h = c("attributeChangedCallback");
            var n = a.observedAttributes || []
        } catch (r) {
            return
        } finally {
            this.c = !1
        }
        a = {
            localName: b,
            constructorFunction: a,
            connectedCallback: f,
            disconnectedCallback: m,
            adoptedCallback: k,
            attributeChangedCallback: h,
            observedAttributes: n,
            constructionStack: []
        };
        ba(this.a,
            b, a);
        this.i.push(a);
        this.b || (this.b = !0, this.f(function () {
            return da(d)
        }))
    };
    F.prototype.h = function (b) {
        B(this.a, b)
    };

    function da(b) {
        if (!1 !== b.b) {
            b.b = !1;
            for (var a = b.i, d = [], c = new Map, e = 0; e < a.length; e++) c.set(a[e].localName, []);
            B(b.a, document, {
                h: function (a) {
                    if (void 0 === a.__CE_state) {
                        var e = a.localName, f = c.get(e);
                        f ? f.push(a) : b.a.a.get(e) && d.push(a)
                    }
                }
            });
            for (e = 0; e < d.length; e++) z(b.a, d[e]);
            for (; 0 < a.length;) {
                var f = a.shift();
                e = f.localName;
                f = c.get(f.localName);
                for (var m = 0; m < f.length; m++) z(b.a, f[m]);
                (e = b.j.get(e)) && E(e)
            }
        }
    }

    F.prototype.get = function (b) {
        if (b = this.a.a.get(b)) return b.constructorFunction
    };
    F.prototype.m = function (b) {
        if (!g(b)) return Promise.reject(new SyntaxError("'" + b + "' is not a valid custom element name."));
        var a = this.j.get(b);
        if (a) return a.c;
        a = new ca;
        this.j.set(b, a);
        this.a.a.get(b) && !this.i.some(function (a) {
            return a.localName === b
        }) && E(a);
        return a.c
    };
    F.prototype.s = function (b) {
        D(this.o);
        var a = this.f;
        this.f = function (d) {
            return b(function () {
                return a(d)
            })
        }
    };
    window.CustomElementRegistry = F;
    F.prototype.define = F.prototype.l;
    F.prototype.upgrade = F.prototype.h;
    F.prototype.get = F.prototype.get;
    F.prototype.whenDefined = F.prototype.m;
    F.prototype.polyfillWrapFlushCallback = F.prototype.s;
    var G = window.Document.prototype.createElement, H = window.Document.prototype.createElementNS,
        ea = window.Document.prototype.importNode, fa = window.Document.prototype.prepend,
        ha = window.Document.prototype.append, ia = window.DocumentFragment.prototype.prepend,
        ja = window.DocumentFragment.prototype.append, I = window.Node.prototype.cloneNode,
        J = window.Node.prototype.appendChild, K = window.Node.prototype.insertBefore,
        L = window.Node.prototype.removeChild, M = window.Node.prototype.replaceChild,
        N = Object.getOwnPropertyDescriptor(window.Node.prototype,
            "textContent"), O = window.Element.prototype.attachShadow,
        P = Object.getOwnPropertyDescriptor(window.Element.prototype, "innerHTML"),
        Q = window.Element.prototype.getAttribute, R = window.Element.prototype.setAttribute,
        S = window.Element.prototype.removeAttribute, T = window.Element.prototype.getAttributeNS,
        ka = window.Element.prototype.setAttributeNS, la = window.Element.prototype.removeAttributeNS,
        ma = window.Element.prototype.insertAdjacentElement, na = window.Element.prototype.insertAdjacentHTML,
        oa = window.Element.prototype.prepend,
        pa = window.Element.prototype.append, U = window.Element.prototype.before, qa = window.Element.prototype.after,
        ra = window.Element.prototype.replaceWith, sa = window.Element.prototype.remove, ta = window.HTMLElement,
        V = Object.getOwnPropertyDescriptor(window.HTMLElement.prototype, "innerHTML"),
        ua = window.HTMLElement.prototype.insertAdjacentElement, va = window.HTMLElement.prototype.insertAdjacentHTML;
    var wa = new function () {
    };

    function xa() {
        var b = W;
        window.HTMLElement = function () {
            function a() {
                var a = this.constructor, c = b.f.get(a);
                if (!c) throw Error("The custom element being constructed was not registered with `customElements`.");
                var e = c.constructionStack;
                if (0 === e.length) return e = G.call(document, c.localName), Object.setPrototypeOf(e, a.prototype), e.__CE_state = 1, e.__CE_definition = c, x(b, e), e;
                c = e.length - 1;
                var f = e[c];
                if (f === wa) throw Error("The HTMLElement constructor was either called reentrantly for this constructor or called multiple times.");
                e[c] = wa;
                Object.setPrototypeOf(f, a.prototype);
                x(b, f);
                return f
            }

            a.prototype = ta.prototype;
            Object.defineProperty(a.prototype, "constructor", {
                writable: !0,
                configurable: !0,
                enumerable: !1,
                value: a
            });
            return a
        }()
    };

    function X(b, a, d) {
        function c(a) {
            return function (d) {
                for (var e = [], c = 0; c < arguments.length; ++c) e[c] = arguments[c];
                c = [];
                for (var f = [], n = 0; n < e.length; n++) {
                    var r = e[n];
                    r instanceof Element && l(r) && f.push(r);
                    if (r instanceof DocumentFragment) for (r = r.firstChild; r; r = r.nextSibling) c.push(r); else c.push(r)
                }
                a.apply(this, e);
                for (e = 0; e < f.length; e++) A(b, f[e]);
                if (l(this)) for (e = 0; e < c.length; e++) f = c[e], f instanceof Element && y(b, f)
            }
        }

        void 0 !== d.g && (a.prepend = c(d.g));
        void 0 !== d.append && (a.append = c(d.append))
    };

    function ya() {
        var b = W;
        t(Document.prototype, "createElement", function (a) {
            if (this.__CE_hasRegistry) {
                var d = b.a.get(a);
                if (d) return new d.constructorFunction
            }
            a = G.call(this, a);
            x(b, a);
            return a
        });
        t(Document.prototype, "importNode", function (a, d) {
            a = ea.call(this, a, !!d);
            this.__CE_hasRegistry ? B(b, a) : w(b, a);
            return a
        });
        t(Document.prototype, "createElementNS", function (a, d) {
            if (this.__CE_hasRegistry && (null === a || "http://www.w3.org/1999/xhtml" === a)) {
                var c = b.a.get(d);
                if (c) return new c.constructorFunction
            }
            a = H.call(this, a,
                d);
            x(b, a);
            return a
        });
        X(b, Document.prototype, {g: fa, append: ha})
    };

    function za() {
        function b(b, c) {
            Object.defineProperty(b, "textContent", {
                enumerable: c.enumerable,
                configurable: !0,
                get: c.get,
                set: function (b) {
                    if (this.nodeType === Node.TEXT_NODE) c.set.call(this, b); else {
                        var d = void 0;
                        if (this.firstChild) {
                            var e = this.childNodes, k = e.length;
                            if (0 < k && l(this)) {
                                d = Array(k);
                                for (var h = 0; h < k; h++) d[h] = e[h]
                            }
                        }
                        c.set.call(this, b);
                        if (d) for (b = 0; b < d.length; b++) A(a, d[b])
                    }
                }
            })
        }

        var a = W;
        t(Node.prototype, "insertBefore", function (b, c) {
            if (b instanceof DocumentFragment) {
                var e = Array.prototype.slice.apply(b.childNodes);
                b = K.call(this, b, c);
                if (l(this)) for (c = 0; c < e.length; c++) y(a, e[c]);
                return b
            }
            e = l(b);
            c = K.call(this, b, c);
            e && A(a, b);
            l(this) && y(a, b);
            return c
        });
        t(Node.prototype, "appendChild", function (b) {
            if (b instanceof DocumentFragment) {
                var c = Array.prototype.slice.apply(b.childNodes);
                b = J.call(this, b);
                if (l(this)) for (var e = 0; e < c.length; e++) y(a, c[e]);
                return b
            }
            c = l(b);
            e = J.call(this, b);
            c && A(a, b);
            l(this) && y(a, b);
            return e
        });
        t(Node.prototype, "cloneNode", function (b) {
            b = I.call(this, !!b);
            this.ownerDocument.__CE_hasRegistry ? B(a, b) : w(a,
                b);
            return b
        });
        t(Node.prototype, "removeChild", function (b) {
            var c = l(b), e = L.call(this, b);
            c && A(a, b);
            return e
        });
        t(Node.prototype, "replaceChild", function (b, c) {
            if (b instanceof DocumentFragment) {
                var e = Array.prototype.slice.apply(b.childNodes);
                b = M.call(this, b, c);
                if (l(this)) for (A(a, c), c = 0; c < e.length; c++) y(a, e[c]);
                return b
            }
            e = l(b);
            var f = M.call(this, b, c), d = l(this);
            d && A(a, c);
            e && A(a, b);
            d && y(a, b);
            return f
        });
        N && N.get ? b(Node.prototype, N) : v(a, function (a) {
            b(a, {
                enumerable: !0, configurable: !0, get: function () {
                    for (var b = [],
                             a = 0; a < this.childNodes.length; a++) b.push(this.childNodes[a].textContent);
                    return b.join("")
                }, set: function (b) {
                    for (; this.firstChild;) L.call(this, this.firstChild);
                    J.call(this, document.createTextNode(b))
                }
            })
        })
    };

    function Aa(b) {
        function a(a) {
            return function (e) {
                for (var c = [], d = 0; d < arguments.length; ++d) c[d] = arguments[d];
                d = [];
                for (var k = [], h = 0; h < c.length; h++) {
                    var n = c[h];
                    n instanceof Element && l(n) && k.push(n);
                    if (n instanceof DocumentFragment) for (n = n.firstChild; n; n = n.nextSibling) d.push(n); else d.push(n)
                }
                a.apply(this, c);
                for (c = 0; c < k.length; c++) A(b, k[c]);
                if (l(this)) for (c = 0; c < d.length; c++) k = d[c], k instanceof Element && y(b, k)
            }
        }

        var d = Element.prototype;
        void 0 !== U && (d.before = a(U));
        void 0 !== U && (d.after = a(qa));
        void 0 !== ra &&
        t(d, "replaceWith", function (a) {
            for (var c = [], d = 0; d < arguments.length; ++d) c[d] = arguments[d];
            d = [];
            for (var m = [], k = 0; k < c.length; k++) {
                var h = c[k];
                h instanceof Element && l(h) && m.push(h);
                if (h instanceof DocumentFragment) for (h = h.firstChild; h; h = h.nextSibling) d.push(h); else d.push(h)
            }
            k = l(this);
            ra.apply(this, c);
            for (c = 0; c < m.length; c++) A(b, m[c]);
            if (k) for (A(b, this), c = 0; c < d.length; c++) m = d[c], m instanceof Element && y(b, m)
        });
        void 0 !== sa && t(d, "remove", function () {
            var a = l(this);
            sa.call(this);
            a && A(b, this)
        })
    };

    function Ba() {
        function b(a, b) {
            Object.defineProperty(a, "innerHTML", {
                enumerable: b.enumerable,
                configurable: !0,
                get: b.get,
                set: function (a) {
                    var d = this, e = void 0;
                    l(this) && (e = [], q(this, function (a) {
                        a !== d && e.push(a)
                    }));
                    b.set.call(this, a);
                    if (e) for (var f = 0; f < e.length; f++) {
                        var m = e[f];
                        1 === m.__CE_state && c.disconnectedCallback(m)
                    }
                    this.ownerDocument.__CE_hasRegistry ? B(c, this) : w(c, this);
                    return a
                }
            })
        }

        function a(a, b) {
            t(a, "insertAdjacentElement", function (a, d) {
                var e = l(d);
                a = b.call(this, a, d);
                e && A(c, d);
                l(a) && y(c, d);
                return a
            })
        }

        function d(a, b) {
            function d(a, b) {
                for (var d = []; a !== b; a = a.nextSibling) d.push(a);
                for (b = 0; b < d.length; b++) B(c, d[b])
            }

            t(a, "insertAdjacentHTML", function (a, c) {
                a = a.toLowerCase();
                if ("beforebegin" === a) {
                    var e = this.previousSibling;
                    b.call(this, a, c);
                    d(e || this.parentNode.firstChild, this)
                } else if ("afterbegin" === a) e = this.firstChild, b.call(this, a, c), d(this.firstChild, e); else if ("beforeend" === a) e = this.lastChild, b.call(this, a, c), d(e || this.firstChild, null); else if ("afterend" === a) e = this.nextSibling, b.call(this, a, c), d(this.nextSibling,
                    e); else throw new SyntaxError("The value provided (" + String(a) + ") is not one of 'beforebegin', 'afterbegin', 'beforeend', or 'afterend'.");
            })
        }

        var c = W;
        O && t(Element.prototype, "attachShadow", function (a) {
            return this.__CE_shadowRoot = a = O.call(this, a)
        });
        P && P.get ? b(Element.prototype, P) : V && V.get ? b(HTMLElement.prototype, V) : v(c, function (a) {
            b(a, {
                enumerable: !0, configurable: !0, get: function () {
                    return I.call(this, !0).innerHTML
                }, set: function (a) {
                    var b = "template" === this.localName, c = b ? this.content : this, d = H.call(document,
                        this.namespaceURI, this.localName);
                    for (d.innerHTML = a; 0 < c.childNodes.length;) L.call(c, c.childNodes[0]);
                    for (a = b ? d.content : d; 0 < a.childNodes.length;) J.call(c, a.childNodes[0])
                }
            })
        });
        t(Element.prototype, "setAttribute", function (a, b) {
            if (1 !== this.__CE_state) return R.call(this, a, b);
            var d = Q.call(this, a);
            R.call(this, a, b);
            b = Q.call(this, a);
            c.attributeChangedCallback(this, a, d, b, null)
        });
        t(Element.prototype, "setAttributeNS", function (a, b, d) {
            if (1 !== this.__CE_state) return ka.call(this, a, b, d);
            var e = T.call(this, a, b);
            ka.call(this,
                a, b, d);
            d = T.call(this, a, b);
            c.attributeChangedCallback(this, b, e, d, a)
        });
        t(Element.prototype, "removeAttribute", function (a) {
            if (1 !== this.__CE_state) return S.call(this, a);
            var b = Q.call(this, a);
            S.call(this, a);
            null !== b && c.attributeChangedCallback(this, a, b, null, null)
        });
        t(Element.prototype, "removeAttributeNS", function (a, b) {
            if (1 !== this.__CE_state) return la.call(this, a, b);
            var d = T.call(this, a, b);
            la.call(this, a, b);
            var e = T.call(this, a, b);
            d !== e && c.attributeChangedCallback(this, b, d, e, a)
        });
        ua ? a(HTMLElement.prototype,
            ua) : ma ? a(Element.prototype, ma) : console.warn("Custom Elements: `Element#insertAdjacentElement` was not patched.");
        va ? d(HTMLElement.prototype, va) : na ? d(Element.prototype, na) : console.warn("Custom Elements: `Element#insertAdjacentHTML` was not patched.");
        X(c, Element.prototype, {g: oa, append: pa});
        Aa(c)
    };/*

 Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 Code distributed by Google as part of the polymer project is also
 subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
    var Y = window.customElements;
    if (!Y || Y.forcePolyfill || "function" != typeof Y.define || "function" != typeof Y.get) {
        var W = new u;
        xa();
        ya();
        X(W, DocumentFragment.prototype, {g: ia, append: ja});
        za();
        Ba();
        document.__CE_hasRegistry = !0;
        var customElements = new F(W);
        Object.defineProperty(window, "customElements", {configurable: !0, enumerable: !0, value: customElements})
    }
    ;/*

Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
    var Z = window.document;
    window.WebComponents = window.WebComponents || {};

    function Ca() {
        window.WebComponents.ready = !0;
        window.document.dispatchEvent(new CustomEvent("WebComponentsReady", {bubbles: !0}))
    }

    function Da() {
        Ca();
        Z.removeEventListener("readystatechange", Da)
    }

    "loading" !== Z.readyState ? Ca() : Z.addEventListener("readystatechange", Da);
}).call(this);

//# sourceMappingURL=webcomponents-ce.js.map
