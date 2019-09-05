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
    var n,
        p = "undefined" != typeof window && window === this ? this : "undefined" != typeof global && null != global ? global : this,
        aa = "function" == typeof Object.defineProperties ? Object.defineProperty : function (a, b, c) {
            a != Array.prototype && a != Object.prototype && (a[b] = c.value)
        };

    function ba() {
        ba = function () {
        };
        p.Symbol || (p.Symbol = ca)
    }

    var ca = function () {
        var a = 0;
        return function (b) {
            return "jscomp_symbol_" + (b || "") + a++
        }
    }();

    function da() {
        ba();
        var a = p.Symbol.iterator;
        a || (a = p.Symbol.iterator = p.Symbol("iterator"));
        "function" != typeof Array.prototype[a] && aa(Array.prototype, a, {
            configurable: !0,
            writable: !0,
            value: function () {
                return ea(this)
            }
        });
        da = function () {
        }
    }

    function ea(a) {
        var b = 0;
        return fa(function () {
            return b < a.length ? {done: !1, value: a[b++]} : {done: !0}
        })
    }

    function fa(a) {
        da();
        a = {next: a};
        a[p.Symbol.iterator] = function () {
            return this
        };
        return a
    }

    function ha(a) {
        da();
        ba();
        da();
        var b = a[Symbol.iterator];
        return b ? b.call(a) : ea(a)
    }

    function ia(a) {
        for (var b, c = []; !(b = a.next()).done;) c.push(b.value);
        return c
    }

    (function (a) {
        function b(a, b) {
            if ("function" === typeof window.CustomEvent) return new CustomEvent(a, b);
            var c = document.createEvent("CustomEvent");
            c.initCustomEvent(a, !!b.bubbles, !!b.cancelable, b.detail);
            return c
        }

        function c(a) {
            if (O) return a.ownerDocument !== document ? a.ownerDocument : null;
            var b = a.__importDoc;
            if (!b && a.parentNode) {
                b = a.parentNode;
                if ("function" === typeof b.closest) b = b.closest("link[rel=import]"); else for (; !h(b) && (b = b.parentNode);) ;
                a.__importDoc = b
            }
            return b
        }

        function d(a) {
            var b = m(document, "link[rel=import]:not([import-dependency])"),
                c = b.length;
            c ? t(b, function (b) {
                return g(b, function () {
                    0 === --c && a()
                })
            }) : a()
        }

        function e(a) {
            function b() {
                "loading" !== document.readyState && document.body && (document.removeEventListener("readystatechange", b), a())
            }

            document.addEventListener("readystatechange", b);
            b()
        }

        function f(a) {
            e(function () {
                return d(function () {
                    return a && a()
                })
            })
        }

        function g(a, b) {
            if (a.__loaded) b && b(); else if ("script" === a.localName && !a.src || "style" === a.localName && !a.firstChild) a.__loaded = !0, b && b(); else {
                var c = function (d) {
                    a.removeEventListener(d.type,
                        c);
                    a.__loaded = !0;
                    b && b()
                };
                a.addEventListener("load", c);
                ab && "style" === a.localName || a.addEventListener("error", c)
            }
        }

        function h(a) {
            return a.nodeType === Node.ELEMENT_NODE && "link" === a.localName && "import" === a.rel
        }

        function k() {
            var a = this;
            this.a = {};
            this.b = 0;
            this.c = new MutationObserver(function (b) {
                return a.Da(b)
            });
            this.c.observe(document.head, {childList: !0, subtree: !0});
            this.loadImports(document)
        }

        function l(a) {
            t(m(a, "template"), function (a) {
                t(m(a.content, 'script:not([type]),script[type="application/javascript"],script[type="text/javascript"],script[type="module"]'),
                    function (a) {
                        var b = document.createElement("script");
                        t(a.attributes, function (a) {
                            return b.setAttribute(a.name, a.value)
                        });
                        b.textContent = a.textContent;
                        a.parentNode.replaceChild(b, a)
                    });
                l(a.content)
            })
        }

        function m(a, b) {
            return a.childNodes.length ? a.querySelectorAll(b) : Y
        }

        function t(a, b, c) {
            var d = a ? a.length : 0, e = c ? -1 : 1;
            for (c = c ? d - 1 : 0; c < d && 0 <= c; c += e) b(a[c], c)
        }

        var E = document.createElement("link"), O = "import" in E, Y = E.querySelectorAll("*"), bb = null;
        !1 === "currentScript" in document && Object.defineProperty(document, "currentScript",
            {
                get: function () {
                    return bb || ("complete" !== document.readyState ? document.scripts[document.scripts.length - 1] : null)
                }, configurable: !0
            });
        var xe = /(url\()([^)]*)(\))/g, ye = /(@import[\s]+(?!url\())([^;]*)(;)/g,
            ze = /(<link[^>]*)(rel=['|"]?stylesheet['|"]?[^>]*>)/g, F = {
                ya: function (a, b) {
                    a.href && a.setAttribute("href", F.S(a.getAttribute("href"), b));
                    a.src && a.setAttribute("src", F.S(a.getAttribute("src"), b));
                    if ("style" === a.localName) {
                        var c = F.ja(a.textContent, b, xe);
                        a.textContent = F.ja(c, b, ye)
                    }
                }, ja: function (a, b, c) {
                    return a.replace(c,
                        function (a, c, d, e) {
                            a = d.replace(/["']/g, "");
                            b && (a = F.S(a, b));
                            return c + "'" + a + "'" + e
                        })
                }, S: function (a, b) {
                    if (void 0 === F.W) {
                        F.W = !1;
                        try {
                            var c = new URL("b", "http://a");
                            c.pathname = "c%20d";
                            F.W = "http://a/c%20d" === c.href
                        } catch (kg) {
                        }
                    }
                    if (F.W) return (new URL(a, b)).href;
                    c = F.qa;
                    c || (c = document.implementation.createHTMLDocument("temp"), F.qa = c, c.da = c.createElement("base"), c.head.appendChild(c.da), c.ca = c.createElement("a"));
                    c.da.href = b;
                    c.ca.href = a;
                    return c.ca.href || a
                }
            }, hc = {
                async: !0, load: function (a, b, c) {
                    if (a) if (a.match(/^data:/)) {
                        a =
                            a.split(",");
                        var d = a[1];
                        d = -1 < a[0].indexOf(";base64") ? atob(d) : decodeURIComponent(d);
                        b(d)
                    } else {
                        var e = new XMLHttpRequest;
                        e.open("GET", a, hc.async);
                        e.onload = function () {
                            var a = e.responseURL || e.getResponseHeader("Location");
                            a && 0 === a.indexOf("/") && (a = (location.origin || location.protocol + "//" + location.host) + a);
                            var d = e.response || e.responseText;
                            304 === e.status || 0 === e.status || 200 <= e.status && 300 > e.status ? b(d, a) : c(d)
                        };
                        e.send()
                    } else c("error: href must be specified")
                }
            }, ab = /Trident/.test(navigator.userAgent) || /Edge\/\d./i.test(navigator.userAgent);
        k.prototype.loadImports = function (a) {
            var b = this;
            a = m(a, "link[rel=import]");
            t(a, function (a) {
                return b.g(a)
            })
        };
        k.prototype.g = function (a) {
            var b = this, c = a.href;
            if (void 0 !== this.a[c]) {
                var d = this.a[c];
                d && d.__loaded && (a.__import = d, this.f(a))
            } else this.b++, this.a[c] = "pending", hc.load(c, function (a, d) {
                a = b.Ea(a, d || c);
                b.a[c] = a;
                b.b--;
                b.loadImports(a);
                b.j()
            }, function () {
                b.a[c] = null;
                b.b--;
                b.j()
            })
        };
        k.prototype.Ea = function (a, b) {
            if (!a) return document.createDocumentFragment();
            ab && (a = a.replace(ze, function (a, b, c) {
                return -1 ===
                a.indexOf("type=") ? b + " type=import-disable " + c : a
            }));
            var c = document.createElement("template");
            c.innerHTML = a;
            if (c.content) a = c.content, l(a); else for (a = document.createDocumentFragment(); c.firstChild;) a.appendChild(c.firstChild);
            if (c = a.querySelector("base")) b = F.S(c.getAttribute("href"), b), c.removeAttribute("href");
            c = m(a, 'link[rel=import],link[rel=stylesheet][href][type=import-disable],style:not([type]),link[rel=stylesheet][href]:not([type]),script:not([type]),script[type="application/javascript"],script[type="text/javascript"],script[type="module"]');
            var d = 0;
            t(c, function (a) {
                g(a);
                F.ya(a, b);
                a.setAttribute("import-dependency", "");
                if ("script" === a.localName && !a.src && a.textContent) {
                    if ("module" === a.type) throw Error("Inline module scripts are not supported in HTML Imports.");
                    a.setAttribute("src", "data:text/javascript;charset=utf-8," + encodeURIComponent(a.textContent + ("\n//# sourceURL=" + b + (d ? "-" + d : "") + ".js\n")));
                    a.textContent = "";
                    d++
                }
            });
            return a
        };
        k.prototype.j = function () {
            var a = this;
            if (!this.b) {
                this.c.disconnect();
                this.flatten(document);
                var b = !1, c = !1, d = function () {
                    c &&
                    b && (a.loadImports(document), a.b || (a.c.observe(document.head, {
                        childList: !0,
                        subtree: !0
                    }), a.Z()))
                };
                this.Ga(function () {
                    c = !0;
                    d()
                });
                this.Fa(function () {
                    b = !0;
                    d()
                })
            }
        };
        k.prototype.flatten = function (a) {
            var b = this;
            a = m(a, "link[rel=import]");
            t(a, function (a) {
                var c = b.a[a.href];
                (a.__import = c) && c.nodeType === Node.DOCUMENT_FRAGMENT_NODE && (b.a[a.href] = a, a.readyState = "loading", a.__import = a, b.flatten(c), a.appendChild(c))
            })
        };
        k.prototype.Fa = function (a) {
            function b(e) {
                if (e < d) {
                    var f = c[e], h = document.createElement("script");
                    f.removeAttribute("import-dependency");
                    t(f.attributes, function (a) {
                        return h.setAttribute(a.name, a.value)
                    });
                    bb = h;
                    f.parentNode.replaceChild(h, f);
                    g(h, function () {
                        bb = null;
                        b(e + 1)
                    })
                } else a()
            }

            var c = m(document, "script[import-dependency]"), d = c.length;
            b(0)
        };
        k.prototype.Ga = function (a) {
            var b = m(document, "style[import-dependency],link[rel=stylesheet][import-dependency]"), d = b.length;
            if (d) {
                var e = ab && !!document.querySelector("link[rel=stylesheet][href][type=import-disable]");
                t(b, function (b) {
                    g(b, function () {
                        b.removeAttribute("import-dependency");
                        0 === --d &&
                        a()
                    });
                    if (e && b.parentNode !== document.head) {
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
        k.prototype.Z = function () {
            var a = this, b = m(document, "link[rel=import]");
            t(b, function (b) {
                return a.f(b)
            }, !0)
        };
        k.prototype.f = function (a) {
            a.__loaded || (a.__loaded = !0, a.import && (a.import.readyState =
                "complete"), a.dispatchEvent(b(a.import ? "load" : "error", {
                bubbles: !1,
                cancelable: !1,
                detail: void 0
            })))
        };
        k.prototype.Da = function (a) {
            var b = this;
            t(a, function (a) {
                return t(a.addedNodes, function (a) {
                    a && a.nodeType === Node.ELEMENT_NODE && (h(a) ? b.g(a) : b.loadImports(a))
                })
            })
        };
        var cb = null;
        if (O) E = m(document, "link[rel=import]"), t(E, function (a) {
            a.import && "loading" === a.import.readyState || (a.__loaded = !0)
        }), E = function (a) {
            a = a.target;
            h(a) && (a.__loaded = !0)
        }, document.addEventListener("load", E, !0), document.addEventListener("error",
            E, !0); else {
            var ma = Object.getOwnPropertyDescriptor(Node.prototype, "baseURI");
            Object.defineProperty((!ma || ma.configurable ? Node : Element).prototype, "baseURI", {
                get: function () {
                    var a = h(this) ? this : c(this);
                    return a ? a.href : ma && ma.get ? ma.get.call(this) : (document.querySelector("base") || window.location).href
                }, configurable: !0, enumerable: !0
            });
            Object.defineProperty(HTMLLinkElement.prototype, "import", {
                get: function () {
                    return this.__import || null
                }, configurable: !0, enumerable: !0
            });
            e(function () {
                cb = new k
            })
        }
        f(function () {
            return document.dispatchEvent(b("HTMLImportsLoaded",
                {cancelable: !0, bubbles: !0, detail: void 0}))
        });
        a.useNative = O;
        a.whenReady = f;
        a.importForElement = c;
        a.loadImports = function (a) {
            cb && cb.loadImports(a)
        }
    })(window.HTMLImports = window.HTMLImports || {});/*

Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
    function ja() {
        this.ia = this.root = null;
        this.N = !1;
        this.A = this.K = this.Y = this.assignedSlot = this.assignedNodes = this.C = null;
        this.childNodes = this.nextSibling = this.previousSibling = this.lastChild = this.firstChild = this.parentNode = this.F = void 0;
        this.ea = this.fa = !1;
        this.J = {}
    }

    ja.prototype.toJSON = function () {
        return {}
    };

    function q(a) {
        a.__shady || (a.__shady = new ja);
        return a.__shady
    }

    function r(a) {
        return a && a.__shady
    };var u = window.ShadyDOM || {};
    u.Aa = !(!Element.prototype.attachShadow || !Node.prototype.getRootNode);
    var ka = Object.getOwnPropertyDescriptor(Node.prototype, "firstChild");
    u.l = !!(ka && ka.configurable && ka.get);
    u.$ = u.force || !u.Aa;
    u.D = u.noPatch || !1;
    u.ha = u.preferPerformance;

    function v(a) {
        return (a = r(a)) && void 0 !== a.firstChild
    }

    function w(a) {
        return "ShadyRoot" === a.sa
    }

    function la(a) {
        return (a = (a = r(a)) && a.root) && na(a)
    }

    var x = Element.prototype,
        oa = x.matches || x.matchesSelector || x.mozMatchesSelector || x.msMatchesSelector || x.oMatchesSelector || x.webkitMatchesSelector,
        pa = document.createTextNode(""), qa = 0, ra = [];
    (new MutationObserver(function () {
        for (; ra.length;) try {
            ra.shift()()
        } catch (a) {
            throw pa.textContent = qa++, a;
        }
    })).observe(pa, {characterData: !0});

    function sa(a) {
        ra.push(a);
        pa.textContent = qa++
    }

    var ta = !!document.contains;

    function ua(a, b) {
        for (; b;) {
            if (b == a) return !0;
            b = b.__shady_parentNode
        }
        return !1
    }

    function va(a) {
        for (var b = a.length - 1; 0 <= b; b--) {
            var c = a[b], d = c.getAttribute("id") || c.getAttribute("name");
            d && "length" !== d && isNaN(d) && (a[d] = c)
        }
        a.item = function (b) {
            return a[b]
        };
        a.namedItem = function (b) {
            if ("length" !== b && isNaN(b) && a[b]) return a[b];
            for (var c = ha(a), d = c.next(); !d.done; d = c.next()) if (d = d.value, (d.getAttribute("id") || d.getAttribute("name")) == b) return d;
            return null
        };
        return a
    }

    function y(a, b, c, d) {
        c = void 0 === c ? "" : c;
        for (var e in b) {
            var f = b[e];
            if (!(d && 0 <= d.indexOf(e))) {
                f.configurable = !0;
                var g = c + e;
                if (f.value) a[g] = f.value; else try {
                    Object.defineProperty(a, g, f)
                } catch (h) {
                }
            }
        }
    }

    function z(a) {
        var b = {};
        Object.getOwnPropertyNames(a).forEach(function (c) {
            b[c] = Object.getOwnPropertyDescriptor(a, c)
        });
        return b
    };var wa = [], xa;

    function ya(a) {
        xa || (xa = !0, sa(za));
        wa.push(a)
    }

    function za() {
        xa = !1;
        for (var a = !!wa.length; wa.length;) wa.shift()();
        return a
    }

    za.list = wa;

    function Aa() {
        this.a = !1;
        this.addedNodes = [];
        this.removedNodes = [];
        this.M = new Set
    }

    function Ba(a) {
        a.a || (a.a = !0, sa(function () {
            a.flush()
        }))
    }

    Aa.prototype.flush = function () {
        if (this.a) {
            this.a = !1;
            var a = this.takeRecords();
            a.length && this.M.forEach(function (b) {
                b(a)
            })
        }
    };
    Aa.prototype.takeRecords = function () {
        if (this.addedNodes.length || this.removedNodes.length) {
            var a = [{addedNodes: this.addedNodes, removedNodes: this.removedNodes}];
            this.addedNodes = [];
            this.removedNodes = [];
            return a
        }
        return []
    };

    function Ca(a, b) {
        var c = q(a);
        c.C || (c.C = new Aa);
        c.C.M.add(b);
        var d = c.C;
        return {
            ra: b, B: d, ta: a, takeRecords: function () {
                return d.takeRecords()
            }
        }
    }

    function Da(a) {
        var b = a && a.B;
        b && (b.M.delete(a.ra), b.M.size || (q(a.ta).C = null))
    }

    function Ea(a, b) {
        var c = b.getRootNode();
        return a.map(function (a) {
            var b = c === a.target.getRootNode();
            if (b && a.addedNodes) {
                if (b = Array.from(a.addedNodes).filter(function (a) {
                    return c === a.getRootNode()
                }), b.length) return a = Object.create(a), Object.defineProperty(a, "addedNodes", {
                    value: b,
                    configurable: !0
                }), a
            } else if (b) return a
        }).filter(function (a) {
            return a
        })
    };var Fa = /[&\u00A0"]/g, Ga = /[&\u00A0<>]/g;

    function Ha(a) {
        switch (a) {
            case "&":
                return "&amp;";
            case "<":
                return "&lt;";
            case ">":
                return "&gt;";
            case '"':
                return "&quot;";
            case "\u00a0":
                return "&nbsp;"
        }
    }

    function Ia(a) {
        for (var b = {}, c = 0; c < a.length; c++) b[a[c]] = !0;
        return b
    }

    var Ja = Ia("area base br col command embed hr img input keygen link meta param source track wbr".split(" ")),
        Ka = Ia("style script xmp iframe noembed noframes plaintext noscript".split(" "));

    function La(a, b) {
        "template" === a.localName && (a = a.content);
        for (var c = "", d = b ? b(a) : a.childNodes, e = 0, f = d.length, g = void 0; e < f && (g = d[e]); e++) {
            a:{
                var h = g;
                var k = a, l = b;
                switch (h.nodeType) {
                    case Node.ELEMENT_NODE:
                        k = h.localName;
                        for (var m = "<" + k, t = h.attributes, E = 0, O; O = t[E]; E++) m += " " + O.name + '="' + O.value.replace(Fa, Ha) + '"';
                        m += ">";
                        h = Ja[k] ? m : m + La(h, l) + "</" + k + ">";
                        break a;
                    case Node.TEXT_NODE:
                        h = h.data;
                        h = k && Ka[k.localName] ? h : h.replace(Ga, Ha);
                        break a;
                    case Node.COMMENT_NODE:
                        h = "\x3c!--" + h.data + "--\x3e";
                        break a;
                    default:
                        throw window.console.error(h),
                            Error("not implemented");
                }
            }
            c += h
        }
        return c
    };var Ma = u.l, Na = {
        querySelector: function (a) {
            return this.__shady_native_querySelector(a)
        }, querySelectorAll: function (a) {
            return this.__shady_native_querySelectorAll(a)
        }
    }, Oa = {};

    function Pa(a) {
        Oa[a] = function (b) {
            return b["__shady_native_" + a]
        }
    }

    function Qa(a, b) {
        y(a, b, "__shady_native_");
        for (var c in b) Pa(c)
    }

    function A(a, b) {
        b = void 0 === b ? [] : b;
        for (var c = 0; c < b.length; c++) {
            var d = b[c], e = Object.getOwnPropertyDescriptor(a, d);
            e && (Object.defineProperty(a, "__shady_native_" + d, e), e.value ? Na[d] || (Na[d] = e.value) : Pa(d))
        }
    }

    var B = document.createTreeWalker(document, NodeFilter.SHOW_ALL, null, !1),
        C = document.createTreeWalker(document, NodeFilter.SHOW_ELEMENT, null, !1),
        Ra = document.implementation.createHTMLDocument("inert");

    function Sa(a) {
        for (var b; b = a.__shady_native_firstChild;) a.__shady_native_removeChild(b)
    }

    var Ta = ["firstElementChild", "lastElementChild", "children", "childElementCount"],
        Ua = ["querySelector", "querySelectorAll"];

    function Va() {
        var a = ["dispatchEvent", "addEventListener", "removeEventListener"];
        window.EventTarget ? A(window.EventTarget.prototype, a) : (A(Node.prototype, a), A(Window.prototype, a));
        Ma ? A(Node.prototype, "parentNode firstChild lastChild previousSibling nextSibling childNodes parentElement textContent".split(" ")) : Qa(Node.prototype, {
            parentNode: {
                get: function () {
                    B.currentNode = this;
                    return B.parentNode()
                }
            }, firstChild: {
                get: function () {
                    B.currentNode = this;
                    return B.firstChild()
                }
            }, lastChild: {
                get: function () {
                    B.currentNode =
                        this;
                    return B.lastChild()
                }
            }, previousSibling: {
                get: function () {
                    B.currentNode = this;
                    return B.previousSibling()
                }
            }, nextSibling: {
                get: function () {
                    B.currentNode = this;
                    return B.nextSibling()
                }
            }, childNodes: {
                get: function () {
                    var a = [];
                    B.currentNode = this;
                    for (var c = B.firstChild(); c;) a.push(c), c = B.nextSibling();
                    return a
                }
            }, parentElement: {
                get: function () {
                    C.currentNode = this;
                    return C.parentNode()
                }
            }, textContent: {
                get: function () {
                    switch (this.nodeType) {
                        case Node.ELEMENT_NODE:
                        case Node.DOCUMENT_FRAGMENT_NODE:
                            for (var a = document.createTreeWalker(this,
                                NodeFilter.SHOW_TEXT, null, !1), c = "", d; d = a.nextNode();) c += d.nodeValue;
                            return c;
                        default:
                            return this.nodeValue
                    }
                }, set: function (a) {
                    if ("undefined" === typeof a || null === a) a = "";
                    switch (this.nodeType) {
                        case Node.ELEMENT_NODE:
                        case Node.DOCUMENT_FRAGMENT_NODE:
                            Sa(this);
                            (0 < a.length || this.nodeType === Node.ELEMENT_NODE) && this.__shady_native_insertBefore(document.createTextNode(a), void 0);
                            break;
                        default:
                            this.nodeValue = a
                    }
                }
            }
        });
        A(Node.prototype, "appendChild insertBefore removeChild replaceChild cloneNode contains".split(" "));
        a = {
            firstElementChild: {
                get: function () {
                    C.currentNode = this;
                    return C.firstChild()
                }
            }, lastElementChild: {
                get: function () {
                    C.currentNode = this;
                    return C.lastChild()
                }
            }, children: {
                get: function () {
                    var a = [];
                    C.currentNode = this;
                    for (var c = C.firstChild(); c;) a.push(c), c = C.nextSibling();
                    return va(a)
                }
            }, childElementCount: {
                get: function () {
                    return this.children ? this.children.length : 0
                }
            }
        };
        Ma ? (A(Element.prototype, Ta), A(Element.prototype, ["previousElementSibling", "nextElementSibling", "innerHTML"]), Object.getOwnPropertyDescriptor(HTMLElement.prototype,
            "children") && A(HTMLElement.prototype, ["children"]), Object.getOwnPropertyDescriptor(HTMLElement.prototype, "innerHTML") && A(HTMLElement.prototype, ["innerHTML"])) : (Qa(Element.prototype, a), Qa(Element.prototype, {
            previousElementSibling: {
                get: function () {
                    C.currentNode = this;
                    return C.previousSibling()
                }
            }, nextElementSibling: {
                get: function () {
                    C.currentNode = this;
                    return C.nextSibling()
                }
            }, innerHTML: {
                get: function () {
                    return La(this, function (a) {
                        return a.__shady_native_childNodes
                    })
                }, set: function (a) {
                    var b = "template" === this.localName ?
                        this.content : this;
                    Sa(b);
                    var d = this.localName || "div";
                    d = this.namespaceURI && this.namespaceURI !== Ra.namespaceURI ? Ra.createElementNS(this.namespaceURI, d) : Ra.createElement(d);
                    d.innerHTML = a;
                    for (a = "template" === this.localName ? d.content : d; d = a.__shady_native_firstChild;) b.__shady_native_insertBefore(d, void 0)
                }
            }
        }));
        A(Element.prototype, "setAttribute getAttribute hasAttribute removeAttribute focus blur".split(" "));
        A(Element.prototype, Ua);
        A(HTMLElement.prototype, ["focus", "blur", "contains"]);
        Ma && A(HTMLElement.prototype,
            ["parentElement", "children", "innerHTML"]);
        window.HTMLTemplateElement && A(window.HTMLTemplateElement.prototype, ["innerHTML"]);
        Ma ? A(DocumentFragment.prototype, Ta) : Qa(DocumentFragment.prototype, a);
        A(DocumentFragment.prototype, Ua);
        Ma ? (A(Document.prototype, Ta), A(Document.prototype, ["activeElement"])) : Qa(Document.prototype, a);
        A(Document.prototype, ["importNode", "getElementById"]);
        A(Document.prototype, Ua)
    };var Wa = z({
        get childNodes() {
            return this.__shady_childNodes
        }, get firstChild() {
            return this.__shady_firstChild
        }, get lastChild() {
            return this.__shady_lastChild
        }, get textContent() {
            return this.__shady_textContent
        }, set textContent(a) {
            this.__shady_textContent = a
        }, get childElementCount() {
            return this.__shady_childElementCount
        }, get children() {
            return this.__shady_children
        }, get firstElementChild() {
            return this.__shady_firstElementChild
        }, get lastElementChild() {
            return this.__shady_lastElementChild
        }, get innerHTML() {
            return this.__shady_innerHTML
        },
        set innerHTML(a) {
            return this.__shady_innerHTML = a
        }, get shadowRoot() {
            return this.__shady_shadowRoot
        }
    }), Xa = z({
        get parentElement() {
            return this.__shady_parentElement
        }, get parentNode() {
            return this.__shady_parentNode
        }, get nextSibling() {
            return this.__shady_nextSibling
        }, get previousSibling() {
            return this.__shady_previousSibling
        }, get nextElementSibling() {
            return this.__shady_nextElementSibling
        }, get previousElementSibling() {
            return this.__shady_previousElementSibling
        }, get className() {
            return this.__shady_className
        },
        set className(a) {
            return this.__shady_className = a
        }
    }), Ya;
    for (Ya in Wa) Wa[Ya].enumerable = !1;
    for (var Za in Xa) Xa[Za].enumerable = !1;
    var $a = u.l || u.D, db = $a ? function () {
    } : function (a) {
        var b = q(a);
        b.fa || (b.fa = !0, y(a, Xa))
    }, eb = $a ? function () {
    } : function (a) {
        var b = q(a);
        b.ea || (b.ea = !0, y(a, Wa))
    };
    var fb = "__eventWrappers" + Date.now(), gb = function () {
        var a = Object.getOwnPropertyDescriptor(Event.prototype, "composed");
        return a ? function (b) {
            return a.get.call(b)
        } : null
    }(), hb = {
        blur: !0,
        focus: !0,
        focusin: !0,
        focusout: !0,
        click: !0,
        dblclick: !0,
        mousedown: !0,
        mouseenter: !0,
        mouseleave: !0,
        mousemove: !0,
        mouseout: !0,
        mouseover: !0,
        mouseup: !0,
        wheel: !0,
        beforeinput: !0,
        input: !0,
        keydown: !0,
        keyup: !0,
        compositionstart: !0,
        compositionupdate: !0,
        compositionend: !0,
        touchstart: !0,
        touchend: !0,
        touchmove: !0,
        touchcancel: !0,
        pointerover: !0,
        pointerenter: !0,
        pointerdown: !0,
        pointermove: !0,
        pointerup: !0,
        pointercancel: !0,
        pointerout: !0,
        pointerleave: !0,
        gotpointercapture: !0,
        lostpointercapture: !0,
        dragstart: !0,
        drag: !0,
        dragenter: !0,
        dragleave: !0,
        dragover: !0,
        drop: !0,
        dragend: !0,
        DOMActivate: !0,
        DOMFocusIn: !0,
        DOMFocusOut: !0,
        keypress: !0
    }, ib = {
        DOMAttrModified: !0,
        DOMAttributeNameChanged: !0,
        DOMCharacterDataModified: !0,
        DOMElementNameChanged: !0,
        DOMNodeInserted: !0,
        DOMNodeInsertedIntoDocument: !0,
        DOMNodeRemoved: !0,
        DOMNodeRemovedFromDocument: !0,
        DOMSubtreeModified: !0
    };

    function jb(a) {
        return a instanceof Node ? a.__shady_getRootNode() : a
    }

    function kb(a, b) {
        var c = [], d = a;
        for (a = jb(a); d;) c.push(d), d.__shady_assignedSlot ? d = d.__shady_assignedSlot : d.nodeType === Node.DOCUMENT_FRAGMENT_NODE && d.host && (b || d !== a) ? d = d.host : d = d.__shady_parentNode;
        c[c.length - 1] === document && c.push(window);
        return c
    }

    function lb(a) {
        a.__composedPath || (a.__composedPath = kb(a.target, !0));
        return a.__composedPath
    }

    function mb(a, b) {
        if (!w) return a;
        a = kb(a, !0);
        for (var c = 0, d, e = void 0, f, g = void 0; c < b.length; c++) if (d = b[c], f = jb(d), f !== e && (g = a.indexOf(f), e = f), !w(f) || -1 < g) return d
    }

    function nb(a) {
        function b(b, d) {
            b = new a(b, d);
            b.__composed = d && !!d.composed;
            return b
        }

        b.__proto__ = a;
        b.prototype = a.prototype;
        return b
    }

    var ob = {focus: !0, blur: !0};

    function pb(a) {
        return a.__target !== a.target || a.__relatedTarget !== a.relatedTarget
    }

    function qb(a, b, c) {
        if (c = b.__handlers && b.__handlers[a.type] && b.__handlers[a.type][c]) for (var d = 0, e; (e = c[d]) && (!pb(a) || a.target !== a.relatedTarget) && (e.call(b, a), !a.__immediatePropagationStopped); d++) ;
    }

    function rb(a) {
        var b = a.composedPath();
        Object.defineProperty(a, "currentTarget", {
            get: function () {
                return d
            }, configurable: !0
        });
        for (var c = b.length - 1; 0 <= c; c--) {
            var d = b[c];
            qb(a, d, "capture");
            if (a.U) return
        }
        Object.defineProperty(a, "eventPhase", {
            get: function () {
                return Event.AT_TARGET
            }
        });
        var e;
        for (c = 0; c < b.length; c++) {
            d = b[c];
            var f = r(d);
            f = f && f.root;
            if (0 === c || f && f === e) if (qb(a, d, "bubble"), d !== window && (e = d.__shady_getRootNode()), a.U) break
        }
    }

    function sb(a, b, c, d, e, f) {
        for (var g = 0; g < a.length; g++) {
            var h = a[g], k = h.type, l = h.capture, m = h.once, t = h.passive;
            if (b === h.node && c === k && d === l && e === m && f === t) return g
        }
        return -1
    }

    function tb(a, b, c) {
        if (b) {
            var d = typeof b;
            if ("function" === d || "object" === d) if ("object" !== d || b.handleEvent && "function" === typeof b.handleEvent) {
                if (ib[a]) return this.__shady_native_addEventListener(a, b, c);
                if (c && "object" === typeof c) {
                    var e = !!c.capture;
                    var f = !!c.once;
                    var g = !!c.passive
                } else e = !!c, g = f = !1;
                var h = c && c.V || this, k = b[fb];
                if (k) {
                    if (-1 < sb(k, h, a, e, f, g)) return
                } else b[fb] = [];
                k = function (e) {
                    f && this.__shady_removeEventListener(a, b, c);
                    e.__target || ub(e);
                    if (h !== this) {
                        var g = Object.getOwnPropertyDescriptor(e, "currentTarget");
                        Object.defineProperty(e, "currentTarget", {
                            get: function () {
                                return h
                            }, configurable: !0
                        })
                    }
                    e.__previousCurrentTarget = e.currentTarget;
                    if (!w(h) || -1 != e.composedPath().indexOf(h)) if (e.composed || -1 < e.composedPath().indexOf(h)) if (pb(e) && e.target === e.relatedTarget) e.eventPhase === Event.BUBBLING_PHASE && e.stopImmediatePropagation(); else if (e.eventPhase === Event.CAPTURING_PHASE || e.bubbles || e.target === h || h instanceof Window) {
                        var k = "function" === d ? b.call(h, e) : b.handleEvent && b.handleEvent(e);
                        h !== this && (g ? (Object.defineProperty(e,
                            "currentTarget", g), g = null) : delete e.currentTarget);
                        return k
                    }
                };
                b[fb].push({node: h, type: a, capture: e, once: f, passive: g, Qa: k});
                ob[a] ? (this.__handlers = this.__handlers || {}, this.__handlers[a] = this.__handlers[a] || {
                    capture: [],
                    bubble: []
                }, this.__handlers[a][e ? "capture" : "bubble"].push(k)) : this.__shady_native_addEventListener(a, k, c)
            }
        }
    }

    function vb(a, b, c) {
        if (b) {
            if (ib[a]) return this.__shady_native_removeEventListener(a, b, c);
            if (c && "object" === typeof c) {
                var d = !!c.capture;
                var e = !!c.once;
                var f = !!c.passive
            } else d = !!c, f = e = !1;
            var g = c && c.V || this, h = void 0;
            var k = null;
            try {
                k = b[fb]
            } catch (l) {
            }
            k && (e = sb(k, g, a, d, e, f), -1 < e && (h = k.splice(e, 1)[0].Qa, k.length || (b[fb] = void 0)));
            this.__shady_native_removeEventListener(a, h || b, c);
            h && ob[a] && this.__handlers && this.__handlers[a] && (a = this.__handlers[a][d ? "capture" : "bubble"], h = a.indexOf(h), -1 < h && a.splice(h, 1))
        }
    }

    function wb() {
        for (var a in ob) window.__shady_native_addEventListener(a, function (a) {
            a.__target || (ub(a), rb(a))
        }, !0)
    }

    var xb = z({
        get composed() {
            void 0 === this.__composed && (gb ? this.__composed = "focusin" === this.type || "focusout" === this.type || gb(this) : !1 !== this.isTrusted && (this.__composed = hb[this.type]));
            return this.__composed || !1
        }, composedPath: function () {
            this.__composedPath || (this.__composedPath = kb(this.__target, this.composed));
            return this.__composedPath
        }, get target() {
            return mb(this.currentTarget || this.__previousCurrentTarget, this.composedPath())
        }, get relatedTarget() {
            if (!this.__relatedTarget) return null;
            this.__relatedTargetComposedPath ||
            (this.__relatedTargetComposedPath = kb(this.__relatedTarget, !0));
            return mb(this.currentTarget || this.__previousCurrentTarget, this.__relatedTargetComposedPath)
        }, stopPropagation: function () {
            Event.prototype.stopPropagation.call(this);
            this.U = !0
        }, stopImmediatePropagation: function () {
            Event.prototype.stopImmediatePropagation.call(this);
            this.U = this.__immediatePropagationStopped = !0
        }
    });

    function ub(a) {
        a.__target = a.target;
        a.__relatedTarget = a.relatedTarget;
        if (u.l) {
            var b = Object.getPrototypeOf(a);
            if (!Object.hasOwnProperty(b, "__shady_patchedProto")) {
                var c = Object.create(b);
                c.__shady_sourceProto = b;
                y(c, xb);
                b.__shady_patchedProto = c
            }
            a.__proto__ = b.__shady_patchedProto
        } else y(a, xb)
    }

    var yb = nb(Event), zb = nb(CustomEvent), Ab = nb(MouseEvent);

    function Bb() {
        if (!gb && Object.getOwnPropertyDescriptor(Event.prototype, "isTrusted")) {
            var a = function () {
                var a = new MouseEvent("click", {bubbles: !0, cancelable: !0, composed: !0});
                this.__shady_dispatchEvent(a)
            };
            Element.prototype.click ? Element.prototype.click = a : HTMLElement.prototype.click && (HTMLElement.prototype.click = a)
        }
    }

    var Cb = Object.getOwnPropertyNames(Document.prototype).filter(function (a) {
        return "on" === a.substring(0, 2)
    });

    function Db(a, b) {
        return {index: a, G: [], L: b}
    }

    function Eb(a, b, c, d) {
        var e = 0, f = 0, g = 0, h = 0, k = Math.min(b - e, d - f);
        if (0 == e && 0 == f) a:{
            for (g = 0; g < k; g++) if (a[g] !== c[g]) break a;
            g = k
        }
        if (b == a.length && d == c.length) {
            h = a.length;
            for (var l = c.length, m = 0; m < k - g && Fb(a[--h], c[--l]);) m++;
            h = m
        }
        e += g;
        f += g;
        b -= h;
        d -= h;
        if (0 == b - e && 0 == d - f) return [];
        if (e == b) {
            for (b = Db(e, 0); f < d;) b.G.push(c[f++]);
            return [b]
        }
        if (f == d) return [Db(e, b - e)];
        k = e;
        g = f;
        d = d - g + 1;
        h = b - k + 1;
        b = Array(d);
        for (l = 0; l < d; l++) b[l] = Array(h), b[l][0] = l;
        for (l = 0; l < h; l++) b[0][l] = l;
        for (l = 1; l < d; l++) for (m = 1; m < h; m++) if (a[k + m - 1] === c[g + l - 1]) b[l][m] =
            b[l - 1][m - 1]; else {
            var t = b[l - 1][m] + 1, E = b[l][m - 1] + 1;
            b[l][m] = t < E ? t : E
        }
        k = b.length - 1;
        g = b[0].length - 1;
        d = b[k][g];
        for (a = []; 0 < k || 0 < g;) 0 == k ? (a.push(2), g--) : 0 == g ? (a.push(3), k--) : (h = b[k - 1][g - 1], l = b[k - 1][g], m = b[k][g - 1], t = l < m ? l < h ? l : h : m < h ? m : h, t == h ? (h == d ? a.push(0) : (a.push(1), d = h), k--, g--) : t == l ? (a.push(3), k--, d = l) : (a.push(2), g--, d = m));
        a.reverse();
        b = void 0;
        k = [];
        for (g = 0; g < a.length; g++) switch (a[g]) {
            case 0:
                b && (k.push(b), b = void 0);
                e++;
                f++;
                break;
            case 1:
                b || (b = Db(e, 0));
                b.L++;
                e++;
                b.G.push(c[f]);
                f++;
                break;
            case 2:
                b || (b = Db(e, 0));
                b.L++;
                e++;
                break;
            case 3:
                b || (b = Db(e, 0)), b.G.push(c[f]), f++
        }
        b && k.push(b);
        return k
    }

    function Fb(a, b) {
        return a === b
    };

    function Gb(a, b, c) {
        db(a);
        c = c || null;
        var d = q(a), e = q(b), f = c ? q(c) : null;
        d.previousSibling = c ? f.previousSibling : b.__shady_lastChild;
        if (f = r(d.previousSibling)) f.nextSibling = a;
        if (f = r(d.nextSibling = c)) f.previousSibling = a;
        d.parentNode = b;
        c ? c === e.firstChild && (e.firstChild = a) : (e.lastChild = a, e.firstChild || (e.firstChild = a));
        e.childNodes = null
    }

    function Hb(a, b, c) {
        eb(b);
        var d = q(b);
        void 0 !== d.firstChild && (d.childNodes = null);
        if (a.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
            d = a.__shady_childNodes;
            for (var e = 0; e < d.length; e++) Gb(d[e], b, c);
            a = q(a);
            b = void 0 !== a.firstChild ? null : void 0;
            a.firstChild = a.lastChild = b;
            a.childNodes = b
        } else Gb(a, b, c)
    }

    function Ib(a, b) {
        var c = q(a);
        b = q(b);
        a === b.firstChild && (b.firstChild = c.nextSibling);
        a === b.lastChild && (b.lastChild = c.previousSibling);
        a = c.previousSibling;
        var d = c.nextSibling;
        a && (q(a).nextSibling = d);
        d && (q(d).previousSibling = a);
        c.parentNode = c.previousSibling = c.nextSibling = void 0;
        void 0 !== b.childNodes && (b.childNodes = null)
    }

    function Jb(a) {
        var b = q(a);
        if (void 0 === b.firstChild) {
            b.childNodes = null;
            var c = b.firstChild = a.__shady_native_firstChild || null;
            b.lastChild = a.__shady_native_lastChild || null;
            eb(a);
            b = c;
            for (c = void 0; b; b = b.__shady_native_nextSibling) {
                var d = q(b);
                d.parentNode = a;
                d.nextSibling = b.__shady_native_nextSibling || null;
                d.previousSibling = c || null;
                c = b;
                db(b)
            }
        }
    };var Kb = null;

    function D() {
        Kb || (Kb = window.ShadyCSS && window.ShadyCSS.ScopingShim);
        return Kb || null
    }

    function Lb(a, b) {
        var c = D();
        c && c.unscopeNode(a, b)
    }

    function Mb(a, b) {
        var c = D();
        if (!c) return !0;
        if (a.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
            c = !0;
            a = a.__shady_childNodes;
            for (var d = 0; c && d < a.length; d++) c = c && Mb(a[d], b);
            return c
        }
        return a.nodeType !== Node.ELEMENT_NODE ? !0 : c.currentScopeForNode(a) === b
    }

    function Nb(a) {
        if (a.nodeType !== Node.ELEMENT_NODE) return "";
        var b = D();
        return b ? b.currentScopeForNode(a) : ""
    }

    function Ob(a, b) {
        if (a) {
            a.nodeType === Node.ELEMENT_NODE && b(a);
            a = a.__shady_childNodes;
            for (var c = 0, d; c < a.length; c++) d = a[c], d.nodeType === Node.ELEMENT_NODE && Ob(d, b)
        }
    };var Pb = window.document, Qb = u.ha, Rb = Object.getOwnPropertyDescriptor(Node.prototype, "isConnected"),
        Sb = Rb && Rb.get;

    function Tb(a) {
        for (var b; b = a.__shady_firstChild;) a.__shady_removeChild(b)
    }

    function Ub(a) {
        var b = r(a);
        if (b && void 0 !== b.F) {
            b = a.__shady_childNodes;
            for (var c = 0, d = b.length, e = void 0; c < d && (e = b[c]); c++) Ub(e)
        }
        if (a = r(a)) a.F = void 0
    }

    function Vb(a) {
        var b = a;
        a && "slot" === a.localName && (b = (b = (b = r(a)) && b.A) && b.length ? b[0] : Vb(a.__shady_nextSibling));
        return b
    }

    function Wb(a, b, c) {
        if (a = (a = r(a)) && a.C) b && a.addedNodes.push(b), c && a.removedNodes.push(c), Ba(a)
    }

    var Zb = z({
        get parentNode() {
            var a = r(this);
            a = a && a.parentNode;
            return void 0 !== a ? a : this.__shady_native_parentNode
        }, get firstChild() {
            var a = r(this);
            a = a && a.firstChild;
            return void 0 !== a ? a : this.__shady_native_firstChild
        }, get lastChild() {
            var a = r(this);
            a = a && a.lastChild;
            return void 0 !== a ? a : this.__shady_native_lastChild
        }, get nextSibling() {
            var a = r(this);
            a = a && a.nextSibling;
            return void 0 !== a ? a : this.__shady_native_nextSibling
        }, get previousSibling() {
            var a = r(this);
            a = a && a.previousSibling;
            return void 0 !== a ? a : this.__shady_native_previousSibling
        },
        get childNodes() {
            if (v(this)) {
                var a = r(this);
                if (!a.childNodes) {
                    a.childNodes = [];
                    for (var b = this.__shady_firstChild; b; b = b.__shady_nextSibling) a.childNodes.push(b)
                }
                var c = a.childNodes
            } else c = this.__shady_native_childNodes;
            c.item = function (a) {
                return c[a]
            };
            return c
        }, get parentElement() {
            var a = r(this);
            (a = a && a.parentNode) && a.nodeType !== Node.ELEMENT_NODE && (a = null);
            return void 0 !== a ? a : this.__shady_native_parentElement
        }, get isConnected() {
            if (Sb && Sb.call(this)) return !0;
            if (this.nodeType == Node.DOCUMENT_FRAGMENT_NODE) return !1;
            var a = this.ownerDocument;
            if (ta) {
                if (a.__shady_native_contains(this)) return !0
            } else if (a.documentElement && a.documentElement.__shady_native_contains(this)) return !0;
            for (a = this; a && !(a instanceof Document);) a = a.__shady_parentNode || (w(a) ? a.host : void 0);
            return !!(a && a instanceof Document)
        }, get textContent() {
            if (v(this)) {
                for (var a = [], b = 0, c = this.__shady_childNodes, d; d = c[b]; b++) d.nodeType !== Node.COMMENT_NODE && a.push(d.__shady_textContent);
                return a.join("")
            }
            return this.__shady_native_textContent
        }, set textContent(a) {
            if ("undefined" ===
                typeof a || null === a) a = "";
            switch (this.nodeType) {
                case Node.ELEMENT_NODE:
                case Node.DOCUMENT_FRAGMENT_NODE:
                    if (!v(this) && u.l) {
                        var b = this.__shady_firstChild;
                        (b != this.__shady_lastChild || b && b.nodeType != Node.TEXT_NODE) && Tb(this);
                        this.__shady_native_textContent = a
                    } else Tb(this), (0 < a.length || this.nodeType === Node.ELEMENT_NODE) && this.__shady_insertBefore(document.createTextNode(a));
                    break;
                default:
                    this.nodeValue = a
            }
        }, insertBefore: function (a, b) {
            if (this.ownerDocument !== Pb && a.ownerDocument !== Pb) return this.__shady_native_insertBefore(a,
                b), a;
            if (a === this) throw Error("Failed to execute 'appendChild' on 'Node': The new child element contains the parent.");
            if (b) {
                var c = r(b);
                c = c && c.parentNode;
                if (void 0 !== c && c !== this || void 0 === c && b.__shady_native_parentNode !== this) throw Error("Failed to execute 'insertBefore' on 'Node': The node before which the new node is to be inserted is not a child of this node.");
            }
            if (b === a) return a;
            var d = [], e = (c = Xb(this)) ? c.host.localName : Nb(this), f = a.__shady_parentNode;
            if (f) {
                var g = Nb(a);
                f.__shady_removeChild(a, !!c ||
                    !Xb(a))
            }
            f = !0;
            var h = (!Qb || void 0 === a.__noInsertionPoint) && !Mb(a, e),
                k = c && !a.__noInsertionPoint && (!Qb || a.nodeType === Node.DOCUMENT_FRAGMENT_NODE);
            if (k || h) h && (g = g || Nb(a)), Ob(a, function (a) {
                k && "slot" === a.localName && d.push(a);
                if (h) {
                    var b = g;
                    D() && (b && Lb(a, b), (b = D()) && b.scopeNode(a, e))
                }
            });
            if ("slot" === this.localName || d.length) d.length && (c.c = c.c || [], c.a = c.a || [], c.b = c.b || {}, c.c.push.apply(c.c, d instanceof Array ? d : ia(ha(d)))), c && G(c);
            v(this) && (Hb(a, this, b), c = r(this), la(this) ? (G(c.root), f = !1) : c.root && (f = !1));
            f ? (c =
                w(this) ? this.host : this, b ? (b = Vb(b), c.__shady_native_insertBefore(a, b)) : c.__shady_native_appendChild(a)) : a.ownerDocument !== this.ownerDocument && this.ownerDocument.adoptNode(a);
            Wb(this, a);
            return a
        }, appendChild: function (a) {
            return this.__shady_insertBefore(a)
        }, removeChild: function (a, b) {
            b = void 0 === b ? !1 : b;
            if (this.ownerDocument !== Pb) return this.__shady_native_removeChild(a);
            if (a.__shady_parentNode !== this) throw Error("The node to be removed is not a child of this node: " + a);
            var c = Xb(a), d = c && Yb(c, a), e = r(this);
            if (v(this) && (Ib(a, this), la(this))) {
                G(e.root);
                var f = !0
            }
            if (D() && !b && c) {
                var g = Nb(a);
                Ob(a, function (a) {
                    Lb(a, g)
                })
            }
            Ub(a);
            c && ((b = this && "slot" === this.localName) && (f = !0), (d || b) && G(c));
            f || (f = w(this) ? this.host : this, (!e.root && "slot" !== a.localName || f === a.__shady_native_parentNode) && f.__shady_native_removeChild(a));
            Wb(this, null, a);
            return a
        }, replaceChild: function (a, b) {
            this.__shady_insertBefore(a, b);
            this.__shady_removeChild(b);
            return a
        }, cloneNode: function (a) {
            if ("template" == this.localName) return this.__shady_native_cloneNode(a);
            var b = this.__shady_native_cloneNode(!1);
            if (a && b.nodeType !== Node.ATTRIBUTE_NODE) {
                a = this.__shady_childNodes;
                for (var c = 0, d; c < a.length; c++) d = a[c].__shady_cloneNode(!0), b.__shady_appendChild(d)
            }
            return b
        }, getRootNode: function (a) {
            if (this && this.nodeType) {
                var b = q(this), c = b.F;
                void 0 === c && (w(this) ? (c = this, b.F = c) : (c = (c = this.__shady_parentNode) ? c.__shady_getRootNode(a) : this, document.documentElement.__shady_native_contains(this) && (b.F = c)));
                return c
            }
        }, contains: function (a) {
            return ua(this, a)
        }
    });

    function $b(a, b, c) {
        var d = [];
        ac(a.__shady_childNodes, b, c, d);
        return d
    }

    function ac(a, b, c, d) {
        for (var e = 0, f = a.length, g = void 0; e < f && (g = a[e]); e++) {
            var h;
            if (h = g.nodeType === Node.ELEMENT_NODE) {
                h = g;
                var k = b, l = c, m = d, t = k(h);
                t && m.push(h);
                l && l(t) ? h = t : (ac(h.__shady_childNodes, k, l, m), h = void 0)
            }
            if (h) break
        }
    }

    var bc = z({
        get firstElementChild() {
            var a = r(this);
            if (a && void 0 !== a.firstChild) {
                for (a = this.__shady_firstChild; a && a.nodeType !== Node.ELEMENT_NODE;) a = a.__shady_nextSibling;
                return a
            }
            return this.__shady_native_firstElementChild
        }, get lastElementChild() {
            var a = r(this);
            if (a && void 0 !== a.lastChild) {
                for (a = this.__shady_lastChild; a && a.nodeType !== Node.ELEMENT_NODE;) a = a.__shady_previousSibling;
                return a
            }
            return this.__shady_native_lastElementChild
        }, get children() {
            return v(this) ? va(Array.prototype.filter.call(this.__shady_childNodes,
                function (a) {
                    return a.nodeType === Node.ELEMENT_NODE
                })) : this.__shady_native_children
        }, get childElementCount() {
            var a = this.__shady_children;
            return a ? a.length : 0
        }
    }), cc = z({
        querySelector: function (a) {
            return $b(this, function (b) {
                return oa.call(b, a)
            }, function (a) {
                return !!a
            })[0] || null
        }, querySelectorAll: function (a, b) {
            if (b) {
                b = Array.prototype.slice.call(this.__shady_native_querySelectorAll(a));
                var c = this.__shady_getRootNode();
                return b.filter(function (a) {
                    return a.__shady_getRootNode() == c
                })
            }
            return $b(this, function (b) {
                return oa.call(b,
                    a)
            })
        }
    }), dc = u.ha ? Object.assign({}, bc) : bc;
    Object.assign(bc, cc);
    var ec = z({
        getElementById: function (a) {
            return "" === a ? null : $b(this, function (b) {
                return b.id == a
            }, function (a) {
                return !!a
            })[0] || null
        }
    });
    var fc = z({
        get activeElement() {
            var a = u.l ? document.__shady_native_activeElement : document.activeElement;
            if (!a || !a.nodeType) return null;
            var b = !!w(this);
            if (!(this === document || b && this.host !== a && this.host.__shady_native_contains(a))) return null;
            for (b = Xb(a); b && b !== this;) a = b.host, b = Xb(a);
            return this === document ? b ? null : a : b === this ? a : null
        }
    });
    var gc = document.implementation.createHTMLDocument("inert"), ic = z({
        get innerHTML() {
            return v(this) ? La("template" === this.localName ? this.content : this, function (a) {
                return a.__shady_childNodes
            }) : this.__shady_native_innerHTML
        }, set innerHTML(a) {
            if ("template" === this.localName) this.__shady_native_innerHTML = a; else {
                Tb(this);
                var b = this.localName || "div";
                b = this.namespaceURI && this.namespaceURI !== gc.namespaceURI ? gc.createElementNS(this.namespaceURI, b) : gc.createElement(b);
                for (u.l ? b.__shady_native_innerHTML = a : b.innerHTML =
                    a; a = b.__shady_firstChild;) this.__shady_insertBefore(a)
            }
        }
    });
    var jc = z({
        addEventListener: function (a, b, c) {
            "object" !== typeof c && (c = {capture: !!c});
            c.V = this;
            this.host.__shady_addEventListener(a, b, c)
        }, removeEventListener: function (a, b, c) {
            "object" !== typeof c && (c = {capture: !!c});
            c.V = this;
            this.host.__shady_removeEventListener(a, b, c)
        }
    });

    function kc(a, b) {
        y(a, jc, b);
        y(a, fc, b);
        y(a, ic, b);
        y(a, bc, b);
        u.D && !b ? (y(a, Zb, b), y(a, ec, b)) : u.l || (y(a, Xa), y(a, Wa))
    };var lc = {}, H = u.deferConnectionCallbacks && "loading" === document.readyState, mc;

    function nc(a) {
        var b = [];
        do b.unshift(a); while (a = a.__shady_parentNode);
        return b
    }

    function oc(a, b, c) {
        if (a !== lc) throw new TypeError("Illegal constructor");
        this.sa = "ShadyRoot";
        this.host = b;
        this.mode = c && c.mode;
        Jb(b);
        a = q(b);
        a.root = this;
        a.ia = "closed" !== this.mode ? this : null;
        a = q(this);
        a.firstChild = a.lastChild = a.parentNode = a.nextSibling = a.previousSibling = null;
        a.childNodes = [];
        this.X = this.w = !1;
        this.c = this.b = this.a = null;
        if (u.preferPerformance) for (; a = b.__shady_native_firstChild;) b.__shady_native_removeChild(a); else G(this)
    }

    function G(a) {
        a.w || (a.w = !0, ya(function () {
            return pc(a)
        }))
    }

    function pc(a) {
        var b;
        if (b = a.w) {
            for (var c; a;) a:{
                a.w && (c = a), b = a;
                a = b.host.__shady_getRootNode();
                if (w(a) && (b = r(b.host)) && 0 < b.I) break a;
                a = void 0
            }
            b = c
        }
        (c = b) && c._renderSelf()
    }

    oc.prototype._renderSelf = function () {
        var a = H;
        H = !0;
        this.w = !1;
        if (this.a) {
            qc(this);
            for (var b = 0, c; b < this.a.length; b++) {
                c = this.a[b];
                var d = r(c), e = d.assignedNodes;
                d.assignedNodes = [];
                d.A = [];
                if (d.Y = e) for (d = 0; d < e.length; d++) {
                    var f = r(e[d]);
                    f.K = f.assignedSlot;
                    f.assignedSlot === c && (f.assignedSlot = null)
                }
            }
            for (b = this.host.__shady_firstChild; b; b = b.__shady_nextSibling) rc(this, b);
            for (b = 0; b < this.a.length; b++) {
                c = this.a[b];
                e = r(c);
                if (!e.assignedNodes.length) for (d = c.__shady_firstChild; d; d = d.__shady_nextSibling) rc(this, d, c);
                (d = (d = r(c.__shady_parentNode)) && d.root) && (na(d) || d.w) && d._renderSelf();
                sc(this, e.A, e.assignedNodes);
                if (d = e.Y) {
                    for (f = 0; f < d.length; f++) r(d[f]).K = null;
                    e.Y = null;
                    d.length > e.assignedNodes.length && (e.N = !0)
                }
                e.N && (e.N = !1, tc(this, c))
            }
            c = this.a;
            b = [];
            for (e = 0; e < c.length; e++) d = c[e].__shady_parentNode, (f = r(d)) && f.root || !(0 > b.indexOf(d)) || b.push(d);
            for (c = 0; c < b.length; c++) {
                f = b[c];
                e = f === this ? this.host : f;
                d = [];
                f = f.__shady_childNodes;
                for (var g = 0; g < f.length; g++) {
                    var h = f[g];
                    if ("slot" == h.localName) {
                        h = r(h).A;
                        for (var k = 0; k <
                        h.length; k++) d.push(h[k])
                    } else d.push(h)
                }
                f = Array.prototype.slice.call(e.__shady_native_childNodes);
                g = Eb(d, d.length, f, f.length);
                k = h = 0;
                for (var l = void 0; h < g.length && (l = g[h]); h++) {
                    for (var m = 0, t = void 0; m < l.G.length && (t = l.G[m]); m++) t.__shady_native_parentNode === e && e.__shady_native_removeChild(t), f.splice(l.index + k, 1);
                    k -= l.L
                }
                k = 0;
                for (l = void 0; k < g.length && (l = g[k]); k++) for (h = f[l.index], m = l.index; m < l.index + l.L; m++) t = d[m], e.__shady_native_insertBefore(t, h), f.splice(m, 0, t)
            }
        }
        if (!u.preferPerformance && !this.X) for (b =
                                                      this.host.__shady_childNodes, c = 0, e = b.length; c < e; c++) d = b[c], f = r(d), d.__shady_native_parentNode !== this.host || "slot" !== d.localName && f.assignedSlot || this.host.__shady_native_removeChild(d);
        this.X = !0;
        H = a;
        mc && mc()
    };

    function rc(a, b, c) {
        var d = q(b), e = d.K;
        d.K = null;
        c || (c = (a = a.b[b.__shady_slot || "__catchall"]) && a[0]);
        c ? (q(c).assignedNodes.push(b), d.assignedSlot = c) : d.assignedSlot = void 0;
        e !== d.assignedSlot && d.assignedSlot && (q(d.assignedSlot).N = !0)
    }

    function sc(a, b, c) {
        for (var d = 0, e = void 0; d < c.length && (e = c[d]); d++) if ("slot" == e.localName) {
            var f = r(e).assignedNodes;
            f && f.length && sc(a, b, f)
        } else b.push(c[d])
    }

    function tc(a, b) {
        b.__shady_native_dispatchEvent(new Event("slotchange"));
        b = r(b);
        b.assignedSlot && tc(a, b.assignedSlot)
    }

    function qc(a) {
        if (a.c && a.c.length) {
            for (var b = a.c, c, d = 0; d < b.length; d++) {
                var e = b[d];
                Jb(e);
                var f = e.__shady_parentNode;
                Jb(f);
                f = r(f);
                f.I = (f.I || 0) + 1;
                f = uc(e);
                a.b[f] ? (c = c || {}, c[f] = !0, a.b[f].push(e)) : a.b[f] = [e];
                a.a.push(e)
            }
            if (c) for (var g in c) a.b[g] = vc(a.b[g]);
            a.c = []
        }
    }

    function uc(a) {
        var b = a.name || a.getAttribute("name") || "__catchall";
        return a.pa = b
    }

    function vc(a) {
        return a.sort(function (a, c) {
            a = nc(a);
            for (var b = nc(c), e = 0; e < a.length; e++) {
                c = a[e];
                var f = b[e];
                if (c !== f) return a = Array.from(c.__shady_parentNode.__shady_childNodes), a.indexOf(c) - a.indexOf(f)
            }
        })
    }

    function Yb(a, b) {
        if (a.a) {
            qc(a);
            var c = a.b, d;
            for (d in c) for (var e = c[d], f = 0; f < e.length; f++) {
                var g = e[f];
                if (ua(b, g)) {
                    e.splice(f, 1);
                    var h = a.a.indexOf(g);
                    0 <= h && (a.a.splice(h, 1), (h = r(g.__shady_parentNode)) && h.I && h.I--);
                    f--;
                    g = r(g);
                    if (h = g.A) for (var k = 0; k < h.length; k++) {
                        var l = h[k], m = l.__shady_native_parentNode;
                        m && m.__shady_native_removeChild(l)
                    }
                    g.A = [];
                    g.assignedNodes = [];
                    h = !0
                }
            }
            return h
        }
    }

    function na(a) {
        qc(a);
        return !(!a.a || !a.a.length)
    }

    (function (a) {
        a.__proto__ = DocumentFragment.prototype;
        kc(a, "__shady_");
        kc(a);
        Object.defineProperties(a, {
            nodeType: {value: Node.DOCUMENT_FRAGMENT_NODE, configurable: !0},
            nodeName: {value: "#document-fragment", configurable: !0},
            nodeValue: {value: null, configurable: !0}
        });
        ["localName", "namespaceURI", "prefix"].forEach(function (b) {
            Object.defineProperty(a, b, {value: void 0, configurable: !0})
        });
        ["ownerDocument", "baseURI", "isConnected"].forEach(function (b) {
            Object.defineProperty(a, b, {
                get: function () {
                    return this.host[b]
                },
                configurable: !0
            })
        })
    })(oc.prototype);
    if (window.customElements && u.$ && !u.preferPerformance) {
        var wc = new Map;
        mc = function () {
            var a = [];
            wc.forEach(function (b, c) {
                a.push([c, b])
            });
            wc.clear();
            for (var b = 0; b < a.length; b++) {
                var c = a[b][0];
                a[b][1] ? c.na() : c.oa()
            }
        };
        H && document.addEventListener("readystatechange", function () {
            H = !1;
            mc()
        }, {once: !0});
        var xc = function (a, b, c) {
            var d = 0, e = "__isConnected" + d++;
            if (b || c) a.prototype.connectedCallback = a.prototype.na = function () {
                H ? wc.set(this, !0) : this[e] || (this[e] = !0, b && b.call(this))
            }, a.prototype.disconnectedCallback = a.prototype.oa =
                function () {
                    H ? this.isConnected || wc.set(this, !1) : this[e] && (this[e] = !1, c && c.call(this))
                };
            return a
        }, yc = window.customElements.define;
        Object.defineProperty(window.CustomElementRegistry.prototype, "define", {
            value: function (a, b) {
                var c = b.prototype.connectedCallback, d = b.prototype.disconnectedCallback;
                yc.call(window.customElements, a, xc(b, c, d));
                b.prototype.connectedCallback = c;
                b.prototype.disconnectedCallback = d
            }
        })
    }

    function Xb(a) {
        a = a.__shady_getRootNode();
        if (w(a)) return a
    };

    function zc(a) {
        this.node = a
    }

    n = zc.prototype;
    n.addEventListener = function (a, b, c) {
        return this.node.__shady_addEventListener(a, b, c)
    };
    n.removeEventListener = function (a, b, c) {
        return this.node.__shady_removeEventListener(a, b, c)
    };
    n.appendChild = function (a) {
        return this.node.__shady_appendChild(a)
    };
    n.insertBefore = function (a, b) {
        return this.node.__shady_insertBefore(a, b)
    };
    n.removeChild = function (a) {
        return this.node.__shady_removeChild(a)
    };
    n.replaceChild = function (a, b) {
        return this.node.__shady_replaceChild(a, b)
    };
    n.cloneNode = function (a) {
        return this.node.__shady_cloneNode(a)
    };
    n.getRootNode = function (a) {
        return this.node.__shady_getRootNode(a)
    };
    n.contains = function (a) {
        return this.node.__shady_contains(a)
    };
    n.dispatchEvent = function (a) {
        return this.node.__shady_dispatchEvent(a)
    };
    n.setAttribute = function (a, b) {
        this.node.__shady_setAttribute(a, b)
    };
    n.getAttribute = function (a) {
        return this.node.__shady_native_getAttribute(a)
    };
    n.removeAttribute = function (a) {
        this.node.__shady_removeAttribute(a)
    };
    n.attachShadow = function (a) {
        return this.node.__shady_attachShadow(a)
    };
    n.focus = function () {
        this.node.__shady_native_focus()
    };
    n.blur = function () {
        this.node.__shady_blur()
    };
    n.importNode = function (a, b) {
        if (this.node.nodeType === Node.DOCUMENT_NODE) return this.node.__shady_importNode(a, b)
    };
    n.getElementById = function (a) {
        if (this.node.nodeType === Node.DOCUMENT_NODE) return this.node.__shady_getElementById(a)
    };
    n.querySelector = function (a) {
        return this.node.__shady_querySelector(a)
    };
    n.querySelectorAll = function (a, b) {
        return this.node.__shady_querySelectorAll(a, b)
    };
    n.assignedNodes = function (a) {
        if ("slot" === this.node.localName) return this.node.__shady_assignedNodes(a)
    };
    p.Object.defineProperties(zc.prototype, {
        activeElement: {
            configurable: !0, enumerable: !0, get: function () {
                if (w(this.node) || this.node.nodeType === Node.DOCUMENT_NODE) return this.node.__shady_activeElement
            }
        }, _activeElement: {
            configurable: !0, enumerable: !0, get: function () {
                return this.activeElement
            }
        }, host: {
            configurable: !0, enumerable: !0, get: function () {
                if (w(this.node)) return this.node.host
            }
        }, parentNode: {
            configurable: !0, enumerable: !0, get: function () {
                return this.node.__shady_parentNode
            }
        }, firstChild: {
            configurable: !0,
            enumerable: !0, get: function () {
                return this.node.__shady_firstChild
            }
        }, lastChild: {
            configurable: !0, enumerable: !0, get: function () {
                return this.node.__shady_lastChild
            }
        }, nextSibling: {
            configurable: !0, enumerable: !0, get: function () {
                return this.node.__shady_nextSibling
            }
        }, previousSibling: {
            configurable: !0, enumerable: !0, get: function () {
                return this.node.__shady_previousSibling
            }
        }, childNodes: {
            configurable: !0, enumerable: !0, get: function () {
                return this.node.__shady_childNodes
            }
        }, parentElement: {
            configurable: !0, enumerable: !0,
            get: function () {
                return this.node.__shady_parentElement
            }
        }, firstElementChild: {
            configurable: !0, enumerable: !0, get: function () {
                return this.node.__shady_firstElementChild
            }
        }, lastElementChild: {
            configurable: !0, enumerable: !0, get: function () {
                return this.node.__shady_lastElementChild
            }
        }, nextElementSibling: {
            configurable: !0, enumerable: !0, get: function () {
                return this.node.__shady_nextElementSibling
            }
        }, previousElementSibling: {
            configurable: !0, enumerable: !0, get: function () {
                return this.node.__shady_previousElementSibling
            }
        },
        children: {
            configurable: !0, enumerable: !0, get: function () {
                return this.node.__shady_children
            }
        }, childElementCount: {
            configurable: !0, enumerable: !0, get: function () {
                return this.node.__shady_childElementCount
            }
        }, shadowRoot: {
            configurable: !0, enumerable: !0, get: function () {
                return this.node.__shady_shadowRoot
            }
        }, assignedSlot: {
            configurable: !0, enumerable: !0, get: function () {
                return this.node.__shady_assignedSlot
            }
        }, isConnected: {
            configurable: !0, enumerable: !0, get: function () {
                return this.node.__shady_isConnected
            }
        }, innerHTML: {
            configurable: !0,
            enumerable: !0, get: function () {
                return this.node.__shady_innerHTML
            }, set: function (a) {
                this.node.__shady_innerHTML = a
            }
        }, textContent: {
            configurable: !0, enumerable: !0, get: function () {
                return this.node.__shady_textContent
            }, set: function (a) {
                this.node.__shady_textContent = a
            }
        }, slot: {
            configurable: !0, enumerable: !0, get: function () {
                return this.node.__shady_slot
            }, set: function (a) {
                this.node.__shady_slot = a
            }
        }
    });
    Cb.forEach(function (a) {
        Object.defineProperty(zc.prototype, a, {
            get: function () {
                return this.node["__shady_" + a]
            }, set: function (b) {
                this.node["__shady_" + a] = b
            }, configurable: !0
        })
    });
    var Ac = new WeakMap;

    function Bc(a) {
        if (w(a) || a instanceof zc) return a;
        var b = Ac.get(a);
        b || (b = new zc(a), Ac.set(a, b));
        return b
    };var Cc = z({
        dispatchEvent: function (a) {
            za();
            return this.__shady_native_dispatchEvent(a)
        }, addEventListener: tb, removeEventListener: vb
    });
    var Dc = z({
        get assignedSlot() {
            var a = this.__shady_parentNode;
            (a = a && a.__shady_shadowRoot) && pc(a);
            return (a = r(this)) && a.assignedSlot || null
        }
    });
    var Ec = window.document;

    function Fc(a, b) {
        if ("slot" === b) a = a.__shady_parentNode, la(a) && G(r(a).root); else if ("slot" === a.localName && "name" === b && (b = Xb(a))) {
            if (b.a) {
                qc(b);
                var c = a.pa, d = uc(a);
                if (d !== c) {
                    c = b.b[c];
                    var e = c.indexOf(a);
                    0 <= e && c.splice(e, 1);
                    c = b.b[d] || (b.b[d] = []);
                    c.push(a);
                    1 < c.length && (b.b[d] = vc(c))
                }
            }
            G(b)
        }
    }

    var Gc = z({
        get previousElementSibling() {
            var a = r(this);
            if (a && void 0 !== a.previousSibling) {
                for (a = this.__shady_previousSibling; a && a.nodeType !== Node.ELEMENT_NODE;) a = a.__shady_previousSibling;
                return a
            }
            return this.__shady_native_previousElementSibling
        }, get nextElementSibling() {
            var a = r(this);
            if (a && void 0 !== a.nextSibling) {
                for (a = this.__shady_nextSibling; a && a.nodeType !== Node.ELEMENT_NODE;) a = a.__shady_nextSibling;
                return a
            }
            return this.__shady_native_nextElementSibling
        }, get slot() {
            return this.getAttribute("slot")
        },
        set slot(a) {
            this.__shady_setAttribute("slot", a)
        }, get shadowRoot() {
            var a = r(this);
            return a && a.ia || null
        }, get className() {
            return this.getAttribute("class") || ""
        }, set className(a) {
            this.__shady_setAttribute("class", a)
        }, setAttribute: function (a, b) {
            if (this.ownerDocument !== Ec) this.__shady_native_setAttribute(a, b); else {
                var c;
                (c = D()) && "class" === a ? (c.setElementClass(this, b), c = !0) : c = !1;
                c || (this.__shady_native_setAttribute(a, b), Fc(this, a))
            }
        }, removeAttribute: function (a) {
            this.__shady_native_removeAttribute(a);
            Fc(this,
                a)
        }, attachShadow: function (a) {
            if (!this) throw Error("Must provide a host.");
            if (!a) throw Error("Not enough arguments.");
            return new oc(lc, this, a)
        }
    });
    var Hc = z({
        blur: function () {
            var a = r(this);
            (a = (a = a && a.root) && a.activeElement) ? a.__shady_blur() : this.__shady_native_blur()
        }
    });
    Cb.forEach(function (a) {
        Hc[a] = {
            set: function (b) {
                var c = q(this), d = a.substring(2);
                c.J[a] && this.removeEventListener(d, c.J[a]);
                this.__shady_addEventListener(d, b);
                c.J[a] = b
            }, get: function () {
                var b = r(this);
                return b && b.J[a]
            }, configurable: !0
        }
    });
    var Ic = z({
        assignedNodes: function (a) {
            if ("slot" === this.localName) {
                var b = this.__shady_getRootNode();
                b && w(b) && pc(b);
                return (b = r(this)) ? (a && a.flatten ? b.A : b.assignedNodes) || [] : []
            }
        }
    });
    var Jc = window.document, Kc = z({
        importNode: function (a, b) {
            if (a.ownerDocument !== Jc || "template" === a.localName) return this.__shady_native_importNode(a, b);
            var c = this.__shady_native_importNode(a, !1);
            if (b) {
                a = a.__shady_childNodes;
                b = 0;
                for (var d; b < a.length; b++) d = this.__shady_importNode(a[b], !0), c.__shady_appendChild(d)
            }
            return c
        }
    });
    var Lc = z({addEventListener: tb.bind(window), removeEventListener: vb.bind(window)});
    var Mc = {};
    Object.getOwnPropertyDescriptor(HTMLElement.prototype, "parentElement") && (Mc.parentElement = Zb.parentElement);
    Object.getOwnPropertyDescriptor(HTMLElement.prototype, "contains") && (Mc.contains = Zb.contains);
    Object.getOwnPropertyDescriptor(HTMLElement.prototype, "children") && (Mc.children = bc.children);
    Object.getOwnPropertyDescriptor(HTMLElement.prototype, "innerHTML") && (Mc.innerHTML = ic.innerHTML);
    Object.getOwnPropertyDescriptor(HTMLElement.prototype, "className") && (Mc.className = Gc.className);
    var Nc = {
        EventTarget: [Cc],
        Node: [Zb, window.EventTarget ? null : Cc],
        Text: [Dc],
        Element: [Gc, bc, Dc, !u.l || "innerHTML" in Element.prototype ? ic : null, window.HTMLSlotElement ? null : Ic],
        HTMLElement: [Hc, Mc],
        HTMLSlotElement: [Ic],
        DocumentFragment: [dc, ec],
        Document: [Kc, dc, ec, fc],
        Window: [Lc]
    }, Oc = u.l ? null : ["innerHTML", "textContent"];

    function Pc(a) {
        var b = a ? null : Oc, c = {}, d;
        for (d in Nc) c.R = window[d] && window[d].prototype, Nc[d].forEach(function (c) {
            return function (d) {
                return c.R && d && y(c.R, d, a, b)
            }
        }(c)), c = {R: c.R}
    };
    if (u.$) {
        var ShadyDOM = {
            inUse: u.$,
            patch: function (a) {
                eb(a);
                db(a);
                return a
            },
            isShadyRoot: w,
            enqueue: ya,
            flush: za,
            flushInitial: function (a) {
                !a.X && a.w && pc(a)
            },
            settings: u,
            filterMutations: Ea,
            observeChildren: Ca,
            unobserveChildren: Da,
            deferConnectionCallbacks: u.deferConnectionCallbacks,
            preferPerformance: u.preferPerformance,
            handlesDynamicScoping: !0,
            wrap: u.D ? Bc : function (a) {
                return a
            },
            Wrapper: zc,
            composedPath: lb,
            noPatch: u.D,
            nativeMethods: Na,
            nativeTree: Oa
        };
        window.ShadyDOM = ShadyDOM;
        Va();
        Pc("__shady_");
        Object.defineProperty(document,
            "_activeElement", fc.activeElement);
        y(Window.prototype, Lc, "__shady_");
        u.D || (Pc(), Bb());
        wb();
        window.Event = yb;
        window.CustomEvent = zb;
        window.MouseEvent = Ab;
        window.ShadowRoot = oc
    }
    ;var Qc = new Set("annotation-xml color-profile font-face font-face-src font-face-uri font-face-format font-face-name missing-glyph".split(" "));

    function Rc(a) {
        var b = Qc.has(a);
        a = /^[a-z][.0-9_a-z]*-[\-.0-9_a-z]*$/.test(a);
        return !b && a
    }

    function I(a) {
        var b = a.isConnected;
        if (void 0 !== b) return b;
        for (; a && !(a.__CE_isImportDocument || a instanceof Document);) a = a.parentNode || (window.ShadowRoot && a instanceof ShadowRoot ? a.host : void 0);
        return !(!a || !(a.__CE_isImportDocument || a instanceof Document))
    }

    function Sc(a, b) {
        for (; b && b !== a && !b.nextSibling;) b = b.parentNode;
        return b && b !== a ? b.nextSibling : null
    }

    function J(a, b, c) {
        c = void 0 === c ? new Set : c;
        for (var d = a; d;) {
            if (d.nodeType === Node.ELEMENT_NODE) {
                var e = d;
                b(e);
                var f = e.localName;
                if ("link" === f && "import" === e.getAttribute("rel")) {
                    d = e.import;
                    if (d instanceof Node && !c.has(d)) for (c.add(d), d = d.firstChild; d; d = d.nextSibling) J(d, b, c);
                    d = Sc(a, e);
                    continue
                } else if ("template" === f) {
                    d = Sc(a, e);
                    continue
                }
                if (e = e.__CE_shadowRoot) for (e = e.firstChild; e; e = e.nextSibling) J(e, b, c)
            }
            d = d.firstChild ? d.firstChild : Sc(a, d)
        }
    }

    function K(a, b, c) {
        a[b] = c
    };

    function Tc() {
        this.a = new Map;
        this.g = new Map;
        this.f = [];
        this.c = !1
    }

    function Uc(a, b, c) {
        a.a.set(b, c);
        a.g.set(c.constructorFunction, c)
    }

    function Vc(a, b) {
        a.c = !0;
        a.f.push(b)
    }

    function Wc(a, b) {
        a.c && J(b, function (b) {
            return a.b(b)
        })
    }

    Tc.prototype.b = function (a) {
        if (this.c && !a.__CE_patched) {
            a.__CE_patched = !0;
            for (var b = 0; b < this.f.length; b++) this.f[b](a)
        }
    };

    function L(a, b) {
        var c = [];
        J(b, function (a) {
            return c.push(a)
        });
        for (b = 0; b < c.length; b++) {
            var d = c[b];
            1 === d.__CE_state ? a.connectedCallback(d) : Xc(a, d)
        }
    }

    function M(a, b) {
        var c = [];
        J(b, function (a) {
            return c.push(a)
        });
        for (b = 0; b < c.length; b++) {
            var d = c[b];
            1 === d.__CE_state && a.disconnectedCallback(d)
        }
    }

    function N(a, b, c) {
        c = void 0 === c ? {} : c;
        var d = c.Pa || new Set, e = c.T || function (b) {
            return Xc(a, b)
        }, f = [];
        J(b, function (b) {
            if ("link" === b.localName && "import" === b.getAttribute("rel")) {
                var c = b.import;
                c instanceof Node && (c.__CE_isImportDocument = !0, c.__CE_hasRegistry = !0);
                c && "complete" === c.readyState ? c.__CE_documentLoadHandled = !0 : b.addEventListener("load", function () {
                    var c = b.import;
                    if (!c.__CE_documentLoadHandled) {
                        c.__CE_documentLoadHandled = !0;
                        var f = new Set(d);
                        f.delete(c);
                        N(a, c, {Pa: f, T: e})
                    }
                })
            } else f.push(b)
        }, d);
        if (a.c) for (b =
                          0; b < f.length; b++) a.b(f[b]);
        for (b = 0; b < f.length; b++) e(f[b])
    }

    function Xc(a, b) {
        if (void 0 === b.__CE_state) {
            var c = b.ownerDocument;
            if (c.defaultView || c.__CE_isImportDocument && c.__CE_hasRegistry) if (c = a.a.get(b.localName)) {
                c.constructionStack.push(b);
                var d = c.constructorFunction;
                try {
                    try {
                        if (new d !== b) throw Error("The custom element constructor did not produce the element being upgraded.");
                    } finally {
                        c.constructionStack.pop()
                    }
                } catch (g) {
                    throw b.__CE_state = 2, g;
                }
                b.__CE_state = 1;
                b.__CE_definition = c;
                if (c.attributeChangedCallback) for (c = c.observedAttributes, d = 0; d < c.length; d++) {
                    var e =
                        c[d], f = b.getAttribute(e);
                    null !== f && a.attributeChangedCallback(b, e, null, f, null)
                }
                I(b) && a.connectedCallback(b)
            }
        }
    }

    Tc.prototype.connectedCallback = function (a) {
        var b = a.__CE_definition;
        b.connectedCallback && b.connectedCallback.call(a)
    };
    Tc.prototype.disconnectedCallback = function (a) {
        var b = a.__CE_definition;
        b.disconnectedCallback && b.disconnectedCallback.call(a)
    };
    Tc.prototype.attributeChangedCallback = function (a, b, c, d, e) {
        var f = a.__CE_definition;
        f.attributeChangedCallback && -1 < f.observedAttributes.indexOf(b) && f.attributeChangedCallback.call(a, b, c, d, e)
    };

    function Yc(a) {
        var b = document;
        this.b = a;
        this.a = b;
        this.B = void 0;
        N(this.b, this.a);
        "loading" === this.a.readyState && (this.B = new MutationObserver(this.c.bind(this)), this.B.observe(this.a, {
            childList: !0,
            subtree: !0
        }))
    }

    function Zc(a) {
        a.B && a.B.disconnect()
    }

    Yc.prototype.c = function (a) {
        var b = this.a.readyState;
        "interactive" !== b && "complete" !== b || Zc(this);
        for (b = 0; b < a.length; b++) for (var c = a[b].addedNodes, d = 0; d < c.length; d++) N(this.b, c[d])
    };

    function $c() {
        var a = this;
        this.b = this.a = void 0;
        this.c = new Promise(function (b) {
            a.b = b;
            a.a && b(a.a)
        })
    }

    function ad(a) {
        if (a.a) throw Error("Already resolved.");
        a.a = void 0;
        a.b && a.b(void 0)
    };

    function P(a) {
        this.c = !1;
        this.a = a;
        this.j = new Map;
        this.f = function (a) {
            return a()
        };
        this.b = !1;
        this.g = [];
        this.Z = new Yc(a)
    }

    n = P.prototype;
    n.la = function (a, b) {
        var c = this;
        if (!(b instanceof Function)) throw new TypeError("Custom element constructors must be functions.");
        if (!Rc(a)) throw new SyntaxError("The element name '" + a + "' is not valid.");
        if (this.a.a.get(a)) throw Error("A custom element with name '" + a + "' has already been defined.");
        if (this.c) throw Error("A custom element is already being defined.");
        this.c = !0;
        try {
            var d = function (a) {
                var b = e[a];
                if (void 0 !== b && !(b instanceof Function)) throw Error("The '" + a + "' callback must be a function.");
                return b
            }, e = b.prototype;
            if (!(e instanceof Object)) throw new TypeError("The custom element constructor's prototype is not an object.");
            var f = d("connectedCallback");
            var g = d("disconnectedCallback");
            var h = d("adoptedCallback");
            var k = d("attributeChangedCallback");
            var l = b.observedAttributes || []
        } catch (m) {
            return
        } finally {
            this.c = !1
        }
        b = {
            localName: a,
            constructorFunction: b,
            connectedCallback: f,
            disconnectedCallback: g,
            adoptedCallback: h,
            attributeChangedCallback: k,
            observedAttributes: l,
            constructionStack: []
        };
        Uc(this.a,
            a, b);
        this.g.push(b);
        this.b || (this.b = !0, this.f(function () {
            return bd(c)
        }))
    };
    n.T = function (a) {
        N(this.a, a)
    };

    function bd(a) {
        if (!1 !== a.b) {
            a.b = !1;
            for (var b = a.g, c = [], d = new Map, e = 0; e < b.length; e++) d.set(b[e].localName, []);
            N(a.a, document, {
                T: function (b) {
                    if (void 0 === b.__CE_state) {
                        var e = b.localName, f = d.get(e);
                        f ? f.push(b) : a.a.a.get(e) && c.push(b)
                    }
                }
            });
            for (e = 0; e < c.length; e++) Xc(a.a, c[e]);
            for (; 0 < b.length;) {
                var f = b.shift();
                e = f.localName;
                f = d.get(f.localName);
                for (var g = 0; g < f.length; g++) Xc(a.a, f[g]);
                (e = a.j.get(e)) && ad(e)
            }
        }
    }

    n.get = function (a) {
        if (a = this.a.a.get(a)) return a.constructorFunction
    };
    n.ma = function (a) {
        if (!Rc(a)) return Promise.reject(new SyntaxError("'" + a + "' is not a valid custom element name."));
        var b = this.j.get(a);
        if (b) return b.c;
        b = new $c;
        this.j.set(a, b);
        this.a.a.get(a) && !this.g.some(function (b) {
            return b.localName === a
        }) && ad(b);
        return b.c
    };
    n.Ha = function (a) {
        Zc(this.Z);
        var b = this.f;
        this.f = function (c) {
            return a(function () {
                return b(c)
            })
        }
    };
    window.CustomElementRegistry = P;
    P.prototype.define = P.prototype.la;
    P.prototype.upgrade = P.prototype.T;
    P.prototype.get = P.prototype.get;
    P.prototype.whenDefined = P.prototype.ma;
    P.prototype.polyfillWrapFlushCallback = P.prototype.Ha;
    var cd = window.Document.prototype.createElement, dd = window.Document.prototype.createElementNS,
        ed = window.Document.prototype.importNode, fd = window.Document.prototype.prepend,
        gd = window.Document.prototype.append, hd = window.DocumentFragment.prototype.prepend,
        id = window.DocumentFragment.prototype.append, jd = window.Node.prototype.cloneNode,
        kd = window.Node.prototype.appendChild, ld = window.Node.prototype.insertBefore,
        md = window.Node.prototype.removeChild, nd = window.Node.prototype.replaceChild,
        od = Object.getOwnPropertyDescriptor(window.Node.prototype,
            "textContent"), pd = window.Element.prototype.attachShadow,
        qd = Object.getOwnPropertyDescriptor(window.Element.prototype, "innerHTML"),
        rd = window.Element.prototype.getAttribute, sd = window.Element.prototype.setAttribute,
        td = window.Element.prototype.removeAttribute, ud = window.Element.prototype.getAttributeNS,
        vd = window.Element.prototype.setAttributeNS, wd = window.Element.prototype.removeAttributeNS,
        xd = window.Element.prototype.insertAdjacentElement, yd = window.Element.prototype.insertAdjacentHTML,
        zd = window.Element.prototype.prepend,
        Ad = window.Element.prototype.append, Bd = window.Element.prototype.before, Cd = window.Element.prototype.after,
        Dd = window.Element.prototype.replaceWith, Ed = window.Element.prototype.remove, Fd = window.HTMLElement,
        Gd = Object.getOwnPropertyDescriptor(window.HTMLElement.prototype, "innerHTML"),
        Hd = window.HTMLElement.prototype.insertAdjacentElement, Id = window.HTMLElement.prototype.insertAdjacentHTML;
    var Jd = new function () {
    };

    function Kd() {
        var a = Ld;
        window.HTMLElement = function () {
            function b() {
                var b = this.constructor, d = a.g.get(b);
                if (!d) throw Error("The custom element being constructed was not registered with `customElements`.");
                var e = d.constructionStack;
                if (0 === e.length) return e = cd.call(document, d.localName), Object.setPrototypeOf(e, b.prototype), e.__CE_state = 1, e.__CE_definition = d, a.b(e), e;
                d = e.length - 1;
                var f = e[d];
                if (f === Jd) throw Error("The HTMLElement constructor was either called reentrantly for this constructor or called multiple times.");
                e[d] = Jd;
                Object.setPrototypeOf(f, b.prototype);
                a.b(f);
                return f
            }

            b.prototype = Fd.prototype;
            Object.defineProperty(b.prototype, "constructor", {
                writable: !0,
                configurable: !0,
                enumerable: !1,
                value: b
            });
            return b
        }()
    };

    function Md(a, b, c) {
        function d(b) {
            return function (c) {
                for (var d = [], e = 0; e < arguments.length; ++e) d[e] = arguments[e];
                e = [];
                for (var f = [], l = 0; l < d.length; l++) {
                    var m = d[l];
                    m instanceof Element && I(m) && f.push(m);
                    if (m instanceof DocumentFragment) for (m = m.firstChild; m; m = m.nextSibling) e.push(m); else e.push(m)
                }
                b.apply(this, d);
                for (d = 0; d < f.length; d++) M(a, f[d]);
                if (I(this)) for (d = 0; d < e.length; d++) f = e[d], f instanceof Element && L(a, f)
            }
        }

        void 0 !== c.P && (b.prepend = d(c.P));
        void 0 !== c.append && (b.append = d(c.append))
    };

    function Nd() {
        var a = Ld;
        K(Document.prototype, "createElement", function (b) {
            if (this.__CE_hasRegistry) {
                var c = a.a.get(b);
                if (c) return new c.constructorFunction
            }
            b = cd.call(this, b);
            a.b(b);
            return b
        });
        K(Document.prototype, "importNode", function (b, c) {
            b = ed.call(this, b, !!c);
            this.__CE_hasRegistry ? N(a, b) : Wc(a, b);
            return b
        });
        K(Document.prototype, "createElementNS", function (b, c) {
            if (this.__CE_hasRegistry && (null === b || "http://www.w3.org/1999/xhtml" === b)) {
                var d = a.a.get(c);
                if (d) return new d.constructorFunction
            }
            b = dd.call(this,
                b, c);
            a.b(b);
            return b
        });
        Md(a, Document.prototype, {P: fd, append: gd})
    };

    function Od() {
        function a(a, d) {
            Object.defineProperty(a, "textContent", {
                enumerable: d.enumerable,
                configurable: !0,
                get: d.get,
                set: function (a) {
                    if (this.nodeType === Node.TEXT_NODE) d.set.call(this, a); else {
                        var c = void 0;
                        if (this.firstChild) {
                            var e = this.childNodes, h = e.length;
                            if (0 < h && I(this)) {
                                c = Array(h);
                                for (var k = 0; k < h; k++) c[k] = e[k]
                            }
                        }
                        d.set.call(this, a);
                        if (c) for (a = 0; a < c.length; a++) M(b, c[a])
                    }
                }
            })
        }

        var b = Ld;
        K(Node.prototype, "insertBefore", function (a, d) {
            if (a instanceof DocumentFragment) {
                var c = Array.prototype.slice.apply(a.childNodes);
                a = ld.call(this, a, d);
                if (I(this)) for (d = 0; d < c.length; d++) L(b, c[d]);
                return a
            }
            c = I(a);
            d = ld.call(this, a, d);
            c && M(b, a);
            I(this) && L(b, a);
            return d
        });
        K(Node.prototype, "appendChild", function (a) {
            if (a instanceof DocumentFragment) {
                var c = Array.prototype.slice.apply(a.childNodes);
                a = kd.call(this, a);
                if (I(this)) for (var e = 0; e < c.length; e++) L(b, c[e]);
                return a
            }
            c = I(a);
            e = kd.call(this, a);
            c && M(b, a);
            I(this) && L(b, a);
            return e
        });
        K(Node.prototype, "cloneNode", function (a) {
            a = jd.call(this, !!a);
            this.ownerDocument.__CE_hasRegistry ? N(b, a) :
                Wc(b, a);
            return a
        });
        K(Node.prototype, "removeChild", function (a) {
            var c = I(a), e = md.call(this, a);
            c && M(b, a);
            return e
        });
        K(Node.prototype, "replaceChild", function (a, d) {
            if (a instanceof DocumentFragment) {
                var c = Array.prototype.slice.apply(a.childNodes);
                a = nd.call(this, a, d);
                if (I(this)) for (M(b, d), d = 0; d < c.length; d++) L(b, c[d]);
                return a
            }
            c = I(a);
            var f = nd.call(this, a, d), g = I(this);
            g && M(b, d);
            c && M(b, a);
            g && L(b, a);
            return f
        });
        od && od.get ? a(Node.prototype, od) : Vc(b, function (b) {
            a(b, {
                enumerable: !0, configurable: !0, get: function () {
                    for (var a =
                        [], b = 0; b < this.childNodes.length; b++) a.push(this.childNodes[b].textContent);
                    return a.join("")
                }, set: function (a) {
                    for (; this.firstChild;) md.call(this, this.firstChild);
                    kd.call(this, document.createTextNode(a))
                }
            })
        })
    };

    function Pd(a) {
        function b(b) {
            return function (c) {
                for (var d = [], e = 0; e < arguments.length; ++e) d[e] = arguments[e];
                e = [];
                for (var h = [], k = 0; k < d.length; k++) {
                    var l = d[k];
                    l instanceof Element && I(l) && h.push(l);
                    if (l instanceof DocumentFragment) for (l = l.firstChild; l; l = l.nextSibling) e.push(l); else e.push(l)
                }
                b.apply(this, d);
                for (d = 0; d < h.length; d++) M(a, h[d]);
                if (I(this)) for (d = 0; d < e.length; d++) h = e[d], h instanceof Element && L(a, h)
            }
        }

        var c = Element.prototype;
        void 0 !== Bd && (c.before = b(Bd));
        void 0 !== Bd && (c.after = b(Cd));
        void 0 !== Dd &&
        K(c, "replaceWith", function (b) {
            for (var c = [], d = 0; d < arguments.length; ++d) c[d] = arguments[d];
            d = [];
            for (var g = [], h = 0; h < c.length; h++) {
                var k = c[h];
                k instanceof Element && I(k) && g.push(k);
                if (k instanceof DocumentFragment) for (k = k.firstChild; k; k = k.nextSibling) d.push(k); else d.push(k)
            }
            h = I(this);
            Dd.apply(this, c);
            for (c = 0; c < g.length; c++) M(a, g[c]);
            if (h) for (M(a, this), c = 0; c < d.length; c++) g = d[c], g instanceof Element && L(a, g)
        });
        void 0 !== Ed && K(c, "remove", function () {
            var b = I(this);
            Ed.call(this);
            b && M(a, this)
        })
    };

    function Qd() {
        function a(a, b) {
            Object.defineProperty(a, "innerHTML", {
                enumerable: b.enumerable,
                configurable: !0,
                get: b.get,
                set: function (a) {
                    var c = this, e = void 0;
                    I(this) && (e = [], J(this, function (a) {
                        a !== c && e.push(a)
                    }));
                    b.set.call(this, a);
                    if (e) for (var f = 0; f < e.length; f++) {
                        var g = e[f];
                        1 === g.__CE_state && d.disconnectedCallback(g)
                    }
                    this.ownerDocument.__CE_hasRegistry ? N(d, this) : Wc(d, this);
                    return a
                }
            })
        }

        function b(a, b) {
            K(a, "insertAdjacentElement", function (a, c) {
                var e = I(c);
                a = b.call(this, a, c);
                e && M(d, c);
                I(a) && L(d, c);
                return a
            })
        }

        function c(a, b) {
            function c(a, b) {
                for (var c = []; a !== b; a = a.nextSibling) c.push(a);
                for (b = 0; b < c.length; b++) N(d, c[b])
            }

            K(a, "insertAdjacentHTML", function (a, d) {
                a = a.toLowerCase();
                if ("beforebegin" === a) {
                    var e = this.previousSibling;
                    b.call(this, a, d);
                    c(e || this.parentNode.firstChild, this)
                } else if ("afterbegin" === a) e = this.firstChild, b.call(this, a, d), c(this.firstChild, e); else if ("beforeend" === a) e = this.lastChild, b.call(this, a, d), c(e || this.firstChild, null); else if ("afterend" === a) e = this.nextSibling, b.call(this, a, d), c(this.nextSibling,
                    e); else throw new SyntaxError("The value provided (" + String(a) + ") is not one of 'beforebegin', 'afterbegin', 'beforeend', or 'afterend'.");
            })
        }

        var d = Ld;
        pd && K(Element.prototype, "attachShadow", function (a) {
            return this.__CE_shadowRoot = a = pd.call(this, a)
        });
        qd && qd.get ? a(Element.prototype, qd) : Gd && Gd.get ? a(HTMLElement.prototype, Gd) : Vc(d, function (b) {
            a(b, {
                enumerable: !0, configurable: !0, get: function () {
                    return jd.call(this, !0).innerHTML
                }, set: function (a) {
                    var b = "template" === this.localName, c = b ? this.content : this, d = dd.call(document,
                        this.namespaceURI, this.localName);
                    for (d.innerHTML = a; 0 < c.childNodes.length;) md.call(c, c.childNodes[0]);
                    for (a = b ? d.content : d; 0 < a.childNodes.length;) kd.call(c, a.childNodes[0])
                }
            })
        });
        K(Element.prototype, "setAttribute", function (a, b) {
            if (1 !== this.__CE_state) return sd.call(this, a, b);
            var c = rd.call(this, a);
            sd.call(this, a, b);
            b = rd.call(this, a);
            d.attributeChangedCallback(this, a, c, b, null)
        });
        K(Element.prototype, "setAttributeNS", function (a, b, c) {
            if (1 !== this.__CE_state) return vd.call(this, a, b, c);
            var e = ud.call(this, a,
                b);
            vd.call(this, a, b, c);
            c = ud.call(this, a, b);
            d.attributeChangedCallback(this, b, e, c, a)
        });
        K(Element.prototype, "removeAttribute", function (a) {
            if (1 !== this.__CE_state) return td.call(this, a);
            var b = rd.call(this, a);
            td.call(this, a);
            null !== b && d.attributeChangedCallback(this, a, b, null, null)
        });
        K(Element.prototype, "removeAttributeNS", function (a, b) {
            if (1 !== this.__CE_state) return wd.call(this, a, b);
            var c = ud.call(this, a, b);
            wd.call(this, a, b);
            var e = ud.call(this, a, b);
            c !== e && d.attributeChangedCallback(this, b, c, e, a)
        });
        Hd ? b(HTMLElement.prototype,
            Hd) : xd ? b(Element.prototype, xd) : console.warn("Custom Elements: `Element#insertAdjacentElement` was not patched.");
        Id ? c(HTMLElement.prototype, Id) : yd ? c(Element.prototype, yd) : console.warn("Custom Elements: `Element#insertAdjacentHTML` was not patched.");
        Md(d, Element.prototype, {P: zd, append: Ad});
        Pd(d)
    };var Rd = window.customElements;
    if (!Rd || Rd.forcePolyfill || "function" != typeof Rd.define || "function" != typeof Rd.get) {
        var Ld = new Tc;
        Kd();
        Nd();
        Md(Ld, DocumentFragment.prototype, {P: hd, append: id});
        Od();
        Qd();
        document.__CE_hasRegistry = !0;
        var customElements = new P(Ld);
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
    function Sd() {
        this.end = this.start = 0;
        this.rules = this.parent = this.previous = null;
        this.cssText = this.parsedCssText = "";
        this.atRule = !1;
        this.type = 0;
        this.parsedSelector = this.selector = this.keyframesName = ""
    }

    function Td(a) {
        a = a.replace(Ud, "").replace(Vd, "");
        var b = Wd, c = a, d = new Sd;
        d.start = 0;
        d.end = c.length;
        for (var e = d, f = 0, g = c.length; f < g; f++) if ("{" === c[f]) {
            e.rules || (e.rules = []);
            var h = e, k = h.rules[h.rules.length - 1] || null;
            e = new Sd;
            e.start = f + 1;
            e.parent = h;
            e.previous = k;
            h.rules.push(e)
        } else "}" === c[f] && (e.end = f + 1, e = e.parent || d);
        return b(d, a)
    }

    function Wd(a, b) {
        var c = b.substring(a.start, a.end - 1);
        a.parsedCssText = a.cssText = c.trim();
        a.parent && (c = b.substring(a.previous ? a.previous.end : a.parent.start, a.start - 1), c = Xd(c), c = c.replace(Yd, " "), c = c.substring(c.lastIndexOf(";") + 1), c = a.parsedSelector = a.selector = c.trim(), a.atRule = 0 === c.indexOf("@"), a.atRule ? 0 === c.indexOf("@media") ? a.type = Zd : c.match($d) && (a.type = ae, a.keyframesName = a.selector.split(Yd).pop()) : a.type = 0 === c.indexOf("--") ? be : ce);
        if (c = a.rules) for (var d = 0, e = c.length, f = void 0; d < e && (f = c[d]); d++) Wd(f,
            b);
        return a
    }

    function Xd(a) {
        return a.replace(/\\([0-9a-f]{1,6})\s/gi, function (a, c) {
            a = c;
            for (c = 6 - a.length; c--;) a = "0" + a;
            return "\\" + a
        })
    }

    function de(a, b, c) {
        c = void 0 === c ? "" : c;
        var d = "";
        if (a.cssText || a.rules) {
            var e = a.rules, f;
            if (f = e) f = e[0], f = !(f && f.selector && 0 === f.selector.indexOf("--"));
            if (f) {
                f = 0;
                for (var g = e.length, h = void 0; f < g && (h = e[f]); f++) d = de(h, b, d)
            } else b ? b = a.cssText : (b = a.cssText, b = b.replace(ee, "").replace(fe, ""), b = b.replace(ge, "").replace(he, "")), (d = b.trim()) && (d = "  " + d + "\n")
        }
        d && (a.selector && (c += a.selector + " {\n"), c += d, a.selector && (c += "}\n\n"));
        return c
    }

    var ce = 1, ae = 7, Zd = 4, be = 1E3, Ud = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//gim, Vd = /@import[^;]*;/gim,
        ee = /(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?(?:[;\n]|$)/gim,
        fe = /(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?{[^}]*?}(?:[;\n]|$)?/gim,
        ge = /@apply\s*\(?[^);]*\)?\s*(?:[;\n]|$)?/gim, he = /[^;:]*?:[^;]*?var\([^;]*\)(?:[;\n]|$)?/gim,
        $d = /^@[^\s]*keyframes/, Yd = /\s+/g;
    var Q = !(window.ShadyDOM && window.ShadyDOM.inUse), ie;

    function je(a) {
        ie = a && a.shimcssproperties ? !1 : Q || !(navigator.userAgent.match(/AppleWebKit\/601|Edge\/15/) || !window.CSS || !CSS.supports || !CSS.supports("box-shadow", "0 0 0 var(--foo)"))
    }

    var ke;
    window.ShadyCSS && void 0 !== window.ShadyCSS.cssBuild && (ke = window.ShadyCSS.cssBuild);
    var le = !(!window.ShadyCSS || !window.ShadyCSS.disableRuntime);
    window.ShadyCSS && void 0 !== window.ShadyCSS.nativeCss ? ie = window.ShadyCSS.nativeCss : window.ShadyCSS ? (je(window.ShadyCSS), window.ShadyCSS = void 0) : je(window.WebComponents && window.WebComponents.flags);
    var R = ie, me = ke;
    var ne = /(?:^|[;\s{]\s*)(--[\w-]*?)\s*:\s*(?:((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};{])+)|\{([^}]*)\}(?:(?=[;\s}])|$))/gi,
        oe = /(?:^|\W+)@apply\s*\(?([^);\n]*)\)?/gi, pe = /(--[\w-]+)\s*([:,;)]|$)/gi,
        qe = /(animation\s*:)|(animation-name\s*:)/, re = /@media\s(.*)/, se = /\{[^}]*\}/g;
    var te = new Set;

    function ue(a, b) {
        if (!a) return "";
        "string" === typeof a && (a = Td(a));
        b && ve(a, b);
        return de(a, R)
    }

    function we(a) {
        !a.__cssRules && a.textContent && (a.__cssRules = Td(a.textContent));
        return a.__cssRules || null
    }

    function Ae(a) {
        return !!a.parent && a.parent.type === ae
    }

    function ve(a, b, c, d) {
        if (a) {
            var e = !1, f = a.type;
            if (d && f === Zd) {
                var g = a.selector.match(re);
                g && (window.matchMedia(g[1]).matches || (e = !0))
            }
            f === ce ? b(a) : c && f === ae ? c(a) : f === be && (e = !0);
            if ((a = a.rules) && !e) for (e = 0, f = a.length, g = void 0; e < f && (g = a[e]); e++) ve(g, b, c, d)
        }
    }

    function Be(a, b, c, d) {
        var e = document.createElement("style");
        b && e.setAttribute("scope", b);
        e.textContent = a;
        Ce(e, c, d);
        return e
    }

    var S = null;

    function De(a) {
        a = document.createComment(" Shady DOM styles for " + a + " ");
        var b = document.head;
        b.insertBefore(a, (S ? S.nextSibling : null) || b.firstChild);
        return S = a
    }

    function Ce(a, b, c) {
        b = b || document.head;
        b.insertBefore(a, c && c.nextSibling || b.firstChild);
        S ? a.compareDocumentPosition(S) === Node.DOCUMENT_POSITION_PRECEDING && (S = a) : S = a
    }

    function Ee(a, b) {
        for (var c = 0, d = a.length; b < d; b++) if ("(" === a[b]) c++; else if (")" === a[b] && 0 === --c) return b;
        return -1
    }

    function Fe(a, b) {
        var c = a.indexOf("var(");
        if (-1 === c) return b(a, "", "", "");
        var d = Ee(a, c + 3), e = a.substring(c + 4, d);
        c = a.substring(0, c);
        a = Fe(a.substring(d + 1), b);
        d = e.indexOf(",");
        return -1 === d ? b(c, e.trim(), "", a) : b(c, e.substring(0, d).trim(), e.substring(d + 1).trim(), a)
    }

    function Ge(a, b) {
        Q ? a.setAttribute("class", b) : window.ShadyDOM.nativeMethods.setAttribute.call(a, "class", b)
    }

    var He = window.ShadyDOM && window.ShadyDOM.wrap || function (a) {
        return a
    };

    function T(a) {
        var b = a.localName, c = "";
        b ? -1 < b.indexOf("-") || (c = b, b = a.getAttribute && a.getAttribute("is") || "") : (b = a.is, c = a.extends);
        return {is: b, H: c}
    }

    function Ie(a) {
        for (var b = [], c = "", d = 0; 0 <= d && d < a.length; d++) if ("(" === a[d]) {
            var e = Ee(a, d);
            c += a.slice(d, e + 1);
            d = e
        } else "," === a[d] ? (b.push(c), c = "") : c += a[d];
        c && b.push(c);
        return b
    }

    function Je(a) {
        if (void 0 !== me) return me;
        if (void 0 === a.__cssBuild) {
            var b = a.getAttribute("css-build");
            if (b) a.__cssBuild = b; else {
                a:{
                    b = "template" === a.localName ? a.content.firstChild : a.firstChild;
                    if (b instanceof Comment && (b = b.textContent.trim().split(":"), "css-build" === b[0])) {
                        b = b[1];
                        break a
                    }
                    b = ""
                }
                if ("" !== b) {
                    var c = "template" === a.localName ? a.content.firstChild : a.firstChild;
                    c.parentNode.removeChild(c)
                }
                a.__cssBuild = b
            }
        }
        return a.__cssBuild || ""
    }

    function Ke(a) {
        a = void 0 === a ? "" : a;
        return "" !== a && R ? Q ? "shadow" === a : "shady" === a : !1
    };

    function Le() {
    }

    function Me(a, b) {
        Ne(U, a, function (a) {
            V(a, b || "")
        })
    }

    function Ne(a, b, c) {
        b.nodeType === Node.ELEMENT_NODE && c(b);
        var d;
        "template" === b.localName ? d = (b.content || b._content || b).childNodes : d = b.children || b.childNodes;
        if (d) for (b = 0; b < d.length; b++) Ne(a, d[b], c)
    }

    function V(a, b, c) {
        if (b) if (a.classList) c ? (a.classList.remove("style-scope"), a.classList.remove(b)) : (a.classList.add("style-scope"), a.classList.add(b)); else if (a.getAttribute) {
            var d = a.getAttribute("class");
            c ? d && (b = d.replace("style-scope", "").replace(b, ""), Ge(a, b)) : Ge(a, (d ? d + " " : "") + "style-scope " + b)
        }
    }

    function Oe(a, b, c) {
        Ne(U, a, function (a) {
            V(a, b, !0);
            V(a, c)
        })
    }

    function Pe(a, b) {
        Ne(U, a, function (a) {
            V(a, b || "", !0)
        })
    }

    function Qe(a, b, c, d, e) {
        var f = U;
        e = void 0 === e ? "" : e;
        "" === e && (Q || "shady" === (void 0 === d ? "" : d) ? e = ue(b, c) : (a = T(a), e = Re(f, b, a.is, a.H, c) + "\n\n"));
        return e.trim()
    }

    function Re(a, b, c, d, e) {
        var f = Se(c, d);
        c = c ? "." + c : "";
        return ue(b, function (b) {
            b.c || (b.selector = b.i = Te(a, b, a.b, c, f), b.c = !0);
            e && e(b, c, f)
        })
    }

    function Se(a, b) {
        return b ? "[is=" + a + "]" : a
    }

    function Te(a, b, c, d, e) {
        var f = Ie(b.selector);
        if (!Ae(b)) {
            b = 0;
            for (var g = f.length, h = void 0; b < g && (h = f[b]); b++) f[b] = c.call(a, h, d, e)
        }
        return f.filter(function (a) {
            return !!a
        }).join(",")
    }

    function Ue(a) {
        return a.replace(Ve, function (a, c, d) {
            -1 < d.indexOf("+") ? d = d.replace(/\+/g, "___") : -1 < d.indexOf("___") && (d = d.replace(/___/g, "+"));
            return ":" + c + "(" + d + ")"
        })
    }

    function We(a) {
        for (var b = [], c; c = a.match(Xe);) {
            var d = c.index, e = Ee(a, d);
            if (-1 === e) throw Error(c.input + " selector missing ')'");
            c = a.slice(d, e + 1);
            a = a.replace(c, "\ue000");
            b.push(c)
        }
        return {ba: a, matches: b}
    }

    function Ye(a, b) {
        var c = a.split("\ue000");
        return b.reduce(function (a, b, f) {
            return a + b + c[f + 1]
        }, c[0])
    }

    Le.prototype.b = function (a, b, c) {
        var d = !1;
        a = a.trim();
        var e = Ve.test(a);
        e && (a = a.replace(Ve, function (a, b, c) {
            return ":" + b + "(" + c.replace(/\s/g, "") + ")"
        }), a = Ue(a));
        var f = Xe.test(a);
        if (f) {
            var g = We(a);
            a = g.ba;
            g = g.matches
        }
        a = a.replace(Ze, ":host $1");
        a = a.replace($e, function (a, e, f) {
            d || (a = af(f, e, b, c), d = d || a.stop, e = a.wa, f = a.value);
            return e + f
        });
        f && (a = Ye(a, g));
        e && (a = Ue(a));
        return a
    };

    function af(a, b, c, d) {
        var e = a.indexOf("::slotted");
        0 <= a.indexOf(":host") ? a = bf(a, d) : 0 !== e && (a = c ? cf(a, c) : a);
        c = !1;
        0 <= e && (b = "", c = !0);
        if (c) {
            var f = !0;
            c && (a = a.replace(df, function (a, b) {
                return " > " + b
            }))
        }
        a = a.replace(ef, function (a, b, c) {
            return '[dir="' + c + '"] ' + b + ", " + b + '[dir="' + c + '"]'
        });
        return {value: a, wa: b, stop: f}
    }

    function cf(a, b) {
        a = a.split(/(\[.+?\])/);
        for (var c = [], d = 0; d < a.length; d++) if (1 === d % 2) c.push(a[d]); else {
            var e = a[d];
            if ("" !== e || d !== a.length - 1) e = e.split(":"), e[0] += b, c.push(e.join(":"))
        }
        return c.join("")
    }

    function bf(a, b) {
        var c = a.match(ff);
        return (c = c && c[2].trim() || "") ? c[0].match(gf) ? a.replace(ff, function (a, c, f) {
            return b + f
        }) : c.split(gf)[0] === b ? c : "should_not_match" : a.replace(":host", b)
    }

    function hf(a) {
        ":root" === a.selector && (a.selector = "html")
    }

    Le.prototype.c = function (a) {
        return a.match(":host") ? "" : a.match("::slotted") ? this.b(a, ":not(.style-scope)") : cf(a.trim(), ":not(.style-scope)")
    };
    p.Object.defineProperties(Le.prototype, {
        a: {
            configurable: !0, enumerable: !0, get: function () {
                return "style-scope"
            }
        }
    });
    var Ve = /:(nth[-\w]+)\(([^)]+)\)/, $e = /(^|[\s>+~]+)((?:\[.+?\]|[^\s>+~=[])+)/g, gf = /[[.:#*]/,
        Ze = /^(::slotted)/, ff = /(:host)(?:\(((?:\([^)(]*\)|[^)(]*)+?)\))/,
        df = /(?:::slotted)(?:\(((?:\([^)(]*\)|[^)(]*)+?)\))/, ef = /(.*):dir\((?:(ltr|rtl))\)/,
        Xe = /:(?:matches|any|-(?:webkit|moz)-any)/, U = new Le;

    function jf(a, b, c, d, e) {
        this.v = a || null;
        this.b = b || null;
        this.aa = c || [];
        this.m = null;
        this.cssBuild = e || "";
        this.H = d || "";
        this.a = this.o = this.u = null
    }

    function W(a) {
        return a ? a.__styleInfo : null
    }

    function kf(a, b) {
        return a.__styleInfo = b
    }

    jf.prototype.c = function () {
        return this.v
    };
    jf.prototype._getStyleRules = jf.prototype.c;

    function lf(a) {
        var b = this.matches || this.matchesSelector || this.mozMatchesSelector || this.msMatchesSelector || this.oMatchesSelector || this.webkitMatchesSelector;
        return b && b.call(this, a)
    }

    var mf = navigator.userAgent.match("Trident");

    function nf() {
    }

    function of(a) {
        var b = {}, c = [], d = 0;
        ve(a, function (a) {
            pf(a);
            a.index = d++;
            a = a.h.cssText;
            for (var c; c = pe.exec(a);) {
                var e = c[1];
                ":" !== c[2] && (b[e] = !0)
            }
        }, function (a) {
            c.push(a)
        });
        a.b = c;
        a = [];
        for (var e in b) a.push(e);
        return a
    }

    function pf(a) {
        if (!a.h) {
            var b = {}, c = {};
            qf(a, c) && (b.s = c, a.rules = null);
            b.cssText = a.parsedCssText.replace(se, "").replace(ne, "");
            a.h = b
        }
    }

    function qf(a, b) {
        var c = a.h;
        if (c) {
            if (c.s) return Object.assign(b, c.s), !0
        } else {
            c = a.parsedCssText;
            for (var d; a = ne.exec(c);) {
                d = (a[2] || a[3]).trim();
                if ("inherit" !== d || "unset" !== d) b[a[1].trim()] = d;
                d = !0
            }
            return d
        }
    }

    function rf(a, b, c) {
        b && (b = 0 <= b.indexOf(";") ? sf(a, b, c) : Fe(b, function (b, e, f, g) {
            if (!e) return b + g;
            (e = rf(a, c[e], c)) && "initial" !== e ? "apply-shim-inherit" === e && (e = "inherit") : e = rf(a, c[f] || f, c) || f;
            return b + (e || "") + g
        }));
        return b && b.trim() || ""
    }

    function sf(a, b, c) {
        b = b.split(";");
        for (var d = 0, e, f; d < b.length; d++) if (e = b[d]) {
            oe.lastIndex = 0;
            if (f = oe.exec(e)) e = rf(a, c[f[1]], c); else if (f = e.indexOf(":"), -1 !== f) {
                var g = e.substring(f);
                g = g.trim();
                g = rf(a, g, c) || g;
                e = e.substring(0, f) + g
            }
            b[d] = e && e.lastIndexOf(";") === e.length - 1 ? e.slice(0, -1) : e || ""
        }
        return b.join(";")
    }

    function tf(a, b) {
        var c = {}, d = [];
        ve(a, function (a) {
            a.h || pf(a);
            var e = a.i || a.parsedSelector;
            b && a.h.s && e && lf.call(b, e) && (qf(a, c), a = a.index, e = parseInt(a / 32, 10), d[e] = (d[e] || 0) | 1 << a % 32)
        }, null, !0);
        return {s: c, key: d}
    }

    function uf(a, b, c, d) {
        b.h || pf(b);
        if (b.h.s) {
            var e = T(a);
            a = e.is;
            e = e.H;
            e = a ? Se(a, e) : "html";
            var f = b.parsedSelector, g = ":host > *" === f || "html" === f, h = 0 === f.indexOf(":host") && !g;
            "shady" === c && (g = f === e + " > *." + e || -1 !== f.indexOf("html"), h = !g && 0 === f.indexOf(e));
            if (g || h) c = e, h && (b.i || (b.i = Te(U, b, U.b, a ? "." + a : "", e)), c = b.i || e), d({
                ba: c,
                Ca: h,
                Ra: g
            })
        }
    }

    function vf(a, b, c) {
        var d = {}, e = {};
        ve(b, function (b) {
            uf(a, b, c, function (c) {
                lf.call(a._element || a, c.ba) && (c.Ca ? qf(b, d) : qf(b, e))
            })
        }, null, !0);
        return {Ja: e, Ba: d}
    }

    function wf(a, b, c, d) {
        var e = T(b), f = Se(e.is, e.H),
            g = new RegExp("(?:^|[^.#[:])" + (b.extends ? "\\" + f.slice(0, -1) + "\\]" : f) + "($|[.:[\\s>+~])"),
            h = W(b);
        e = h.v;
        h = h.cssBuild;
        var k = xf(e, d);
        return Qe(b, e, function (b) {
            var e = "";
            b.h || pf(b);
            b.h.cssText && (e = sf(a, b.h.cssText, c));
            b.cssText = e;
            if (!Q && !Ae(b) && b.cssText) {
                var h = e = b.cssText;
                null == b.ga && (b.ga = qe.test(e));
                if (b.ga) if (null == b.O) {
                    b.O = [];
                    for (var l in k) h = k[l], h = h(e), e !== h && (e = h, b.O.push(l))
                } else {
                    for (l = 0; l < b.O.length; ++l) h = k[b.O[l]], e = h(e);
                    h = e
                }
                b.cssText = h;
                b.i = b.i || b.selector;
                e = "." + d;
                l = Ie(b.i);
                h = 0;
                for (var O = l.length, Y = void 0; h < O && (Y = l[h]); h++) l[h] = Y.match(g) ? Y.replace(f, e) : e + " " + Y;
                b.selector = l.join(",")
            }
        }, h)
    }

    function xf(a, b) {
        a = a.b;
        var c = {};
        if (!Q && a) for (var d = 0, e = a[d]; d < a.length; e = a[++d]) {
            var f = e, g = b;
            f.f = new RegExp("\\b" + f.keyframesName + "(?!\\B|-)", "g");
            f.a = f.keyframesName + "-" + g;
            f.i = f.i || f.selector;
            f.selector = f.i.replace(f.keyframesName, f.a);
            c[e.keyframesName] = yf(e)
        }
        return c
    }

    function yf(a) {
        return function (b) {
            return b.replace(a.f, a.a)
        }
    }

    function zf(a, b) {
        var c = Af, d = we(a);
        a.textContent = ue(d, function (a) {
            var d = a.cssText = a.parsedCssText;
            a.h && a.h.cssText && (d = d.replace(ee, "").replace(fe, ""), a.cssText = sf(c, d, b))
        })
    }

    p.Object.defineProperties(nf.prototype, {
        a: {
            configurable: !0, enumerable: !0, get: function () {
                return "x-scope"
            }
        }
    });
    var Af = new nf;
    var Bf = {}, Cf = window.customElements;
    if (Cf && !Q && !le) {
        var Df = Cf.define;
        Cf.define = function (a, b, c) {
            Bf[a] || (Bf[a] = De(a));
            Df.call(Cf, a, b, c)
        }
    }
    ;

    function Ef() {
        this.cache = {}
    }

    Ef.prototype.store = function (a, b, c, d) {
        var e = this.cache[a] || [];
        e.push({s: b, styleElement: c, o: d});
        100 < e.length && e.shift();
        this.cache[a] = e
    };

    function Ff() {
    }

    var Gf = new RegExp(U.a + "\\s*([^\\s]*)");

    function Hf(a) {
        return (a = (a.classList && a.classList.value ? a.classList.value : a.getAttribute("class") || "").match(Gf)) ? a[1] : ""
    }

    function If(a) {
        var b = He(a).getRootNode();
        return b === a || b === a.ownerDocument ? "" : (a = b.host) ? T(a).is : ""
    }

    function Jf(a) {
        for (var b = 0; b < a.length; b++) {
            var c = a[b];
            if (c.target !== document.documentElement && c.target !== document.head) for (var d = 0; d < c.addedNodes.length; d++) {
                var e = c.addedNodes[d];
                if (e.nodeType === Node.ELEMENT_NODE) {
                    var f = e.getRootNode(), g = Hf(e);
                    if (g && f === e.ownerDocument && ("style" !== e.localName && "template" !== e.localName || "" === Je(e))) Pe(e, g); else if (f instanceof ShadowRoot) for (f = If(e), f !== g && Oe(e, g, f), e = window.ShadyDOM.nativeMethods.querySelectorAll.call(e, ":not(." + U.a + ")"), g = 0; g < e.length; g++) {
                        f = e[g];
                        var h = If(f);
                        h && V(f, h)
                    }
                }
            }
        }
    }

    if (!(Q || window.ShadyDOM && window.ShadyDOM.handlesDynamicScoping)) {
        var Kf = new MutationObserver(Jf), Lf = function (a) {
            Kf.observe(a, {childList: !0, subtree: !0})
        };
        if (window.customElements && !window.customElements.polyfillWrapFlushCallback) Lf(document); else {
            var Mf = function () {
                Lf(document.body)
            };
            window.HTMLImports ? window.HTMLImports.whenReady(Mf) : requestAnimationFrame(function () {
                if ("loading" === document.readyState) {
                    var a = function () {
                        Mf();
                        document.removeEventListener("readystatechange", a)
                    };
                    document.addEventListener("readystatechange",
                        a)
                } else Mf()
            })
        }
        Ff = function () {
            Jf(Kf.takeRecords())
        }
    }
    var Nf = Ff;
    var Of = {};
    var Pf = Promise.resolve();

    function Qf(a) {
        if (a = Of[a]) a._applyShimCurrentVersion = a._applyShimCurrentVersion || 0, a._applyShimValidatingVersion = a._applyShimValidatingVersion || 0, a._applyShimNextVersion = (a._applyShimNextVersion || 0) + 1
    }

    function Rf(a) {
        return a._applyShimCurrentVersion === a._applyShimNextVersion
    }

    function Sf(a) {
        a._applyShimValidatingVersion = a._applyShimNextVersion;
        a._validating || (a._validating = !0, Pf.then(function () {
            a._applyShimCurrentVersion = a._applyShimNextVersion;
            a._validating = !1
        }))
    };var Tf = {}, Uf = new Ef;

    function X() {
        this.j = {};
        this.c = document.documentElement;
        var a = new Sd;
        a.rules = [];
        this.f = kf(this.c, new jf(a));
        this.g = !1;
        this.b = this.a = null
    }

    n = X.prototype;
    n.flush = function () {
        Nf()
    };
    n.za = function (a) {
        return we(a)
    };
    n.Na = function (a) {
        return ue(a)
    };
    n.prepareTemplate = function (a, b, c) {
        this.prepareTemplateDom(a, b);
        this.prepareTemplateStyles(a, b, c)
    };
    n.prepareTemplateStyles = function (a, b, c) {
        if (!a._prepared && !le) {
            Q || Bf[b] || (Bf[b] = De(b));
            a._prepared = !0;
            a.name = b;
            a.extends = c;
            Of[b] = a;
            var d = Je(a), e = Ke(d);
            c = {is: b, extends: c};
            for (var f = [], g = a.content.querySelectorAll("style"), h = 0; h < g.length; h++) {
                var k = g[h];
                if (k.hasAttribute("shady-unscoped")) {
                    if (!Q) {
                        var l = k.textContent;
                        te.has(l) || (te.add(l), l = k.cloneNode(!0), document.head.appendChild(l));
                        k.parentNode.removeChild(k)
                    }
                } else f.push(k.textContent), k.parentNode.removeChild(k)
            }
            f = f.join("").trim() + (Tf[b] || "");
            Vf(this);
            if (!e) {
                if (g = !d) g = oe.test(f) || ne.test(f), oe.lastIndex = 0, ne.lastIndex = 0;
                h = Td(f);
                g && R && this.a && this.a.transformRules(h, b);
                a._styleAst = h
            }
            g = [];
            R || (g = of(a._styleAst));
            if (!g.length || R) h = Q ? a.content : null, b = Bf[b] || null, d = Qe(c, a._styleAst, null, d, e ? f : ""), d = d.length ? Be(d, c.is, h, b) : null, a._style = d;
            a.a = g
        }
    };
    n.Ia = function (a, b) {
        Tf[b] = a.join(" ")
    };
    n.prepareTemplateDom = function (a, b) {
        if (!le) {
            var c = Je(a);
            Q || "shady" === c || a._domPrepared || (a._domPrepared = !0, Me(a.content, b))
        }
    };

    function Wf(a) {
        var b = T(a), c = b.is;
        b = b.H;
        var d = Bf[c] || null, e = Of[c];
        if (e) {
            c = e._styleAst;
            var f = e.a;
            e = Je(e);
            b = new jf(c, d, f, b, e);
            kf(a, b);
            return b
        }
    }

    function Xf(a) {
        !a.b && window.ShadyCSS && window.ShadyCSS.CustomStyleInterface && (a.b = window.ShadyCSS.CustomStyleInterface, a.b.transformCallback = function (b) {
            a.ka(b)
        }, a.b.validateCallback = function () {
            requestAnimationFrame(function () {
                (a.b.enqueued || a.g) && a.flushCustomStyles()
            })
        })
    }

    function Vf(a) {
        !a.a && window.ShadyCSS && window.ShadyCSS.ApplyShim && (a.a = window.ShadyCSS.ApplyShim, a.a.invalidCallback = Qf);
        Xf(a)
    }

    n.flushCustomStyles = function () {
        if (!le && (Vf(this), this.b)) {
            var a = this.b.processStyles();
            if (this.b.enqueued && !Ke(this.f.cssBuild)) {
                if (R) {
                    if (!this.f.cssBuild) for (var b = 0; b < a.length; b++) {
                        var c = this.b.getStyleForCustomStyle(a[b]);
                        if (c && R && this.a) {
                            var d = we(c);
                            Vf(this);
                            this.a.transformRules(d);
                            c.textContent = ue(d)
                        }
                    }
                } else {
                    Yf(this, this.c, this.f);
                    for (b = 0; b < a.length; b++) (c = this.b.getStyleForCustomStyle(a[b])) && zf(c, this.f.u);
                    this.g && this.styleDocument()
                }
                this.b.enqueued = !1
            }
        }
    };
    n.styleElement = function (a, b) {
        if (le) {
            if (b) {
                W(a) || kf(a, new jf(null));
                var c = W(a);
                c.m = c.m || {};
                Object.assign(c.m, b);
                Zf(this, a, c)
            }
        } else if (c = W(a) || Wf(a)) if (a !== this.c && (this.g = !0), b && (c.m = c.m || {}, Object.assign(c.m, b)), R) Zf(this, a, c); else if (this.flush(), Yf(this, a, c), c.aa && c.aa.length) {
            b = T(a).is;
            var d;
            a:{
                if (d = Uf.cache[b]) for (var e = d.length - 1; 0 <= e; e--) {
                    var f = d[e];
                    b:{
                        var g = c.aa;
                        for (var h = 0; h < g.length; h++) {
                            var k = g[h];
                            if (f.s[k] !== c.u[k]) {
                                g = !1;
                                break b
                            }
                        }
                        g = !0
                    }
                    if (g) {
                        d = f;
                        break a
                    }
                }
                d = void 0
            }
            g = d ? d.styleElement : null;
            e = c.o;
            (f = d && d.o) || (f = this.j[b] = (this.j[b] || 0) + 1, f = b + "-" + f);
            c.o = f;
            f = c.o;
            h = Af;
            h = g ? g.textContent || "" : wf(h, a, c.u, f);
            k = W(a);
            var l = k.a;
            l && !Q && l !== g && (l._useCount--, 0 >= l._useCount && l.parentNode && l.parentNode.removeChild(l));
            Q ? k.a ? (k.a.textContent = h, g = k.a) : h && (g = Be(h, f, a.shadowRoot, k.b)) : g ? g.parentNode || (mf && -1 < h.indexOf("@media") && (g.textContent = h), Ce(g, null, k.b)) : h && (g = Be(h, f, null, k.b));
            g && (g._useCount = g._useCount || 0, k.a != g && g._useCount++, k.a = g);
            f = g;
            Q || (g = c.o, k = h = a.getAttribute("class") || "", e && (k = h.replace(new RegExp("\\s*x-scope\\s*" +
                e + "\\s*", "g"), " ")), k += (k ? " " : "") + "x-scope " + g, h !== k && Ge(a, k));
            d || Uf.store(b, c.u, f, c.o)
        }
    };

    function Zf(a, b, c) {
        var d = T(b).is;
        if (c.m) {
            var e = c.m, f;
            for (f in e) null === f ? b.style.removeProperty(f) : b.style.setProperty(f, e[f])
        }
        e = Of[d];
        if (!(!e && b !== a.c || e && "" !== Je(e)) && e && e._style && !Rf(e)) {
            if (Rf(e) || e._applyShimValidatingVersion !== e._applyShimNextVersion) Vf(a), a.a && a.a.transformRules(e._styleAst, d), e._style.textContent = Qe(b, c.v), Sf(e);
            Q && (a = b.shadowRoot) && (a = a.querySelector("style")) && (a.textContent = Qe(b, c.v));
            c.v = e._styleAst
        }
    }

    function $f(a, b) {
        return (b = He(b).getRootNode().host) ? W(b) || Wf(b) ? b : $f(a, b) : a.c
    }

    function Yf(a, b, c) {
        var d = $f(a, b), e = W(d), f = e.u;
        d === a.c || f || (Yf(a, d, e), f = e.u);
        a = Object.create(f || null);
        d = vf(b, c.v, c.cssBuild);
        b = tf(e.v, b).s;
        Object.assign(a, d.Ba, b, d.Ja);
        b = c.m;
        for (var g in b) if ((e = b[g]) || 0 === e) a[g] = e;
        g = Af;
        b = Object.getOwnPropertyNames(a);
        for (e = 0; e < b.length; e++) d = b[e], a[d] = rf(g, a[d], a);
        c.u = a
    }

    n.styleDocument = function (a) {
        this.styleSubtree(this.c, a)
    };
    n.styleSubtree = function (a, b) {
        var c = He(a), d = c.shadowRoot;
        (d || a === this.c) && this.styleElement(a, b);
        if (a = d && (d.children || d.childNodes)) for (c = 0; c < a.length; c++) this.styleSubtree(a[c]); else if (c = c.children || c.childNodes) for (a = 0; a < c.length; a++) this.styleSubtree(c[a])
    };
    n.ka = function (a) {
        var b = this, c = Je(a);
        c !== this.f.cssBuild && (this.f.cssBuild = c);
        if (!Ke(c)) {
            var d = we(a);
            ve(d, function (a) {
                if (Q) hf(a); else {
                    var d = U;
                    a.selector = a.parsedSelector;
                    hf(a);
                    a.selector = a.i = Te(d, a, d.c, void 0, void 0)
                }
                R && "" === c && (Vf(b), b.a && b.a.transformRule(a))
            });
            R ? a.textContent = ue(d) : this.f.v.rules.push(d)
        }
    };
    n.getComputedStyleValue = function (a, b) {
        var c;
        R || (c = (W(a) || W($f(this, a))).u[b]);
        return (c = c || window.getComputedStyle(a).getPropertyValue(b)) ? c.trim() : ""
    };
    n.Ma = function (a, b) {
        var c = He(a).getRootNode();
        b = b ? b.split(/\s/) : [];
        c = c.host && c.host.localName;
        if (!c) {
            var d = a.getAttribute("class");
            if (d) {
                d = d.split(/\s/);
                for (var e = 0; e < d.length; e++) if (d[e] === U.a) {
                    c = d[e + 1];
                    break
                }
            }
        }
        c && b.push(U.a, c);
        R || (c = W(a)) && c.o && b.push(Af.a, c.o);
        Ge(a, b.join(" "))
    };
    n.ua = function (a) {
        return W(a)
    };
    n.La = function (a, b) {
        V(a, b)
    };
    n.Oa = function (a, b) {
        V(a, b, !0)
    };
    n.Ka = function (a) {
        return If(a)
    };
    n.xa = function (a) {
        return Hf(a)
    };
    X.prototype.flush = X.prototype.flush;
    X.prototype.prepareTemplate = X.prototype.prepareTemplate;
    X.prototype.styleElement = X.prototype.styleElement;
    X.prototype.styleDocument = X.prototype.styleDocument;
    X.prototype.styleSubtree = X.prototype.styleSubtree;
    X.prototype.getComputedStyleValue = X.prototype.getComputedStyleValue;
    X.prototype.setElementClass = X.prototype.Ma;
    X.prototype._styleInfoForNode = X.prototype.ua;
    X.prototype.transformCustomStyleForDocument = X.prototype.ka;
    X.prototype.getStyleAst = X.prototype.za;
    X.prototype.styleAstToString = X.prototype.Na;
    X.prototype.flushCustomStyles = X.prototype.flushCustomStyles;
    X.prototype.scopeNode = X.prototype.La;
    X.prototype.unscopeNode = X.prototype.Oa;
    X.prototype.scopeForNode = X.prototype.Ka;
    X.prototype.currentScopeForNode = X.prototype.xa;
    X.prototype.prepareAdoptedCssText = X.prototype.Ia;
    Object.defineProperties(X.prototype, {
        nativeShadow: {
            get: function () {
                return Q
            }
        }, nativeCss: {
            get: function () {
                return R
            }
        }
    });
    var Z = new X, ag, bg;
    window.ShadyCSS && (ag = window.ShadyCSS.ApplyShim, bg = window.ShadyCSS.CustomStyleInterface);
    window.ShadyCSS = {
        ScopingShim: Z, prepareTemplate: function (a, b, c) {
            Z.flushCustomStyles();
            Z.prepareTemplate(a, b, c)
        }, prepareTemplateDom: function (a, b) {
            Z.prepareTemplateDom(a, b)
        }, prepareTemplateStyles: function (a, b, c) {
            Z.flushCustomStyles();
            Z.prepareTemplateStyles(a, b, c)
        }, styleSubtree: function (a, b) {
            Z.flushCustomStyles();
            Z.styleSubtree(a, b)
        }, styleElement: function (a) {
            Z.flushCustomStyles();
            Z.styleElement(a)
        }, styleDocument: function (a) {
            Z.flushCustomStyles();
            Z.styleDocument(a)
        }, flushCustomStyles: function () {
            Z.flushCustomStyles()
        },
        getComputedStyleValue: function (a, b) {
            return Z.getComputedStyleValue(a, b)
        }, nativeCss: R, nativeShadow: Q, cssBuild: me, disableRuntime: le
    };
    ag && (window.ShadyCSS.ApplyShim = ag);
    bg && (window.ShadyCSS.CustomStyleInterface = bg);/*

 Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
 This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 Code distributed by Google as part of the polymer project is also
 subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
    var cg = window.customElements, dg = window.HTMLImports, eg = window.HTMLTemplateElement;
    window.WebComponents = window.WebComponents || {};
    if (cg && cg.polyfillWrapFlushCallback) {
        var fg, gg = function () {
            if (fg) {
                eg.va && eg.va(window.document);
                var a = fg;
                fg = null;
                a();
                return !0
            }
        }, hg = dg.whenReady;
        cg.polyfillWrapFlushCallback(function (a) {
            fg = a;
            hg(gg)
        });
        dg.whenReady = function (a) {
            hg(function () {
                gg() ? dg.whenReady(a) : a()
            })
        }
    }
    dg.whenReady(function () {
        requestAnimationFrame(function () {
            window.WebComponents.ready = !0;
            document.dispatchEvent(new CustomEvent("WebComponentsReady", {bubbles: !0}))
        })
    });
    var ig = document.createElement("style");
    ig.textContent = "body {transition: opacity ease-in 0.2s; } \nbody[unresolved] {opacity: 0; display: block; overflow: hidden; position: relative; } \n";
    var jg = document.querySelector("head");
    jg.insertBefore(ig, jg.firstChild);
}).call(this);

//# sourceMappingURL=webcomponents-hi-sd-ce.js.map
