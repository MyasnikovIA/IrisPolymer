/**
 @license @nocompile
 Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 Code distributed by Google as part of the polymer project is also
 subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */
(function () {/*

 Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 Code distributed by Google as part of the polymer project is also
 subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
    'use strict';
    (function (b) {
        function a(a, b) {
            if ("function" === typeof window.CustomEvent) return new CustomEvent(a, b);
            var c = document.createEvent("CustomEvent");
            c.initCustomEvent(a, !!b.bubbles, !!b.cancelable, b.detail);
            return c
        }

        function c(a) {
            if (J) return a.ownerDocument !== document ? a.ownerDocument : null;
            var b = a.__importDoc;
            if (!b && a.parentNode) {
                b = a.parentNode;
                if ("function" === typeof b.closest) b = b.closest("link[rel=import]"); else for (; !h(b) && (b = b.parentNode);) ;
                a.__importDoc = b
            }
            return b
        }

        function d(a) {
            var b = l(document,
                "link[rel=import]:not([import-dependency])"), c = b.length;
            c ? r(b, function (b) {
                return k(b, function () {
                    0 === --c && a()
                })
            }) : a()
        }

        function e(b) {
            function a() {
                "loading" !== document.readyState && document.body && (document.removeEventListener("readystatechange", a), b())
            }

            document.addEventListener("readystatechange", a);
            a()
        }

        function f(a) {
            e(function () {
                return d(function () {
                    return a && a()
                })
            })
        }

        function k(a, b) {
            if (a.__loaded) b && b(); else if ("script" === a.localName && !a.src || "style" === a.localName && !a.firstChild) a.__loaded = !0, b && b();
            else {
                var c = function (e) {
                    a.removeEventListener(e.type, c);
                    a.__loaded = !0;
                    b && b()
                };
                a.addEventListener("load", c);
                K && "style" === a.localName || a.addEventListener("error", c)
            }
        }

        function h(a) {
            return a.nodeType === Node.ELEMENT_NODE && "link" === a.localName && "import" === a.rel
        }

        function g() {
            var a = this;
            this.a = {};
            this.b = 0;
            this.c = new MutationObserver(function (b) {
                return a.s(b)
            });
            this.c.observe(document.head, {childList: !0, subtree: !0});
            this.loadImports(document)
        }

        function n(a) {
            r(l(a, "template"), function (a) {
                r(l(a.content, 'script:not([type]),script[type="application/javascript"],script[type="text/javascript"],script[type="module"]'),
                    function (a) {
                        var b = document.createElement("script");
                        r(a.attributes, function (a) {
                            return b.setAttribute(a.name, a.value)
                        });
                        b.textContent = a.textContent;
                        a.parentNode.replaceChild(b, a)
                    });
                n(a.content)
            })
        }

        function l(a, b) {
            return a.childNodes.length ? a.querySelectorAll(b) : Aa
        }

        function r(a, b, c) {
            var e = a ? a.length : 0, d = c ? -1 : 1;
            for (c = c ? e - 1 : 0; c < e && 0 <= c; c += d) b(a[c], c)
        }

        var A = document.createElement("link"), J = "import" in A, Aa = A.querySelectorAll("*"), L = null;
        !1 === "currentScript" in document && Object.defineProperty(document, "currentScript",
            {
                get: function () {
                    return L || ("complete" !== document.readyState ? document.scripts[document.scripts.length - 1] : null)
                }, configurable: !0
            });
        var Ba = /(url\()([^)]*)(\))/g, Ca = /(@import[\s]+(?!url\())([^;]*)(;)/g,
            Da = /(<link[^>]*)(rel=['|"]?stylesheet['|"]?[^>]*>)/g, t = {
                F: function (a, b) {
                    a.href && a.setAttribute("href", t.j(a.getAttribute("href"), b));
                    a.src && a.setAttribute("src", t.j(a.getAttribute("src"), b));
                    if ("style" === a.localName) {
                        var c = t.B(a.textContent, b, Ba);
                        a.textContent = t.B(c, b, Ca)
                    }
                }, B: function (a, b, c) {
                    return a.replace(c,
                        function (a, c, e, d) {
                            a = e.replace(/["']/g, "");
                            b && (a = t.j(a, b));
                            return c + "'" + a + "'" + d
                        })
                }, j: function (a, b) {
                    if (void 0 === t.m) {
                        t.m = !1;
                        try {
                            var c = new URL("b", "http://a");
                            c.pathname = "c%20d";
                            t.m = "http://a/c%20d" === c.href
                        } catch (Wa) {
                        }
                    }
                    if (t.m) return (new URL(a, b)).href;
                    c = t.C;
                    c || (c = document.implementation.createHTMLDocument("temp"), t.C = c, c.A = c.createElement("base"), c.head.appendChild(c.A), c.w = c.createElement("a"));
                    c.A.href = b;
                    c.w.href = a;
                    return c.w.href || a
                }
            }, X = {
                async: !0, load: function (a, b, c) {
                    if (a) if (a.match(/^data:/)) {
                        a =
                            a.split(",");
                        var e = a[1];
                        e = -1 < a[0].indexOf(";base64") ? atob(e) : decodeURIComponent(e);
                        b(e)
                    } else {
                        var d = new XMLHttpRequest;
                        d.open("GET", a, X.async);
                        d.onload = function () {
                            var a = d.responseURL || d.getResponseHeader("Location");
                            a && 0 === a.indexOf("/") && (a = (location.origin || location.protocol + "//" + location.host) + a);
                            var e = d.response || d.responseText;
                            304 === d.status || 0 === d.status || 200 <= d.status && 300 > d.status ? b(e, a) : c(e)
                        };
                        d.send()
                    } else c("error: href must be specified")
                }
            }, K = /Trident/.test(navigator.userAgent) || /Edge\/\d./i.test(navigator.userAgent);
        g.prototype.loadImports = function (a) {
            var b = this;
            r(l(a, "link[rel=import]"), function (a) {
                return b.g(a)
            })
        };
        g.prototype.g = function (a) {
            var b = this, c = a.href;
            if (void 0 !== this.a[c]) {
                var e = this.a[c];
                e && e.__loaded && (a.__import = e, this.f(a))
            } else this.b++, this.a[c] = "pending", X.load(c, function (a, e) {
                a = b.u(a, e || c);
                b.a[c] = a;
                b.b--;
                b.loadImports(a);
                b.h()
            }, function () {
                b.a[c] = null;
                b.b--;
                b.h()
            })
        };
        g.prototype.u = function (a, b) {
            if (!a) return document.createDocumentFragment();
            K && (a = a.replace(Da, function (a, b, c) {
                return -1 === a.indexOf("type=") ?
                    b + " type=import-disable " + c : a
            }));
            var c = document.createElement("template");
            c.innerHTML = a;
            if (c.content) a = c.content, n(a); else for (a = document.createDocumentFragment(); c.firstChild;) a.appendChild(c.firstChild);
            if (c = a.querySelector("base")) b = t.j(c.getAttribute("href"), b), c.removeAttribute("href");
            var e = 0;
            r(l(a, 'link[rel=import],link[rel=stylesheet][href][type=import-disable],style:not([type]),link[rel=stylesheet][href]:not([type]),script:not([type]),script[type="application/javascript"],script[type="text/javascript"],script[type="module"]'),
                function (a) {
                    k(a);
                    t.F(a, b);
                    a.setAttribute("import-dependency", "");
                    if ("script" === a.localName && !a.src && a.textContent) {
                        if ("module" === a.type) throw Error("Inline module scripts are not supported in HTML Imports.");
                        a.setAttribute("src", "data:text/javascript;charset=utf-8," + encodeURIComponent(a.textContent + ("\n//# sourceURL=" + b + (e ? "-" + e : "") + ".js\n")));
                        a.textContent = "";
                        e++
                    }
                });
            return a
        };
        g.prototype.h = function () {
            var a = this;
            if (!this.b) {
                this.c.disconnect();
                this.flatten(document);
                var b = !1, c = !1, e = function () {
                    c &&
                    b && (a.loadImports(document), a.b || (a.c.observe(document.head, {
                        childList: !0,
                        subtree: !0
                    }), a.o()))
                };
                this.G(function () {
                    c = !0;
                    e()
                });
                this.v(function () {
                    b = !0;
                    e()
                })
            }
        };
        g.prototype.flatten = function (a) {
            var b = this;
            r(l(a, "link[rel=import]"), function (a) {
                var c = b.a[a.href];
                (a.__import = c) && c.nodeType === Node.DOCUMENT_FRAGMENT_NODE && (b.a[a.href] = a, a.readyState = "loading", a.__import = a, b.flatten(c), a.appendChild(c))
            })
        };
        g.prototype.v = function (a) {
            function b(d) {
                if (d < e) {
                    var f = c[d], h = document.createElement("script");
                    f.removeAttribute("import-dependency");
                    r(f.attributes, function (a) {
                        return h.setAttribute(a.name, a.value)
                    });
                    L = h;
                    f.parentNode.replaceChild(h, f);
                    k(h, function () {
                        L = null;
                        b(d + 1)
                    })
                } else a()
            }

            var c = l(document, "script[import-dependency]"), e = c.length;
            b(0)
        };
        g.prototype.G = function (a) {
            var b = l(document, "style[import-dependency],link[rel=stylesheet][import-dependency]"), e = b.length;
            if (e) {
                var d = K && !!document.querySelector("link[rel=stylesheet][href][type=import-disable]");
                r(b, function (b) {
                    k(b, function () {
                        b.removeAttribute("import-dependency");
                        0 === --e && a()
                    });
                    if (d && b.parentNode !== document.head) {
                        var f = document.createElement(b.localName);
                        f.__appliedElement = b;
                        f.setAttribute("type", "import-placeholder");
                        b.parentNode.insertBefore(f, b.nextSibling);
                        for (f = c(b); f && c(f);) f = c(f);
                        f.parentNode !== document.head && (f = null);
                        document.head.insertBefore(b, f);
                        b.removeAttribute("type")
                    }
                })
            } else a()
        };
        g.prototype.o = function () {
            var a = this;
            r(l(document, "link[rel=import]"), function (b) {
                return a.f(b)
            }, !0)
        };
        g.prototype.f = function (b) {
            b.__loaded || (b.__loaded = !0, b.import && (b.import.readyState =
                "complete"), b.dispatchEvent(a(b.import ? "load" : "error", {
                bubbles: !1,
                cancelable: !1,
                detail: void 0
            })))
        };
        g.prototype.s = function (a) {
            var b = this;
            r(a, function (a) {
                return r(a.addedNodes, function (a) {
                    a && a.nodeType === Node.ELEMENT_NODE && (h(a) ? b.g(a) : b.loadImports(a))
                })
            })
        };
        var M = null;
        if (J) r(l(document, "link[rel=import]"), function (a) {
            a.import && "loading" === a.import.readyState || (a.__loaded = !0)
        }), A = function (a) {
            a = a.target;
            h(a) && (a.__loaded = !0)
        }, document.addEventListener("load", A, !0), document.addEventListener("error", A,
            !0); else {
            var B = Object.getOwnPropertyDescriptor(Node.prototype, "baseURI");
            Object.defineProperty((!B || B.configurable ? Node : Element).prototype, "baseURI", {
                get: function () {
                    var a = h(this) ? this : c(this);
                    return a ? a.href : B && B.get ? B.get.call(this) : (document.querySelector("base") || window.location).href
                }, configurable: !0, enumerable: !0
            });
            Object.defineProperty(HTMLLinkElement.prototype, "import", {
                get: function () {
                    return this.__import || null
                }, configurable: !0, enumerable: !0
            });
            e(function () {
                M = new g
            })
        }
        f(function () {
            return document.dispatchEvent(a("HTMLImportsLoaded",
                {cancelable: !0, bubbles: !0, detail: void 0}))
        });
        b.useNative = J;
        b.whenReady = f;
        b.importForElement = c;
        b.loadImports = function (a) {
            M && M.loadImports(a)
        }
    })(window.HTMLImports = window.HTMLImports || {});
    var aa = new Set("annotation-xml color-profile font-face font-face-src font-face-uri font-face-format font-face-name missing-glyph".split(" "));

    function m(b) {
        var a = aa.has(b);
        b = /^[a-z][.0-9_a-z]*-[\-.0-9_a-z]*$/.test(b);
        return !a && b
    }

    function p(b) {
        var a = b.isConnected;
        if (void 0 !== a) return a;
        for (; b && !(b.__CE_isImportDocument || b instanceof Document);) b = b.parentNode || (window.ShadowRoot && b instanceof ShadowRoot ? b.host : void 0);
        return !(!b || !(b.__CE_isImportDocument || b instanceof Document))
    }

    function q(b, a) {
        for (; a && a !== b && !a.nextSibling;) a = a.parentNode;
        return a && a !== b ? a.nextSibling : null
    }

    function u(b, a, c) {
        c = void 0 === c ? new Set : c;
        for (var d = b; d;) {
            if (d.nodeType === Node.ELEMENT_NODE) {
                var e = d;
                a(e);
                var f = e.localName;
                if ("link" === f && "import" === e.getAttribute("rel")) {
                    d = e.import;
                    if (d instanceof Node && !c.has(d)) for (c.add(d), d = d.firstChild; d; d = d.nextSibling) u(d, a, c);
                    d = q(b, e);
                    continue
                } else if ("template" === f) {
                    d = q(b, e);
                    continue
                }
                if (e = e.__CE_shadowRoot) for (e = e.firstChild; e; e = e.nextSibling) u(e, a, c)
            }
            d = d.firstChild ? d.firstChild : q(b, d)
        }
    }

    function v(b, a, c) {
        b[a] = c
    };

    function w() {
        this.a = new Map;
        this.f = new Map;
        this.c = [];
        this.b = !1
    }

    function ba(b, a, c) {
        b.a.set(a, c);
        b.f.set(c.constructorFunction, c)
    }

    function x(b, a) {
        b.b = !0;
        b.c.push(a)
    }

    function y(b, a) {
        b.b && u(a, function (a) {
            return z(b, a)
        })
    }

    function z(b, a) {
        if (b.b && !a.__CE_patched) {
            a.__CE_patched = !0;
            for (var c = 0; c < b.c.length; c++) b.c[c](a)
        }
    }

    function C(b, a) {
        var c = [];
        u(a, function (a) {
            return c.push(a)
        });
        for (a = 0; a < c.length; a++) {
            var d = c[a];
            1 === d.__CE_state ? b.connectedCallback(d) : D(b, d)
        }
    }

    function E(b, a) {
        var c = [];
        u(a, function (a) {
            return c.push(a)
        });
        for (a = 0; a < c.length; a++) {
            var d = c[a];
            1 === d.__CE_state && b.disconnectedCallback(d)
        }
    }

    function F(b, a, c) {
        c = void 0 === c ? {} : c;
        var d = c.H || new Set, e = c.l || function (a) {
            return D(b, a)
        }, f = [];
        u(a, function (a) {
            if ("link" === a.localName && "import" === a.getAttribute("rel")) {
                var c = a.import;
                c instanceof Node && (c.__CE_isImportDocument = !0, c.__CE_hasRegistry = !0);
                c && "complete" === c.readyState ? c.__CE_documentLoadHandled = !0 : a.addEventListener("load", function () {
                    var c = a.import;
                    if (!c.__CE_documentLoadHandled) {
                        c.__CE_documentLoadHandled = !0;
                        var f = new Set(d);
                        f.delete(c);
                        F(b, c, {H: f, l: e})
                    }
                })
            } else f.push(a)
        }, d);
        if (b.b) for (a =
                          0; a < f.length; a++) z(b, f[a]);
        for (a = 0; a < f.length; a++) e(f[a])
    }

    function D(b, a) {
        if (void 0 === a.__CE_state) {
            var c = a.ownerDocument;
            if (c.defaultView || c.__CE_isImportDocument && c.__CE_hasRegistry) if (c = b.a.get(a.localName)) {
                c.constructionStack.push(a);
                var d = c.constructorFunction;
                try {
                    try {
                        if (new d !== a) throw Error("The custom element constructor did not produce the element being upgraded.");
                    } finally {
                        c.constructionStack.pop()
                    }
                } catch (k) {
                    throw a.__CE_state = 2, k;
                }
                a.__CE_state = 1;
                a.__CE_definition = c;
                if (c.attributeChangedCallback) for (c = c.observedAttributes, d = 0; d < c.length; d++) {
                    var e =
                        c[d], f = a.getAttribute(e);
                    null !== f && b.attributeChangedCallback(a, e, null, f, null)
                }
                p(a) && b.connectedCallback(a)
            }
        }
    }

    w.prototype.connectedCallback = function (b) {
        var a = b.__CE_definition;
        a.connectedCallback && a.connectedCallback.call(b)
    };
    w.prototype.disconnectedCallback = function (b) {
        var a = b.__CE_definition;
        a.disconnectedCallback && a.disconnectedCallback.call(b)
    };
    w.prototype.attributeChangedCallback = function (b, a, c, d, e) {
        var f = b.__CE_definition;
        f.attributeChangedCallback && -1 < f.observedAttributes.indexOf(a) && f.attributeChangedCallback.call(b, a, c, d, e)
    };

    function ca(b) {
        var a = document;
        this.c = b;
        this.a = a;
        this.b = void 0;
        F(this.c, this.a);
        "loading" === this.a.readyState && (this.b = new MutationObserver(this.f.bind(this)), this.b.observe(this.a, {
            childList: !0,
            subtree: !0
        }))
    }

    function da(b) {
        b.b && b.b.disconnect()
    }

    ca.prototype.f = function (b) {
        var a = this.a.readyState;
        "interactive" !== a && "complete" !== a || da(this);
        for (a = 0; a < b.length; a++) for (var c = b[a].addedNodes, d = 0; d < c.length; d++) F(this.c, c[d])
    };

    function ea() {
        var b = this;
        this.b = this.a = void 0;
        this.c = new Promise(function (a) {
            b.b = a;
            b.a && a(b.a)
        })
    }

    function fa(b) {
        if (b.a) throw Error("Already resolved.");
        b.a = void 0;
        b.b && b.b(void 0)
    };

    function G(b) {
        this.c = !1;
        this.a = b;
        this.h = new Map;
        this.f = function (a) {
            return a()
        };
        this.b = !1;
        this.g = [];
        this.u = new ca(b)
    }

    G.prototype.o = function (b, a) {
        var c = this;
        if (!(a instanceof Function)) throw new TypeError("Custom element constructors must be functions.");
        if (!m(b)) throw new SyntaxError("The element name '" + b + "' is not valid.");
        if (this.a.a.get(b)) throw Error("A custom element with name '" + b + "' has already been defined.");
        if (this.c) throw Error("A custom element is already being defined.");
        this.c = !0;
        try {
            var d = function (a) {
                var b = e[a];
                if (void 0 !== b && !(b instanceof Function)) throw Error("The '" + a + "' callback must be a function.");
                return b
            }, e = a.prototype;
            if (!(e instanceof Object)) throw new TypeError("The custom element constructor's prototype is not an object.");
            var f = d("connectedCallback");
            var k = d("disconnectedCallback");
            var h = d("adoptedCallback");
            var g = d("attributeChangedCallback");
            var n = a.observedAttributes || []
        } catch (l) {
            return
        } finally {
            this.c = !1
        }
        a = {
            localName: b,
            constructorFunction: a,
            connectedCallback: f,
            disconnectedCallback: k,
            adoptedCallback: h,
            attributeChangedCallback: g,
            observedAttributes: n,
            constructionStack: []
        };
        ba(this.a,
            b, a);
        this.g.push(a);
        this.b || (this.b = !0, this.f(function () {
            return ha(c)
        }))
    };
    G.prototype.l = function (b) {
        F(this.a, b)
    };

    function ha(b) {
        if (!1 !== b.b) {
            b.b = !1;
            for (var a = b.g, c = [], d = new Map, e = 0; e < a.length; e++) d.set(a[e].localName, []);
            F(b.a, document, {
                l: function (a) {
                    if (void 0 === a.__CE_state) {
                        var e = a.localName, f = d.get(e);
                        f ? f.push(a) : b.a.a.get(e) && c.push(a)
                    }
                }
            });
            for (e = 0; e < c.length; e++) D(b.a, c[e]);
            for (; 0 < a.length;) {
                var f = a.shift();
                e = f.localName;
                f = d.get(f.localName);
                for (var k = 0; k < f.length; k++) D(b.a, f[k]);
                (e = b.h.get(e)) && fa(e)
            }
        }
    }

    G.prototype.get = function (b) {
        if (b = this.a.a.get(b)) return b.constructorFunction
    };
    G.prototype.s = function (b) {
        if (!m(b)) return Promise.reject(new SyntaxError("'" + b + "' is not a valid custom element name."));
        var a = this.h.get(b);
        if (a) return a.c;
        a = new ea;
        this.h.set(b, a);
        this.a.a.get(b) && !this.g.some(function (a) {
            return a.localName === b
        }) && fa(a);
        return a.c
    };
    G.prototype.v = function (b) {
        da(this.u);
        var a = this.f;
        this.f = function (c) {
            return b(function () {
                return a(c)
            })
        }
    };
    window.CustomElementRegistry = G;
    G.prototype.define = G.prototype.o;
    G.prototype.upgrade = G.prototype.l;
    G.prototype.get = G.prototype.get;
    G.prototype.whenDefined = G.prototype.s;
    G.prototype.polyfillWrapFlushCallback = G.prototype.v;
    var ia = window.Document.prototype.createElement, ja = window.Document.prototype.createElementNS,
        ka = window.Document.prototype.importNode, la = window.Document.prototype.prepend,
        ma = window.Document.prototype.append, na = window.DocumentFragment.prototype.prepend,
        oa = window.DocumentFragment.prototype.append, pa = window.Node.prototype.cloneNode,
        H = window.Node.prototype.appendChild, qa = window.Node.prototype.insertBefore,
        I = window.Node.prototype.removeChild, ra = window.Node.prototype.replaceChild,
        N = Object.getOwnPropertyDescriptor(window.Node.prototype,
            "textContent"), sa = window.Element.prototype.attachShadow,
        O = Object.getOwnPropertyDescriptor(window.Element.prototype, "innerHTML"),
        P = window.Element.prototype.getAttribute, ta = window.Element.prototype.setAttribute,
        ua = window.Element.prototype.removeAttribute, Q = window.Element.prototype.getAttributeNS,
        va = window.Element.prototype.setAttributeNS, wa = window.Element.prototype.removeAttributeNS,
        xa = window.Element.prototype.insertAdjacentElement, ya = window.Element.prototype.insertAdjacentHTML,
        za = window.Element.prototype.prepend,
        Ea = window.Element.prototype.append, R = window.Element.prototype.before, Fa = window.Element.prototype.after,
        Ga = window.Element.prototype.replaceWith, Ha = window.Element.prototype.remove, Ia = window.HTMLElement,
        S = Object.getOwnPropertyDescriptor(window.HTMLElement.prototype, "innerHTML"),
        Ja = window.HTMLElement.prototype.insertAdjacentElement, Ka = window.HTMLElement.prototype.insertAdjacentHTML;
    var La = new function () {
    };

    function Ma() {
        var b = T;
        window.HTMLElement = function () {
            function a() {
                var a = this.constructor, d = b.f.get(a);
                if (!d) throw Error("The custom element being constructed was not registered with `customElements`.");
                var e = d.constructionStack;
                if (0 === e.length) return e = ia.call(document, d.localName), Object.setPrototypeOf(e, a.prototype), e.__CE_state = 1, e.__CE_definition = d, z(b, e), e;
                d = e.length - 1;
                var f = e[d];
                if (f === La) throw Error("The HTMLElement constructor was either called reentrantly for this constructor or called multiple times.");
                e[d] = La;
                Object.setPrototypeOf(f, a.prototype);
                z(b, f);
                return f
            }

            a.prototype = Ia.prototype;
            Object.defineProperty(a.prototype, "constructor", {
                writable: !0,
                configurable: !0,
                enumerable: !1,
                value: a
            });
            return a
        }()
    };

    function U(b, a, c) {
        function d(a) {
            return function (c) {
                for (var e = [], d = 0; d < arguments.length; ++d) e[d] = arguments[d];
                d = [];
                for (var f = [], n = 0; n < e.length; n++) {
                    var l = e[n];
                    l instanceof Element && p(l) && f.push(l);
                    if (l instanceof DocumentFragment) for (l = l.firstChild; l; l = l.nextSibling) d.push(l); else d.push(l)
                }
                a.apply(this, e);
                for (e = 0; e < f.length; e++) E(b, f[e]);
                if (p(this)) for (e = 0; e < d.length; e++) f = d[e], f instanceof Element && C(b, f)
            }
        }

        void 0 !== c.i && (a.prepend = d(c.i));
        void 0 !== c.append && (a.append = d(c.append))
    };

    function Na() {
        var b = T;
        v(Document.prototype, "createElement", function (a) {
            if (this.__CE_hasRegistry) {
                var c = b.a.get(a);
                if (c) return new c.constructorFunction
            }
            a = ia.call(this, a);
            z(b, a);
            return a
        });
        v(Document.prototype, "importNode", function (a, c) {
            a = ka.call(this, a, !!c);
            this.__CE_hasRegistry ? F(b, a) : y(b, a);
            return a
        });
        v(Document.prototype, "createElementNS", function (a, c) {
            if (this.__CE_hasRegistry && (null === a || "http://www.w3.org/1999/xhtml" === a)) {
                var d = b.a.get(c);
                if (d) return new d.constructorFunction
            }
            a = ja.call(this,
                a, c);
            z(b, a);
            return a
        });
        U(b, Document.prototype, {i: la, append: ma})
    };

    function Oa() {
        function b(b, d) {
            Object.defineProperty(b, "textContent", {
                enumerable: d.enumerable,
                configurable: !0,
                get: d.get,
                set: function (b) {
                    if (this.nodeType === Node.TEXT_NODE) d.set.call(this, b); else {
                        var c = void 0;
                        if (this.firstChild) {
                            var e = this.childNodes, h = e.length;
                            if (0 < h && p(this)) {
                                c = Array(h);
                                for (var g = 0; g < h; g++) c[g] = e[g]
                            }
                        }
                        d.set.call(this, b);
                        if (c) for (b = 0; b < c.length; b++) E(a, c[b])
                    }
                }
            })
        }

        var a = T;
        v(Node.prototype, "insertBefore", function (b, d) {
            if (b instanceof DocumentFragment) {
                var c = Array.prototype.slice.apply(b.childNodes);
                b = qa.call(this, b, d);
                if (p(this)) for (d = 0; d < c.length; d++) C(a, c[d]);
                return b
            }
            c = p(b);
            d = qa.call(this, b, d);
            c && E(a, b);
            p(this) && C(a, b);
            return d
        });
        v(Node.prototype, "appendChild", function (b) {
            if (b instanceof DocumentFragment) {
                var c = Array.prototype.slice.apply(b.childNodes);
                b = H.call(this, b);
                if (p(this)) for (var e = 0; e < c.length; e++) C(a, c[e]);
                return b
            }
            c = p(b);
            e = H.call(this, b);
            c && E(a, b);
            p(this) && C(a, b);
            return e
        });
        v(Node.prototype, "cloneNode", function (b) {
            b = pa.call(this, !!b);
            this.ownerDocument.__CE_hasRegistry ? F(a, b) :
                y(a, b);
            return b
        });
        v(Node.prototype, "removeChild", function (b) {
            var c = p(b), e = I.call(this, b);
            c && E(a, b);
            return e
        });
        v(Node.prototype, "replaceChild", function (b, d) {
            if (b instanceof DocumentFragment) {
                var c = Array.prototype.slice.apply(b.childNodes);
                b = ra.call(this, b, d);
                if (p(this)) for (E(a, d), d = 0; d < c.length; d++) C(a, c[d]);
                return b
            }
            c = p(b);
            var f = ra.call(this, b, d), k = p(this);
            k && E(a, d);
            c && E(a, b);
            k && C(a, b);
            return f
        });
        N && N.get ? b(Node.prototype, N) : x(a, function (a) {
            b(a, {
                enumerable: !0, configurable: !0, get: function () {
                    for (var a =
                        [], b = 0; b < this.childNodes.length; b++) a.push(this.childNodes[b].textContent);
                    return a.join("")
                }, set: function (a) {
                    for (; this.firstChild;) I.call(this, this.firstChild);
                    H.call(this, document.createTextNode(a))
                }
            })
        })
    };

    function Pa(b) {
        function a(a) {
            return function (c) {
                for (var e = [], d = 0; d < arguments.length; ++d) e[d] = arguments[d];
                d = [];
                for (var h = [], g = 0; g < e.length; g++) {
                    var n = e[g];
                    n instanceof Element && p(n) && h.push(n);
                    if (n instanceof DocumentFragment) for (n = n.firstChild; n; n = n.nextSibling) d.push(n); else d.push(n)
                }
                a.apply(this, e);
                for (e = 0; e < h.length; e++) E(b, h[e]);
                if (p(this)) for (e = 0; e < d.length; e++) h = d[e], h instanceof Element && C(b, h)
            }
        }

        var c = Element.prototype;
        void 0 !== R && (c.before = a(R));
        void 0 !== R && (c.after = a(Fa));
        void 0 !== Ga &&
        v(c, "replaceWith", function (a) {
            for (var c = [], d = 0; d < arguments.length; ++d) c[d] = arguments[d];
            d = [];
            for (var k = [], h = 0; h < c.length; h++) {
                var g = c[h];
                g instanceof Element && p(g) && k.push(g);
                if (g instanceof DocumentFragment) for (g = g.firstChild; g; g = g.nextSibling) d.push(g); else d.push(g)
            }
            h = p(this);
            Ga.apply(this, c);
            for (c = 0; c < k.length; c++) E(b, k[c]);
            if (h) for (E(b, this), c = 0; c < d.length; c++) k = d[c], k instanceof Element && C(b, k)
        });
        void 0 !== Ha && v(c, "remove", function () {
            var a = p(this);
            Ha.call(this);
            a && E(b, this)
        })
    };

    function Qa() {
        function b(a, b) {
            Object.defineProperty(a, "innerHTML", {
                enumerable: b.enumerable,
                configurable: !0,
                get: b.get,
                set: function (a) {
                    var c = this, e = void 0;
                    p(this) && (e = [], u(this, function (a) {
                        a !== c && e.push(a)
                    }));
                    b.set.call(this, a);
                    if (e) for (var f = 0; f < e.length; f++) {
                        var k = e[f];
                        1 === k.__CE_state && d.disconnectedCallback(k)
                    }
                    this.ownerDocument.__CE_hasRegistry ? F(d, this) : y(d, this);
                    return a
                }
            })
        }

        function a(a, b) {
            v(a, "insertAdjacentElement", function (a, c) {
                var e = p(c);
                a = b.call(this, a, c);
                e && E(d, c);
                p(a) && C(d, c);
                return a
            })
        }

        function c(a, b) {
            function c(a, b) {
                for (var c = []; a !== b; a = a.nextSibling) c.push(a);
                for (b = 0; b < c.length; b++) F(d, c[b])
            }

            v(a, "insertAdjacentHTML", function (a, e) {
                a = a.toLowerCase();
                if ("beforebegin" === a) {
                    var d = this.previousSibling;
                    b.call(this, a, e);
                    c(d || this.parentNode.firstChild, this)
                } else if ("afterbegin" === a) d = this.firstChild, b.call(this, a, e), c(this.firstChild, d); else if ("beforeend" === a) d = this.lastChild, b.call(this, a, e), c(d || this.firstChild, null); else if ("afterend" === a) d = this.nextSibling, b.call(this, a, e), c(this.nextSibling,
                    d); else throw new SyntaxError("The value provided (" + String(a) + ") is not one of 'beforebegin', 'afterbegin', 'beforeend', or 'afterend'.");
            })
        }

        var d = T;
        sa && v(Element.prototype, "attachShadow", function (a) {
            return this.__CE_shadowRoot = a = sa.call(this, a)
        });
        O && O.get ? b(Element.prototype, O) : S && S.get ? b(HTMLElement.prototype, S) : x(d, function (a) {
            b(a, {
                enumerable: !0, configurable: !0, get: function () {
                    return pa.call(this, !0).innerHTML
                }, set: function (a) {
                    var b = "template" === this.localName, c = b ? this.content : this, d = ja.call(document,
                        this.namespaceURI, this.localName);
                    for (d.innerHTML = a; 0 < c.childNodes.length;) I.call(c, c.childNodes[0]);
                    for (a = b ? d.content : d; 0 < a.childNodes.length;) H.call(c, a.childNodes[0])
                }
            })
        });
        v(Element.prototype, "setAttribute", function (a, b) {
            if (1 !== this.__CE_state) return ta.call(this, a, b);
            var c = P.call(this, a);
            ta.call(this, a, b);
            b = P.call(this, a);
            d.attributeChangedCallback(this, a, c, b, null)
        });
        v(Element.prototype, "setAttributeNS", function (a, b, c) {
            if (1 !== this.__CE_state) return va.call(this, a, b, c);
            var e = Q.call(this, a, b);
            va.call(this,
                a, b, c);
            c = Q.call(this, a, b);
            d.attributeChangedCallback(this, b, e, c, a)
        });
        v(Element.prototype, "removeAttribute", function (a) {
            if (1 !== this.__CE_state) return ua.call(this, a);
            var b = P.call(this, a);
            ua.call(this, a);
            null !== b && d.attributeChangedCallback(this, a, b, null, null)
        });
        v(Element.prototype, "removeAttributeNS", function (a, b) {
            if (1 !== this.__CE_state) return wa.call(this, a, b);
            var c = Q.call(this, a, b);
            wa.call(this, a, b);
            var e = Q.call(this, a, b);
            c !== e && d.attributeChangedCallback(this, b, c, e, a)
        });
        Ja ? a(HTMLElement.prototype,
            Ja) : xa ? a(Element.prototype, xa) : console.warn("Custom Elements: `Element#insertAdjacentElement` was not patched.");
        Ka ? c(HTMLElement.prototype, Ka) : ya ? c(Element.prototype, ya) : console.warn("Custom Elements: `Element#insertAdjacentHTML` was not patched.");
        U(d, Element.prototype, {i: za, append: Ea});
        Pa(d)
    };var V = window.customElements;
    if (!V || V.forcePolyfill || "function" != typeof V.define || "function" != typeof V.get) {
        var T = new w;
        Ma();
        Na();
        U(T, DocumentFragment.prototype, {i: na, append: oa});
        Oa();
        Qa();
        document.__CE_hasRegistry = !0;
        var customElements = new G(T);
        Object.defineProperty(window, "customElements", {configurable: !0, enumerable: !0, value: customElements})
    }
    ;/*

 Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
 This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 Code distributed by Google as part of the polymer project is also
 subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
    var W = window.customElements, Y = window.HTMLImports, Ra = window.HTMLTemplateElement;
    window.WebComponents = window.WebComponents || {};
    if (W && W.polyfillWrapFlushCallback) {
        var Z, Sa = function () {
            if (Z) {
                Ra.D && Ra.D(window.document);
                var b = Z;
                Z = null;
                b();
                return !0
            }
        }, Ta = Y.whenReady;
        W.polyfillWrapFlushCallback(function (b) {
            Z = b;
            Ta(Sa)
        });
        Y.whenReady = function (b) {
            Ta(function () {
                Sa() ? Y.whenReady(b) : b()
            })
        }
    }
    Y.whenReady(function () {
        requestAnimationFrame(function () {
            window.WebComponents.ready = !0;
            document.dispatchEvent(new CustomEvent("WebComponentsReady", {bubbles: !0}))
        })
    });
    var Ua = document.createElement("style");
    Ua.textContent = "body {transition: opacity ease-in 0.2s; } \nbody[unresolved] {opacity: 0; display: block; overflow: hidden; position: relative; } \n";
    var Va = document.querySelector("head");
    Va.insertBefore(Ua, Va.firstChild);/*

Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
}).call(this);

//# sourceMappingURL=webcomponents-hi-ce.js.map
