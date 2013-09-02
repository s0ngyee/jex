/**
 * JEX
 *
 * JEX is a light weight UI library for Anjuke KFS team.
 * It is designed to separate the common component on the web page from business logic layer.
 * Currently the basic operation for dom is based on JockJS.
 *
 * @module core
 * @since 0.1.0
 *
 */
;(function(J) {
    /**
     * define library's host
     */
    var H = J.EX = J.EX || {};

    /**
     * @desc namespace for javascript
     * @borrows YUI3
     * @method namespace
     * @return {Object} Reference to the namespace object created.
     */
    function namespace() {
        var a = arguments, ns = a[0] || 'K', h = a[1] || J, DS = a[3] || '.',
            o = this, i = 0, d, th;
        if(ns.indexOf(DS) > -1) {
            d = ns.split(DS);
            th = h;
            for(; i < d.length; i++) {
                // default host is to J
                if(h == J && i == 0 && d[i] == 'J')
                    continue;
                if(typeof th[d[i]] == 'undefined') {
                    th[d[i]] = {};
                }
                th = th[d[i]];
            }
            o = th;
            return o;
        }
    }

    J.mix(J.EX, {
        namespace: namespace
    });
    J.namespace = J.EX.namespace;

    /**
     * @desc define empty function
     */
    function Empty() {

    }

    J.mix(J.EX, {
        empty: Empty
    });

    /**
     * @desc create an object
     * @borrows kissy
     * @param proto
     * @param constructor
     * @returns {*}
     */
    var ObjectCreate = Object.create;

    function createObject(proto, constructor) {
        var newProto;
        if (ObjectCreate) {
            newProto = ObjectCreate(proto);
        } else {
            Empty.prototype = proto;
            newProto = new Empty();
        }
        newProto.constructor = constructor;
        return newProto;
    }

    /**
     * @desc class inherit
     * @borrows kissy
     * @param r {Function} the object to modify
     * @param s {Function} the object to inherit
     * @param {Object} [px] prototype properties to add/override
     * @param {Object} [sx] static properties to add/override
     * @return r {Object}
     */
    function inherit(r, s, px, sx) {
        if (!s || !r) {
            return r;
        }

        var sp = s.prototype,
            rp;

        // add prototype chain
        rp = createObject(sp, r);
        r.prototype = J.mix(rp, r.prototype);
        r.superclass = createObject(sp, s);
        // add prototype overrides
        if (px) {
            J.mix(rp, px);
        }

        // add object overrides
        if (sx) {
            J.mix(r, sx);
        }
        return r;
    }

    J.mix(J.EX, {
        inherit: inherit
    });
    J.inherit = J.EX.inherit;

    /**
     * @desc singleton design pattern
     * @param fn
     * @returns {Function}
     */
    function singleton(fn) {
        var result;
        return function(){
            return result || (result = fn.apply(this, arguments));
        }
    }

    J.mix(J.EX, {
        singleton: singleton
    });
    J.singleton = J.EX.singleton;

})(J);


