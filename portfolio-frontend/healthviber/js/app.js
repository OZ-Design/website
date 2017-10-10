var card = function(e) {
    var t = {};
    function i(n) {
        if (t[n]) return t[n].exports;
        var r = t[n] = {
            exports: {},
            id: n,
            loaded: false
        };
        e[n].call(r.exports, r, r.exports, i);
        r.loaded = true;
        return r.exports;
    }
    i.m = e;
    i.c = t;
    i.p = "";
    return i(0);
}([ function(e, t, i) {
    var n, r, s = [].slice;
    r = i(1);
    n = i(11);
    n.card = {};
    n.card.fn = {};
    n.fn.card = function(e) {
        return n.card.fn.construct.apply(this, e);
    };
    n.fn.extend({
        card: function() {
            var e, t;
            t = arguments[0], e = 2 <= arguments.length ? s.call(arguments, 1) : [];
            return this.each(function() {
                var i, s;
                i = n(this);
                s = i.data("card");
                if (!s) {
                    n.each(t, function(e) {
                        return function(e, i) {
                            if (i instanceof jQuery) {
                                return t[e] = i[0];
                            }
                        };
                    }(this));
                    t["form"] = this;
                    i.data("card", s = new r(t));
                }
                if (typeof t === "string") {
                    return s[t].apply(s, e);
                }
            });
        }
    });
}, function(e, t, i) {
    (function(t) {
        var n, r, s, o;
        i(2);
        r = i(6);
        o = i(7);
        s = i(8);
        n = function() {
            var e;
            t.prototype.initializedDataAttr = "data-jp-card-initialized";
            t.prototype.cardTemplate = "" + '<div class="jp-card-container">' + '<div class="jp-card">' + '<div class="jp-card-front">' + '<div class="jp-card-logo jp-card-elo">' + '<div class="e">e</div>' + '<div class="l">l</div>' + '<div class="o">o</div>' + "</div>" + '<div class="jp-card-logo jp-card-visa">visa</div>' + '<div class="jp-card-logo jp-card-mastercard">MasterCard</div>' + '<div class="jp-card-logo jp-card-maestro">Maestro</div>' + '<div class="jp-card-logo jp-card-amex"></div>' + '<div class="jp-card-logo jp-card-discover">discover</div>' + '<div class="jp-card-logo jp-card-dankort"><div class="dk"><div class="d"></div><div class="k"></div></div></div>' + '<div class="jp-card-lower">' + '<div class="jp-card-shiny"></div>' + '<div class="jp-card-cvc jp-card-display">{{cvc}}</div>' + '<div class="jp-card-number jp-card-display">{{number}}</div>' + '<div class="jp-card-name jp-card-display">{{name}}</div>' + '<div class="jp-card-expiry jp-card-display" data-before="{{monthYear}}" data-after="{{validDate}}">{{expiry}}</div>' + "</div>" + "</div>" + '<div class="jp-card-back">' + '<div class="jp-card-bar"></div>' + '<div class="jp-card-cvc jp-card-display">{{cvc}}</div>' + '<div class="jp-card-shiny"></div>' + "</div>" + "</div>" + "</div>";
            t.prototype.template = function(e, t) {
                return e.replace(/\{\{(.*?)\}\}/g, function(e, i, n) {
                    return t[i];
                });
            };
            t.prototype.cardTypes = [ "jp-card-amex", "jp-card-dankort", "jp-card-dinersclub", "jp-card-discover", "jp-card-jcb", "jp-card-laser", "jp-card-maestro", "jp-card-mastercard", "jp-card-unionpay", "jp-card-visa", "jp-card-visaelectron", "jp-card-elo" ];
            t.prototype.defaults = {
                formatting: true,
                formSelectors: {
                    numberInput: 'input[name="number"]',
                    expiryInput: 'input[name="expiry"]',
                    cvcInput: 'input[name="cvc"]',
                    nameInput: 'input[name="name"]'
                },
                cardSelectors: {
                    cardContainer: ".jp-card-container",
                    card: ".jp-card",
                    numberDisplay: ".jp-card-number",
                    expiryDisplay: ".jp-card-expiry",
                    cvcDisplay: ".jp-card-cvc",
                    nameDisplay: ".jp-card-name"
                },
                messages: {
                    validDate: "valid\nthru",
                    monthYear: "month/year"
                },
                placeholders: {
                    number: "&bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull;",
                    cvc: "&bull;&bull;&bull;",
                    expiry: "&bull;&bull;/&bull;&bull;",
                    name: "Full Name"
                },
                classes: {
                    valid: "jp-card-valid",
                    invalid: "jp-card-invalid"
                },
                debug: false
            };
            function t(e) {
                var t;
                this.options = s(true, this.defaults, e);
                if (!this.options.form) {
                    console.log("Please provide a form");
                    return;
                }
                this.$el = r(this.options.form);
                if (!this.options.container) {
                    console.log("Please provide a container");
                    return;
                }
                this.$container = r(this.options.container);
                t = r.isDOMElement(this.$container) ? this.$container : this.$container[0];
                if (t.getAttribute(this.initializedDataAttr)) {
                    return;
                }
                t.setAttribute(this.initializedDataAttr, true);
                this.render();
                this.attachHandlers();
                this.handleInitialPlaceholders();
            }
            t.prototype.render = function() {
                var e, t, i, n, o, a, l, d;
                r.append(this.$container, this.template(this.cardTemplate, s({}, this.options.messages, this.options.placeholders)));
                o = this.options.cardSelectors;
                for (i in o) {
                    l = o[i];
                    this["$" + i] = r.find(this.$container, l);
                }
                a = this.options.formSelectors;
                for (i in a) {
                    l = a[i];
                    l = this.options[i] ? this.options[i] : l;
                    n = r.find(this.$el, l);
                    if (!n.length && this.options.debug) {
                        console.error("Card can't find a " + i + " in your form.");
                    }
                    this["$" + i] = n;
                }
                if (this.options.formatting) {
                    Payment.formatCardNumber(this.$numberInput);
                    Payment.formatCardCVC(this.$cvcInput);
                    Payment.formatCardExpiry(this.$expiryInput);
                }
                if (this.options.width) {
                    e = r(this.options.cardSelectors.cardContainer)[0];
                    t = parseInt(e.clientWidth);
                    e.style.transform = "scale(" + this.options.width / t + ")";
                }
                if (typeof navigator !== "undefined" && navigator !== null ? navigator.userAgent : void 0) {
                    d = navigator.userAgent.toLowerCase();
                    if (d.indexOf("safari") !== -1 && d.indexOf("chrome") === -1) {
                        r.addClass(this.$card, "jp-card-safari");
                    }
                }
                if (/MSIE 10\./i.test(navigator.userAgent)) {
                    r.addClass(this.$card, "jp-card-ie-10");
                }
                if (/rv:11.0/i.test(navigator.userAgent)) {
                    return r.addClass(this.$card, "jp-card-ie-11");
                }
            };
            t.prototype.attachHandlers = function() {
                var t;
                e(this.$numberInput, this.$numberDisplay, {
                    fill: false,
                    filters: this.validToggler("cardNumber")
                });
                r.on(this.$numberInput, "payment.cardType", this.handle("setCardType"));
                t = [ function(e) {
                    return e.replace(/(\s+)/g, "");
                } ];
                t.push(this.validToggler("cardExpiry"));
                e(this.$expiryInput, this.$expiryDisplay, {
                    join: function(e) {
                        if (e[0].length === 2 || e[1]) {
                            return "/";
                        } else {
                            return "";
                        }
                    },
                    filters: t
                });
                e(this.$cvcInput, this.$cvcDisplay, {
                    filters: this.validToggler("cardCVC")
                });
                r.on(this.$cvcInput, "focus", this.handle("flipCard"));
                r.on(this.$cvcInput, "blur", this.handle("unflipCard"));
                return e(this.$nameInput, this.$nameDisplay, {
                    fill: false,
                    filters: this.validToggler("cardHolderName"),
                    join: " "
                });
            };
            t.prototype.handleInitialPlaceholders = function() {
                var e, t, i, n, s;
                i = this.options.formSelectors;
                n = [];
                for (t in i) {
                    s = i[t];
                    e = this["$" + t];
                    if (r.val(e)) {
                        r.trigger(e, "paste");
                        n.push(setTimeout(function() {
                            return r.trigger(e, "keyup");
                        }));
                    } else {
                        n.push(void 0);
                    }
                }
                return n;
            };
            t.prototype.handle = function(e) {
                return function(t) {
                    return function(i) {
                        var n;
                        n = Array.prototype.slice.call(arguments);
                        n.unshift(i.target);
                        return t.handlers[e].apply(t, n);
                    };
                }(this);
            };
            t.prototype.validToggler = function(e) {
                var t;
                if (e === "cardExpiry") {
                    t = function(e) {
                        var t;
                        t = Payment.fns.cardExpiryVal(e);
                        return Payment.fns.validateCardExpiry(t.month, t.year);
                    };
                } else if (e === "cardCVC") {
                    t = function(e) {
                        return function(t) {
                            return Payment.fns.validateCardCVC(t, e.cardType);
                        };
                    }(this);
                } else if (e === "cardNumber") {
                    t = function(e) {
                        return Payment.fns.validateCardNumber(e);
                    };
                } else if (e === "cardHolderName") {
                    t = function(e) {
                        return e !== "";
                    };
                }
                return function(e) {
                    return function(i, n, r) {
                        var s;
                        s = t(i);
                        e.toggleValidClass(n, s);
                        e.toggleValidClass(r, s);
                        return i;
                    };
                }(this);
            };
            t.prototype.toggleValidClass = function(e, t) {
                r.toggleClass(e, this.options.classes.valid, t);
                return r.toggleClass(e, this.options.classes.invalid, !t);
            };
            t.prototype.handlers = {
                setCardType: function(e, t) {
                    var i;
                    i = t.data;
                    if (!r.hasClass(this.$card, i)) {
                        r.removeClass(this.$card, "jp-card-unknown");
                        r.removeClass(this.$card, this.cardTypes.join(" "));
                        r.addClass(this.$card, "jp-card-" + i);
                        r.toggleClass(this.$card, "jp-card-identified", i !== "unknown");
                        return this.cardType = i;
                    }
                },
                flipCard: function() {
                    return r.addClass(this.$card, "jp-card-flipped");
                },
                unflipCard: function() {
                    return r.removeClass(this.$card, "jp-card-flipped");
                }
            };
            e = function(e, t, i) {
                var n, s, o;
                if (i == null) {
                    i = {};
                }
                i.fill = i.fill || false;
                i.filters = i.filters || [];
                if (!(i.filters instanceof Array)) {
                    i.filters = [ i.filters ];
                }
                i.join = i.join || "";
                if (!(typeof i.join === "function")) {
                    n = i.join;
                    i.join = function() {
                        return n;
                    };
                }
                o = function() {
                    var e, i, n;
                    n = [];
                    for (e = 0, i = t.length; e < i; e++) {
                        s = t[e];
                        n.push(s.textContent);
                    }
                    return n;
                }();
                r.on(e, "focus", function() {
                    return r.addClass(t, "jp-card-focused");
                });
                r.on(e, "blur", function() {
                    return r.removeClass(t, "jp-card-focused");
                });
                r.on(e, "keyup change paste", function(n) {
                    var s, a, l, d, c, p, u, h, f, g, m, v, y;
                    y = function() {
                        var t, i, n;
                        n = [];
                        for (t = 0, i = e.length; t < i; t++) {
                            s = e[t];
                            n.push(r.val(s));
                        }
                        return n;
                    }();
                    c = i.join(y);
                    y = y.join(c);
                    if (y === c) {
                        y = "";
                    }
                    m = i.filters;
                    for (d = 0, u = m.length; d < u; d++) {
                        a = m[d];
                        y = a(y, e, t);
                    }
                    v = [];
                    for (l = p = 0, h = t.length; p < h; l = ++p) {
                        f = t[l];
                        if (i.fill) {
                            g = y + o[l].substring(y.length);
                        } else {
                            g = y || o[l];
                        }
                        v.push(f.textContent = g);
                    }
                    return v;
                });
                return e;
            };
            return t;
        }();
        e.exports = n;
        t.Card = n;
    }).call(t, function() {
        return this;
    }());
}, function(e, t, i) {
    var n = i(3);
    if (typeof n === "string") n = [ [ e.id, n, "" ] ];
    var r = i(5)(n, {});
    if (n.locals) e.exports = n.locals;
    if (false) {
        if (!n.locals) {
            e.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/sass-loader/index.js!./card.scss", function() {
                var t = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/sass-loader/index.js!./card.scss");
                if (typeof t === "string") t = [ [ e.id, t, "" ] ];
                r(t);
            });
        }
        e.hot.dispose(function() {
            r();
        });
    }
}, function(e, t, i) {
    t = e.exports = i(4)();
    t.push([ e.id, '.jp-card.jp-card-safari.jp-card-identified .jp-card-front:before, .jp-card.jp-card-safari.jp-card-identified .jp-card-back:before {\n  background-image: repeating-linear-gradient(45deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-linear-gradient(135deg, rgba(255, 255, 255, 0.05) 1px, rgba(255, 255, 255, 0) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.03) 4px), repeating-linear-gradient(90deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-linear-gradient(210deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), -webkit-linear-gradient(-245deg, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.2) 70%, rgba(255, 255, 255, 0) 90%);\n  background-image: repeating-linear-gradient(45deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-linear-gradient(135deg, rgba(255, 255, 255, 0.05) 1px, rgba(255, 255, 255, 0) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.03) 4px), repeating-linear-gradient(90deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-linear-gradient(210deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), linear-gradient(-25deg, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.2) 70%, rgba(255, 255, 255, 0) 90%); }\n\n.jp-card.jp-card-ie-10.jp-card-flipped, .jp-card.jp-card-ie-11.jp-card-flipped {\n  -webkit-transform: 0deg;\n  -moz-transform: 0deg;\n  -ms-transform: 0deg;\n  -o-transform: 0deg;\n  transform: 0deg; }\n  .jp-card.jp-card-ie-10.jp-card-flipped .jp-card-front, .jp-card.jp-card-ie-11.jp-card-flipped .jp-card-front {\n    -webkit-transform: rotateY(0deg);\n    -moz-transform: rotateY(0deg);\n    -ms-transform: rotateY(0deg);\n    -o-transform: rotateY(0deg);\n    transform: rotateY(0deg); }\n  .jp-card.jp-card-ie-10.jp-card-flipped .jp-card-back, .jp-card.jp-card-ie-11.jp-card-flipped .jp-card-back {\n    -webkit-transform: rotateY(0deg);\n    -moz-transform: rotateY(0deg);\n    -ms-transform: rotateY(0deg);\n    -o-transform: rotateY(0deg);\n    transform: rotateY(0deg); }\n    .jp-card.jp-card-ie-10.jp-card-flipped .jp-card-back:after, .jp-card.jp-card-ie-11.jp-card-flipped .jp-card-back:after {\n      left: 18%; }\n    .jp-card.jp-card-ie-10.jp-card-flipped .jp-card-back .jp-card-cvc, .jp-card.jp-card-ie-11.jp-card-flipped .jp-card-back .jp-card-cvc {\n      -webkit-transform: rotateY(180deg);\n      -moz-transform: rotateY(180deg);\n      -ms-transform: rotateY(180deg);\n      -o-transform: rotateY(180deg);\n      transform: rotateY(180deg);\n      left: 5%; }\n    .jp-card.jp-card-ie-10.jp-card-flipped .jp-card-back .jp-card-shiny, .jp-card.jp-card-ie-11.jp-card-flipped .jp-card-back .jp-card-shiny {\n      left: 84%; }\n      .jp-card.jp-card-ie-10.jp-card-flipped .jp-card-back .jp-card-shiny:after, .jp-card.jp-card-ie-11.jp-card-flipped .jp-card-back .jp-card-shiny:after {\n        left: -480%;\n        -webkit-transform: rotateY(180deg);\n        -moz-transform: rotateY(180deg);\n        -ms-transform: rotateY(180deg);\n        -o-transform: rotateY(180deg);\n        transform: rotateY(180deg); }\n\n.jp-card.jp-card-ie-10.jp-card-amex .jp-card-back, .jp-card.jp-card-ie-11.jp-card-amex .jp-card-back {\n  display: none; }\n\n.jp-card-logo {\n  height: 36px;\n  width: 60px;\n  font-style: italic; }\n  .jp-card-logo, .jp-card-logo:before, .jp-card-logo:after {\n    box-sizing: border-box; }\n\n.jp-card-logo.jp-card-amex {\n  text-transform: uppercase;\n  font-size: 4px;\n  font-weight: bold;\n  color: white;\n  background-image: repeating-radial-gradient(circle at center, #FFF 1px, #999 2px);\n  background-image: repeating-radial-gradient(circle at center, #FFF 1px, #999 2px);\n  border: 1px solid #EEE; }\n  .jp-card-logo.jp-card-amex:before, .jp-card-logo.jp-card-amex:after {\n    width: 28px;\n    display: block;\n    position: absolute;\n    left: 16px; }\n  .jp-card-logo.jp-card-amex:before {\n    height: 28px;\n    content: "american";\n    top: 3px;\n    text-align: left;\n    padding-left: 2px;\n    padding-top: 11px;\n    background: #267AC3; }\n  .jp-card-logo.jp-card-amex:after {\n    content: "express";\n    bottom: 11px;\n    text-align: right;\n    padding-right: 2px; }\n\n.jp-card.jp-card-amex.jp-card-flipped {\n  -webkit-transform: none;\n  -moz-transform: none;\n  -ms-transform: none;\n  -o-transform: none;\n  transform: none; }\n\n.jp-card.jp-card-amex.jp-card-identified .jp-card-front:before, .jp-card.jp-card-amex.jp-card-identified .jp-card-back:before {\n  background-color: #108168; }\n\n.jp-card.jp-card-amex.jp-card-identified .jp-card-front .jp-card-logo.jp-card-amex {\n  opacity: 1; }\n\n.jp-card.jp-card-amex.jp-card-identified .jp-card-front .jp-card-cvc {\n  visibility: visible; }\n\n.jp-card.jp-card-amex.jp-card-identified .jp-card-front:after {\n  opacity: 1; }\n\n.jp-card-logo.jp-card-discover {\n  background: #FF6600;\n  color: #111;\n  text-transform: uppercase;\n  font-style: normal;\n  font-weight: bold;\n  font-size: 10px;\n  text-align: center;\n  overflow: hidden;\n  z-index: 1;\n  padding-top: 9px;\n  letter-spacing: .03em;\n  border: 1px solid #EEE; }\n  .jp-card-logo.jp-card-discover:before, .jp-card-logo.jp-card-discover:after {\n    content: " ";\n    display: block;\n    position: absolute; }\n  .jp-card-logo.jp-card-discover:before {\n    background: white;\n    width: 200px;\n    height: 200px;\n    border-radius: 200px;\n    bottom: -5%;\n    right: -80%;\n    z-index: -1; }\n  .jp-card-logo.jp-card-discover:after {\n    width: 8px;\n    height: 8px;\n    border-radius: 4px;\n    top: 10px;\n    left: 27px;\n    background-color: #FF6600;\n    background-image: -webkit-radial-gradient(#FF6600, #fff);\n    background-image: radial-gradient(  #FF6600, #fff);\n    content: "network";\n    font-size: 4px;\n    line-height: 24px;\n    text-indent: -7px; }\n\n.jp-card .jp-card-front .jp-card-logo.jp-card-discover {\n  right: 12%;\n  top: 18%; }\n\n.jp-card.jp-card-discover.jp-card-identified .jp-card-front:before, .jp-card.jp-card-discover.jp-card-identified .jp-card-back:before {\n  background-color: #86B8CF; }\n\n.jp-card.jp-card-discover.jp-card-identified .jp-card-logo.jp-card-discover {\n  opacity: 1; }\n\n.jp-card.jp-card-discover.jp-card-identified .jp-card-front:after {\n  -webkit-transition: 400ms;\n  -moz-transition: 400ms;\n  transition: 400ms;\n  content: " ";\n  display: block;\n  background-color: #FF6600;\n  background-image: -webkit-linear-gradient(#FF6600, #ffa366, #FF6600);\n  background-image: linear-gradient(#FF6600, #ffa366, #FF6600);\n  height: 50px;\n  width: 50px;\n  border-radius: 25px;\n  position: absolute;\n  left: 100%;\n  top: 15%;\n  margin-left: -25px;\n  box-shadow: inset 1px 1px 3px 1px rgba(0, 0, 0, 0.5); }\n\n.jp-card-logo.jp-card-visa {\n  background: white;\n  text-transform: uppercase;\n  color: #1A1876;\n  text-align: center;\n  font-weight: bold;\n  font-size: 15px;\n  line-height: 18px; }\n  .jp-card-logo.jp-card-visa:before, .jp-card-logo.jp-card-visa:after {\n    content: " ";\n    display: block;\n    width: 100%;\n    height: 25%; }\n  .jp-card-logo.jp-card-visa:before {\n    background: #1A1876; }\n  .jp-card-logo.jp-card-visa:after {\n    background: #E79800; }\n\n.jp-card.jp-card-visa.jp-card-identified .jp-card-front:before, .jp-card.jp-card-visa.jp-card-identified .jp-card-back:before {\n  background-color: #191278; }\n\n.jp-card.jp-card-visa.jp-card-identified .jp-card-logo.jp-card-visa {\n  opacity: 1; }\n\n.jp-card-logo.jp-card-mastercard {\n  color: white;\n  font-weight: bold;\n  text-align: center;\n  font-size: 9px;\n  line-height: 36px;\n  z-index: 1;\n  text-shadow: 1px 1px rgba(0, 0, 0, 0.6); }\n  .jp-card-logo.jp-card-mastercard:before, .jp-card-logo.jp-card-mastercard:after {\n    content: " ";\n    display: block;\n    width: 36px;\n    top: 0;\n    position: absolute;\n    height: 36px;\n    border-radius: 18px; }\n  .jp-card-logo.jp-card-mastercard:before {\n    left: 0;\n    background: #FF0000;\n    z-index: -1; }\n  .jp-card-logo.jp-card-mastercard:after {\n    right: 0;\n    background: #FFAB00;\n    z-index: -2; }\n\n.jp-card.jp-card-mastercard.jp-card-identified .jp-card-front .jp-card-logo.jp-card-mastercard, .jp-card.jp-card-mastercard.jp-card-identified .jp-card-back .jp-card-logo.jp-card-mastercard {\n  box-shadow: none; }\n\n.jp-card.jp-card-mastercard.jp-card-identified .jp-card-front:before, .jp-card.jp-card-mastercard.jp-card-identified .jp-card-back:before {\n  background-color: #0061A8; }\n\n.jp-card.jp-card-mastercard.jp-card-identified .jp-card-logo.jp-card-mastercard {\n  opacity: 1; }\n\n.jp-card-logo.jp-card-maestro {\n  color: white;\n  font-weight: bold;\n  text-align: center;\n  font-size: 14px;\n  line-height: 36px;\n  z-index: 1;\n  text-shadow: 1px 1px rgba(0, 0, 0, 0.6); }\n  .jp-card-logo.jp-card-maestro:before, .jp-card-logo.jp-card-maestro:after {\n    content: " ";\n    display: block;\n    width: 36px;\n    top: 0;\n    position: absolute;\n    height: 36px;\n    border-radius: 18px; }\n  .jp-card-logo.jp-card-maestro:before {\n    left: 0;\n    background: #0064CB;\n    z-index: -1; }\n  .jp-card-logo.jp-card-maestro:after {\n    right: 0;\n    background: #CC0000;\n    z-index: -2; }\n\n.jp-card.jp-card-maestro.jp-card-identified .jp-card-front .jp-card-logo.jp-card-maestro, .jp-card.jp-card-maestro.jp-card-identified .jp-card-back .jp-card-logo.jp-card-maestro {\n  box-shadow: none; }\n\n.jp-card.jp-card-maestro.jp-card-identified .jp-card-front:before, .jp-card.jp-card-maestro.jp-card-identified .jp-card-back:before {\n  background-color: #0B2C5F; }\n\n.jp-card.jp-card-maestro.jp-card-identified .jp-card-logo.jp-card-maestro {\n  opacity: 1; }\n\n.jp-card-logo.jp-card-dankort {\n  width: 60px;\n  height: 36px;\n  padding: 3px;\n  border-radius: 8px;\n  border: #000000 1px solid;\n  background-color: #FFFFFF; }\n  .jp-card-logo.jp-card-dankort .dk {\n    position: relative;\n    width: 100%;\n    height: 100%;\n    overflow: hidden; }\n    .jp-card-logo.jp-card-dankort .dk:before {\n      background-color: #ED1C24;\n      content: \'\';\n      position: absolute;\n      width: 100%;\n      height: 100%;\n      display: block;\n      border-radius: 6px; }\n    .jp-card-logo.jp-card-dankort .dk:after {\n      content: \'\';\n      position: absolute;\n      top: 50%;\n      margin-top: -7.7px;\n      right: 0;\n      width: 0;\n      height: 0;\n      border-style: solid;\n      border-width: 7px 7px 10px 0;\n      border-color: transparent #ED1C24 transparent transparent;\n      z-index: 1; }\n  .jp-card-logo.jp-card-dankort .d, .jp-card-logo.jp-card-dankort .k {\n    position: absolute;\n    top: 50%;\n    width: 50%;\n    display: block;\n    height: 15.4px;\n    margin-top: -7.7px;\n    background: white; }\n  .jp-card-logo.jp-card-dankort .d {\n    left: 0;\n    border-radius: 0 8px 10px 0; }\n    .jp-card-logo.jp-card-dankort .d:before {\n      content: \'\';\n      position: absolute;\n      top: 50%;\n      left: 50%;\n      display: block;\n      background: #ED1C24;\n      border-radius: 2px 4px 6px 0px;\n      height: 5px;\n      width: 7px;\n      margin: -3px 0 0 -4px; }\n  .jp-card-logo.jp-card-dankort .k {\n    right: 0; }\n    .jp-card-logo.jp-card-dankort .k:before, .jp-card-logo.jp-card-dankort .k:after {\n      content: \'\';\n      position: absolute;\n      right: 50%;\n      width: 0;\n      height: 0;\n      border-style: solid;\n      margin-right: -1px; }\n    .jp-card-logo.jp-card-dankort .k:before {\n      top: 0;\n      border-width: 8px 5px 0 0;\n      border-color: #ED1C24 transparent transparent transparent; }\n    .jp-card-logo.jp-card-dankort .k:after {\n      bottom: 0;\n      border-width: 0 5px 8px 0;\n      border-color: transparent transparent #ED1C24 transparent; }\n\n.jp-card.jp-card-dankort.jp-card-identified .jp-card-front:before, .jp-card.jp-card-dankort.jp-card-identified .jp-card-back:before {\n  background-color: #0055C7; }\n\n.jp-card.jp-card-dankort.jp-card-identified .jp-card-logo.jp-card-dankort {\n  opacity: 1; }\n\n.jp-card-logo.jp-card-elo {\n  height: 50px;\n  width: 50px;\n  border-radius: 100%;\n  background: black;\n  color: white;\n  text-align: center;\n  text-transform: lowercase;\n  font-size: 21px;\n  font-style: normal;\n  letter-spacing: 1px;\n  font-weight: bold;\n  padding-top: 13px; }\n  .jp-card-logo.jp-card-elo .e, .jp-card-logo.jp-card-elo .l, .jp-card-logo.jp-card-elo .o {\n    display: inline-block;\n    position: relative; }\n  .jp-card-logo.jp-card-elo .e {\n    -webkit-transform: rotate(-15deg);\n    -moz-transform: rotate(-15deg);\n    -ms-transform: rotate(-15deg);\n    -o-transform: rotate(-15deg);\n    transform: rotate(-15deg); }\n  .jp-card-logo.jp-card-elo .o {\n    position: relative;\n    display: inline-block;\n    width: 12px;\n    height: 12px;\n    right: 0;\n    top: 7px;\n    border-radius: 100%;\n    background-image: -webkit-linear-gradient( yellow 50%, red 50%);\n    background-image: linear-gradient( yellow 50%, red 50%);\n    -webkit-transform: rotate(40deg);\n    -moz-transform: rotate(40deg);\n    -ms-transform: rotate(40deg);\n    -o-transform: rotate(40deg);\n    transform: rotate(40deg);\n    text-indent: -9999px; }\n    .jp-card-logo.jp-card-elo .o:before {\n      content: "";\n      position: absolute;\n      width: 49%;\n      height: 49%;\n      background: black;\n      border-radius: 100%;\n      text-indent: -99999px;\n      top: 25%;\n      left: 25%; }\n\n.jp-card.jp-card-elo.jp-card-identified .jp-card-front:before, .jp-card.jp-card-elo.jp-card-identified .jp-card-back:before {\n  background-color: #6F6969; }\n\n.jp-card.jp-card-elo.jp-card-identified .jp-card-logo.jp-card-elo {\n  opacity: 1; }\n\n.jp-card-container {\n  -webkit-perspective: 1000px;\n  -moz-perspective: 1000px;\n  perspective: 1000px;\n  width: 350px;\n  max-width: 100%;\n  height: 200px;\n  margin: auto;\n  z-index: 1;\n  position: relative; }\n\n.jp-card {\n  font-family: "Helvetica Neue";\n  line-height: 1;\n  position: relative;\n  width: 100%;\n  height: 100%;\n  min-width: 315px;\n  border-radius: 10px;\n  -webkit-transform-style: preserve-3d;\n  -moz-transform-style: preserve-3d;\n  -ms-transform-style: preserve-3d;\n  -o-transform-style: preserve-3d;\n  transform-style: preserve-3d;\n  -webkit-transition: all 400ms linear;\n  -moz-transition: all 400ms linear;\n  transition: all 400ms linear; }\n  .jp-card > *, .jp-card > *:before, .jp-card > *:after {\n    -moz-box-sizing: border-box;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    font-family: inherit; }\n  .jp-card.jp-card-flipped {\n    -webkit-transform: rotateY(180deg);\n    -moz-transform: rotateY(180deg);\n    -ms-transform: rotateY(180deg);\n    -o-transform: rotateY(180deg);\n    transform: rotateY(180deg); }\n  .jp-card .jp-card-front, .jp-card .jp-card-back {\n    -webkit-backface-visibility: hidden;\n    backface-visibility: hidden;\n    -webkit-transform-style: preserve-3d;\n    -moz-transform-style: preserve-3d;\n    -ms-transform-style: preserve-3d;\n    -o-transform-style: preserve-3d;\n    transform-style: preserve-3d;\n    -webkit-transition: all 400ms linear;\n    -moz-transition: all 400ms linear;\n    transition: all 400ms linear;\n    width: 100%;\n    height: 100%;\n    position: absolute;\n    top: 0;\n    left: 0;\n    overflow: hidden;\n    border-radius: 10px;\n    background: #DDD; }\n    .jp-card .jp-card-front:before, .jp-card .jp-card-back:before {\n      content: " ";\n      display: block;\n      position: absolute;\n      width: 100%;\n      height: 100%;\n      top: 0;\n      left: 0;\n      opacity: 0;\n      border-radius: 10px;\n      -webkit-transition: all 400ms ease;\n      -moz-transition: all 400ms ease;\n      transition: all 400ms ease; }\n    .jp-card .jp-card-front:after, .jp-card .jp-card-back:after {\n      content: " ";\n      display: block; }\n    .jp-card .jp-card-front .jp-card-display, .jp-card .jp-card-back .jp-card-display {\n      color: white;\n      font-weight: normal;\n      opacity: 0.5;\n      -webkit-transition: opacity 400ms linear;\n      -moz-transition: opacity 400ms linear;\n      transition: opacity 400ms linear; }\n      .jp-card .jp-card-front .jp-card-display.jp-card-focused, .jp-card .jp-card-back .jp-card-display.jp-card-focused {\n        opacity: 1;\n        font-weight: 700; }\n    .jp-card .jp-card-front .jp-card-cvc, .jp-card .jp-card-back .jp-card-cvc {\n      font-family: "Bitstream Vera Sans Mono", Consolas, Courier, monospace;\n      font-size: 14px; }\n    .jp-card .jp-card-front .jp-card-shiny, .jp-card .jp-card-back .jp-card-shiny {\n      width: 50px;\n      height: 35px;\n      border-radius: 5px;\n      background: #CCC;\n      position: relative; }\n      .jp-card .jp-card-front .jp-card-shiny:before, .jp-card .jp-card-back .jp-card-shiny:before {\n        content: " ";\n        display: block;\n        width: 70%;\n        height: 60%;\n        border-top-right-radius: 5px;\n        border-bottom-right-radius: 5px;\n        background: #d9d9d9;\n        position: absolute;\n        top: 20%; }\n  .jp-card .jp-card-front .jp-card-logo {\n    position: absolute;\n    opacity: 0;\n    right: 5%;\n    top: 8%;\n    -webkit-transition: 400ms;\n    -moz-transition: 400ms;\n    transition: 400ms; }\n  .jp-card .jp-card-front .jp-card-lower {\n    width: 80%;\n    position: absolute;\n    left: 10%;\n    bottom: 30px; }\n    @media only screen and (max-width: 480px) {\n      .jp-card .jp-card-front .jp-card-lower {\n        width: 90%;\n        left: 5%; } }\n    .jp-card .jp-card-front .jp-card-lower .jp-card-cvc {\n      visibility: hidden;\n      float: right;\n      position: relative;\n      bottom: 5px; }\n    .jp-card .jp-card-front .jp-card-lower .jp-card-number {\n      font-family: "Bitstream Vera Sans Mono", Consolas, Courier, monospace;\n      font-size: 24px;\n      clear: both;\n      margin-bottom: 30px; }\n    .jp-card .jp-card-front .jp-card-lower .jp-card-expiry {\n      font-family: "Bitstream Vera Sans Mono", Consolas, Courier, monospace;\n      letter-spacing: 0em;\n      position: relative;\n      float: right;\n      width: 25%; }\n      .jp-card .jp-card-front .jp-card-lower .jp-card-expiry:before, .jp-card .jp-card-front .jp-card-lower .jp-card-expiry:after {\n        font-family: "Helvetica Neue";\n        font-weight: bold;\n        font-size: 7px;\n        white-space: pre;\n        display: block;\n        opacity: .5; }\n      .jp-card .jp-card-front .jp-card-lower .jp-card-expiry:before {\n        content: attr(data-before);\n        margin-bottom: 2px;\n        font-size: 7px;\n        text-transform: uppercase; }\n      .jp-card .jp-card-front .jp-card-lower .jp-card-expiry:after {\n        position: absolute;\n        content: attr(data-after);\n        text-align: right;\n        right: 100%;\n        margin-right: 5px;\n        margin-top: 2px;\n        bottom: 0; }\n    .jp-card .jp-card-front .jp-card-lower .jp-card-name {\n      text-transform: uppercase;\n      font-family: "Bitstream Vera Sans Mono", Consolas, Courier, monospace;\n      font-size: 20px;\n      max-height: 45px;\n      position: absolute;\n      bottom: 0;\n      width: 190px;\n      display: -webkit-box;\n      -webkit-line-clamp: 2;\n      -webkit-box-orient: horizontal;\n      overflow: hidden;\n      text-overflow: ellipsis; }\n  .jp-card .jp-card-back {\n    -webkit-transform: rotateY(180deg);\n    -moz-transform: rotateY(180deg);\n    -ms-transform: rotateY(180deg);\n    -o-transform: rotateY(180deg);\n    transform: rotateY(180deg); }\n    .jp-card .jp-card-back .jp-card-bar {\n      background-color: #444;\n      background-image: -webkit-linear-gradient(#444, #333);\n      background-image: linear-gradient(#444, #333);\n      width: 100%;\n      height: 20%;\n      position: absolute;\n      top: 10%; }\n    .jp-card .jp-card-back:after {\n      content: " ";\n      display: block;\n      background-color: #FFF;\n      background-image: -webkit-linear-gradient(#FFF, #FFF);\n      background-image: linear-gradient(#FFF, #FFF);\n      width: 80%;\n      height: 16%;\n      position: absolute;\n      top: 40%;\n      left: 2%; }\n    .jp-card .jp-card-back .jp-card-cvc {\n      position: absolute;\n      top: 40%;\n      left: 85%;\n      -webkit-transition-delay: 600ms;\n      -moz-transition-delay: 600ms;\n      transition-delay: 600ms; }\n    .jp-card .jp-card-back .jp-card-shiny {\n      position: absolute;\n      top: 66%;\n      left: 2%; }\n      .jp-card .jp-card-back .jp-card-shiny:after {\n        content: "This card has been issued by Jesse Pollak and is licensed for anyone to use anywhere for free.AIt comes with no warranty.A For support issues, please visit: github.com/jessepollak/card.";\n        position: absolute;\n        left: 120%;\n        top: 5%;\n        color: white;\n        font-size: 7px;\n        width: 230px;\n        opacity: .5; }\n  .jp-card.jp-card-identified {\n    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3); }\n    .jp-card.jp-card-identified .jp-card-front, .jp-card.jp-card-identified .jp-card-back {\n      background-color: #000;\n      background-color: rgba(0, 0, 0, 0.5); }\n      .jp-card.jp-card-identified .jp-card-front:before, .jp-card.jp-card-identified .jp-card-back:before {\n        -webkit-transition: all 400ms ease;\n        -moz-transition: all 400ms ease;\n        transition: all 400ms ease;\n        background-image: repeating-linear-gradient(45deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-linear-gradient(135deg, rgba(255, 255, 255, 0.05) 1px, rgba(255, 255, 255, 0) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.03) 4px), repeating-linear-gradient(90deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-linear-gradient(210deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-radial-gradient(circle at 70% 70%, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-radial-gradient(circle at 90% 20%, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-radial-gradient(circle at 15% 80%, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), -webkit-linear-gradient(-245deg, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.2) 70%, rgba(255, 255, 255, 0) 90%);\n        background-image: repeating-linear-gradient(45deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-linear-gradient(135deg, rgba(255, 255, 255, 0.05) 1px, rgba(255, 255, 255, 0) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.03) 4px), repeating-linear-gradient(90deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-linear-gradient(210deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-radial-gradient(circle at 70% 70%, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-radial-gradient(circle at 90% 20%, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-radial-gradient(circle at 15% 80%, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), linear-gradient(-25deg, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.2) 70%, rgba(255, 255, 255, 0) 90%);\n        opacity: 1; }\n      .jp-card.jp-card-identified .jp-card-front .jp-card-logo, .jp-card.jp-card-identified .jp-card-back .jp-card-logo {\n        box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.3); }\n    .jp-card.jp-card-identified.no-radial-gradient .jp-card-front:before, .jp-card.jp-card-identified.no-radial-gradient .jp-card-back:before {\n      background-image: repeating-linear-gradient(45deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-linear-gradient(135deg, rgba(255, 255, 255, 0.05) 1px, rgba(255, 255, 255, 0) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.03) 4px), repeating-linear-gradient(90deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-linear-gradient(210deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), -webkit-linear-gradient(-245deg, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.2) 70%, rgba(255, 255, 255, 0) 90%);\n      background-image: repeating-linear-gradient(45deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-linear-gradient(135deg, rgba(255, 255, 255, 0.05) 1px, rgba(255, 255, 255, 0) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.03) 4px), repeating-linear-gradient(90deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-linear-gradient(210deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), linear-gradient(-25deg, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.2) 70%, rgba(255, 255, 255, 0) 90%); }\n', "" ]);
}, function(e, t) {
    e.exports = function() {
        var e = [];
        e.toString = function e() {
            var t = [];
            for (var i = 0; i < this.length; i++) {
                var n = this[i];
                if (n[2]) {
                    t.push("@media " + n[2] + "{" + n[1] + "}");
                } else {
                    t.push(n[1]);
                }
            }
            return t.join("");
        };
        e.i = function(t, i) {
            if (typeof t === "string") t = [ [ null, t, "" ] ];
            var n = {};
            for (var r = 0; r < this.length; r++) {
                var s = this[r][0];
                if (typeof s === "number") n[s] = true;
            }
            for (r = 0; r < t.length; r++) {
                var o = t[r];
                if (typeof o[0] !== "number" || !n[o[0]]) {
                    if (i && !o[2]) {
                        o[2] = i;
                    } else if (i) {
                        o[2] = "(" + o[2] + ") and (" + i + ")";
                    }
                    e.push(o);
                }
            }
        };
        return e;
    };
}, function(e, t, i) {
    var n = {}, r = function(e) {
        var t;
        return function() {
            if (typeof t === "undefined") t = e.apply(this, arguments);
            return t;
        };
    }, s = r(function() {
        return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
    }), o = r(function() {
        return document.head || document.getElementsByTagName("head")[0];
    }), a = null, l = 0, d = [];
    e.exports = function(e, t) {
        if (false) {
            if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
        }
        t = t || {};
        if (typeof t.singleton === "undefined") t.singleton = s();
        if (typeof t.insertAt === "undefined") t.insertAt = "bottom";
        var i = p(e);
        c(i, t);
        return function e(r) {
            var s = [];
            for (var o = 0; o < i.length; o++) {
                var a = i[o];
                var l = n[a.id];
                l.refs--;
                s.push(l);
            }
            if (r) {
                var d = p(r);
                c(d, t);
            }
            for (var o = 0; o < s.length; o++) {
                var l = s[o];
                if (l.refs === 0) {
                    for (var u = 0; u < l.parts.length; u++) l.parts[u]();
                    delete n[l.id];
                }
            }
        };
    };
    function c(e, t) {
        for (var i = 0; i < e.length; i++) {
            var r = e[i];
            var s = n[r.id];
            if (s) {
                s.refs++;
                for (var o = 0; o < s.parts.length; o++) {
                    s.parts[o](r.parts[o]);
                }
                for (;o < r.parts.length; o++) {
                    s.parts.push(m(r.parts[o], t));
                }
            } else {
                var a = [];
                for (var o = 0; o < r.parts.length; o++) {
                    a.push(m(r.parts[o], t));
                }
                n[r.id] = {
                    id: r.id,
                    refs: 1,
                    parts: a
                };
            }
        }
    }
    function p(e) {
        var t = [];
        var i = {};
        for (var n = 0; n < e.length; n++) {
            var r = e[n];
            var s = r[0];
            var o = r[1];
            var a = r[2];
            var l = r[3];
            var d = {
                css: o,
                media: a,
                sourceMap: l
            };
            if (!i[s]) t.push(i[s] = {
                id: s,
                parts: [ d ]
            }); else i[s].parts.push(d);
        }
        return t;
    }
    function u(e, t) {
        var i = o();
        var n = d[d.length - 1];
        if (e.insertAt === "top") {
            if (!n) {
                i.insertBefore(t, i.firstChild);
            } else if (n.nextSibling) {
                i.insertBefore(t, n.nextSibling);
            } else {
                i.appendChild(t);
            }
            d.push(t);
        } else if (e.insertAt === "bottom") {
            i.appendChild(t);
        } else {
            throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
        }
    }
    function h(e) {
        e.parentNode.removeChild(e);
        var t = d.indexOf(e);
        if (t >= 0) {
            d.splice(t, 1);
        }
    }
    function f(e) {
        var t = document.createElement("style");
        t.type = "text/css";
        u(e, t);
        return t;
    }
    function g(e) {
        var t = document.createElement("link");
        t.rel = "stylesheet";
        u(e, t);
        return t;
    }
    function m(e, t) {
        var i, n, r;
        if (t.singleton) {
            var s = l++;
            i = a || (a = f(t));
            n = y.bind(null, i, s, false);
            r = y.bind(null, i, s, true);
        } else if (e.sourceMap && typeof URL === "function" && typeof URL.createObjectURL === "function" && typeof URL.revokeObjectURL === "function" && typeof Blob === "function" && typeof btoa === "function") {
            i = g(t);
            n = w.bind(null, i);
            r = function() {
                h(i);
                if (i.href) URL.revokeObjectURL(i.href);
            };
        } else {
            i = f(t);
            n = b.bind(null, i);
            r = function() {
                h(i);
            };
        }
        n(e);
        return function t(i) {
            if (i) {
                if (i.css === e.css && i.media === e.media && i.sourceMap === e.sourceMap) return;
                n(e = i);
            } else {
                r();
            }
        };
    }
    var v = function() {
        var e = [];
        return function(t, i) {
            e[t] = i;
            return e.filter(Boolean).join("\n");
        };
    }();
    function y(e, t, i, n) {
        var r = i ? "" : n.css;
        if (e.styleSheet) {
            e.styleSheet.cssText = v(t, r);
        } else {
            var s = document.createTextNode(r);
            var o = e.childNodes;
            if (o[t]) e.removeChild(o[t]);
            if (o.length) {
                e.insertBefore(s, o[t]);
            } else {
                e.appendChild(s);
            }
        }
    }
    function b(e, t) {
        var i = t.css;
        var n = t.media;
        if (n) {
            e.setAttribute("media", n);
        }
        if (e.styleSheet) {
            e.styleSheet.cssText = i;
        } else {
            while (e.firstChild) {
                e.removeChild(e.firstChild);
            }
            e.appendChild(document.createTextNode(i));
        }
    }
    function w(e, t) {
        var i = t.css;
        var n = t.sourceMap;
        if (n) {
            i += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(n)))) + " */";
        }
        var r = new Blob([ i ], {
            type: "text/css"
        });
        var s = e.href;
        e.href = URL.createObjectURL(r);
        if (s) URL.revokeObjectURL(s);
    }
}, function(e, t) {
    (function() {
        var t, i, n;
        t = function(e) {
            if (t.isDOMElement(e)) {
                return e;
            }
            return document.querySelectorAll(e);
        };
        t.isDOMElement = function(e) {
            return e && e.nodeName != null;
        };
        n = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
        t.trim = function(e) {
            if (e === null) {
                return "";
            } else {
                return (e + "").replace(n, "");
            }
        };
        i = /\r/g;
        t.val = function(e, t) {
            var n;
            if (arguments.length > 1) {
                return e.value = t;
            } else {
                n = e.value;
                if (typeof n === "string") {
                    return n.replace(i, "");
                } else {
                    if (n === null) {
                        return "";
                    } else {
                        return n;
                    }
                }
            }
        };
        t.preventDefault = function(e) {
            if (typeof e.preventDefault === "function") {
                e.preventDefault();
                return;
            }
            e.returnValue = false;
            return false;
        };
        t.normalizeEvent = function(e) {
            var i;
            i = e;
            e = {
                which: i.which != null ? i.which : void 0,
                target: i.target || i.srcElement,
                preventDefault: function() {
                    return t.preventDefault(i);
                },
                originalEvent: i,
                data: i.data || i.detail
            };
            if (e.which == null) {
                e.which = i.charCode != null ? i.charCode : i.keyCode;
            }
            return e;
        };
        t.on = function(e, i, n) {
            var r, s, o, a, l, d, c, p;
            if (e.length) {
                for (s = 0, a = e.length; s < a; s++) {
                    r = e[s];
                    t.on(r, i, n);
                }
                return;
            }
            if (i.match(" ")) {
                p = i.split(" ");
                for (o = 0, l = p.length; o < l; o++) {
                    d = p[o];
                    t.on(e, d, n);
                }
                return;
            }
            c = n;
            n = function(e) {
                e = t.normalizeEvent(e);
                return c(e);
            };
            if (e.addEventListener) {
                return e.addEventListener(i, n, false);
            }
            if (e.attachEvent) {
                i = "on" + i;
                return e.attachEvent(i, n);
            }
            e["on" + i] = n;
        };
        t.addClass = function(e, i) {
            var n;
            if (e.length) {
                return function() {
                    var r, s, o;
                    o = [];
                    for (r = 0, s = e.length; r < s; r++) {
                        n = e[r];
                        o.push(t.addClass(n, i));
                    }
                    return o;
                }();
            }
            if (e.classList) {
                return e.classList.add(i);
            } else {
                return e.className += " " + i;
            }
        };
        t.hasClass = function(e, i) {
            var n, r, s, o;
            if (e.length) {
                r = true;
                for (s = 0, o = e.length; s < o; s++) {
                    n = e[s];
                    r = r && t.hasClass(n, i);
                }
                return r;
            }
            if (e.classList) {
                return e.classList.contains(i);
            } else {
                return new RegExp("(^| )" + i + "( |$)", "gi").test(e.className);
            }
        };
        t.removeClass = function(e, i) {
            var n, r, s, o, a, l;
            if (e.length) {
                return function() {
                    var n, s, o;
                    o = [];
                    for (n = 0, s = e.length; n < s; n++) {
                        r = e[n];
                        o.push(t.removeClass(r, i));
                    }
                    return o;
                }();
            }
            if (e.classList) {
                a = i.split(" ");
                l = [];
                for (s = 0, o = a.length; s < o; s++) {
                    n = a[s];
                    l.push(e.classList.remove(n));
                }
                return l;
            } else {
                return e.className = e.className.replace(new RegExp("(^|\\b)" + i.split(" ").join("|") + "(\\b|$)", "gi"), " ");
            }
        };
        t.toggleClass = function(e, i, n) {
            var r;
            if (e.length) {
                return function() {
                    var s, o, a;
                    a = [];
                    for (s = 0, o = e.length; s < o; s++) {
                        r = e[s];
                        a.push(t.toggleClass(r, i, n));
                    }
                    return a;
                }();
            }
            if (n) {
                if (!t.hasClass(e, i)) {
                    return t.addClass(e, i);
                }
            } else {
                return t.removeClass(e, i);
            }
        };
        t.append = function(e, i) {
            var n;
            if (e.length) {
                return function() {
                    var r, s, o;
                    o = [];
                    for (r = 0, s = e.length; r < s; r++) {
                        n = e[r];
                        o.push(t.append(n, i));
                    }
                    return o;
                }();
            }
            return e.insertAdjacentHTML("beforeend", i);
        };
        t.find = function(e, t) {
            if (e instanceof NodeList || e instanceof Array) {
                e = e[0];
            }
            return e.querySelectorAll(t);
        };
        t.trigger = function(e, t, i) {
            var n, r, s;
            try {
                s = new CustomEvent(t, {
                    detail: i
                });
            } catch (r) {
                n = r;
                s = document.createEvent("CustomEvent");
                if (s.initCustomEvent) {
                    s.initCustomEvent(t, true, true, i);
                } else {
                    s.initEvent(t, true, true, i);
                }
            }
            return e.dispatchEvent(s);
        };
        e.exports = t;
    }).call(this);
}, function(e, t, i) {
    (function(t) {
        (function() {
            var n, r, s, o, a, l, d, c, p, u, h, f, g, m, v, y, b, w, x, j, k, $, _, C, S = [].indexOf || function(e) {
                for (var t = 0, i = this.length; t < i; t++) {
                    if (t in this && this[t] === e) return t;
                }
                return -1;
            };
            r = i(6);
            l = /(\d{1,4})/g;
            a = [ {
                type: "amex",
                pattern: /^3[47]/,
                format: /(\d{1,4})(\d{1,6})?(\d{1,5})?/,
                length: [ 15 ],
                cvcLength: [ 4 ],
                luhn: true
            }, {
                type: "dankort",
                pattern: /^5019/,
                format: l,
                length: [ 16 ],
                cvcLength: [ 3 ],
                luhn: true
            }, {
                type: "dinersclub",
                pattern: /^(36|38|30[0-5])/,
                format: /(\d{1,4})(\d{1,6})?(\d{1,4})?/,
                length: [ 14 ],
                cvcLength: [ 3 ],
                luhn: true
            }, {
                type: "discover",
                pattern: /^(6011|65|64[4-9]|622)/,
                format: l,
                length: [ 16 ],
                cvcLength: [ 3 ],
                luhn: true
            }, {
                type: "jcb",
                pattern: /^35/,
                format: l,
                length: [ 16 ],
                cvcLength: [ 3 ],
                luhn: true
            }, {
                type: "laser",
                pattern: /^(6706|6771|6709)/,
                format: l,
                length: [ 16, 17, 18, 19 ],
                cvcLength: [ 3 ],
                luhn: true
            }, {
                type: "maestro",
                pattern: /^(5018|5020|5038|6304|6703|6759|676[1-3])/,
                format: l,
                length: [ 12, 13, 14, 15, 16, 17, 18, 19 ],
                cvcLength: [ 3 ],
                luhn: true
            }, {
                type: "mastercard",
                pattern: /^5[1-5]/,
                pattern: /^(5[1-5]|677189)|^(222[1-9]|2[3-6]\d{2}|27[0-1]\d|2720)/,
                format: l,
                length: [ 16 ],
                cvcLength: [ 3 ],
                luhn: true
            }, {
                type: "unionpay",
                pattern: /^62/,
                format: l,
                length: [ 16, 17, 18, 19 ],
                cvcLength: [ 3 ],
                luhn: false
            }, {
                type: "visaelectron",
                pattern: /^4(026|17500|405|508|844|91[37])/,
                format: l,
                length: [ 16 ],
                cvcLength: [ 3 ],
                luhn: true
            }, {
                type: "elo",
                pattern: /^4011|438935|45(1416|76|7393)|50(4175|6699|67|90[4-7])|63(6297|6368)/,
                format: l,
                length: [ 16 ],
                cvcLength: [ 3 ],
                luhn: true
            }, {
                type: "visa",
                pattern: /^4/,
                format: l,
                length: [ 13, 16, 19 ],
                cvcLength: [ 3 ],
                luhn: true
            } ];
            s = function(e) {
                var t, i, n;
                e = (e + "").replace(/\D/g, "");
                for (i = 0, n = a.length; i < n; i++) {
                    t = a[i];
                    if (t.pattern.test(e)) {
                        return t;
                    }
                }
            };
            o = function(e) {
                var t, i, n;
                for (i = 0, n = a.length; i < n; i++) {
                    t = a[i];
                    if (t.type === e) {
                        return t;
                    }
                }
            };
            v = function(e) {
                var t, i, n, r, s, o;
                s = true;
                o = 0;
                i = (e + "").split("").reverse();
                for (n = 0, r = i.length; n < r; n++) {
                    t = i[n];
                    t = parseInt(t, 10);
                    if (s = !s) {
                        t *= 2;
                    }
                    if (t > 9) {
                        t -= 9;
                    }
                    o += t;
                }
                return o % 10 === 0;
            };
            m = function(e) {
                var t, i, n;
                try {
                    if (e.selectionStart != null && e.selectionStart !== e.selectionEnd) {
                        return true;
                    }
                    if ((typeof document !== "undefined" && document !== null ? (n = document.selection) != null ? n.createRange : void 0 : void 0) != null) {
                        if (document.selection.createRange().text) {
                            return true;
                        }
                    }
                } catch (i) {
                    t = i;
                }
                return false;
            };
            y = function(e) {
                return setTimeout(function(t) {
                    return function() {
                        var t, i;
                        t = e.target;
                        i = r.val(t);
                        i = n.fns.formatCardNumber(i);
                        r.val(t, i);
                        return r.trigger(t, "change");
                    };
                }(this));
            };
            p = function(e) {
                var t, i, n, o, a, l, d;
                i = String.fromCharCode(e.which);
                if (!/^\d+$/.test(i)) {
                    return;
                }
                a = e.target;
                d = r.val(a);
                t = s(d + i);
                n = (d.replace(/\D/g, "") + i).length;
                l = 16;
                if (t) {
                    l = t.length[t.length.length - 1];
                }
                if (n >= l) {
                    return;
                }
                if (m(a)) {
                    return;
                }
                if (t && t.type === "amex") {
                    o = /^(\d{4}|\d{4}\s\d{6})$/;
                } else {
                    o = /(?:^|\s)(\d{4})$/;
                }
                if (o.test(d)) {
                    e.preventDefault();
                    r.val(a, d + " " + i);
                    return r.trigger(a, "change");
                } else if (o.test(d + i)) {
                    e.preventDefault();
                    r.val(a, d + i + " ");
                    return r.trigger(a, "change");
                }
            };
            d = function(e) {
                var t, i;
                t = e.target;
                i = r.val(t);
                if (e.meta) {
                    return;
                }
                if (e.which !== 8) {
                    return;
                }
                if (m(t)) {
                    return;
                }
                if (/\d\s$/.test(i)) {
                    e.preventDefault();
                    return r.val(t, i.replace(/\d\s$/, ""));
                } else if (/\s\d?$/.test(i)) {
                    e.preventDefault();
                    return r.val(t, i.replace(/\s\d?$/, ""));
                }
            };
            u = function(e) {
                var t, i, n;
                t = String.fromCharCode(e.which);
                if (!/^\d+$/.test(t)) {
                    return;
                }
                i = e.target;
                n = r.val(i) + t;
                if (/^\d$/.test(n) && (n !== "0" && n !== "1")) {
                    e.preventDefault();
                    return r.val(i, "0" + n + " / ");
                } else if (/^\d\d$/.test(n)) {
                    e.preventDefault();
                    return r.val(i, n + " / ");
                }
            };
            g = function(e) {
                var t, i, n;
                t = String.fromCharCode(e.which);
                if (!/^\d+$/.test(t)) {
                    return;
                }
                i = e.target;
                n = r.val(i) + t;
                if (/^\d$/.test(n) && (n !== "0" && n !== "1")) {
                    e.preventDefault();
                    return r.val(i, "0" + n);
                } else if (/^\d\d$/.test(n)) {
                    e.preventDefault();
                    return r.val(i, "" + n);
                }
            };
            h = function(e) {
                var t, i, n;
                t = String.fromCharCode(e.which);
                if (!/^\d+$/.test(t)) {
                    return;
                }
                i = e.target;
                n = r.val(i);
                if (/^\d\d$/.test(n)) {
                    return r.val(i, n + " / ");
                }
            };
            f = function(e) {
                var t, i, n;
                t = String.fromCharCode(e.which);
                if (t !== "/") {
                    return;
                }
                i = e.target;
                n = r.val(i);
                if (/^\d$/.test(n) && n !== "0") {
                    return r.val(i, "0" + n + " / ");
                }
            };
            c = function(e) {
                var t, i;
                if (e.metaKey) {
                    return;
                }
                t = e.target;
                i = r.val(t);
                if (e.which !== 8) {
                    return;
                }
                if (m(t)) {
                    return;
                }
                if (/\d(\s|\/)+$/.test(i)) {
                    e.preventDefault();
                    return r.val(t, i.replace(/\d(\s|\/)*$/, ""));
                } else if (/\s\/\s?\d?$/.test(i)) {
                    e.preventDefault();
                    return r.val(t, i.replace(/\s\/\s?\d?$/, ""));
                }
            };
            $ = function(e) {
                var t;
                if (e.metaKey || e.ctrlKey) {
                    return true;
                }
                if (e.which === 32) {
                    return e.preventDefault();
                }
                if (e.which === 0) {
                    return true;
                }
                if (e.which < 33) {
                    return true;
                }
                t = String.fromCharCode(e.which);
                if (!/[\d\s]/.test(t)) {
                    return e.preventDefault();
                }
            };
            w = function(e) {
                var t, i, n, o;
                n = e.target;
                i = String.fromCharCode(e.which);
                if (!/^\d+$/.test(i)) {
                    return;
                }
                if (m(n)) {
                    return;
                }
                o = (r.val(n) + i).replace(/\D/g, "");
                t = s(o);
                if (t) {
                    if (!(o.length <= t.length[t.length.length - 1])) {
                        return e.preventDefault();
                    }
                } else {
                    if (!(o.length <= 16)) {
                        return e.preventDefault();
                    }
                }
            };
            j = function(e, t) {
                var i, n, s;
                n = e.target;
                i = String.fromCharCode(e.which);
                if (!/^\d+$/.test(i)) {
                    return;
                }
                if (m(n)) {
                    return;
                }
                s = r.val(n) + i;
                s = s.replace(/\D/g, "");
                if (s.length > t) {
                    return e.preventDefault();
                }
            };
            x = function(e) {
                return j(e, 6);
            };
            k = function(e) {
                return j(e, 2);
            };
            _ = function(e) {
                return j(e, 4);
            };
            b = function(e) {
                var t, i, n;
                i = e.target;
                t = String.fromCharCode(e.which);
                if (!/^\d+$/.test(t)) {
                    return;
                }
                if (m(i)) {
                    return;
                }
                n = r.val(i) + t;
                if (!(n.length <= 4)) {
                    return e.preventDefault();
                }
            };
            C = function(e) {
                var t, i, s, o, l;
                o = e.target;
                l = r.val(o);
                s = n.fns.cardType(l) || "unknown";
                if (!r.hasClass(o, s)) {
                    t = function() {
                        var e, t, n;
                        n = [];
                        for (e = 0, t = a.length; e < t; e++) {
                            i = a[e];
                            n.push(i.type);
                        }
                        return n;
                    }();
                    r.removeClass(o, "unknown");
                    r.removeClass(o, t.join(" "));
                    r.addClass(o, s);
                    r.toggleClass(o, "identified", s !== "unknown");
                    return r.trigger(o, "payment.cardType", s);
                }
            };
            n = function() {
                function e() {}
                e.fns = {
                    cardExpiryVal: function(e) {
                        var t, i, n, r;
                        e = e.replace(/\s/g, "");
                        n = e.split("/", 2), t = n[0], r = n[1];
                        if ((r != null ? r.length : void 0) === 2 && /^\d+$/.test(r)) {
                            i = new Date().getFullYear();
                            i = i.toString().slice(0, 2);
                            r = i + r;
                        }
                        t = parseInt(t, 10);
                        r = parseInt(r, 10);
                        return {
                            month: t,
                            year: r
                        };
                    },
                    validateCardNumber: function(e) {
                        var t, i;
                        e = (e + "").replace(/\s+|-/g, "");
                        if (!/^\d+$/.test(e)) {
                            return false;
                        }
                        t = s(e);
                        if (!t) {
                            return false;
                        }
                        return (i = e.length, S.call(t.length, i) >= 0) && (t.luhn === false || v(e));
                    },
                    validateCardExpiry: function(e, t) {
                        var i, n, s, o;
                        if (typeof e === "object" && "month" in e) {
                            o = e, e = o.month, t = o.year;
                        }
                        if (!(e && t)) {
                            return false;
                        }
                        e = r.trim(e);
                        t = r.trim(t);
                        if (!/^\d+$/.test(e)) {
                            return false;
                        }
                        if (!/^\d+$/.test(t)) {
                            return false;
                        }
                        e = parseInt(e, 10);
                        if (!(e && e <= 12)) {
                            return false;
                        }
                        if (t.length === 2) {
                            s = new Date().getFullYear();
                            s = s.toString().slice(0, 2);
                            t = s + t;
                        }
                        n = new Date(t, e);
                        i = new Date();
                        n.setMonth(n.getMonth() - 1);
                        n.setMonth(n.getMonth() + 1, 1);
                        return n > i;
                    },
                    validateCardCVC: function(e, t) {
                        var i, n;
                        e = r.trim(e);
                        if (!/^\d+$/.test(e)) {
                            return false;
                        }
                        if (t && o(t)) {
                            return i = e.length, S.call((n = o(t)) != null ? n.cvcLength : void 0, i) >= 0;
                        } else {
                            return e.length >= 3 && e.length <= 4;
                        }
                    },
                    cardType: function(e) {
                        var t;
                        if (!e) {
                            return null;
                        }
                        return ((t = s(e)) != null ? t.type : void 0) || null;
                    },
                    formatCardNumber: function(e) {
                        var t, i, n, r;
                        t = s(e);
                        if (!t) {
                            return e;
                        }
                        r = t.length[t.length.length - 1];
                        e = e.replace(/\D/g, "");
                        e = e.slice(0, r);
                        if (t.format.global) {
                            return (n = e.match(t.format)) != null ? n.join(" ") : void 0;
                        } else {
                            i = t.format.exec(e);
                            if (i != null) {
                                i.shift();
                            }
                            return i != null ? i.join(" ") : void 0;
                        }
                    }
                };
                e.restrictNumeric = function(e) {
                    return r.on(e, "keypress", $);
                };
                e.cardExpiryVal = function(t) {
                    return e.fns.cardExpiryVal(r.val(t));
                };
                e.formatCardCVC = function(t) {
                    e.restrictNumeric(t);
                    r.on(t, "keypress", b);
                    return t;
                };
                e.formatCardExpiry = function(t) {
                    var i, n;
                    e.restrictNumeric(t);
                    if (t.length && t.length === 2) {
                        i = t[0], n = t[1];
                        this.formatCardExpiryMultiple(i, n);
                    } else {
                        r.on(t, "keypress", x);
                        r.on(t, "keypress", u);
                        r.on(t, "keypress", f);
                        r.on(t, "keypress", h);
                        r.on(t, "keydown", c);
                    }
                    return t;
                };
                e.formatCardExpiryMultiple = function(e, t) {
                    r.on(e, "keypress", k);
                    r.on(e, "keypress", g);
                    return r.on(t, "keypress", _);
                };
                e.formatCardNumber = function(t) {
                    e.restrictNumeric(t);
                    r.on(t, "keypress", w);
                    r.on(t, "keypress", p);
                    r.on(t, "keydown", d);
                    r.on(t, "keyup", C);
                    r.on(t, "paste", y);
                    return t;
                };
                e.getCardArray = function() {
                    return a;
                };
                e.setCardArray = function(e) {
                    a = e;
                    return true;
                };
                e.addToCardArray = function(e) {
                    return a.push(e);
                };
                e.removeFromCardArray = function(e) {
                    var t, i;
                    for (t in a) {
                        i = a[t];
                        if (i.type === e) {
                            a.splice(t, 1);
                        }
                    }
                    return true;
                };
                return e;
            }();
            e.exports = n;
            t.Payment = n;
        }).call(this);
    }).call(t, function() {
        return this;
    }());
}, function(e, t, i) {
    e.exports = i(9);
}, function(e, t, i) {
    var n = i(10);
    function r() {
        var e = arguments[0] || {};
        var t = 1;
        var i = arguments.length;
        var s = false;
        var o, a, l, d, c, p;
        if (typeof e === "boolean") {
            s = e;
            e = arguments[1] || {};
            t = 2;
        }
        if (typeof e !== "object" && !n.fn(e)) {
            e = {};
        }
        for (;t < i; t++) {
            o = arguments[t];
            if (o != null) {
                if (typeof o === "string") {
                    o = o.split("");
                }
                for (a in o) {
                    l = e[a];
                    d = o[a];
                    if (e === d) {
                        continue;
                    }
                    if (s && d && (n.hash(d) || (c = n.array(d)))) {
                        if (c) {
                            c = false;
                            p = l && n.array(l) ? l : [];
                        } else {
                            p = l && n.hash(l) ? l : {};
                        }
                        e[a] = r(s, p, d);
                    } else if (typeof d !== "undefined") {
                        e[a] = d;
                    }
                }
            }
        }
        return e;
    }
    r.version = "1.1.3";
    e.exports = r;
}, function(e, t) {
    var i = Object.prototype;
    var n = i.hasOwnProperty;
    var r = i.toString;
    var s;
    if (typeof Symbol === "function") {
        s = Symbol.prototype.valueOf;
    }
    var o = function(e) {
        return e !== e;
    };
    var a = {
        boolean: 1,
        number: 1,
        string: 1,
        undefined: 1
    };
    var l = /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/;
    var d = /^[A-Fa-f0-9]+$/;
    var c = e.exports = {};
    c.a = c.type = function(e, t) {
        return typeof e === t;
    };
    c.defined = function(e) {
        return typeof e !== "undefined";
    };
    c.empty = function(e) {
        var t = r.call(e);
        var i;
        if (t === "[object Array]" || t === "[object Arguments]" || t === "[object String]") {
            return e.length === 0;
        }
        if (t === "[object Object]") {
            for (i in e) {
                if (n.call(e, i)) {
                    return false;
                }
            }
            return true;
        }
        return !e;
    };
    c.equal = function e(t, i) {
        if (t === i) {
            return true;
        }
        var n = r.call(t);
        var s;
        if (n !== r.call(i)) {
            return false;
        }
        if (n === "[object Object]") {
            for (s in t) {
                if (!c.equal(t[s], i[s]) || !(s in i)) {
                    return false;
                }
            }
            for (s in i) {
                if (!c.equal(t[s], i[s]) || !(s in t)) {
                    return false;
                }
            }
            return true;
        }
        if (n === "[object Array]") {
            s = t.length;
            if (s !== i.length) {
                return false;
            }
            while (--s) {
                if (!c.equal(t[s], i[s])) {
                    return false;
                }
            }
            return true;
        }
        if (n === "[object Function]") {
            return t.prototype === i.prototype;
        }
        if (n === "[object Date]") {
            return t.getTime() === i.getTime();
        }
        return false;
    };
    c.hosted = function(e, t) {
        var i = typeof t[e];
        return i === "object" ? !!t[e] : !a[i];
    };
    c.instance = c["instanceof"] = function(e, t) {
        return e instanceof t;
    };
    c.nil = c["null"] = function(e) {
        return e === null;
    };
    c.undef = c.undefined = function(e) {
        return typeof e === "undefined";
    };
    c.args = c.arguments = function(e) {
        var t = r.call(e) === "[object Arguments]";
        var i = !c.array(e) && c.arraylike(e) && c.object(e) && c.fn(e.callee);
        return t || i;
    };
    c.array = Array.isArray || function(e) {
        return r.call(e) === "[object Array]";
    };
    c.args.empty = function(e) {
        return c.args(e) && e.length === 0;
    };
    c.array.empty = function(e) {
        return c.array(e) && e.length === 0;
    };
    c.arraylike = function(e) {
        return !!e && !c.bool(e) && n.call(e, "length") && isFinite(e.length) && c.number(e.length) && e.length >= 0;
    };
    c.bool = c["boolean"] = function(e) {
        return r.call(e) === "[object Boolean]";
    };
    c["false"] = function(e) {
        return c.bool(e) && Boolean(Number(e)) === false;
    };
    c["true"] = function(e) {
        return c.bool(e) && Boolean(Number(e)) === true;
    };
    c.date = function(e) {
        return r.call(e) === "[object Date]";
    };
    c.element = function(e) {
        return e !== undefined && typeof HTMLElement !== "undefined" && e instanceof HTMLElement && e.nodeType === 1;
    };
    c.error = function(e) {
        return r.call(e) === "[object Error]";
    };
    c.fn = c["function"] = function(e) {
        var t = typeof window !== "undefined" && e === window.alert;
        return t || r.call(e) === "[object Function]";
    };
    c.number = function(e) {
        return r.call(e) === "[object Number]";
    };
    c.infinite = function(e) {
        return e === Infinity || e === -Infinity;
    };
    c.decimal = function(e) {
        return c.number(e) && !o(e) && !c.infinite(e) && e % 1 !== 0;
    };
    c.divisibleBy = function(e, t) {
        var i = c.infinite(e);
        var n = c.infinite(t);
        var r = c.number(e) && !o(e) && c.number(t) && !o(t) && t !== 0;
        return i || n || r && e % t === 0;
    };
    c.integer = c["int"] = function(e) {
        return c.number(e) && !o(e) && e % 1 === 0;
    };
    c.maximum = function(e, t) {
        if (o(e)) {
            throw new TypeError("NaN is not a valid value");
        } else if (!c.arraylike(t)) {
            throw new TypeError("second argument must be array-like");
        }
        var i = t.length;
        while (--i >= 0) {
            if (e < t[i]) {
                return false;
            }
        }
        return true;
    };
    c.minimum = function(e, t) {
        if (o(e)) {
            throw new TypeError("NaN is not a valid value");
        } else if (!c.arraylike(t)) {
            throw new TypeError("second argument must be array-like");
        }
        var i = t.length;
        while (--i >= 0) {
            if (e > t[i]) {
                return false;
            }
        }
        return true;
    };
    c.nan = function(e) {
        return !c.number(e) || e !== e;
    };
    c.even = function(e) {
        return c.infinite(e) || c.number(e) && e === e && e % 2 === 0;
    };
    c.odd = function(e) {
        return c.infinite(e) || c.number(e) && e === e && e % 2 !== 0;
    };
    c.ge = function(e, t) {
        if (o(e) || o(t)) {
            throw new TypeError("NaN is not a valid value");
        }
        return !c.infinite(e) && !c.infinite(t) && e >= t;
    };
    c.gt = function(e, t) {
        if (o(e) || o(t)) {
            throw new TypeError("NaN is not a valid value");
        }
        return !c.infinite(e) && !c.infinite(t) && e > t;
    };
    c.le = function(e, t) {
        if (o(e) || o(t)) {
            throw new TypeError("NaN is not a valid value");
        }
        return !c.infinite(e) && !c.infinite(t) && e <= t;
    };
    c.lt = function(e, t) {
        if (o(e) || o(t)) {
            throw new TypeError("NaN is not a valid value");
        }
        return !c.infinite(e) && !c.infinite(t) && e < t;
    };
    c.within = function(e, t, i) {
        if (o(e) || o(t) || o(i)) {
            throw new TypeError("NaN is not a valid value");
        } else if (!c.number(e) || !c.number(t) || !c.number(i)) {
            throw new TypeError("all arguments must be numbers");
        }
        var n = c.infinite(e) || c.infinite(t) || c.infinite(i);
        return n || e >= t && e <= i;
    };
    c.object = function(e) {
        return r.call(e) === "[object Object]";
    };
    c.hash = function(e) {
        return c.object(e) && e.constructor === Object && !e.nodeType && !e.setInterval;
    };
    c.regexp = function(e) {
        return r.call(e) === "[object RegExp]";
    };
    c.string = function(e) {
        return r.call(e) === "[object String]";
    };
    c.base64 = function(e) {
        return c.string(e) && (!e.length || l.test(e));
    };
    c.hex = function(e) {
        return c.string(e) && (!e.length || d.test(e));
    };
    c.symbol = function(e) {
        return typeof Symbol === "function" && r.call(e) === "[object Symbol]" && typeof s.call(e) === "symbol";
    };
}, function(e, t) {
    e.exports = jQuery;
} ]);

(function(e, t, i, n) {
    function r(t, i) {
        this.settings = null;
        this.options = e.extend({}, r.Defaults, i);
        this.$element = e(t);
        this._handlers = {};
        this._plugins = {};
        this._supress = {};
        this._current = null;
        this._speed = null;
        this._coordinates = [];
        this._breakpoint = null;
        this._width = null;
        this._items = [];
        this._clones = [];
        this._mergers = [];
        this._widths = [];
        this._invalidated = {};
        this._pipe = [];
        this._drag = {
            time: null,
            target: null,
            pointer: null,
            stage: {
                start: null,
                current: null
            },
            direction: null
        };
        this._states = {
            current: {},
            tags: {
                initializing: [ "busy" ],
                animating: [ "busy" ],
                dragging: [ "interacting" ]
            }
        };
        e.each([ "onResize", "onThrottledResize" ], e.proxy(function(t, i) {
            this._handlers[i] = e.proxy(this[i], this);
        }, this));
        e.each(r.Plugins, e.proxy(function(e, t) {
            this._plugins[e.charAt(0).toLowerCase() + e.slice(1)] = new t(this);
        }, this));
        e.each(r.Workers, e.proxy(function(t, i) {
            this._pipe.push({
                filter: i.filter,
                run: e.proxy(i.run, this)
            });
        }, this));
        this.setup();
        this.initialize();
    }
    r.Defaults = {
        items: 3,
        loop: false,
        center: false,
        rewind: false,
        mouseDrag: true,
        touchDrag: true,
        pullDrag: true,
        freeDrag: false,
        margin: 0,
        stagePadding: 0,
        merge: false,
        mergeFit: true,
        autoWidth: false,
        startPosition: 0,
        rtl: false,
        smartSpeed: 250,
        fluidSpeed: false,
        dragEndSpeed: false,
        responsive: {},
        responsiveRefreshRate: 200,
        responsiveBaseElement: t,
        fallbackEasing: "swing",
        info: false,
        nestedItemSelector: false,
        itemElement: "div",
        stageElement: "div",
        refreshClass: "owl-refresh",
        loadedClass: "owl-loaded",
        loadingClass: "owl-loading",
        rtlClass: "owl-rtl",
        responsiveClass: "owl-responsive",
        dragClass: "owl-drag",
        itemClass: "owl-item",
        stageClass: "owl-stage",
        stageOuterClass: "owl-stage-outer",
        grabClass: "owl-grab"
    };
    r.Width = {
        Default: "default",
        Inner: "inner",
        Outer: "outer"
    };
    r.Type = {
        Event: "event",
        State: "state"
    };
    r.Plugins = {};
    r.Workers = [ {
        filter: [ "width", "settings" ],
        run: function() {
            this._width = this.$element.width();
        }
    }, {
        filter: [ "width", "items", "settings" ],
        run: function(e) {
            e.current = this._items && this._items[this.relative(this._current)];
        }
    }, {
        filter: [ "items", "settings" ],
        run: function() {
            this.$stage.children(".cloned").remove();
        }
    }, {
        filter: [ "width", "items", "settings" ],
        run: function(e) {
            var t = this.settings.margin || "", i = !this.settings.autoWidth, n = this.settings.rtl, r = {
                width: "auto",
                "margin-left": n ? t : "",
                "margin-right": n ? "" : t
            };
            !i && this.$stage.children().css(r);
            e.css = r;
        }
    }, {
        filter: [ "width", "items", "settings" ],
        run: function(e) {
            var t = (this.width() / this.settings.items).toFixed(3) - this.settings.margin, i = null, n = this._items.length, r = !this.settings.autoWidth, s = [];
            e.items = {
                merge: false,
                width: t
            };
            while (n--) {
                i = this._mergers[n];
                i = this.settings.mergeFit && Math.min(i, this.settings.items) || i;
                e.items.merge = i > 1 || e.items.merge;
                s[n] = !r ? this._items[n].width() : t * i;
            }
            this._widths = s;
        }
    }, {
        filter: [ "items", "settings" ],
        run: function() {
            var t = [], i = this._items, n = this.settings, r = Math.max(n.items * 2, 4), s = Math.ceil(i.length / 2) * 2, o = n.loop && i.length ? n.rewind ? r : Math.max(r, s) : 0, a = "", l = "";
            o /= 2;
            while (o--) {
                t.push(this.normalize(t.length / 2, true));
                a = a + i[t[t.length - 1]][0].outerHTML;
                t.push(this.normalize(i.length - 1 - (t.length - 1) / 2, true));
                l = i[t[t.length - 1]][0].outerHTML + l;
            }
            this._clones = t;
            e(a).addClass("cloned").appendTo(this.$stage);
            e(l).addClass("cloned").prependTo(this.$stage);
        }
    }, {
        filter: [ "width", "items", "settings" ],
        run: function() {
            var e = this.settings.rtl ? 1 : -1, t = this._clones.length + this._items.length, i = -1, n = 0, r = 0, s = [];
            while (++i < t) {
                n = s[i - 1] || 0;
                r = this._widths[this.relative(i)] + this.settings.margin;
                s.push(n + r * e);
            }
            this._coordinates = s;
        }
    }, {
        filter: [ "width", "items", "settings" ],
        run: function() {
            var e = this.settings.stagePadding, t = this._coordinates, i = {
                width: Math.ceil(Math.abs(t[t.length - 1])) + e * 2,
                "padding-left": e || "",
                "padding-right": e || ""
            };
            this.$stage.css(i);
        }
    }, {
        filter: [ "width", "items", "settings" ],
        run: function(e) {
            var t = this._coordinates.length, i = !this.settings.autoWidth, n = this.$stage.children();
            if (i && e.items.merge) {
                while (t--) {
                    e.css.width = this._widths[this.relative(t)];
                    n.eq(t).css(e.css);
                }
            } else if (i) {
                e.css.width = e.items.width;
                n.css(e.css);
            }
        }
    }, {
        filter: [ "items" ],
        run: function() {
            this._coordinates.length < 1 && this.$stage.removeAttr("style");
        }
    }, {
        filter: [ "width", "items", "settings" ],
        run: function(e) {
            e.current = e.current ? this.$stage.children().index(e.current) : 0;
            e.current = Math.max(this.minimum(), Math.min(this.maximum(), e.current));
            this.reset(e.current);
        }
    }, {
        filter: [ "position" ],
        run: function() {
            this.animate(this.coordinates(this._current));
        }
    }, {
        filter: [ "width", "position", "items", "settings" ],
        run: function() {
            var e = this.settings.rtl ? 1 : -1, t = this.settings.stagePadding * 2, i = this.coordinates(this.current()) + t, n = i + this.width() * e, r, s, o = [], a, l;
            for (a = 0, l = this._coordinates.length; a < l; a++) {
                r = this._coordinates[a - 1] || 0;
                s = Math.abs(this._coordinates[a]) + t * e;
                if (this.op(r, "<=", i) && this.op(r, ">", n) || this.op(s, "<", i) && this.op(s, ">", n)) {
                    o.push(a);
                }
            }
            this.$stage.children(".active").removeClass("active");
            this.$stage.children(":eq(" + o.join("), :eq(") + ")").addClass("active");
            if (this.settings.center) {
                this.$stage.children(".center").removeClass("center");
                this.$stage.children().eq(this.current()).addClass("center");
            }
        }
    } ];
    r.prototype.initialize = function() {
        this.enter("initializing");
        this.trigger("initialize");
        this.$element.toggleClass(this.settings.rtlClass, this.settings.rtl);
        if (this.settings.autoWidth && !this.is("pre-loading")) {
            var t, i, r;
            t = this.$element.find("img");
            i = this.settings.nestedItemSelector ? "." + this.settings.nestedItemSelector : n;
            r = this.$element.children(i).width();
            if (t.length && r <= 0) {
                this.preloadAutoWidthImages(t);
            }
        }
        this.$element.addClass(this.options.loadingClass);
        this.$stage = e("<" + this.settings.stageElement + ' class="' + this.settings.stageClass + '"/>').wrap('<div class="' + this.settings.stageOuterClass + '"/>');
        this.$element.append(this.$stage.parent());
        this.replace(this.$element.children().not(this.$stage.parent()));
        if (this.$element.is(":visible")) {
            this.refresh();
        } else {
            this.invalidate("width");
        }
        this.$element.removeClass(this.options.loadingClass).addClass(this.options.loadedClass);
        this.registerEventHandlers();
        this.leave("initializing");
        this.trigger("initialized");
    };
    r.prototype.setup = function() {
        var t = this.viewport(), i = this.options.responsive, n = -1, r = null;
        if (!i) {
            r = e.extend({}, this.options);
        } else {
            e.each(i, function(e) {
                if (e <= t && e > n) {
                    n = Number(e);
                }
            });
            r = e.extend({}, this.options, i[n]);
            if (typeof r.stagePadding === "function") {
                r.stagePadding = r.stagePadding();
            }
            delete r.responsive;
            if (r.responsiveClass) {
                this.$element.attr("class", this.$element.attr("class").replace(new RegExp("(" + this.options.responsiveClass + "-)\\S+\\s", "g"), "$1" + n));
            }
        }
        this.trigger("change", {
            property: {
                name: "settings",
                value: r
            }
        });
        this._breakpoint = n;
        this.settings = r;
        this.invalidate("settings");
        this.trigger("changed", {
            property: {
                name: "settings",
                value: this.settings
            }
        });
    };
    r.prototype.optionsLogic = function() {
        if (this.settings.autoWidth) {
            this.settings.stagePadding = false;
            this.settings.merge = false;
        }
    };
    r.prototype.prepare = function(t) {
        var i = this.trigger("prepare", {
            content: t
        });
        if (!i.data) {
            i.data = e("<" + this.settings.itemElement + "/>").addClass(this.options.itemClass).append(t);
        }
        this.trigger("prepared", {
            content: i.data
        });
        return i.data;
    };
    r.prototype.update = function() {
        var t = 0, i = this._pipe.length, n = e.proxy(function(e) {
            return this[e];
        }, this._invalidated), r = {};
        while (t < i) {
            if (this._invalidated.all || e.grep(this._pipe[t].filter, n).length > 0) {
                this._pipe[t].run(r);
            }
            t++;
        }
        this._invalidated = {};
        !this.is("valid") && this.enter("valid");
    };
    r.prototype.width = function(e) {
        e = e || r.Width.Default;
        switch (e) {
          case r.Width.Inner:
          case r.Width.Outer:
            return this._width;

          default:
            return this._width - this.settings.stagePadding * 2 + this.settings.margin;
        }
    };
    r.prototype.refresh = function() {
        this.enter("refreshing");
        this.trigger("refresh");
        this.setup();
        this.optionsLogic();
        this.$element.addClass(this.options.refreshClass);
        this.update();
        this.$element.removeClass(this.options.refreshClass);
        this.leave("refreshing");
        this.trigger("refreshed");
    };
    r.prototype.onThrottledResize = function() {
        t.clearTimeout(this.resizeTimer);
        this.resizeTimer = t.setTimeout(this._handlers.onResize, this.settings.responsiveRefreshRate);
    };
    r.prototype.onResize = function() {
        if (!this._items.length) {
            return false;
        }
        if (this._width === this.$element.width()) {
            return false;
        }
        if (!this.$element.is(":visible")) {
            return false;
        }
        this.enter("resizing");
        if (this.trigger("resize").isDefaultPrevented()) {
            this.leave("resizing");
            return false;
        }
        this.invalidate("width");
        this.refresh();
        this.leave("resizing");
        this.trigger("resized");
    };
    r.prototype.registerEventHandlers = function() {
        if (e.support.transition) {
            this.$stage.on(e.support.transition.end + ".owl.core", e.proxy(this.onTransitionEnd, this));
        }
        if (this.settings.responsive !== false) {
            this.on(t, "resize", this._handlers.onThrottledResize);
        }
        if (this.settings.mouseDrag) {
            this.$element.addClass(this.options.dragClass);
            this.$stage.on("mousedown.owl.core", e.proxy(this.onDragStart, this));
            this.$stage.on("dragstart.owl.core selectstart.owl.core", function() {
                return false;
            });
        }
        if (this.settings.touchDrag) {
            this.$stage.on("touchstart.owl.core", e.proxy(this.onDragStart, this));
            this.$stage.on("touchcancel.owl.core", e.proxy(this.onDragEnd, this));
        }
    };
    r.prototype.onDragStart = function(t) {
        var n = null;
        if (t.which === 3) {
            return;
        }
        if (e.support.transform) {
            n = this.$stage.css("transform").replace(/.*\(|\)| /g, "").split(",");
            n = {
                x: n[n.length === 16 ? 12 : 4],
                y: n[n.length === 16 ? 13 : 5]
            };
        } else {
            n = this.$stage.position();
            n = {
                x: this.settings.rtl ? n.left + this.$stage.width() - this.width() + this.settings.margin : n.left,
                y: n.top
            };
        }
        if (this.is("animating")) {
            e.support.transform ? this.animate(n.x) : this.$stage.stop();
            this.invalidate("position");
        }
        this.$element.toggleClass(this.options.grabClass, t.type === "mousedown");
        this.speed(0);
        this._drag.time = new Date().getTime();
        this._drag.target = e(t.target);
        this._drag.stage.start = n;
        this._drag.stage.current = n;
        this._drag.pointer = this.pointer(t);
        e(i).on("mouseup.owl.core touchend.owl.core", e.proxy(this.onDragEnd, this));
        e(i).one("mousemove.owl.core touchmove.owl.core", e.proxy(function(t) {
            var n = this.difference(this._drag.pointer, this.pointer(t));
            e(i).on("mousemove.owl.core touchmove.owl.core", e.proxy(this.onDragMove, this));
            if (Math.abs(n.x) < Math.abs(n.y) && this.is("valid")) {
                return;
            }
            t.preventDefault();
            this.enter("dragging");
            this.trigger("drag");
        }, this));
    };
    r.prototype.onDragMove = function(e) {
        var t = null, i = null, n = null, r = this.difference(this._drag.pointer, this.pointer(e)), s = this.difference(this._drag.stage.start, r);
        if (!this.is("dragging")) {
            return;
        }
        e.preventDefault();
        if (this.settings.loop) {
            t = this.coordinates(this.minimum());
            i = this.coordinates(this.maximum() + 1) - t;
            s.x = ((s.x - t) % i + i) % i + t;
        } else {
            t = this.settings.rtl ? this.coordinates(this.maximum()) : this.coordinates(this.minimum());
            i = this.settings.rtl ? this.coordinates(this.minimum()) : this.coordinates(this.maximum());
            n = this.settings.pullDrag ? -1 * r.x / 5 : 0;
            s.x = Math.max(Math.min(s.x, t + n), i + n);
        }
        this._drag.stage.current = s;
        this.animate(s.x);
    };
    r.prototype.onDragEnd = function(t) {
        var n = this.difference(this._drag.pointer, this.pointer(t)), r = this._drag.stage.current, s = n.x > 0 ^ this.settings.rtl ? "left" : "right";
        e(i).off(".owl.core");
        this.$element.removeClass(this.options.grabClass);
        if (n.x !== 0 && this.is("dragging") || !this.is("valid")) {
            this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed);
            this.current(this.closest(r.x, n.x !== 0 ? s : this._drag.direction));
            this.invalidate("position");
            this.update();
            this._drag.direction = s;
            if (Math.abs(n.x) > 3 || new Date().getTime() - this._drag.time > 300) {
                this._drag.target.one("click.owl.core", function() {
                    return false;
                });
            }
        }
        if (!this.is("dragging")) {
            return;
        }
        this.leave("dragging");
        this.trigger("dragged");
    };
    r.prototype.closest = function(t, i) {
        var n = -1, r = 30, s = this.width(), o = this.coordinates();
        if (!this.settings.freeDrag) {
            e.each(o, e.proxy(function(e, a) {
                if (i === "left" && t > a - r && t < a + r) {
                    n = e;
                } else if (i === "right" && t > a - s - r && t < a - s + r) {
                    n = e + 1;
                } else if (this.op(t, "<", a) && this.op(t, ">", o[e + 1] || a - s)) {
                    n = i === "left" ? e + 1 : e;
                }
                return n === -1;
            }, this));
        }
        if (!this.settings.loop) {
            if (this.op(t, ">", o[this.minimum()])) {
                n = t = this.minimum();
            } else if (this.op(t, "<", o[this.maximum()])) {
                n = t = this.maximum();
            }
        }
        return n;
    };
    r.prototype.animate = function(t) {
        var i = this.speed() > 0;
        this.is("animating") && this.onTransitionEnd();
        if (i) {
            this.enter("animating");
            this.trigger("translate");
        }
        if (e.support.transform3d && e.support.transition) {
            this.$stage.css({
                transform: "translate3d(" + t + "px,0px,0px)",
                transition: this.speed() / 1e3 + "s"
            });
        } else if (i) {
            this.$stage.animate({
                left: t + "px"
            }, this.speed(), this.settings.fallbackEasing, e.proxy(this.onTransitionEnd, this));
        } else {
            this.$stage.css({
                left: t + "px"
            });
        }
    };
    r.prototype.is = function(e) {
        return this._states.current[e] && this._states.current[e] > 0;
    };
    r.prototype.current = function(e) {
        if (e === n) {
            return this._current;
        }
        if (this._items.length === 0) {
            return n;
        }
        e = this.normalize(e);
        if (this._current !== e) {
            var t = this.trigger("change", {
                property: {
                    name: "position",
                    value: e
                }
            });
            if (t.data !== n) {
                e = this.normalize(t.data);
            }
            this._current = e;
            this.invalidate("position");
            this.trigger("changed", {
                property: {
                    name: "position",
                    value: this._current
                }
            });
        }
        return this._current;
    };
    r.prototype.invalidate = function(t) {
        if (e.type(t) === "string") {
            this._invalidated[t] = true;
            this.is("valid") && this.leave("valid");
        }
        return e.map(this._invalidated, function(e, t) {
            return t;
        });
    };
    r.prototype.reset = function(e) {
        e = this.normalize(e);
        if (e === n) {
            return;
        }
        this._speed = 0;
        this._current = e;
        this.suppress([ "translate", "translated" ]);
        this.animate(this.coordinates(e));
        this.release([ "translate", "translated" ]);
    };
    r.prototype.normalize = function(e, t) {
        var i = this._items.length, r = t ? 0 : this._clones.length;
        if (!this.isNumeric(e) || i < 1) {
            e = n;
        } else if (e < 0 || e >= i + r) {
            e = ((e - r / 2) % i + i) % i + r / 2;
        }
        return e;
    };
    r.prototype.relative = function(e) {
        e -= this._clones.length / 2;
        return this.normalize(e, true);
    };
    r.prototype.maximum = function(e) {
        var t = this.settings, i = this._coordinates.length, n, r, s;
        if (t.loop) {
            i = this._clones.length / 2 + this._items.length - 1;
        } else if (t.autoWidth || t.merge) {
            n = this._items.length;
            r = this._items[--n].width();
            s = this.$element.width();
            while (n--) {
                r += this._items[n].width() + this.settings.margin;
                if (r > s) {
                    break;
                }
            }
            i = n + 1;
        } else if (t.center) {
            i = this._items.length - 1;
        } else {
            i = this._items.length - t.items;
        }
        if (e) {
            i -= this._clones.length / 2;
        }
        return Math.max(i, 0);
    };
    r.prototype.minimum = function(e) {
        return e ? 0 : this._clones.length / 2;
    };
    r.prototype.items = function(e) {
        if (e === n) {
            return this._items.slice();
        }
        e = this.normalize(e, true);
        return this._items[e];
    };
    r.prototype.mergers = function(e) {
        if (e === n) {
            return this._mergers.slice();
        }
        e = this.normalize(e, true);
        return this._mergers[e];
    };
    r.prototype.clones = function(t) {
        var i = this._clones.length / 2, r = i + this._items.length, s = function(e) {
            return e % 2 === 0 ? r + e / 2 : i - (e + 1) / 2;
        };
        if (t === n) {
            return e.map(this._clones, function(e, t) {
                return s(t);
            });
        }
        return e.map(this._clones, function(e, i) {
            return e === t ? s(i) : null;
        });
    };
    r.prototype.speed = function(e) {
        if (e !== n) {
            this._speed = e;
        }
        return this._speed;
    };
    r.prototype.coordinates = function(t) {
        var i = 1, r = t - 1, s;
        if (t === n) {
            return e.map(this._coordinates, e.proxy(function(e, t) {
                return this.coordinates(t);
            }, this));
        }
        if (this.settings.center) {
            if (this.settings.rtl) {
                i = -1;
                r = t + 1;
            }
            s = this._coordinates[t];
            s += (this.width() - s + (this._coordinates[r] || 0)) / 2 * i;
        } else {
            s = this._coordinates[r] || 0;
        }
        s = Math.ceil(s);
        return s;
    };
    r.prototype.duration = function(e, t, i) {
        if (i === 0) {
            return 0;
        }
        return Math.min(Math.max(Math.abs(t - e), 1), 6) * Math.abs(i || this.settings.smartSpeed);
    };
    r.prototype.to = function(e, t) {
        var i = this.current(), n = null, r = e - this.relative(i), s = (r > 0) - (r < 0), o = this._items.length, a = this.minimum(), l = this.maximum();
        if (this.settings.loop) {
            if (!this.settings.rewind && Math.abs(r) > o / 2) {
                r += s * -1 * o;
            }
            e = i + r;
            n = ((e - a) % o + o) % o + a;
            if (n !== e && n - r <= l && n - r > 0) {
                i = n - r;
                e = n;
                this.reset(i);
            }
        } else if (this.settings.rewind) {
            l += 1;
            e = (e % l + l) % l;
        } else {
            e = Math.max(a, Math.min(l, e));
        }
        this.speed(this.duration(i, e, t));
        this.current(e);
        if (this.$element.is(":visible")) {
            this.update();
        }
    };
    r.prototype.next = function(e) {
        e = e || false;
        this.to(this.relative(this.current()) + 1, e);
    };
    r.prototype.prev = function(e) {
        e = e || false;
        this.to(this.relative(this.current()) - 1, e);
    };
    r.prototype.onTransitionEnd = function(e) {
        if (e !== n) {
            e.stopPropagation();
            if ((e.target || e.srcElement || e.originalTarget) !== this.$stage.get(0)) {
                return false;
            }
        }
        this.leave("animating");
        this.trigger("translated");
    };
    r.prototype.viewport = function() {
        var n;
        if (this.options.responsiveBaseElement !== t) {
            n = e(this.options.responsiveBaseElement).width();
        } else if (t.innerWidth) {
            n = t.innerWidth;
        } else if (i.documentElement && i.documentElement.clientWidth) {
            n = i.documentElement.clientWidth;
        } else {
            console.warn("Can not detect viewport width.");
        }
        return n;
    };
    r.prototype.replace = function(t) {
        this.$stage.empty();
        this._items = [];
        if (t) {
            t = t instanceof jQuery ? t : e(t);
        }
        if (this.settings.nestedItemSelector) {
            t = t.find("." + this.settings.nestedItemSelector);
        }
        t.filter(function() {
            return this.nodeType === 1;
        }).each(e.proxy(function(e, t) {
            t = this.prepare(t);
            this.$stage.append(t);
            this._items.push(t);
            this._mergers.push(t.find("[data-merge]").addBack("[data-merge]").attr("data-merge") * 1 || 1);
        }, this));
        this.reset(this.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0);
        this.invalidate("items");
    };
    r.prototype.add = function(t, i) {
        var r = this.relative(this._current);
        i = i === n ? this._items.length : this.normalize(i, true);
        t = t instanceof jQuery ? t : e(t);
        this.trigger("add", {
            content: t,
            position: i
        });
        t = this.prepare(t);
        if (this._items.length === 0 || i === this._items.length) {
            this._items.length === 0 && this.$stage.append(t);
            this._items.length !== 0 && this._items[i - 1].after(t);
            this._items.push(t);
            this._mergers.push(t.find("[data-merge]").addBack("[data-merge]").attr("data-merge") * 1 || 1);
        } else {
            this._items[i].before(t);
            this._items.splice(i, 0, t);
            this._mergers.splice(i, 0, t.find("[data-merge]").addBack("[data-merge]").attr("data-merge") * 1 || 1);
        }
        this._items[r] && this.reset(this._items[r].index());
        this.invalidate("items");
        this.trigger("added", {
            content: t,
            position: i
        });
    };
    r.prototype.remove = function(e) {
        e = this.normalize(e, true);
        if (e === n) {
            return;
        }
        this.trigger("remove", {
            content: this._items[e],
            position: e
        });
        this._items[e].remove();
        this._items.splice(e, 1);
        this._mergers.splice(e, 1);
        this.invalidate("items");
        this.trigger("removed", {
            content: null,
            position: e
        });
    };
    r.prototype.preloadAutoWidthImages = function(t) {
        t.each(e.proxy(function(t, i) {
            this.enter("pre-loading");
            i = e(i);
            e(new Image()).one("load", e.proxy(function(e) {
                i.attr("src", e.target.src);
                i.css("opacity", 1);
                this.leave("pre-loading");
                !this.is("pre-loading") && !this.is("initializing") && this.refresh();
            }, this)).attr("src", i.attr("src") || i.attr("data-src") || i.attr("data-src-retina"));
        }, this));
    };
    r.prototype.destroy = function() {
        this.$element.off(".owl.core");
        this.$stage.off(".owl.core");
        e(i).off(".owl.core");
        if (this.settings.responsive !== false) {
            t.clearTimeout(this.resizeTimer);
            this.off(t, "resize", this._handlers.onThrottledResize);
        }
        for (var n in this._plugins) {
            this._plugins[n].destroy();
        }
        this.$stage.children(".cloned").remove();
        this.$stage.unwrap();
        this.$stage.children().contents().unwrap();
        this.$stage.children().unwrap();
        this.$element.removeClass(this.options.refreshClass).removeClass(this.options.loadingClass).removeClass(this.options.loadedClass).removeClass(this.options.rtlClass).removeClass(this.options.dragClass).removeClass(this.options.grabClass).attr("class", this.$element.attr("class").replace(new RegExp(this.options.responsiveClass + "-\\S+\\s", "g"), "")).removeData("owl.carousel");
    };
    r.prototype.op = function(e, t, i) {
        var n = this.settings.rtl;
        switch (t) {
          case "<":
            return n ? e > i : e < i;

          case ">":
            return n ? e < i : e > i;

          case ">=":
            return n ? e <= i : e >= i;

          case "<=":
            return n ? e >= i : e <= i;

          default:
            break;
        }
    };
    r.prototype.on = function(e, t, i, n) {
        if (e.addEventListener) {
            e.addEventListener(t, i, n);
        } else if (e.attachEvent) {
            e.attachEvent("on" + t, i);
        }
    };
    r.prototype.off = function(e, t, i, n) {
        if (e.removeEventListener) {
            e.removeEventListener(t, i, n);
        } else if (e.detachEvent) {
            e.detachEvent("on" + t, i);
        }
    };
    r.prototype.trigger = function(t, i, n, s, o) {
        var a = {
            item: {
                count: this._items.length,
                index: this.current()
            }
        }, l = e.camelCase(e.grep([ "on", t, n ], function(e) {
            return e;
        }).join("-").toLowerCase()), d = e.Event([ t, "owl", n || "carousel" ].join(".").toLowerCase(), e.extend({
            relatedTarget: this
        }, a, i));
        if (!this._supress[t]) {
            e.each(this._plugins, function(e, t) {
                if (t.onTrigger) {
                    t.onTrigger(d);
                }
            });
            this.register({
                type: r.Type.Event,
                name: t
            });
            this.$element.trigger(d);
            if (this.settings && typeof this.settings[l] === "function") {
                this.settings[l].call(this, d);
            }
        }
        return d;
    };
    r.prototype.enter = function(t) {
        e.each([ t ].concat(this._states.tags[t] || []), e.proxy(function(e, t) {
            if (this._states.current[t] === n) {
                this._states.current[t] = 0;
            }
            this._states.current[t]++;
        }, this));
    };
    r.prototype.leave = function(t) {
        e.each([ t ].concat(this._states.tags[t] || []), e.proxy(function(e, t) {
            this._states.current[t]--;
        }, this));
    };
    r.prototype.register = function(t) {
        if (t.type === r.Type.Event) {
            if (!e.event.special[t.name]) {
                e.event.special[t.name] = {};
            }
            if (!e.event.special[t.name].owl) {
                var i = e.event.special[t.name]._default;
                e.event.special[t.name]._default = function(e) {
                    if (i && i.apply && (!e.namespace || e.namespace.indexOf("owl") === -1)) {
                        return i.apply(this, arguments);
                    }
                    return e.namespace && e.namespace.indexOf("owl") > -1;
                };
                e.event.special[t.name].owl = true;
            }
        } else if (t.type === r.Type.State) {
            if (!this._states.tags[t.name]) {
                this._states.tags[t.name] = t.tags;
            } else {
                this._states.tags[t.name] = this._states.tags[t.name].concat(t.tags);
            }
            this._states.tags[t.name] = e.grep(this._states.tags[t.name], e.proxy(function(i, n) {
                return e.inArray(i, this._states.tags[t.name]) === n;
            }, this));
        }
    };
    r.prototype.suppress = function(t) {
        e.each(t, e.proxy(function(e, t) {
            this._supress[t] = true;
        }, this));
    };
    r.prototype.release = function(t) {
        e.each(t, e.proxy(function(e, t) {
            delete this._supress[t];
        }, this));
    };
    r.prototype.pointer = function(e) {
        var i = {
            x: null,
            y: null
        };
        e = e.originalEvent || e || t.event;
        e = e.touches && e.touches.length ? e.touches[0] : e.changedTouches && e.changedTouches.length ? e.changedTouches[0] : e;
        if (e.pageX) {
            i.x = e.pageX;
            i.y = e.pageY;
        } else {
            i.x = e.clientX;
            i.y = e.clientY;
        }
        return i;
    };
    r.prototype.isNumeric = function(e) {
        return !isNaN(parseFloat(e));
    };
    r.prototype.difference = function(e, t) {
        return {
            x: e.x - t.x,
            y: e.y - t.y
        };
    };
    e.fn.owlCarousel = function(t) {
        var i = Array.prototype.slice.call(arguments, 1);
        return this.each(function() {
            var n = e(this), s = n.data("owl.carousel");
            if (!s) {
                s = new r(this, typeof t == "object" && t);
                n.data("owl.carousel", s);
                e.each([ "next", "prev", "to", "destroy", "refresh", "replace", "add", "remove" ], function(t, i) {
                    s.register({
                        type: r.Type.Event,
                        name: i
                    });
                    s.$element.on(i + ".owl.carousel.core", e.proxy(function(e) {
                        if (e.namespace && e.relatedTarget !== this) {
                            this.suppress([ i ]);
                            s[i].apply(this, [].slice.call(arguments, 1));
                            this.release([ i ]);
                        }
                    }, s));
                });
            }
            if (typeof t == "string" && t.charAt(0) !== "_") {
                s[t].apply(s, i);
            }
        });
    };
    e.fn.owlCarousel.Constructor = r;
})(window.Zepto || window.jQuery, window, document);

(function(e, t, i, n) {
    var r = function(t) {
        this._core = t;
        this._interval = null;
        this._visible = null;
        this._handlers = {
            "initialized.owl.carousel": e.proxy(function(e) {
                if (e.namespace && this._core.settings.autoRefresh) {
                    this.watch();
                }
            }, this)
        };
        this._core.options = e.extend({}, r.Defaults, this._core.options);
        this._core.$element.on(this._handlers);
    };
    r.Defaults = {
        autoRefresh: true,
        autoRefreshInterval: 500
    };
    r.prototype.watch = function() {
        if (this._interval) {
            return;
        }
        this._visible = this._core.$element.is(":visible");
        this._interval = t.setInterval(e.proxy(this.refresh, this), this._core.settings.autoRefreshInterval);
    };
    r.prototype.refresh = function() {
        if (this._core.$element.is(":visible") === this._visible) {
            return;
        }
        this._visible = !this._visible;
        this._core.$element.toggleClass("owl-hidden", !this._visible);
        this._visible && (this._core.invalidate("width") && this._core.refresh());
    };
    r.prototype.destroy = function() {
        var e, i;
        t.clearInterval(this._interval);
        for (e in this._handlers) {
            this._core.$element.off(e, this._handlers[e]);
        }
        for (i in Object.getOwnPropertyNames(this)) {
            typeof this[i] != "function" && (this[i] = null);
        }
    };
    e.fn.owlCarousel.Constructor.Plugins.AutoRefresh = r;
})(window.Zepto || window.jQuery, window, document);

(function(e, t, i, n) {
    var r = function(t) {
        this._core = t;
        this._loaded = [];
        this._handlers = {
            "initialized.owl.carousel change.owl.carousel resized.owl.carousel": e.proxy(function(t) {
                if (!t.namespace) {
                    return;
                }
                if (!this._core.settings || !this._core.settings.lazyLoad) {
                    return;
                }
                if (t.property && t.property.name == "position" || t.type == "initialized") {
                    var i = this._core.settings, r = i.center && Math.ceil(i.items / 2) || i.items, s = i.center && r * -1 || 0, o = (t.property && t.property.value !== n ? t.property.value : this._core.current()) + s, a = this._core.clones().length, l = e.proxy(function(e, t) {
                        this.load(t);
                    }, this);
                    while (s++ < r) {
                        this.load(a / 2 + this._core.relative(o));
                        a && e.each(this._core.clones(this._core.relative(o)), l);
                        o++;
                    }
                }
            }, this)
        };
        this._core.options = e.extend({}, r.Defaults, this._core.options);
        this._core.$element.on(this._handlers);
    };
    r.Defaults = {
        lazyLoad: false
    };
    r.prototype.load = function(i) {
        var n = this._core.$stage.children().eq(i), r = n && n.find(".owl-lazy");
        if (!r || e.inArray(n.get(0), this._loaded) > -1) {
            return;
        }
        r.each(e.proxy(function(i, n) {
            var r = e(n), s, o = t.devicePixelRatio > 1 && r.attr("data-src-retina") || r.attr("data-src");
            this._core.trigger("load", {
                element: r,
                url: o
            }, "lazy");
            if (r.is("img")) {
                r.one("load.owl.lazy", e.proxy(function() {
                    r.css("opacity", 1);
                    this._core.trigger("loaded", {
                        element: r,
                        url: o
                    }, "lazy");
                }, this)).attr("src", o);
            } else {
                s = new Image();
                s.onload = e.proxy(function() {
                    r.css({
                        "background-image": 'url("' + o + '")',
                        opacity: "1"
                    });
                    this._core.trigger("loaded", {
                        element: r,
                        url: o
                    }, "lazy");
                }, this);
                s.src = o;
            }
        }, this));
        this._loaded.push(n.get(0));
    };
    r.prototype.destroy = function() {
        var e, t;
        for (e in this.handlers) {
            this._core.$element.off(e, this.handlers[e]);
        }
        for (t in Object.getOwnPropertyNames(this)) {
            typeof this[t] != "function" && (this[t] = null);
        }
    };
    e.fn.owlCarousel.Constructor.Plugins.Lazy = r;
})(window.Zepto || window.jQuery, window, document);

(function(e, t, i, n) {
    var r = function(t) {
        this._core = t;
        this._handlers = {
            "initialized.owl.carousel refreshed.owl.carousel": e.proxy(function(e) {
                if (e.namespace && this._core.settings.autoHeight) {
                    this.update();
                }
            }, this),
            "changed.owl.carousel": e.proxy(function(e) {
                if (e.namespace && this._core.settings.autoHeight && e.property.name == "position") {
                    this.update();
                }
            }, this),
            "loaded.owl.lazy": e.proxy(function(e) {
                if (e.namespace && this._core.settings.autoHeight && e.element.closest("." + this._core.settings.itemClass).index() === this._core.current()) {
                    this.update();
                }
            }, this)
        };
        this._core.options = e.extend({}, r.Defaults, this._core.options);
        this._core.$element.on(this._handlers);
    };
    r.Defaults = {
        autoHeight: false,
        autoHeightClass: "owl-height"
    };
    r.prototype.update = function() {
        var t = this._core._current, i = t + this._core.settings.items, n = this._core.$stage.children().toArray().slice(t, i), r = [], s = 0;
        e.each(n, function(t, i) {
            r.push(e(i).height());
        });
        s = Math.max.apply(null, r);
        this._core.$stage.parent().height(s).addClass(this._core.settings.autoHeightClass);
    };
    r.prototype.destroy = function() {
        var e, t;
        for (e in this._handlers) {
            this._core.$element.off(e, this._handlers[e]);
        }
        for (t in Object.getOwnPropertyNames(this)) {
            typeof this[t] != "function" && (this[t] = null);
        }
    };
    e.fn.owlCarousel.Constructor.Plugins.AutoHeight = r;
})(window.Zepto || window.jQuery, window, document);

(function(e, t, i, n) {
    var r = function(t) {
        this._core = t;
        this._videos = {};
        this._playing = null;
        this._handlers = {
            "initialized.owl.carousel": e.proxy(function(e) {
                if (e.namespace) {
                    this._core.register({
                        type: "state",
                        name: "playing",
                        tags: [ "interacting" ]
                    });
                }
            }, this),
            "resize.owl.carousel": e.proxy(function(e) {
                if (e.namespace && this._core.settings.video && this.isInFullScreen()) {
                    e.preventDefault();
                }
            }, this),
            "refreshed.owl.carousel": e.proxy(function(e) {
                if (e.namespace && this._core.is("resizing")) {
                    this._core.$stage.find(".cloned .owl-video-frame").remove();
                }
            }, this),
            "changed.owl.carousel": e.proxy(function(e) {
                if (e.namespace && e.property.name === "position" && this._playing) {
                    this.stop();
                }
            }, this),
            "prepared.owl.carousel": e.proxy(function(t) {
                if (!t.namespace) {
                    return;
                }
                var i = e(t.content).find(".owl-video");
                if (i.length) {
                    i.css("display", "none");
                    this.fetch(i, e(t.content));
                }
            }, this)
        };
        this._core.options = e.extend({}, r.Defaults, this._core.options);
        this._core.$element.on(this._handlers);
        this._core.$element.on("click.owl.video", ".owl-video-play-icon", e.proxy(function(e) {
            this.play(e);
        }, this));
    };
    r.Defaults = {
        video: false,
        videoHeight: false,
        videoWidth: false
    };
    r.prototype.fetch = function(e, t) {
        var i = function() {
            if (e.attr("data-vimeo-id")) {
                return "vimeo";
            } else if (e.attr("data-vzaar-id")) {
                return "vzaar";
            } else {
                return "youtube";
            }
        }(), n = e.attr("data-vimeo-id") || e.attr("data-youtube-id") || e.attr("data-vzaar-id"), r = e.attr("data-width") || this._core.settings.videoWidth, s = e.attr("data-height") || this._core.settings.videoHeight, o = e.attr("href");
        if (o) {
            n = o.match(/(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/);
            if (n[3].indexOf("youtu") > -1) {
                i = "youtube";
            } else if (n[3].indexOf("vimeo") > -1) {
                i = "vimeo";
            } else if (n[3].indexOf("vzaar") > -1) {
                i = "vzaar";
            } else {
                throw new Error("Video URL not supported.");
            }
            n = n[6];
        } else {
            throw new Error("Missing video URL.");
        }
        this._videos[o] = {
            type: i,
            id: n,
            width: r,
            height: s
        };
        t.attr("data-video", o);
        this.thumbnail(e, this._videos[o]);
    };
    r.prototype.thumbnail = function(t, i) {
        var n, r, s, o = i.width && i.height ? 'style="width:' + i.width + "px;height:" + i.height + 'px;"' : "", a = t.find("img"), l = "src", d = "", c = this._core.settings, p = function(e) {
            r = '<div class="owl-video-play-icon"></div>';
            if (c.lazyLoad) {
                n = '<div class="owl-video-tn ' + d + '" ' + l + '="' + e + '"></div>';
            } else {
                n = '<div class="owl-video-tn" style="opacity:1;background-image:url(' + e + ')"></div>';
            }
            t.after(n);
            t.after(r);
        };
        t.wrap('<div class="owl-video-wrapper"' + o + "></div>");
        if (this._core.settings.lazyLoad) {
            l = "data-src";
            d = "owl-lazy";
        }
        if (a.length) {
            p(a.attr(l));
            a.remove();
            return false;
        }
        if (i.type === "youtube") {
            s = "//img.youtube.com/vi/" + i.id + "/hqdefault.jpg";
            p(s);
        } else if (i.type === "vimeo") {
            e.ajax({
                type: "GET",
                url: "//vimeo.com/api/v2/video/" + i.id + ".json",
                jsonp: "callback",
                dataType: "jsonp",
                success: function(e) {
                    s = e[0].thumbnail_large;
                    p(s);
                }
            });
        } else if (i.type === "vzaar") {
            e.ajax({
                type: "GET",
                url: "//vzaar.com/api/videos/" + i.id + ".json",
                jsonp: "callback",
                dataType: "jsonp",
                success: function(e) {
                    s = e.framegrab_url;
                    p(s);
                }
            });
        }
    };
    r.prototype.stop = function() {
        this._core.trigger("stop", null, "video");
        this._playing.find(".owl-video-frame").remove();
        this._playing.removeClass("owl-video-playing");
        this._playing = null;
        this._core.leave("playing");
        this._core.trigger("stopped", null, "video");
    };
    r.prototype.play = function(t) {
        var i = e(t.target), n = i.closest("." + this._core.settings.itemClass), r = this._videos[n.attr("data-video")], s = r.width || "100%", o = r.height || this._core.$stage.height(), a;
        if (this._playing) {
            return;
        }
        this._core.enter("playing");
        this._core.trigger("play", null, "video");
        n = this._core.items(this._core.relative(n.index()));
        this._core.reset(n.index());
        if (r.type === "youtube") {
            a = '<iframe width="' + s + '" height="' + o + '" src="//www.youtube.com/embed/' + r.id + "?autoplay=1&rel=0&v=" + r.id + '" frameborder="0" allowfullscreen></iframe>';
        } else if (r.type === "vimeo") {
            a = '<iframe src="//player.vimeo.com/video/' + r.id + '?autoplay=1" width="' + s + '" height="' + o + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
        } else if (r.type === "vzaar") {
            a = '<iframe frameborder="0"' + 'height="' + o + '"' + 'width="' + s + '" allowfullscreen mozallowfullscreen webkitAllowFullScreen ' + 'src="//view.vzaar.com/' + r.id + '/player?autoplay=true"></iframe>';
        }
        e('<div class="owl-video-frame">' + a + "</div>").insertAfter(n.find(".owl-video"));
        this._playing = n.addClass("owl-video-playing");
    };
    r.prototype.isInFullScreen = function() {
        var t = i.fullscreenElement || i.mozFullScreenElement || i.webkitFullscreenElement;
        return t && e(t).parent().hasClass("owl-video-frame");
    };
    r.prototype.destroy = function() {
        var e, t;
        this._core.$element.off("click.owl.video");
        for (e in this._handlers) {
            this._core.$element.off(e, this._handlers[e]);
        }
        for (t in Object.getOwnPropertyNames(this)) {
            typeof this[t] != "function" && (this[t] = null);
        }
    };
    e.fn.owlCarousel.Constructor.Plugins.Video = r;
})(window.Zepto || window.jQuery, window, document);

(function(e, t, i, n) {
    var r = function(t) {
        this.core = t;
        this.core.options = e.extend({}, r.Defaults, this.core.options);
        this.swapping = true;
        this.previous = n;
        this.next = n;
        this.handlers = {
            "change.owl.carousel": e.proxy(function(e) {
                if (e.namespace && e.property.name == "position") {
                    this.previous = this.core.current();
                    this.next = e.property.value;
                }
            }, this),
            "drag.owl.carousel dragged.owl.carousel translated.owl.carousel": e.proxy(function(e) {
                if (e.namespace) {
                    this.swapping = e.type == "translated";
                }
            }, this),
            "translate.owl.carousel": e.proxy(function(e) {
                if (e.namespace && this.swapping && (this.core.options.animateOut || this.core.options.animateIn)) {
                    this.swap();
                }
            }, this)
        };
        this.core.$element.on(this.handlers);
    };
    r.Defaults = {
        animateOut: false,
        animateIn: false
    };
    r.prototype.swap = function() {
        if (this.core.settings.items !== 1) {
            return;
        }
        if (!e.support.animation || !e.support.transition) {
            return;
        }
        this.core.speed(0);
        var t, i = e.proxy(this.clear, this), n = this.core.$stage.children().eq(this.previous), r = this.core.$stage.children().eq(this.next), s = this.core.settings.animateIn, o = this.core.settings.animateOut;
        if (this.core.current() === this.previous) {
            return;
        }
        if (o) {
            t = this.core.coordinates(this.previous) - this.core.coordinates(this.next);
            n.one(e.support.animation.end, i).css({
                left: t + "px"
            }).addClass("animated owl-animated-out").addClass(o);
        }
        if (s) {
            r.one(e.support.animation.end, i).addClass("animated owl-animated-in").addClass(s);
        }
    };
    r.prototype.clear = function(t) {
        e(t.target).css({
            left: ""
        }).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut);
        this.core.onTransitionEnd();
    };
    r.prototype.destroy = function() {
        var e, t;
        for (e in this.handlers) {
            this.core.$element.off(e, this.handlers[e]);
        }
        for (t in Object.getOwnPropertyNames(this)) {
            typeof this[t] != "function" && (this[t] = null);
        }
    };
    e.fn.owlCarousel.Constructor.Plugins.Animate = r;
})(window.Zepto || window.jQuery, window, document);

(function(e, t, i, n) {
    var r = function(t) {
        this._core = t;
        this._timeout = null;
        this._paused = false;
        this._handlers = {
            "changed.owl.carousel": e.proxy(function(e) {
                if (e.namespace && e.property.name === "settings") {
                    if (this._core.settings.autoplay) {
                        this.play();
                    } else {
                        this.stop();
                    }
                } else if (e.namespace && e.property.name === "position") {
                    if (this._core.settings.autoplay) {
                        this._setAutoPlayInterval();
                    }
                }
            }, this),
            "initialized.owl.carousel": e.proxy(function(e) {
                if (e.namespace && this._core.settings.autoplay) {
                    this.play();
                }
            }, this),
            "play.owl.autoplay": e.proxy(function(e, t, i) {
                if (e.namespace) {
                    this.play(t, i);
                }
            }, this),
            "stop.owl.autoplay": e.proxy(function(e) {
                if (e.namespace) {
                    this.stop();
                }
            }, this),
            "mouseover.owl.autoplay": e.proxy(function() {
                if (this._core.settings.autoplayHoverPause && this._core.is("rotating")) {
                    this.pause();
                }
            }, this),
            "mouseleave.owl.autoplay": e.proxy(function() {
                if (this._core.settings.autoplayHoverPause && this._core.is("rotating")) {
                    this.play();
                }
            }, this),
            "touchstart.owl.core": e.proxy(function() {
                if (this._core.settings.autoplayHoverPause && this._core.is("rotating")) {
                    this.pause();
                }
            }, this),
            "touchend.owl.core": e.proxy(function() {
                if (this._core.settings.autoplayHoverPause) {
                    this.play();
                }
            }, this)
        };
        this._core.$element.on(this._handlers);
        this._core.options = e.extend({}, r.Defaults, this._core.options);
    };
    r.Defaults = {
        autoplay: false,
        autoplayTimeout: 5e3,
        autoplayHoverPause: false,
        autoplaySpeed: false
    };
    r.prototype.play = function(e, t) {
        this._paused = false;
        if (this._core.is("rotating")) {
            return;
        }
        this._core.enter("rotating");
        this._setAutoPlayInterval();
    };
    r.prototype._getNextTimeout = function(n, r) {
        if (this._timeout) {
            t.clearTimeout(this._timeout);
        }
        return t.setTimeout(e.proxy(function() {
            if (this._paused || this._core.is("busy") || this._core.is("interacting") || i.hidden) {
                return;
            }
            this._core.next(r || this._core.settings.autoplaySpeed);
        }, this), n || this._core.settings.autoplayTimeout);
    };
    r.prototype._setAutoPlayInterval = function() {
        this._timeout = this._getNextTimeout();
    };
    r.prototype.stop = function() {
        if (!this._core.is("rotating")) {
            return;
        }
        t.clearTimeout(this._timeout);
        this._core.leave("rotating");
    };
    r.prototype.pause = function() {
        if (!this._core.is("rotating")) {
            return;
        }
        this._paused = true;
    };
    r.prototype.destroy = function() {
        var e, t;
        this.stop();
        for (e in this._handlers) {
            this._core.$element.off(e, this._handlers[e]);
        }
        for (t in Object.getOwnPropertyNames(this)) {
            typeof this[t] != "function" && (this[t] = null);
        }
    };
    e.fn.owlCarousel.Constructor.Plugins.autoplay = r;
})(window.Zepto || window.jQuery, window, document);

(function(e, t, i, n) {
    "use strict";
    var r = function(t) {
        this._core = t;
        this._initialized = false;
        this._pages = [];
        this._controls = {};
        this._templates = [];
        this.$element = this._core.$element;
        this._overrides = {
            next: this._core.next,
            prev: this._core.prev,
            to: this._core.to
        };
        this._handlers = {
            "prepared.owl.carousel": e.proxy(function(t) {
                if (t.namespace && this._core.settings.dotsData) {
                    this._templates.push('<div class="' + this._core.settings.dotClass + '">' + e(t.content).find("[data-dot]").addBack("[data-dot]").attr("data-dot") + "</div>");
                }
            }, this),
            "added.owl.carousel": e.proxy(function(e) {
                if (e.namespace && this._core.settings.dotsData) {
                    this._templates.splice(e.position, 0, this._templates.pop());
                }
            }, this),
            "remove.owl.carousel": e.proxy(function(e) {
                if (e.namespace && this._core.settings.dotsData) {
                    this._templates.splice(e.position, 1);
                }
            }, this),
            "changed.owl.carousel": e.proxy(function(e) {
                if (e.namespace && e.property.name == "position") {
                    this.draw();
                }
            }, this),
            "initialized.owl.carousel": e.proxy(function(e) {
                if (e.namespace && !this._initialized) {
                    this._core.trigger("initialize", null, "navigation");
                    this.initialize();
                    this.update();
                    this.draw();
                    this._initialized = true;
                    this._core.trigger("initialized", null, "navigation");
                }
            }, this),
            "refreshed.owl.carousel": e.proxy(function(e) {
                if (e.namespace && this._initialized) {
                    this._core.trigger("refresh", null, "navigation");
                    this.update();
                    this.draw();
                    this._core.trigger("refreshed", null, "navigation");
                }
            }, this)
        };
        this._core.options = e.extend({}, r.Defaults, this._core.options);
        this.$element.on(this._handlers);
    };
    r.Defaults = {
        nav: false,
        navText: [ "prev", "next" ],
        navSpeed: false,
        navElement: "div",
        navContainer: false,
        navContainerClass: "owl-nav",
        navClass: [ "owl-prev", "owl-next" ],
        slideBy: 1,
        dotClass: "owl-dot",
        dotsClass: "owl-dots",
        dots: true,
        dotsEach: false,
        dotsData: false,
        dotsSpeed: false,
        dotsContainer: false
    };
    r.prototype.initialize = function() {
        var t, i = this._core.settings;
        this._controls.$relative = (i.navContainer ? e(i.navContainer) : e("<div>").addClass(i.navContainerClass).appendTo(this.$element)).addClass("disabled");
        this._controls.$previous = e("<" + i.navElement + ">").addClass(i.navClass[0]).html(i.navText[0]).prependTo(this._controls.$relative).on("click", e.proxy(function(e) {
            this.prev(i.navSpeed);
        }, this));
        this._controls.$next = e("<" + i.navElement + ">").addClass(i.navClass[1]).html(i.navText[1]).appendTo(this._controls.$relative).on("click", e.proxy(function(e) {
            this.next(i.navSpeed);
        }, this));
        if (!i.dotsData) {
            this._templates = [ e("<div>").addClass(i.dotClass).append(e("<span>")).prop("outerHTML") ];
        }
        this._controls.$absolute = (i.dotsContainer ? e(i.dotsContainer) : e("<div>").addClass(i.dotsClass).appendTo(this.$element)).addClass("disabled");
        this._controls.$absolute.on("click", "div", e.proxy(function(t) {
            var n = e(t.target).parent().is(this._controls.$absolute) ? e(t.target).index() : e(t.target).parent().index();
            t.preventDefault();
            this.to(n, i.dotsSpeed);
        }, this));
        for (t in this._overrides) {
            this._core[t] = e.proxy(this[t], this);
        }
    };
    r.prototype.destroy = function() {
        var e, t, i, n;
        for (e in this._handlers) {
            this.$element.off(e, this._handlers[e]);
        }
        for (t in this._controls) {
            this._controls[t].remove();
        }
        for (n in this.overides) {
            this._core[n] = this._overrides[n];
        }
        for (i in Object.getOwnPropertyNames(this)) {
            typeof this[i] != "function" && (this[i] = null);
        }
    };
    r.prototype.update = function() {
        var e, t, i, n = this._core.clones().length / 2, r = n + this._core.items().length, s = this._core.maximum(true), o = this._core.settings, a = o.center || o.autoWidth || o.dotsData ? 1 : o.dotsEach || o.items;
        if (o.slideBy !== "page") {
            o.slideBy = Math.min(o.slideBy, o.items);
        }
        if (o.dots || o.slideBy == "page") {
            this._pages = [];
            for (e = n, t = 0, i = 0; e < r; e++) {
                if (t >= a || t === 0) {
                    this._pages.push({
                        start: Math.min(s, e - n),
                        end: e - n + a - 1
                    });
                    if (Math.min(s, e - n) === s) {
                        break;
                    }
                    t = 0, ++i;
                }
                t += this._core.mergers(this._core.relative(e));
            }
        }
    };
    r.prototype.draw = function() {
        var t, i = this._core.settings, n = this._core.items().length <= i.items, r = this._core.relative(this._core.current()), s = i.loop || i.rewind;
        this._controls.$relative.toggleClass("disabled", !i.nav || n);
        if (i.nav) {
            this._controls.$previous.toggleClass("disabled", !s && r <= this._core.minimum(true));
            this._controls.$next.toggleClass("disabled", !s && r >= this._core.maximum(true));
        }
        this._controls.$absolute.toggleClass("disabled", !i.dots || n);
        if (i.dots) {
            t = this._pages.length - this._controls.$absolute.children().length;
            if (i.dotsData && t !== 0) {
                this._controls.$absolute.html(this._templates.join(""));
            } else if (t > 0) {
                this._controls.$absolute.append(new Array(t + 1).join(this._templates[0]));
            } else if (t < 0) {
                this._controls.$absolute.children().slice(t).remove();
            }
            this._controls.$absolute.find(".active").removeClass("active");
            this._controls.$absolute.children().eq(e.inArray(this.current(), this._pages)).addClass("active");
        }
    };
    r.prototype.onTrigger = function(t) {
        var i = this._core.settings;
        t.page = {
            index: e.inArray(this.current(), this._pages),
            count: this._pages.length,
            size: i && (i.center || i.autoWidth || i.dotsData ? 1 : i.dotsEach || i.items)
        };
    };
    r.prototype.current = function() {
        var t = this._core.relative(this._core.current());
        return e.grep(this._pages, e.proxy(function(e, i) {
            return e.start <= t && e.end >= t;
        }, this)).pop();
    };
    r.prototype.getPosition = function(t) {
        var i, n, r = this._core.settings;
        if (r.slideBy == "page") {
            i = e.inArray(this.current(), this._pages);
            n = this._pages.length;
            t ? ++i : --i;
            i = this._pages[(i % n + n) % n].start;
        } else {
            i = this._core.relative(this._core.current());
            n = this._core.items().length;
            t ? i += r.slideBy : i -= r.slideBy;
        }
        return i;
    };
    r.prototype.next = function(t) {
        e.proxy(this._overrides.to, this._core)(this.getPosition(true), t);
    };
    r.prototype.prev = function(t) {
        e.proxy(this._overrides.to, this._core)(this.getPosition(false), t);
    };
    r.prototype.to = function(t, i, n) {
        var r;
        if (!n && this._pages.length) {
            r = this._pages.length;
            e.proxy(this._overrides.to, this._core)(this._pages[(t % r + r) % r].start, i);
        } else {
            e.proxy(this._overrides.to, this._core)(t, i);
        }
    };
    e.fn.owlCarousel.Constructor.Plugins.Navigation = r;
})(window.Zepto || window.jQuery, window, document);

(function(e, t, i, n) {
    "use strict";
    var r = function(i) {
        this._core = i;
        this._hashes = {};
        this.$element = this._core.$element;
        this._handlers = {
            "initialized.owl.carousel": e.proxy(function(i) {
                if (i.namespace && this._core.settings.startPosition === "URLHash") {
                    e(t).trigger("hashchange.owl.navigation");
                }
            }, this),
            "prepared.owl.carousel": e.proxy(function(t) {
                if (t.namespace) {
                    var i = e(t.content).find("[data-hash]").addBack("[data-hash]").attr("data-hash");
                    if (!i) {
                        return;
                    }
                    this._hashes[i] = t.content;
                }
            }, this),
            "changed.owl.carousel": e.proxy(function(i) {
                if (i.namespace && i.property.name === "position") {
                    var n = this._core.items(this._core.relative(this._core.current())), r = e.map(this._hashes, function(e, t) {
                        return e === n ? t : null;
                    }).join();
                    if (!r || t.location.hash.slice(1) === r) {
                        return;
                    }
                    t.location.hash = r;
                }
            }, this)
        };
        this._core.options = e.extend({}, r.Defaults, this._core.options);
        this.$element.on(this._handlers);
        e(t).on("hashchange.owl.navigation", e.proxy(function(e) {
            var i = t.location.hash.substring(1), r = this._core.$stage.children(), s = this._hashes[i] && r.index(this._hashes[i]);
            if (s === n || s === this._core.current()) {
                return;
            }
            this._core.to(this._core.relative(s), false, true);
        }, this));
    };
    r.Defaults = {
        URLhashListener: false
    };
    r.prototype.destroy = function() {
        var i, n;
        e(t).off("hashchange.owl.navigation");
        for (i in this._handlers) {
            this._core.$element.off(i, this._handlers[i]);
        }
        for (n in Object.getOwnPropertyNames(this)) {
            typeof this[n] != "function" && (this[n] = null);
        }
    };
    e.fn.owlCarousel.Constructor.Plugins.Hash = r;
})(window.Zepto || window.jQuery, window, document);

(function(e, t, i, n) {
    var r = e("<support>").get(0).style, s = "Webkit Moz O ms".split(" "), o = {
        transition: {
            end: {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd",
                transition: "transitionend"
            }
        },
        animation: {
            end: {
                WebkitAnimation: "webkitAnimationEnd",
                MozAnimation: "animationend",
                OAnimation: "oAnimationEnd",
                animation: "animationend"
            }
        }
    }, a = {
        csstransforms: function() {
            return !!l("transform");
        },
        csstransforms3d: function() {
            return !!l("perspective");
        },
        csstransitions: function() {
            return !!l("transition");
        },
        cssanimations: function() {
            return !!l("animation");
        }
    };
    function l(t, i) {
        var o = false, a = t.charAt(0).toUpperCase() + t.slice(1);
        e.each((t + " " + s.join(a + " ") + a).split(" "), function(e, t) {
            if (r[t] !== n) {
                o = i ? t : true;
                return false;
            }
        });
        return o;
    }
    function d(e) {
        return l(e, true);
    }
    if (a.csstransitions()) {
        e.support.transition = new String(d("transition"));
        e.support.transition.end = o.transition.end[e.support.transition];
    }
    if (a.cssanimations()) {
        e.support.animation = new String(d("animation"));
        e.support.animation.end = o.animation.end[e.support.animation];
    }
    if (a.csstransforms()) {
        e.support.transform = new String(d("transform"));
        e.support.transform3d = a.csstransforms3d();
    }
})(window.Zepto || window.jQuery, window, document);

$(".collapse_btn").click(function(e) {
    $(this).toggleClass("collapse_btn--is-open");
    var t = $(this).data("target");
    $(t).toggle();
});

$(document).ready(function() {
    $(".js-modal-trigger").click(function(e) {
        e.preventDefault();
        var t = $(this).data("target");
        $(t).toggleClass("modal--active");
    });
});

(function(e, t, i, n) {
    "use strict";
    var r = "starRating";
    var s = function() {};
    var o = {
        totalStars: 5,
        useFullStars: false,
        starShape: "straight",
        emptyColor: "#DDD",
        hoverColor: "orange",
        activeColor: "gold",
        useGradient: true,
        readOnly: false,
        disableAfterRate: false,
        baseUrl: false,
        starGradient: {
            start: "#FFD700",
            end: "#FFD700"
        },
        strokeWidth: 0,
        strokeColor: "black",
        initialRating: 0,
        starSize: 40,
        callback: s,
        onHover: s,
        onLeave: s
    };
    var a = function(t, i) {
        var n;
        this.element = t;
        this.$el = e(t);
        this.settings = e.extend({}, o, i);
        n = this.$el.data("rating") || this.settings.initialRating;
        this._state = {
            rating: (Math.round(n * 2) / 2).toFixed(1)
        };
        this._uid = Math.floor(Math.random() * 999);
        if (!i.starGradient && !this.settings.useGradient) {
            this.settings.starGradient.start = this.settings.starGradient.end = this.settings.activeColor;
        }
        this._defaults = o;
        this._name = r;
        this.init();
    };
    var l = {
        init: function() {
            this.renderMarkup();
            this.addListeners();
            this.initRating();
        },
        addListeners: function() {
            if (this.settings.readOnly) {
                return;
            }
            this.$stars.on("mouseover", this.hoverRating.bind(this));
            this.$stars.on("mouseout", this.restoreState.bind(this));
            this.$stars.on("click", this.handleRating.bind(this));
        },
        hoverRating: function(e) {
            var t = this.getIndex(e);
            this.paintStars(t, "hovered");
            this.settings.onHover(t + 1, this._state.rating, this.$el);
        },
        handleRating: function(e) {
            var t = this.getIndex(e);
            var i = t + 1;
            this.applyRating(i, this.$el);
            this.executeCallback(i, this.$el);
            if (this.settings.disableAfterRate) {
                this.$stars.off();
            }
        },
        applyRating: function(e) {
            var t = e - 1;
            this.paintStars(t, "active");
            this._state.rating = t + 1;
        },
        restoreState: function(e) {
            var t = this.getIndex(e);
            var i = this._state.rating || -1;
            this.paintStars(i - 1, "active");
            this.settings.onLeave(t + 1, this._state.rating, this.$el);
        },
        getIndex: function(t) {
            var i = e(t.currentTarget);
            var n = i.width();
            var r = e(t.target).attr("data-side");
            r = !r ? this.getOffsetByPixel(t, i, n) : r;
            r = this.settings.useFullStars ? "right" : r;
            var s = i.index() - (r === "left" ? .5 : 0);
            s = s < .5 && t.offsetX < n / 4 ? -1 : s;
            return s;
        },
        getOffsetByPixel: function(e, t, i) {
            var n = e.pageX - t.offset().left;
            return n <= i / 2 && !this.settings.useFullStars ? "left" : "right";
        },
        initRating: function() {
            this.paintStars(this._state.rating - 1, "active");
        },
        paintStars: function(t, i) {
            var n;
            var r;
            var s;
            var o;
            e.each(this.$stars, function(a, l) {
                n = e(l).find('[data-side="left"]');
                r = e(l).find('[data-side="right"]');
                s = o = a <= t ? i : "empty";
                s = a - t === .5 ? i : s;
                n.attr("class", "svg-" + s + "-" + this._uid);
                r.attr("class", "svg-" + o + "-" + this._uid);
            }.bind(this));
        },
        renderMarkup: function() {
            var e = this.settings;
            var t = e.baseUrl ? location.href.split("#")[0] : "";
            var i = '<div class="rating_star" style="width:' + e.starSize + "px;  height:" + e.starSize + 'px;"><svg version="1.0" class="rating_star-svg" shape-rendering="geometricPrecision" xmlns="http://www.w3.org/2000/svg" ' + this.getSvgDimensions(e.starShape) + " stroke-width:" + e.strokeWidth + 'px;" xml:space="preserve"><style type="text/css">.svg-empty-' + this._uid + "{fill:url(" + t + "#" + this._uid + "_SVGID_1_);}.svg-hovered-" + this._uid + "{fill:url(" + t + "#" + this._uid + "_SVGID_2_);}.svg-active-" + this._uid + "{fill:url(" + t + "#" + this._uid + "_SVGID_3_);}</style>" + this.getLinearGradient(this._uid + "_SVGID_1_", e.emptyColor, e.emptyColor, e.starShape) + this.getLinearGradient(this._uid + "_SVGID_2_", e.hoverColor, e.hoverColor, e.starShape) + this.getLinearGradient(this._uid + "_SVGID_3_", e.starGradient.start, e.starGradient.end, e.starShape) + this.getVectorPath(this._uid, {
                starShape: e.starShape,
                strokeWidth: e.strokeWidth,
                strokeColor: e.strokeColor
            }) + "</svg></div>";
            var n = "";
            for (var r = 0; r < e.totalStars; r++) {
                n += i;
            }
            this.$el.append(n);
            this.$stars = this.$el.find(".rating_star");
        },
        getVectorPath: function(e, t) {
            return t.starShape === "rounded" ? this.getRoundedVectorPath(e, t) : this.getSpikeVectorPath(e, t);
        },
        getSpikeVectorPath: function(e, t) {
            return '<polygon data-side="center" class="svg-empty-' + e + '" points="281.1,129.8 364,55.7 255.5,46.8 214,-59 172.5,46.8 64,55.4 146.8,129.7 121.1,241 212.9,181.1 213.9,181 306.5,241 " style="fill: transparent; stroke: ' + t.strokeColor + ';" />' + '<polygon data-side="left" class="svg-empty-' + e + '" points="281.1,129.8 364,55.7 255.5,46.8 214,-59 172.5,46.8 64,55.4 146.8,129.7 121.1,241 213.9,181.1 213.9,181 306.5,241 " style="stroke-opacity: 0;" />' + '<polygon data-side="right" class="svg-empty-' + e + '" points="364,55.7 255.5,46.8 214,-59 213.9,181 306.5,241 281.1,129.8 " style="stroke-opacity: 0;" />';
        },
        getRoundedVectorPath: function(e, t) {
            var i = "M520.9,336.5c-3.8-11.8-14.2-20.5-26.5-22.2l-140.9-20.5l-63-127.7 c-5.5-11.2-16.8-18.2-29.3-18.2c-12.5,0-23.8,7-29.3,18.2l-63,127.7L28,314.2C15.7,316,5.4,324.7,1.6,336.5S1,361.3,9.9,370 l102,99.4l-24,140.3c-2.1,12.3,2.9,24.6,13,32c5.7,4.2,12.4,6.2,19.2,6.2c5.2,0,10.5-1.2,15.2-3.8l126-66.3l126,66.2 c4.8,2.6,10,3.8,15.2,3.8c6.8,0,13.5-2.1,19.2-6.2c10.1-7.3,15.1-19.7,13-32l-24-140.3l102-99.4 C521.6,361.3,524.8,348.3,520.9,336.5z";
            return '<path data-side="center" class="svg-empty-' + e + '" d="' + i + '" style="stroke: ' + t.strokeColor + '; fill: transparent; " /><path data-side="right" class="svg-empty-' + e + '" d="' + i + '" style="stroke-opacity: 0;" /><path data-side="left" class="svg-empty-' + e + '" d="M121,648c-7.3,0-14.1-2.2-19.8-6.4c-10.4-7.6-15.6-20.3-13.4-33l24-139.9l-101.6-99 c-9.1-8.9-12.4-22.4-8.6-34.5c3.9-12.1,14.6-21.1,27.2-23l140.4-20.4L232,164.6c5.7-11.6,17.3-18.8,30.2-16.8c0.6,0,1,0.4,1,1 v430.1c0,0.4-0.2,0.7-0.5,0.9l-126,66.3C132,646.6,126.6,648,121,648z" style="stroke: ' + t.strokeColor + '; stroke-opacity: 0;" />';
        },
        getSvgDimensions: function(e) {
            return e === "rounded" ? 'width="550px" height="500.2px" viewBox="0 146.8 550 500.2" style="enable-background:new 0 0 550 500.2;' : 'x="0px" y="0px" width="305px" height="305px" viewBox="60 -62 309 309" style="enable-background:new 64 -59 305 305;';
        },
        getLinearGradient: function(e, t, i, n) {
            var r = n === "rounded" ? 500 : 250;
            return '<linearGradient id="' + e + '" gradientUnits="userSpaceOnUse" x1="0" y1="-50" x2="0" y2="' + r + '"><stop  offset="0" style="stop-color:' + t + '"/><stop  offset="1" style="stop-color:' + i + '"/> </linearGradient>';
        },
        executeCallback: function(e, t) {
            var i = this.settings.callback;
            i(e, t);
        }
    };
    var d = {
        unload: function() {
            var t = "plugin_" + r;
            var i = e(this);
            var n = i.data(t).$stars;
            n.off();
            i.removeData(t).remove();
        },
        setRating: function(t, i) {
            var n = "plugin_" + r;
            var s = e(this);
            var o = s.data(n);
            if (t > o.settings.totalStars || t < 0) {
                return;
            }
            if (i) {
                t = Math.round(t);
            }
            o.applyRating(t);
        },
        getRating: function() {
            var t = "plugin_" + r;
            var i = e(this);
            var n = i.data(t);
            return n._state.rating;
        },
        resize: function(t) {
            var i = "plugin_" + r;
            var n = e(this);
            var s = n.data(i);
            var o = s.$stars;
            if (t <= 1 || t > 200) {
                console.log("star size out of bounds");
                return;
            }
            o = Array.prototype.slice.call(o);
            o.forEach(function(i) {
                e(i).css({
                    width: t + "px",
                    height: t + "px"
                });
            });
        },
        setReadOnly: function(t) {
            var i = "plugin_" + r;
            var n = e(this);
            var s = n.data(i);
            if (t === true) {
                s.$stars.off("mouseover mouseout click");
            } else {
                s.settings.readOnly = false;
                s.addListeners();
            }
        }
    };
    e.extend(a.prototype, l);
    e.fn[r] = function(t) {
        if (!e.isPlainObject(t)) {
            if (d.hasOwnProperty(t)) {
                return d[t].apply(this, Array.prototype.slice.call(arguments, 1));
            } else {
                e.error("Method " + t + " does not exist on " + r + ".js");
            }
        }
        return this.each(function() {
            if (!e.data(this, "plugin_" + r)) {
                e.data(this, "plugin_" + r, new a(this, t));
            }
        });
    };
})(jQuery, window, document);

"use strict";

(function(e) {
    if (typeof define === "function" && define.amd) {
        define([ "jquery" ], e);
    } else if (typeof exports === "object") {
        module.exports = e(require("jquery"));
    } else {
        e(jQuery);
    }
})(function(e) {
    var t;
    var i;
    var n = function(t, i) {
        this.$el = t;
        this.options = e.extend({}, n.rules.defaults, n.rules[i.rule] || {}, i);
        this.min = Number(this.options.min) || 0;
        this.max = Number(this.options.max) || 0;
        this.$el.on({
            "focus.spinner": e.proxy(function(t) {
                t.preventDefault();
                e(document).trigger("mouseup.spinner");
                this.oldValue = this.value();
            }, this),
            "change.spinner": e.proxy(function(e) {
                e.preventDefault();
                this.value(this.$el.val());
            }, this),
            "keydown.spinner": e.proxy(function(e) {
                var t = {
                    38: "up",
                    40: "down"
                }[e.which];
                if (t) {
                    e.preventDefault();
                    this.spin(t);
                }
            }, this)
        });
        this.oldValue = this.value();
        this.value(this.$el.val());
        return this;
    };
    n.rules = {
        defaults: {
            min: null,
            max: null,
            step: 1,
            precision: 0
        },
        currency: {
            min: 0,
            max: null,
            step: .01,
            precision: 2
        },
        quantity: {
            min: 1,
            max: 999,
            step: 1,
            precision: 0
        },
        percent: {
            min: 1,
            max: 100,
            step: 1,
            precision: 0
        },
        month: {
            min: 1,
            max: 12,
            step: 1,
            precision: 0
        },
        day: {
            min: 1,
            max: 31,
            step: 1,
            precision: 0
        },
        hour: {
            min: 0,
            max: 23,
            step: 1,
            precision: 0
        },
        minute: {
            min: 1,
            max: 59,
            step: 1,
            precision: 0
        },
        second: {
            min: 1,
            max: 59,
            step: 1,
            precision: 0
        }
    };
    n.prototype = {
        spin: function(t) {
            if (this.$el.prop("disabled")) {
                return;
            }
            this.oldValue = this.value();
            var i = e.isFunction(this.options.step) ? this.options.step.call(this, t) : this.options.step;
            var n = t === "up" ? 1 : -1;
            this.value(this.oldValue + Number(i) * n);
        },
        value: function(n) {
            if (n === null || n === undefined) {
                return this.numeric(this.$el.val());
            }
            n = this.numeric(n);
            var r = this.validate(n);
            if (r !== 0) {
                n = r === -1 ? this.min : this.max;
            }
            this.$el.val(n.toFixed(this.options.precision));
            if (this.oldValue !== this.value()) {
                this.$el.trigger("changing.spinner", [ this.value(), this.oldValue ]);
                clearTimeout(t);
                t = setTimeout(e.proxy(function() {
                    this.$el.trigger("changed.spinner", [ this.value(), this.oldValue ]);
                }, this), i.delay);
            }
        },
        numeric: function(e) {
            e = this.options.precision > 0 ? parseFloat(e, 10) : parseInt(e, 10);
            if (isFinite(e)) {
                return e;
            }
            return e || this.options.min || 0;
        },
        validate: function(e) {
            if (this.options.min !== null && e < this.min) {
                return -1;
            }
            if (this.options.max !== null && e > this.max) {
                return 1;
            }
            return 0;
        }
    };
    i = function(t, i) {
        this.$el = e(t);
        this.$spinning = this.$el.find('[data-spin="spinner"]');
        if (this.$spinning.length === 0) {
            this.$spinning = this.$el.find(':input[type="text"]');
        }
        i = e.extend({}, i, this.$spinning.data());
        this.spinning = new n(this.$spinning, i);
        this.$el.on("click.spinner", '[data-spin="up"], [data-spin="down"]', e.proxy(this, "spin")).on("mousedown.spinner", '[data-spin="up"], [data-spin="down"]', e.proxy(this, "spin"));
        e(document).on("mouseup.spinner", e.proxy(function() {
            clearTimeout(this.spinTimeout);
            clearInterval(this.spinInterval);
        }, this));
        if (i.delay) {
            this.delay(i.delay);
        }
        if (i.changed) {
            this.changed(i.changed);
        }
        if (i.changing) {
            this.changing(i.changing);
        }
    };
    i.delay = 500;
    i.prototype = {
        constructor: i,
        spin: function(t) {
            var i = e(t.currentTarget).data("spin");
            switch (t.type) {
              case "click":
                t.preventDefault();
                this.spinning.spin(i);
                break;

              case "mousedown":
                if (t.which === 1) {
                    this.spinTimeout = setTimeout(e.proxy(this, "beginSpin", i), 300);
                }
                break;
            }
        },
        delay: function(e) {
            var t = Number(e);
            if (t >= 0) {
                this.constructor.delay = t + 100;
            }
        },
        value: function() {
            return this.spinning.value();
        },
        changed: function(e) {
            this.bindHandler("changed.spinner", e);
        },
        changing: function(e) {
            this.bindHandler("changing.spinner", e);
        },
        bindHandler: function(t, i) {
            if (e.isFunction(i)) {
                this.$spinning.on(t, i);
            } else {
                this.$spinning.off(t);
            }
        },
        beginSpin: function(t) {
            this.spinInterval = setInterval(e.proxy(this.spinning, "spin", t), 100);
        }
    };
    var r = e.fn.spinner;
    e.fn.spinner = function(t, n) {
        return this.each(function() {
            var r = e.data(this, "spinner");
            if (!r) {
                r = new i(this, t);
                e.data(this, "spinner", r);
            }
            if (t === "delay" || t === "changed" || t === "changing") {
                r[t](n);
            } else if (t === "step" && n) {
                r.spinning.step = n;
            } else if (t === "spin" && n) {
                r.spinning.spin(n);
            }
        });
    };
    e.fn.spinner.Constructor = i;
    e.fn.spinner.noConflict = function() {
        e.fn.spinner = r;
        return this;
    };
    e(function() {
        e('[data-trigger="spinner"]').spinner();
    });
    return e.fn.spinner;
});

$(document).ready(function() {
    $(".js-tabs>.tabs_item").click(function() {
        var e = $(this).data("tab");
        $(".js-tabs>.tabs_item").removeClass("tabs_item--active");
        $(".tabs_pane").removeClass("tabs_pane--active");
        $(this).addClass("tabs_item--active");
        $(e).addClass("tabs_pane--active");
    });
});

(function(e) {
    "use strict";
    if (typeof define === "function" && define.amd) {
        define([ "jquery" ], e);
    } else if (typeof exports !== "undefined") {
        module.exports = e(require("jquery"));
    } else {
        e(jQuery);
    }
})(function(e) {
    "use strict";
    var t = window.Slick || {};
    t = function() {
        var t = 0;
        function i(i, n) {
            var r = this, s;
            r.defaults = {
                accessibility: true,
                adaptiveHeight: false,
                appendArrows: e(i),
                appendDots: e(i),
                arrows: true,
                asNavFor: null,
                prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
                nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',
                autoplay: false,
                autoplaySpeed: 3e3,
                centerMode: false,
                centerPadding: "50px",
                cssEase: "ease",
                customPaging: function(t, i) {
                    return e('<button type="button" data-role="none" role="button" tabindex="0" />').text(i + 1);
                },
                dots: false,
                dotsClass: "slick-dots",
                draggable: true,
                easing: "linear",
                edgeFriction: .35,
                fade: false,
                focusOnSelect: false,
                infinite: true,
                initialSlide: 0,
                lazyLoad: "ondemand",
                mobileFirst: false,
                pauseOnHover: true,
                pauseOnFocus: true,
                pauseOnDotsHover: false,
                respondTo: "window",
                responsive: null,
                rows: 1,
                rtl: false,
                slide: "",
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: true,
                swipeToSlide: false,
                touchMove: true,
                touchThreshold: 5,
                useCSS: true,
                useTransform: true,
                variableWidth: false,
                vertical: false,
                verticalSwiping: false,
                waitForAnimate: true,
                zIndex: 1e3
            };
            r.initials = {
                animating: false,
                dragging: false,
                autoPlayTimer: null,
                currentDirection: 0,
                currentLeft: null,
                currentSlide: 0,
                direction: 1,
                $dots: null,
                listWidth: null,
                listHeight: null,
                loadIndex: 0,
                $nextArrow: null,
                $prevArrow: null,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: false,
                slideOffset: 0,
                swipeLeft: null,
                $list: null,
                touchObject: {},
                transformsEnabled: false,
                unslicked: false
            };
            e.extend(r, r.initials);
            r.activeBreakpoint = null;
            r.animType = null;
            r.animProp = null;
            r.breakpoints = [];
            r.breakpointSettings = [];
            r.cssTransitions = false;
            r.focussed = false;
            r.interrupted = false;
            r.hidden = "hidden";
            r.paused = true;
            r.positionProp = null;
            r.respondTo = null;
            r.rowCount = 1;
            r.shouldClick = true;
            r.$slider = e(i);
            r.$slidesCache = null;
            r.transformType = null;
            r.transitionType = null;
            r.visibilityChange = "visibilitychange";
            r.windowWidth = 0;
            r.windowTimer = null;
            s = e(i).data("slick") || {};
            r.options = e.extend({}, r.defaults, n, s);
            r.currentSlide = r.options.initialSlide;
            r.originalSettings = r.options;
            if (typeof document.mozHidden !== "undefined") {
                r.hidden = "mozHidden";
                r.visibilityChange = "mozvisibilitychange";
            } else if (typeof document.webkitHidden !== "undefined") {
                r.hidden = "webkitHidden";
                r.visibilityChange = "webkitvisibilitychange";
            }
            r.autoPlay = e.proxy(r.autoPlay, r);
            r.autoPlayClear = e.proxy(r.autoPlayClear, r);
            r.autoPlayIterator = e.proxy(r.autoPlayIterator, r);
            r.changeSlide = e.proxy(r.changeSlide, r);
            r.clickHandler = e.proxy(r.clickHandler, r);
            r.selectHandler = e.proxy(r.selectHandler, r);
            r.setPosition = e.proxy(r.setPosition, r);
            r.swipeHandler = e.proxy(r.swipeHandler, r);
            r.dragHandler = e.proxy(r.dragHandler, r);
            r.keyHandler = e.proxy(r.keyHandler, r);
            r.instanceUid = t++;
            r.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/;
            r.registerBreakpoints();
            r.init(true);
        }
        return i;
    }();
    t.prototype.activateADA = function() {
        var e = this;
        e.$slideTrack.find(".slick-active").attr({
            "aria-hidden": "false"
        }).find("a, input, button, select").attr({
            tabindex: "0"
        });
    };
    t.prototype.addSlide = t.prototype.slickAdd = function(t, i, n) {
        var r = this;
        if (typeof i === "boolean") {
            n = i;
            i = null;
        } else if (i < 0 || i >= r.slideCount) {
            return false;
        }
        r.unload();
        if (typeof i === "number") {
            if (i === 0 && r.$slides.length === 0) {
                e(t).appendTo(r.$slideTrack);
            } else if (n) {
                e(t).insertBefore(r.$slides.eq(i));
            } else {
                e(t).insertAfter(r.$slides.eq(i));
            }
        } else {
            if (n === true) {
                e(t).prependTo(r.$slideTrack);
            } else {
                e(t).appendTo(r.$slideTrack);
            }
        }
        r.$slides = r.$slideTrack.children(this.options.slide);
        r.$slideTrack.children(this.options.slide).detach();
        r.$slideTrack.append(r.$slides);
        r.$slides.each(function(t, i) {
            e(i).attr("data-slick-index", t);
        });
        r.$slidesCache = r.$slides;
        r.reinit();
    };
    t.prototype.animateHeight = function() {
        var e = this;
        if (e.options.slidesToShow === 1 && e.options.adaptiveHeight === true && e.options.vertical === false) {
            var t = e.$slides.eq(e.currentSlide).outerHeight(true);
            e.$list.animate({
                height: t
            }, e.options.speed);
        }
    };
    t.prototype.animateSlide = function(t, i) {
        var n = {}, r = this;
        r.animateHeight();
        if (r.options.rtl === true && r.options.vertical === false) {
            t = -t;
        }
        if (r.transformsEnabled === false) {
            if (r.options.vertical === false) {
                r.$slideTrack.animate({
                    left: t
                }, r.options.speed, r.options.easing, i);
            } else {
                r.$slideTrack.animate({
                    top: t
                }, r.options.speed, r.options.easing, i);
            }
        } else {
            if (r.cssTransitions === false) {
                if (r.options.rtl === true) {
                    r.currentLeft = -r.currentLeft;
                }
                e({
                    animStart: r.currentLeft
                }).animate({
                    animStart: t
                }, {
                    duration: r.options.speed,
                    easing: r.options.easing,
                    step: function(e) {
                        e = Math.ceil(e);
                        if (r.options.vertical === false) {
                            n[r.animType] = "translate(" + e + "px, 0px)";
                            r.$slideTrack.css(n);
                        } else {
                            n[r.animType] = "translate(0px," + e + "px)";
                            r.$slideTrack.css(n);
                        }
                    },
                    complete: function() {
                        if (i) {
                            i.call();
                        }
                    }
                });
            } else {
                r.applyTransition();
                t = Math.ceil(t);
                if (r.options.vertical === false) {
                    n[r.animType] = "translate3d(" + t + "px, 0px, 0px)";
                } else {
                    n[r.animType] = "translate3d(0px," + t + "px, 0px)";
                }
                r.$slideTrack.css(n);
                if (i) {
                    setTimeout(function() {
                        r.disableTransition();
                        i.call();
                    }, r.options.speed);
                }
            }
        }
    };
    t.prototype.getNavTarget = function() {
        var t = this, i = t.options.asNavFor;
        if (i && i !== null) {
            i = e(i).not(t.$slider);
        }
        return i;
    };
    t.prototype.asNavFor = function(t) {
        var i = this, n = i.getNavTarget();
        if (n !== null && typeof n === "object") {
            n.each(function() {
                var i = e(this).slick("getSlick");
                if (!i.unslicked) {
                    i.slideHandler(t, true);
                }
            });
        }
    };
    t.prototype.applyTransition = function(e) {
        var t = this, i = {};
        if (t.options.fade === false) {
            i[t.transitionType] = t.transformType + " " + t.options.speed + "ms " + t.options.cssEase;
        } else {
            i[t.transitionType] = "opacity " + t.options.speed + "ms " + t.options.cssEase;
        }
        if (t.options.fade === false) {
            t.$slideTrack.css(i);
        } else {
            t.$slides.eq(e).css(i);
        }
    };
    t.prototype.autoPlay = function() {
        var e = this;
        e.autoPlayClear();
        if (e.slideCount > e.options.slidesToShow) {
            e.autoPlayTimer = setInterval(e.autoPlayIterator, e.options.autoplaySpeed);
        }
    };
    t.prototype.autoPlayClear = function() {
        var e = this;
        if (e.autoPlayTimer) {
            clearInterval(e.autoPlayTimer);
        }
    };
    t.prototype.autoPlayIterator = function() {
        var e = this, t = e.currentSlide + e.options.slidesToScroll;
        if (!e.paused && !e.interrupted && !e.focussed) {
            if (e.options.infinite === false) {
                if (e.direction === 1 && e.currentSlide + 1 === e.slideCount - 1) {
                    e.direction = 0;
                } else if (e.direction === 0) {
                    t = e.currentSlide - e.options.slidesToScroll;
                    if (e.currentSlide - 1 === 0) {
                        e.direction = 1;
                    }
                }
            }
            e.slideHandler(t);
        }
    };
    t.prototype.buildArrows = function() {
        var t = this;
        if (t.options.arrows === true) {
            t.$prevArrow = e(t.options.prevArrow).addClass("slick-arrow");
            t.$nextArrow = e(t.options.nextArrow).addClass("slick-arrow");
            if (t.slideCount > t.options.slidesToShow) {
                t.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex");
                t.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex");
                if (t.htmlExpr.test(t.options.prevArrow)) {
                    t.$prevArrow.prependTo(t.options.appendArrows);
                }
                if (t.htmlExpr.test(t.options.nextArrow)) {
                    t.$nextArrow.appendTo(t.options.appendArrows);
                }
                if (t.options.infinite !== true) {
                    t.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true");
                }
            } else {
                t.$prevArrow.add(t.$nextArrow).addClass("slick-hidden").attr({
                    "aria-disabled": "true",
                    tabindex: "-1"
                });
            }
        }
    };
    t.prototype.buildDots = function() {
        var t = this, i, n;
        if (t.options.dots === true && t.slideCount > t.options.slidesToShow) {
            t.$slider.addClass("slick-dotted");
            n = e("<ul />").addClass(t.options.dotsClass);
            for (i = 0; i <= t.getDotCount(); i += 1) {
                n.append(e("<li />").append(t.options.customPaging.call(this, t, i)));
            }
            t.$dots = n.appendTo(t.options.appendDots);
            t.$dots.find("li").first().addClass("slick-active").attr("aria-hidden", "false");
        }
    };
    t.prototype.buildOut = function() {
        var t = this;
        t.$slides = t.$slider.children(t.options.slide + ":not(.slick-cloned)").addClass("slick-slide");
        t.slideCount = t.$slides.length;
        t.$slides.each(function(t, i) {
            e(i).attr("data-slick-index", t).data("originalStyling", e(i).attr("style") || "");
        });
        t.$slider.addClass("slick-slider");
        t.$slideTrack = t.slideCount === 0 ? e('<div class="slick-track"/>').appendTo(t.$slider) : t.$slides.wrapAll('<div class="slick-track"/>').parent();
        t.$list = t.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent();
        t.$slideTrack.css("opacity", 0);
        if (t.options.centerMode === true || t.options.swipeToSlide === true) {
            t.options.slidesToScroll = 1;
        }
        e("img[data-lazy]", t.$slider).not("[src]").addClass("slick-loading");
        t.setupInfinite();
        t.buildArrows();
        t.buildDots();
        t.updateDots();
        t.setSlideClasses(typeof t.currentSlide === "number" ? t.currentSlide : 0);
        if (t.options.draggable === true) {
            t.$list.addClass("draggable");
        }
    };
    t.prototype.buildRows = function() {
        var e = this, t, i, n, r, s, o, a;
        r = document.createDocumentFragment();
        o = e.$slider.children();
        if (e.options.rows > 1) {
            a = e.options.slidesPerRow * e.options.rows;
            s = Math.ceil(o.length / a);
            for (t = 0; t < s; t++) {
                var l = document.createElement("div");
                for (i = 0; i < e.options.rows; i++) {
                    var d = document.createElement("div");
                    for (n = 0; n < e.options.slidesPerRow; n++) {
                        var c = t * a + (i * e.options.slidesPerRow + n);
                        if (o.get(c)) {
                            d.appendChild(o.get(c));
                        }
                    }
                    l.appendChild(d);
                }
                r.appendChild(l);
            }
            e.$slider.empty().append(r);
            e.$slider.children().children().children().css({
                width: 100 / e.options.slidesPerRow + "%",
                display: "inline-block"
            });
        }
    };
    t.prototype.checkResponsive = function(t, i) {
        var n = this, r, s, o, a = false;
        var l = n.$slider.width();
        var d = window.innerWidth || e(window).width();
        if (n.respondTo === "window") {
            o = d;
        } else if (n.respondTo === "slider") {
            o = l;
        } else if (n.respondTo === "min") {
            o = Math.min(d, l);
        }
        if (n.options.responsive && n.options.responsive.length && n.options.responsive !== null) {
            s = null;
            for (r in n.breakpoints) {
                if (n.breakpoints.hasOwnProperty(r)) {
                    if (n.originalSettings.mobileFirst === false) {
                        if (o < n.breakpoints[r]) {
                            s = n.breakpoints[r];
                        }
                    } else {
                        if (o > n.breakpoints[r]) {
                            s = n.breakpoints[r];
                        }
                    }
                }
            }
            if (s !== null) {
                if (n.activeBreakpoint !== null) {
                    if (s !== n.activeBreakpoint || i) {
                        n.activeBreakpoint = s;
                        if (n.breakpointSettings[s] === "unslick") {
                            n.unslick(s);
                        } else {
                            n.options = e.extend({}, n.originalSettings, n.breakpointSettings[s]);
                            if (t === true) {
                                n.currentSlide = n.options.initialSlide;
                            }
                            n.refresh(t);
                        }
                        a = s;
                    }
                } else {
                    n.activeBreakpoint = s;
                    if (n.breakpointSettings[s] === "unslick") {
                        n.unslick(s);
                    } else {
                        n.options = e.extend({}, n.originalSettings, n.breakpointSettings[s]);
                        if (t === true) {
                            n.currentSlide = n.options.initialSlide;
                        }
                        n.refresh(t);
                    }
                    a = s;
                }
            } else {
                if (n.activeBreakpoint !== null) {
                    n.activeBreakpoint = null;
                    n.options = n.originalSettings;
                    if (t === true) {
                        n.currentSlide = n.options.initialSlide;
                    }
                    n.refresh(t);
                    a = s;
                }
            }
            if (!t && a !== false) {
                n.$slider.trigger("breakpoint", [ n, a ]);
            }
        }
    };
    t.prototype.changeSlide = function(t, i) {
        var n = this, r = e(t.currentTarget), s, o, a;
        if (r.is("a")) {
            t.preventDefault();
        }
        if (!r.is("li")) {
            r = r.closest("li");
        }
        a = n.slideCount % n.options.slidesToScroll !== 0;
        s = a ? 0 : (n.slideCount - n.currentSlide) % n.options.slidesToScroll;
        switch (t.data.message) {
          case "previous":
            o = s === 0 ? n.options.slidesToScroll : n.options.slidesToShow - s;
            if (n.slideCount > n.options.slidesToShow) {
                n.slideHandler(n.currentSlide - o, false, i);
            }
            break;

          case "next":
            o = s === 0 ? n.options.slidesToScroll : s;
            if (n.slideCount > n.options.slidesToShow) {
                n.slideHandler(n.currentSlide + o, false, i);
            }
            break;

          case "index":
            var l = t.data.index === 0 ? 0 : t.data.index || r.index() * n.options.slidesToScroll;
            n.slideHandler(n.checkNavigable(l), false, i);
            r.children().trigger("focus");
            break;

          default:
            return;
        }
    };
    t.prototype.checkNavigable = function(e) {
        var t = this, i, n;
        i = t.getNavigableIndexes();
        n = 0;
        if (e > i[i.length - 1]) {
            e = i[i.length - 1];
        } else {
            for (var r in i) {
                if (e < i[r]) {
                    e = n;
                    break;
                }
                n = i[r];
            }
        }
        return e;
    };
    t.prototype.cleanUpEvents = function() {
        var t = this;
        if (t.options.dots && t.$dots !== null) {
            e("li", t.$dots).off("click.slick", t.changeSlide).off("mouseenter.slick", e.proxy(t.interrupt, t, true)).off("mouseleave.slick", e.proxy(t.interrupt, t, false));
        }
        t.$slider.off("focus.slick blur.slick");
        if (t.options.arrows === true && t.slideCount > t.options.slidesToShow) {
            t.$prevArrow && t.$prevArrow.off("click.slick", t.changeSlide);
            t.$nextArrow && t.$nextArrow.off("click.slick", t.changeSlide);
        }
        t.$list.off("touchstart.slick mousedown.slick", t.swipeHandler);
        t.$list.off("touchmove.slick mousemove.slick", t.swipeHandler);
        t.$list.off("touchend.slick mouseup.slick", t.swipeHandler);
        t.$list.off("touchcancel.slick mouseleave.slick", t.swipeHandler);
        t.$list.off("click.slick", t.clickHandler);
        e(document).off(t.visibilityChange, t.visibility);
        t.cleanUpSlideEvents();
        if (t.options.accessibility === true) {
            t.$list.off("keydown.slick", t.keyHandler);
        }
        if (t.options.focusOnSelect === true) {
            e(t.$slideTrack).children().off("click.slick", t.selectHandler);
        }
        e(window).off("orientationchange.slick.slick-" + t.instanceUid, t.orientationChange);
        e(window).off("resize.slick.slick-" + t.instanceUid, t.resize);
        e("[draggable!=true]", t.$slideTrack).off("dragstart", t.preventDefault);
        e(window).off("load.slick.slick-" + t.instanceUid, t.setPosition);
        e(document).off("ready.slick.slick-" + t.instanceUid, t.setPosition);
    };
    t.prototype.cleanUpSlideEvents = function() {
        var t = this;
        t.$list.off("mouseenter.slick", e.proxy(t.interrupt, t, true));
        t.$list.off("mouseleave.slick", e.proxy(t.interrupt, t, false));
    };
    t.prototype.cleanUpRows = function() {
        var e = this, t;
        if (e.options.rows > 1) {
            t = e.$slides.children().children();
            t.removeAttr("style");
            e.$slider.empty().append(t);
        }
    };
    t.prototype.clickHandler = function(e) {
        var t = this;
        if (t.shouldClick === false) {
            e.stopImmediatePropagation();
            e.stopPropagation();
            e.preventDefault();
        }
    };
    t.prototype.destroy = function(t) {
        var i = this;
        i.autoPlayClear();
        i.touchObject = {};
        i.cleanUpEvents();
        e(".slick-cloned", i.$slider).detach();
        if (i.$dots) {
            i.$dots.remove();
        }
        if (i.$prevArrow && i.$prevArrow.length) {
            i.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", "");
            if (i.htmlExpr.test(i.options.prevArrow)) {
                i.$prevArrow.remove();
            }
        }
        if (i.$nextArrow && i.$nextArrow.length) {
            i.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", "");
            if (i.htmlExpr.test(i.options.nextArrow)) {
                i.$nextArrow.remove();
            }
        }
        if (i.$slides) {
            i.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() {
                e(this).attr("style", e(this).data("originalStyling"));
            });
            i.$slideTrack.children(this.options.slide).detach();
            i.$slideTrack.detach();
            i.$list.detach();
            i.$slider.append(i.$slides);
        }
        i.cleanUpRows();
        i.$slider.removeClass("slick-slider");
        i.$slider.removeClass("slick-initialized");
        i.$slider.removeClass("slick-dotted");
        i.unslicked = true;
        if (!t) {
            i.$slider.trigger("destroy", [ i ]);
        }
    };
    t.prototype.disableTransition = function(e) {
        var t = this, i = {};
        i[t.transitionType] = "";
        if (t.options.fade === false) {
            t.$slideTrack.css(i);
        } else {
            t.$slides.eq(e).css(i);
        }
    };
    t.prototype.fadeSlide = function(e, t) {
        var i = this;
        if (i.cssTransitions === false) {
            i.$slides.eq(e).css({
                zIndex: i.options.zIndex
            });
            i.$slides.eq(e).animate({
                opacity: 1
            }, i.options.speed, i.options.easing, t);
        } else {
            i.applyTransition(e);
            i.$slides.eq(e).css({
                opacity: 1,
                zIndex: i.options.zIndex
            });
            if (t) {
                setTimeout(function() {
                    i.disableTransition(e);
                    t.call();
                }, i.options.speed);
            }
        }
    };
    t.prototype.fadeSlideOut = function(e) {
        var t = this;
        if (t.cssTransitions === false) {
            t.$slides.eq(e).animate({
                opacity: 0,
                zIndex: t.options.zIndex - 2
            }, t.options.speed, t.options.easing);
        } else {
            t.applyTransition(e);
            t.$slides.eq(e).css({
                opacity: 0,
                zIndex: t.options.zIndex - 2
            });
        }
    };
    t.prototype.filterSlides = t.prototype.slickFilter = function(e) {
        var t = this;
        if (e !== null) {
            t.$slidesCache = t.$slides;
            t.unload();
            t.$slideTrack.children(this.options.slide).detach();
            t.$slidesCache.filter(e).appendTo(t.$slideTrack);
            t.reinit();
        }
    };
    t.prototype.focusHandler = function() {
        var t = this;
        t.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*:not(.slick-arrow)", function(i) {
            i.stopImmediatePropagation();
            var n = e(this);
            setTimeout(function() {
                if (t.options.pauseOnFocus) {
                    t.focussed = n.is(":focus");
                    t.autoPlay();
                }
            }, 0);
        });
    };
    t.prototype.getCurrent = t.prototype.slickCurrentSlide = function() {
        var e = this;
        return e.currentSlide;
    };
    t.prototype.getDotCount = function() {
        var e = this;
        var t = 0;
        var i = 0;
        var n = 0;
        if (e.options.infinite === true) {
            while (t < e.slideCount) {
                ++n;
                t = i + e.options.slidesToScroll;
                i += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
            }
        } else if (e.options.centerMode === true) {
            n = e.slideCount;
        } else if (!e.options.asNavFor) {
            n = 1 + Math.ceil((e.slideCount - e.options.slidesToShow) / e.options.slidesToScroll);
        } else {
            while (t < e.slideCount) {
                ++n;
                t = i + e.options.slidesToScroll;
                i += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
            }
        }
        return n - 1;
    };
    t.prototype.getLeft = function(e) {
        var t = this, i, n, r = 0, s;
        t.slideOffset = 0;
        n = t.$slides.first().outerHeight(true);
        if (t.options.infinite === true) {
            if (t.slideCount > t.options.slidesToShow) {
                t.slideOffset = t.slideWidth * t.options.slidesToShow * -1;
                r = n * t.options.slidesToShow * -1;
            }
            if (t.slideCount % t.options.slidesToScroll !== 0) {
                if (e + t.options.slidesToScroll > t.slideCount && t.slideCount > t.options.slidesToShow) {
                    if (e > t.slideCount) {
                        t.slideOffset = (t.options.slidesToShow - (e - t.slideCount)) * t.slideWidth * -1;
                        r = (t.options.slidesToShow - (e - t.slideCount)) * n * -1;
                    } else {
                        t.slideOffset = t.slideCount % t.options.slidesToScroll * t.slideWidth * -1;
                        r = t.slideCount % t.options.slidesToScroll * n * -1;
                    }
                }
            }
        } else {
            if (e + t.options.slidesToShow > t.slideCount) {
                t.slideOffset = (e + t.options.slidesToShow - t.slideCount) * t.slideWidth;
                r = (e + t.options.slidesToShow - t.slideCount) * n;
            }
        }
        if (t.slideCount <= t.options.slidesToShow) {
            t.slideOffset = 0;
            r = 0;
        }
        if (t.options.centerMode === true && t.options.infinite === true) {
            t.slideOffset += t.slideWidth * Math.floor(t.options.slidesToShow / 2) - t.slideWidth;
        } else if (t.options.centerMode === true) {
            t.slideOffset = 0;
            t.slideOffset += t.slideWidth * Math.floor(t.options.slidesToShow / 2);
        }
        if (t.options.vertical === false) {
            i = e * t.slideWidth * -1 + t.slideOffset;
        } else {
            i = e * n * -1 + r;
        }
        if (t.options.variableWidth === true) {
            if (t.slideCount <= t.options.slidesToShow || t.options.infinite === false) {
                s = t.$slideTrack.children(".slick-slide").eq(e);
            } else {
                s = t.$slideTrack.children(".slick-slide").eq(e + t.options.slidesToShow);
            }
            if (t.options.rtl === true) {
                if (s[0]) {
                    i = (t.$slideTrack.width() - s[0].offsetLeft - s.width()) * -1;
                } else {
                    i = 0;
                }
            } else {
                i = s[0] ? s[0].offsetLeft * -1 : 0;
            }
            if (t.options.centerMode === true) {
                if (t.slideCount <= t.options.slidesToShow || t.options.infinite === false) {
                    s = t.$slideTrack.children(".slick-slide").eq(e);
                } else {
                    s = t.$slideTrack.children(".slick-slide").eq(e + t.options.slidesToShow + 1);
                }
                if (t.options.rtl === true) {
                    if (s[0]) {
                        i = (t.$slideTrack.width() - s[0].offsetLeft - s.width()) * -1;
                    } else {
                        i = 0;
                    }
                } else {
                    i = s[0] ? s[0].offsetLeft * -1 : 0;
                }
                i += (t.$list.width() - s.outerWidth()) / 2;
            }
        }
        return i;
    };
    t.prototype.getOption = t.prototype.slickGetOption = function(e) {
        var t = this;
        return t.options[e];
    };
    t.prototype.getNavigableIndexes = function() {
        var e = this, t = 0, i = 0, n = [], r;
        if (e.options.infinite === false) {
            r = e.slideCount;
        } else {
            t = e.options.slidesToScroll * -1;
            i = e.options.slidesToScroll * -1;
            r = e.slideCount * 2;
        }
        while (t < r) {
            n.push(t);
            t = i + e.options.slidesToScroll;
            i += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
        }
        return n;
    };
    t.prototype.getSlick = function() {
        return this;
    };
    t.prototype.getSlideCount = function() {
        var t = this, i, n, r;
        r = t.options.centerMode === true ? t.slideWidth * Math.floor(t.options.slidesToShow / 2) : 0;
        if (t.options.swipeToSlide === true) {
            t.$slideTrack.find(".slick-slide").each(function(i, s) {
                if (s.offsetLeft - r + e(s).outerWidth() / 2 > t.swipeLeft * -1) {
                    n = s;
                    return false;
                }
            });
            i = Math.abs(e(n).attr("data-slick-index") - t.currentSlide) || 1;
            return i;
        } else {
            return t.options.slidesToScroll;
        }
    };
    t.prototype.goTo = t.prototype.slickGoTo = function(e, t) {
        var i = this;
        i.changeSlide({
            data: {
                message: "index",
                index: parseInt(e)
            }
        }, t);
    };
    t.prototype.init = function(t) {
        var i = this;
        if (!e(i.$slider).hasClass("slick-initialized")) {
            e(i.$slider).addClass("slick-initialized");
            i.buildRows();
            i.buildOut();
            i.setProps();
            i.startLoad();
            i.loadSlider();
            i.initializeEvents();
            i.updateArrows();
            i.updateDots();
            i.checkResponsive(true);
            i.focusHandler();
        }
        if (t) {
            i.$slider.trigger("init", [ i ]);
        }
        if (i.options.accessibility === true) {
            i.initADA();
        }
        if (i.options.autoplay) {
            i.paused = false;
            i.autoPlay();
        }
    };
    t.prototype.initADA = function() {
        var t = this;
        t.$slides.add(t.$slideTrack.find(".slick-cloned")).attr({
            "aria-hidden": "true",
            tabindex: "-1"
        }).find("a, input, button, select").attr({
            tabindex: "-1"
        });
        t.$slideTrack.attr("role", "listbox");
        t.$slides.not(t.$slideTrack.find(".slick-cloned")).each(function(i) {
            e(this).attr({
                role: "option",
                "aria-describedby": "slick-slide" + t.instanceUid + i + ""
            });
        });
        if (t.$dots !== null) {
            t.$dots.attr("role", "tablist").find("li").each(function(i) {
                e(this).attr({
                    role: "presentation",
                    "aria-selected": "false",
                    "aria-controls": "navigation" + t.instanceUid + i + "",
                    id: "slick-slide" + t.instanceUid + i + ""
                });
            }).first().attr("aria-selected", "true").end().find("button").attr("role", "button").end().closest("div").attr("role", "toolbar");
        }
        t.activateADA();
    };
    t.prototype.initArrowEvents = function() {
        var e = this;
        if (e.options.arrows === true && e.slideCount > e.options.slidesToShow) {
            e.$prevArrow.off("click.slick").on("click.slick", {
                message: "previous"
            }, e.changeSlide);
            e.$nextArrow.off("click.slick").on("click.slick", {
                message: "next"
            }, e.changeSlide);
        }
    };
    t.prototype.initDotEvents = function() {
        var t = this;
        if (t.options.dots === true && t.slideCount > t.options.slidesToShow) {
            e("li", t.$dots).on("click.slick", {
                message: "index"
            }, t.changeSlide);
        }
        if (t.options.dots === true && t.options.pauseOnDotsHover === true) {
            e("li", t.$dots).on("mouseenter.slick", e.proxy(t.interrupt, t, true)).on("mouseleave.slick", e.proxy(t.interrupt, t, false));
        }
    };
    t.prototype.initSlideEvents = function() {
        var t = this;
        if (t.options.pauseOnHover) {
            t.$list.on("mouseenter.slick", e.proxy(t.interrupt, t, true));
            t.$list.on("mouseleave.slick", e.proxy(t.interrupt, t, false));
        }
    };
    t.prototype.initializeEvents = function() {
        var t = this;
        t.initArrowEvents();
        t.initDotEvents();
        t.initSlideEvents();
        t.$list.on("touchstart.slick mousedown.slick", {
            action: "start"
        }, t.swipeHandler);
        t.$list.on("touchmove.slick mousemove.slick", {
            action: "move"
        }, t.swipeHandler);
        t.$list.on("touchend.slick mouseup.slick", {
            action: "end"
        }, t.swipeHandler);
        t.$list.on("touchcancel.slick mouseleave.slick", {
            action: "end"
        }, t.swipeHandler);
        t.$list.on("click.slick", t.clickHandler);
        e(document).on(t.visibilityChange, e.proxy(t.visibility, t));
        if (t.options.accessibility === true) {
            t.$list.on("keydown.slick", t.keyHandler);
        }
        if (t.options.focusOnSelect === true) {
            e(t.$slideTrack).children().on("click.slick", t.selectHandler);
        }
        e(window).on("orientationchange.slick.slick-" + t.instanceUid, e.proxy(t.orientationChange, t));
        e(window).on("resize.slick.slick-" + t.instanceUid, e.proxy(t.resize, t));
        e("[draggable!=true]", t.$slideTrack).on("dragstart", t.preventDefault);
        e(window).on("load.slick.slick-" + t.instanceUid, t.setPosition);
        e(document).on("ready.slick.slick-" + t.instanceUid, t.setPosition);
    };
    t.prototype.initUI = function() {
        var e = this;
        if (e.options.arrows === true && e.slideCount > e.options.slidesToShow) {
            e.$prevArrow.show();
            e.$nextArrow.show();
        }
        if (e.options.dots === true && e.slideCount > e.options.slidesToShow) {
            e.$dots.show();
        }
    };
    t.prototype.keyHandler = function(e) {
        var t = this;
        if (!e.target.tagName.match("TEXTAREA|INPUT|SELECT")) {
            if (e.keyCode === 37 && t.options.accessibility === true) {
                t.changeSlide({
                    data: {
                        message: t.options.rtl === true ? "next" : "previous"
                    }
                });
            } else if (e.keyCode === 39 && t.options.accessibility === true) {
                t.changeSlide({
                    data: {
                        message: t.options.rtl === true ? "previous" : "next"
                    }
                });
            }
        }
    };
    t.prototype.lazyLoad = function() {
        var t = this, i, n, r, s;
        function o(i) {
            e("img[data-lazy]", i).each(function() {
                var i = e(this), n = e(this).attr("data-lazy"), r = document.createElement("img");
                r.onload = function() {
                    i.animate({
                        opacity: 0
                    }, 100, function() {
                        i.attr("src", n).animate({
                            opacity: 1
                        }, 200, function() {
                            i.removeAttr("data-lazy").removeClass("slick-loading");
                        });
                        t.$slider.trigger("lazyLoaded", [ t, i, n ]);
                    });
                };
                r.onerror = function() {
                    i.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error");
                    t.$slider.trigger("lazyLoadError", [ t, i, n ]);
                };
                r.src = n;
            });
        }
        if (t.options.centerMode === true) {
            if (t.options.infinite === true) {
                r = t.currentSlide + (t.options.slidesToShow / 2 + 1);
                s = r + t.options.slidesToShow + 2;
            } else {
                r = Math.max(0, t.currentSlide - (t.options.slidesToShow / 2 + 1));
                s = 2 + (t.options.slidesToShow / 2 + 1) + t.currentSlide;
            }
        } else {
            r = t.options.infinite ? t.options.slidesToShow + t.currentSlide : t.currentSlide;
            s = Math.ceil(r + t.options.slidesToShow);
            if (t.options.fade === true) {
                if (r > 0) r--;
                if (s <= t.slideCount) s++;
            }
        }
        i = t.$slider.find(".slick-slide").slice(r, s);
        o(i);
        if (t.slideCount <= t.options.slidesToShow) {
            n = t.$slider.find(".slick-slide");
            o(n);
        } else if (t.currentSlide >= t.slideCount - t.options.slidesToShow) {
            n = t.$slider.find(".slick-cloned").slice(0, t.options.slidesToShow);
            o(n);
        } else if (t.currentSlide === 0) {
            n = t.$slider.find(".slick-cloned").slice(t.options.slidesToShow * -1);
            o(n);
        }
    };
    t.prototype.loadSlider = function() {
        var e = this;
        e.setPosition();
        e.$slideTrack.css({
            opacity: 1
        });
        e.$slider.removeClass("slick-loading");
        e.initUI();
        if (e.options.lazyLoad === "progressive") {
            e.progressiveLazyLoad();
        }
    };
    t.prototype.next = t.prototype.slickNext = function() {
        var e = this;
        e.changeSlide({
            data: {
                message: "next"
            }
        });
    };
    t.prototype.orientationChange = function() {
        var e = this;
        e.checkResponsive();
        e.setPosition();
    };
    t.prototype.pause = t.prototype.slickPause = function() {
        var e = this;
        e.autoPlayClear();
        e.paused = true;
    };
    t.prototype.play = t.prototype.slickPlay = function() {
        var e = this;
        e.autoPlay();
        e.options.autoplay = true;
        e.paused = false;
        e.focussed = false;
        e.interrupted = false;
    };
    t.prototype.postSlide = function(e) {
        var t = this;
        if (!t.unslicked) {
            t.$slider.trigger("afterChange", [ t, e ]);
            t.animating = false;
            t.setPosition();
            t.swipeLeft = null;
            if (t.options.autoplay) {
                t.autoPlay();
            }
            if (t.options.accessibility === true) {
                t.initADA();
            }
        }
    };
    t.prototype.prev = t.prototype.slickPrev = function() {
        var e = this;
        e.changeSlide({
            data: {
                message: "previous"
            }
        });
    };
    t.prototype.preventDefault = function(e) {
        e.preventDefault();
    };
    t.prototype.progressiveLazyLoad = function(t) {
        t = t || 1;
        var i = this, n = e("img[data-lazy]", i.$slider), r, s, o;
        if (n.length) {
            r = n.first();
            s = r.attr("data-lazy");
            o = document.createElement("img");
            o.onload = function() {
                r.attr("src", s).removeAttr("data-lazy").removeClass("slick-loading");
                if (i.options.adaptiveHeight === true) {
                    i.setPosition();
                }
                i.$slider.trigger("lazyLoaded", [ i, r, s ]);
                i.progressiveLazyLoad();
            };
            o.onerror = function() {
                if (t < 3) {
                    setTimeout(function() {
                        i.progressiveLazyLoad(t + 1);
                    }, 500);
                } else {
                    r.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error");
                    i.$slider.trigger("lazyLoadError", [ i, r, s ]);
                    i.progressiveLazyLoad();
                }
            };
            o.src = s;
        } else {
            i.$slider.trigger("allImagesLoaded", [ i ]);
        }
    };
    t.prototype.refresh = function(t) {
        var i = this, n, r;
        r = i.slideCount - i.options.slidesToShow;
        if (!i.options.infinite && i.currentSlide > r) {
            i.currentSlide = r;
        }
        if (i.slideCount <= i.options.slidesToShow) {
            i.currentSlide = 0;
        }
        n = i.currentSlide;
        i.destroy(true);
        e.extend(i, i.initials, {
            currentSlide: n
        });
        i.init();
        if (!t) {
            i.changeSlide({
                data: {
                    message: "index",
                    index: n
                }
            }, false);
        }
    };
    t.prototype.registerBreakpoints = function() {
        var t = this, i, n, r, s = t.options.responsive || null;
        if (e.type(s) === "array" && s.length) {
            t.respondTo = t.options.respondTo || "window";
            for (i in s) {
                r = t.breakpoints.length - 1;
                n = s[i].breakpoint;
                if (s.hasOwnProperty(i)) {
                    while (r >= 0) {
                        if (t.breakpoints[r] && t.breakpoints[r] === n) {
                            t.breakpoints.splice(r, 1);
                        }
                        r--;
                    }
                    t.breakpoints.push(n);
                    t.breakpointSettings[n] = s[i].settings;
                }
            }
            t.breakpoints.sort(function(e, i) {
                return t.options.mobileFirst ? e - i : i - e;
            });
        }
    };
    t.prototype.reinit = function() {
        var t = this;
        t.$slides = t.$slideTrack.children(t.options.slide).addClass("slick-slide");
        t.slideCount = t.$slides.length;
        if (t.currentSlide >= t.slideCount && t.currentSlide !== 0) {
            t.currentSlide = t.currentSlide - t.options.slidesToScroll;
        }
        if (t.slideCount <= t.options.slidesToShow) {
            t.currentSlide = 0;
        }
        t.registerBreakpoints();
        t.setProps();
        t.setupInfinite();
        t.buildArrows();
        t.updateArrows();
        t.initArrowEvents();
        t.buildDots();
        t.updateDots();
        t.initDotEvents();
        t.cleanUpSlideEvents();
        t.initSlideEvents();
        t.checkResponsive(false, true);
        if (t.options.focusOnSelect === true) {
            e(t.$slideTrack).children().on("click.slick", t.selectHandler);
        }
        t.setSlideClasses(typeof t.currentSlide === "number" ? t.currentSlide : 0);
        t.setPosition();
        t.focusHandler();
        t.paused = !t.options.autoplay;
        t.autoPlay();
        t.$slider.trigger("reInit", [ t ]);
    };
    t.prototype.resize = function() {
        var t = this;
        if (e(window).width() !== t.windowWidth) {
            clearTimeout(t.windowDelay);
            t.windowDelay = window.setTimeout(function() {
                t.windowWidth = e(window).width();
                t.checkResponsive();
                if (!t.unslicked) {
                    t.setPosition();
                }
            }, 50);
        }
    };
    t.prototype.removeSlide = t.prototype.slickRemove = function(e, t, i) {
        var n = this;
        if (typeof e === "boolean") {
            t = e;
            e = t === true ? 0 : n.slideCount - 1;
        } else {
            e = t === true ? --e : e;
        }
        if (n.slideCount < 1 || e < 0 || e > n.slideCount - 1) {
            return false;
        }
        n.unload();
        if (i === true) {
            n.$slideTrack.children().remove();
        } else {
            n.$slideTrack.children(this.options.slide).eq(e).remove();
        }
        n.$slides = n.$slideTrack.children(this.options.slide);
        n.$slideTrack.children(this.options.slide).detach();
        n.$slideTrack.append(n.$slides);
        n.$slidesCache = n.$slides;
        n.reinit();
    };
    t.prototype.setCSS = function(e) {
        var t = this, i = {}, n, r;
        if (t.options.rtl === true) {
            e = -e;
        }
        n = t.positionProp == "left" ? Math.ceil(e) + "px" : "0px";
        r = t.positionProp == "top" ? Math.ceil(e) + "px" : "0px";
        i[t.positionProp] = e;
        if (t.transformsEnabled === false) {
            t.$slideTrack.css(i);
        } else {
            i = {};
            if (t.cssTransitions === false) {
                i[t.animType] = "translate(" + n + ", " + r + ")";
                t.$slideTrack.css(i);
            } else {
                i[t.animType] = "translate3d(" + n + ", " + r + ", 0px)";
                t.$slideTrack.css(i);
            }
        }
    };
    t.prototype.setDimensions = function() {
        var e = this;
        if (e.options.vertical === false) {
            if (e.options.centerMode === true) {
                e.$list.css({
                    padding: "0px " + e.options.centerPadding
                });
            }
        } else {
            e.$list.height(e.$slides.first().outerHeight(true) * e.options.slidesToShow);
            if (e.options.centerMode === true) {
                e.$list.css({
                    padding: e.options.centerPadding + " 0px"
                });
            }
        }
        e.listWidth = e.$list.width();
        e.listHeight = e.$list.height();
        if (e.options.vertical === false && e.options.variableWidth === false) {
            e.slideWidth = Math.ceil(e.listWidth / e.options.slidesToShow);
            e.$slideTrack.width(Math.ceil(e.slideWidth * e.$slideTrack.children(".slick-slide").length));
        } else if (e.options.variableWidth === true) {
            e.$slideTrack.width(5e3 * e.slideCount);
        } else {
            e.slideWidth = Math.ceil(e.listWidth);
            e.$slideTrack.height(Math.ceil(e.$slides.first().outerHeight(true) * e.$slideTrack.children(".slick-slide").length));
        }
        var t = e.$slides.first().outerWidth(true) - e.$slides.first().width();
        if (e.options.variableWidth === false) e.$slideTrack.children(".slick-slide").width(e.slideWidth - t);
    };
    t.prototype.setFade = function() {
        var t = this, i;
        t.$slides.each(function(n, r) {
            i = t.slideWidth * n * -1;
            if (t.options.rtl === true) {
                e(r).css({
                    position: "relative",
                    right: i,
                    top: 0,
                    zIndex: t.options.zIndex - 2,
                    opacity: 0
                });
            } else {
                e(r).css({
                    position: "relative",
                    left: i,
                    top: 0,
                    zIndex: t.options.zIndex - 2,
                    opacity: 0
                });
            }
        });
        t.$slides.eq(t.currentSlide).css({
            zIndex: t.options.zIndex - 1,
            opacity: 1
        });
    };
    t.prototype.setHeight = function() {
        var e = this;
        if (e.options.slidesToShow === 1 && e.options.adaptiveHeight === true && e.options.vertical === false) {
            var t = e.$slides.eq(e.currentSlide).outerHeight(true);
            e.$list.css("height", t);
        }
    };
    t.prototype.setOption = t.prototype.slickSetOption = function() {
        var t = this, i, n, r, s, o = false, a;
        if (e.type(arguments[0]) === "object") {
            r = arguments[0];
            o = arguments[1];
            a = "multiple";
        } else if (e.type(arguments[0]) === "string") {
            r = arguments[0];
            s = arguments[1];
            o = arguments[2];
            if (arguments[0] === "responsive" && e.type(arguments[1]) === "array") {
                a = "responsive";
            } else if (typeof arguments[1] !== "undefined") {
                a = "single";
            }
        }
        if (a === "single") {
            t.options[r] = s;
        } else if (a === "multiple") {
            e.each(r, function(e, i) {
                t.options[e] = i;
            });
        } else if (a === "responsive") {
            for (n in s) {
                if (e.type(t.options.responsive) !== "array") {
                    t.options.responsive = [ s[n] ];
                } else {
                    i = t.options.responsive.length - 1;
                    while (i >= 0) {
                        if (t.options.responsive[i].breakpoint === s[n].breakpoint) {
                            t.options.responsive.splice(i, 1);
                        }
                        i--;
                    }
                    t.options.responsive.push(s[n]);
                }
            }
        }
        if (o) {
            t.unload();
            t.reinit();
        }
    };
    t.prototype.setPosition = function() {
        var e = this;
        e.setDimensions();
        e.setHeight();
        if (e.options.fade === false) {
            e.setCSS(e.getLeft(e.currentSlide));
        } else {
            e.setFade();
        }
        e.$slider.trigger("setPosition", [ e ]);
    };
    t.prototype.setProps = function() {
        var e = this, t = document.body.style;
        e.positionProp = e.options.vertical === true ? "top" : "left";
        if (e.positionProp === "top") {
            e.$slider.addClass("slick-vertical");
        } else {
            e.$slider.removeClass("slick-vertical");
        }
        if (t.WebkitTransition !== undefined || t.MozTransition !== undefined || t.msTransition !== undefined) {
            if (e.options.useCSS === true) {
                e.cssTransitions = true;
            }
        }
        if (e.options.fade) {
            if (typeof e.options.zIndex === "number") {
                if (e.options.zIndex < 3) {
                    e.options.zIndex = 3;
                }
            } else {
                e.options.zIndex = e.defaults.zIndex;
            }
        }
        if (t.OTransform !== undefined) {
            e.animType = "OTransform";
            e.transformType = "-o-transform";
            e.transitionType = "OTransition";
            if (t.perspectiveProperty === undefined && t.webkitPerspective === undefined) e.animType = false;
        }
        if (t.MozTransform !== undefined) {
            e.animType = "MozTransform";
            e.transformType = "-moz-transform";
            e.transitionType = "MozTransition";
            if (t.perspectiveProperty === undefined && t.MozPerspective === undefined) e.animType = false;
        }
        if (t.webkitTransform !== undefined) {
            e.animType = "webkitTransform";
            e.transformType = "-webkit-transform";
            e.transitionType = "webkitTransition";
            if (t.perspectiveProperty === undefined && t.webkitPerspective === undefined) e.animType = false;
        }
        if (t.msTransform !== undefined) {
            e.animType = "msTransform";
            e.transformType = "-ms-transform";
            e.transitionType = "msTransition";
            if (t.msTransform === undefined) e.animType = false;
        }
        if (t.transform !== undefined && e.animType !== false) {
            e.animType = "transform";
            e.transformType = "transform";
            e.transitionType = "transition";
        }
        e.transformsEnabled = e.options.useTransform && (e.animType !== null && e.animType !== false);
    };
    t.prototype.setSlideClasses = function(e) {
        var t = this, i, n, r, s;
        n = t.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true");
        t.$slides.eq(e).addClass("slick-current");
        if (t.options.centerMode === true) {
            i = Math.floor(t.options.slidesToShow / 2);
            if (t.options.infinite === true) {
                if (e >= i && e <= t.slideCount - 1 - i) {
                    t.$slides.slice(e - i, e + i + 1).addClass("slick-active").attr("aria-hidden", "false");
                } else {
                    r = t.options.slidesToShow + e;
                    n.slice(r - i + 1, r + i + 2).addClass("slick-active").attr("aria-hidden", "false");
                }
                if (e === 0) {
                    n.eq(n.length - 1 - t.options.slidesToShow).addClass("slick-center");
                } else if (e === t.slideCount - 1) {
                    n.eq(t.options.slidesToShow).addClass("slick-center");
                }
            }
            t.$slides.eq(e).addClass("slick-center");
        } else {
            if (e >= 0 && e <= t.slideCount - t.options.slidesToShow) {
                t.$slides.slice(e, e + t.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false");
            } else if (n.length <= t.options.slidesToShow) {
                n.addClass("slick-active").attr("aria-hidden", "false");
            } else {
                s = t.slideCount % t.options.slidesToShow;
                r = t.options.infinite === true ? t.options.slidesToShow + e : e;
                if (t.options.slidesToShow == t.options.slidesToScroll && t.slideCount - e < t.options.slidesToShow) {
                    n.slice(r - (t.options.slidesToShow - s), r + s).addClass("slick-active").attr("aria-hidden", "false");
                } else {
                    n.slice(r, r + t.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false");
                }
            }
        }
        if (t.options.lazyLoad === "ondemand") {
            t.lazyLoad();
        }
    };
    t.prototype.setupInfinite = function() {
        var t = this, i, n, r;
        if (t.options.fade === true) {
            t.options.centerMode = false;
        }
        if (t.options.infinite === true && t.options.fade === false) {
            n = null;
            if (t.slideCount > t.options.slidesToShow) {
                if (t.options.centerMode === true) {
                    r = t.options.slidesToShow + 1;
                } else {
                    r = t.options.slidesToShow;
                }
                for (i = t.slideCount; i > t.slideCount - r; i -= 1) {
                    n = i - 1;
                    e(t.$slides[n]).clone(true).attr("id", "").attr("data-slick-index", n - t.slideCount).prependTo(t.$slideTrack).addClass("slick-cloned");
                }
                for (i = 0; i < r; i += 1) {
                    n = i;
                    e(t.$slides[n]).clone(true).attr("id", "").attr("data-slick-index", n + t.slideCount).appendTo(t.$slideTrack).addClass("slick-cloned");
                }
                t.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
                    e(this).attr("id", "");
                });
            }
        }
    };
    t.prototype.interrupt = function(e) {
        var t = this;
        if (!e) {
            t.autoPlay();
        }
        t.interrupted = e;
    };
    t.prototype.selectHandler = function(t) {
        var i = this;
        var n = e(t.target).is(".slick-slide") ? e(t.target) : e(t.target).parents(".slick-slide");
        var r = parseInt(n.attr("data-slick-index"));
        if (!r) r = 0;
        if (i.slideCount <= i.options.slidesToShow) {
            i.setSlideClasses(r);
            i.asNavFor(r);
            return;
        }
        i.slideHandler(r);
    };
    t.prototype.slideHandler = function(e, t, i) {
        var n, r, s, o, a = null, l = this, d;
        t = t || false;
        if (l.animating === true && l.options.waitForAnimate === true) {
            return;
        }
        if (l.options.fade === true && l.currentSlide === e) {
            return;
        }
        if (l.slideCount <= l.options.slidesToShow) {
            return;
        }
        if (t === false) {
            l.asNavFor(e);
        }
        n = e;
        a = l.getLeft(n);
        o = l.getLeft(l.currentSlide);
        l.currentLeft = l.swipeLeft === null ? o : l.swipeLeft;
        if (l.options.infinite === false && l.options.centerMode === false && (e < 0 || e > l.getDotCount() * l.options.slidesToScroll)) {
            if (l.options.fade === false) {
                n = l.currentSlide;
                if (i !== true) {
                    l.animateSlide(o, function() {
                        l.postSlide(n);
                    });
                } else {
                    l.postSlide(n);
                }
            }
            return;
        } else if (l.options.infinite === false && l.options.centerMode === true && (e < 0 || e > l.slideCount - l.options.slidesToScroll)) {
            if (l.options.fade === false) {
                n = l.currentSlide;
                if (i !== true) {
                    l.animateSlide(o, function() {
                        l.postSlide(n);
                    });
                } else {
                    l.postSlide(n);
                }
            }
            return;
        }
        if (l.options.autoplay) {
            clearInterval(l.autoPlayTimer);
        }
        if (n < 0) {
            if (l.slideCount % l.options.slidesToScroll !== 0) {
                r = l.slideCount - l.slideCount % l.options.slidesToScroll;
            } else {
                r = l.slideCount + n;
            }
        } else if (n >= l.slideCount) {
            if (l.slideCount % l.options.slidesToScroll !== 0) {
                r = 0;
            } else {
                r = n - l.slideCount;
            }
        } else {
            r = n;
        }
        l.animating = true;
        l.$slider.trigger("beforeChange", [ l, l.currentSlide, r ]);
        s = l.currentSlide;
        l.currentSlide = r;
        l.setSlideClasses(l.currentSlide);
        if (l.options.asNavFor) {
            d = l.getNavTarget();
            d = d.slick("getSlick");
            if (d.slideCount <= d.options.slidesToShow) {
                d.setSlideClasses(l.currentSlide);
            }
        }
        l.updateDots();
        l.updateArrows();
        if (l.options.fade === true) {
            if (i !== true) {
                l.fadeSlideOut(s);
                l.fadeSlide(r, function() {
                    l.postSlide(r);
                });
            } else {
                l.postSlide(r);
            }
            l.animateHeight();
            return;
        }
        if (i !== true) {
            l.animateSlide(a, function() {
                l.postSlide(r);
            });
        } else {
            l.postSlide(r);
        }
    };
    t.prototype.startLoad = function() {
        var e = this;
        if (e.options.arrows === true && e.slideCount > e.options.slidesToShow) {
            e.$prevArrow.hide();
            e.$nextArrow.hide();
        }
        if (e.options.dots === true && e.slideCount > e.options.slidesToShow) {
            e.$dots.hide();
        }
        e.$slider.addClass("slick-loading");
    };
    t.prototype.swipeDirection = function() {
        var e, t, i, n, r = this;
        e = r.touchObject.startX - r.touchObject.curX;
        t = r.touchObject.startY - r.touchObject.curY;
        i = Math.atan2(t, e);
        n = Math.round(i * 180 / Math.PI);
        if (n < 0) {
            n = 360 - Math.abs(n);
        }
        if (n <= 45 && n >= 0) {
            return r.options.rtl === false ? "left" : "right";
        }
        if (n <= 360 && n >= 315) {
            return r.options.rtl === false ? "left" : "right";
        }
        if (n >= 135 && n <= 225) {
            return r.options.rtl === false ? "right" : "left";
        }
        if (r.options.verticalSwiping === true) {
            if (n >= 35 && n <= 135) {
                return "down";
            } else {
                return "up";
            }
        }
        return "vertical";
    };
    t.prototype.swipeEnd = function(e) {
        var t = this, i, n;
        t.dragging = false;
        t.interrupted = false;
        t.shouldClick = t.touchObject.swipeLength > 10 ? false : true;
        if (t.touchObject.curX === undefined) {
            return false;
        }
        if (t.touchObject.edgeHit === true) {
            t.$slider.trigger("edge", [ t, t.swipeDirection() ]);
        }
        if (t.touchObject.swipeLength >= t.touchObject.minSwipe) {
            n = t.swipeDirection();
            switch (n) {
              case "left":
              case "down":
                i = t.options.swipeToSlide ? t.checkNavigable(t.currentSlide + t.getSlideCount()) : t.currentSlide + t.getSlideCount();
                t.currentDirection = 0;
                break;

              case "right":
              case "up":
                i = t.options.swipeToSlide ? t.checkNavigable(t.currentSlide - t.getSlideCount()) : t.currentSlide - t.getSlideCount();
                t.currentDirection = 1;
                break;

              default:
            }
            if (n != "vertical") {
                t.slideHandler(i);
                t.touchObject = {};
                t.$slider.trigger("swipe", [ t, n ]);
            }
        } else {
            if (t.touchObject.startX !== t.touchObject.curX) {
                t.slideHandler(t.currentSlide);
                t.touchObject = {};
            }
        }
    };
    t.prototype.swipeHandler = function(e) {
        var t = this;
        if (t.options.swipe === false || "ontouchend" in document && t.options.swipe === false) {
            return;
        } else if (t.options.draggable === false && e.type.indexOf("mouse") !== -1) {
            return;
        }
        t.touchObject.fingerCount = e.originalEvent && e.originalEvent.touches !== undefined ? e.originalEvent.touches.length : 1;
        t.touchObject.minSwipe = t.listWidth / t.options.touchThreshold;
        if (t.options.verticalSwiping === true) {
            t.touchObject.minSwipe = t.listHeight / t.options.touchThreshold;
        }
        switch (e.data.action) {
          case "start":
            t.swipeStart(e);
            break;

          case "move":
            t.swipeMove(e);
            break;

          case "end":
            t.swipeEnd(e);
            break;
        }
    };
    t.prototype.swipeMove = function(e) {
        var t = this, i = false, n, r, s, o, a;
        a = e.originalEvent !== undefined ? e.originalEvent.touches : null;
        if (!t.dragging || a && a.length !== 1) {
            return false;
        }
        n = t.getLeft(t.currentSlide);
        t.touchObject.curX = a !== undefined ? a[0].pageX : e.clientX;
        t.touchObject.curY = a !== undefined ? a[0].pageY : e.clientY;
        t.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(t.touchObject.curX - t.touchObject.startX, 2)));
        if (t.options.verticalSwiping === true) {
            t.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(t.touchObject.curY - t.touchObject.startY, 2)));
        }
        r = t.swipeDirection();
        if (r === "vertical") {
            return;
        }
        if (e.originalEvent !== undefined && t.touchObject.swipeLength > 4) {
            e.preventDefault();
        }
        o = (t.options.rtl === false ? 1 : -1) * (t.touchObject.curX > t.touchObject.startX ? 1 : -1);
        if (t.options.verticalSwiping === true) {
            o = t.touchObject.curY > t.touchObject.startY ? 1 : -1;
        }
        s = t.touchObject.swipeLength;
        t.touchObject.edgeHit = false;
        if (t.options.infinite === false) {
            if (t.currentSlide === 0 && r === "right" || t.currentSlide >= t.getDotCount() && r === "left") {
                s = t.touchObject.swipeLength * t.options.edgeFriction;
                t.touchObject.edgeHit = true;
            }
        }
        if (t.options.vertical === false) {
            t.swipeLeft = n + s * o;
        } else {
            t.swipeLeft = n + s * (t.$list.height() / t.listWidth) * o;
        }
        if (t.options.verticalSwiping === true) {
            t.swipeLeft = n + s * o;
        }
        if (t.options.fade === true || t.options.touchMove === false) {
            return false;
        }
        if (t.animating === true) {
            t.swipeLeft = null;
            return false;
        }
        t.setCSS(t.swipeLeft);
    };
    t.prototype.swipeStart = function(e) {
        var t = this, i;
        t.interrupted = true;
        if (t.touchObject.fingerCount !== 1 || t.slideCount <= t.options.slidesToShow) {
            t.touchObject = {};
            return false;
        }
        if (e.originalEvent !== undefined && e.originalEvent.touches !== undefined) {
            i = e.originalEvent.touches[0];
        }
        t.touchObject.startX = t.touchObject.curX = i !== undefined ? i.pageX : e.clientX;
        t.touchObject.startY = t.touchObject.curY = i !== undefined ? i.pageY : e.clientY;
        t.dragging = true;
    };
    t.prototype.unfilterSlides = t.prototype.slickUnfilter = function() {
        var e = this;
        if (e.$slidesCache !== null) {
            e.unload();
            e.$slideTrack.children(this.options.slide).detach();
            e.$slidesCache.appendTo(e.$slideTrack);
            e.reinit();
        }
    };
    t.prototype.unload = function() {
        var t = this;
        e(".slick-cloned", t.$slider).remove();
        if (t.$dots) {
            t.$dots.remove();
        }
        if (t.$prevArrow && t.htmlExpr.test(t.options.prevArrow)) {
            t.$prevArrow.remove();
        }
        if (t.$nextArrow && t.htmlExpr.test(t.options.nextArrow)) {
            t.$nextArrow.remove();
        }
        t.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "");
    };
    t.prototype.unslick = function(e) {
        var t = this;
        t.$slider.trigger("unslick", [ t, e ]);
        t.destroy();
    };
    t.prototype.updateArrows = function() {
        var e = this, t;
        t = Math.floor(e.options.slidesToShow / 2);
        if (e.options.arrows === true && e.slideCount > e.options.slidesToShow && !e.options.infinite) {
            e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false");
            e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false");
            if (e.currentSlide === 0) {
                e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true");
                e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false");
            } else if (e.currentSlide >= e.slideCount - e.options.slidesToShow && e.options.centerMode === false) {
                e.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true");
                e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false");
            } else if (e.currentSlide >= e.slideCount - 1 && e.options.centerMode === true) {
                e.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true");
                e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false");
            }
        }
    };
    t.prototype.updateDots = function() {
        var e = this;
        if (e.$dots !== null) {
            e.$dots.find("li").removeClass("slick-active").attr("aria-hidden", "true");
            e.$dots.find("li").eq(Math.floor(e.currentSlide / e.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden", "false");
        }
    };
    t.prototype.visibility = function() {
        var e = this;
        if (e.options.autoplay) {
            if (document[e.hidden]) {
                e.interrupted = true;
            } else {
                e.interrupted = false;
            }
        }
    };
    e.fn.slick = function() {
        var e = this, i = arguments[0], n = Array.prototype.slice.call(arguments, 1), r = e.length, s, o;
        for (s = 0; s < r; s++) {
            if (typeof i == "object" || typeof i == "undefined") e[s].slick = new t(e[s], i); else o = e[s].slick[i].apply(e[s].slick, n);
            if (typeof o != "undefined") return o;
        }
        return e;
    };
});

$(document).ready(function() {
    $(".rating--read-only").starRating({
        starSize: 14,
        useFullStars: true,
        readOnly: true
    });
    $(".rating--read-only-l").starRating({
        starSize: 24,
        useFullStars: true,
        readOnly: true
    });
    $(".rating--input").starRating({
        starSize: 24,
        useFullStars: true,
        callback: function(e, t) {}
    });
    $(".product_gallery-photos").owlCarousel({
        items: 1,
        loop: false,
        center: true,
        URLhashListener: true,
        autoplayHoverPause: true,
        startPosition: "prod-1"
    });
    $(".gallery").owlCarousel({
        margin: 16,
        loop: true,
        nav: true,
        dots: false,
        responsive: {
            0: {
                items: 2
            },
            750: {
                items: 4
            },
            1100: {
                items: 5
            }
        }
    });
    $(".js-checkout-card").card({
        container: ".checkout_cc"
    });
    $("#js-cc-close").on("click", function(e) {
        e.preventDefault();
        $(".checkout_cc").toggle();
    });
    $("#radio-cc").on("click", function(e) {
        $(".checkout_cc").toggle();
    });
    $(".js-popup-toggle").click(function(e) {
        e.preventDefault();
        var t = $(this).data("target");
        if ($(t).is(":hidden")) {
            $(t).slideDown("fast");
        } else {
            $(t).slideUp("fast");
        }
    });
    $(".js-popup-toggle--mob").click(function(e) {
        e.preventDefault();
        var t = $(this).data("target");
        if ($(t).is(":hidden") && $(window).width() < 1101) {
            $(t).slideDown("fast");
        } else if ($(window).width() < 1101) {
            $(t).slideUp("fast");
        }
    });
    $(".js-cart_products-delete").click(function(e) {
        $(this).parent(".cart-products_item-delete").parent(".cart-products_item").fadeOut("fast");
    });
    if ($(window).width() > 1100) {
        $(".product-filter").height($(".products-list").height());
    }
    $(".quantity-spinner").spinner("delay", 200).spinner("changed", function(e, t, i) {
        var n = parseFloat($(this).parent(".quantity-spinner").siblings(".js-product_quantity-total").data("price"));
        var r = $(this).parent(".quantity-spinner").siblings(".js-product_quantity-total");
        if (t > 1) {
            productPriceTotal = n * t;
            r.text("$" + productPriceTotal.toFixed(2) + " (total price)");
        } else if (t <= 1) {
            r.text("");
        }
    });
    function e() {
        $(".js-product_quantity-total").map(function(e) {
            var t = $(this).data("price");
            var i = $(this).data("quantity");
            if (i > 1) {
                priceTotal = t * i;
                $(this).text("$" + priceTotal.toFixed(2) + " (total price)");
            }
        });
    }
    e();
    $("#datepicker").datepicker({
        inline: true
    });
    $(".features-scroll").slick({
        vertical: true,
        slidesToShow: 3,
        prevArrow: $(".features-scroll_arrow--prev"),
        nextArrow: $(".features-scroll_arrow--next"),
        swipe: true
    });
});