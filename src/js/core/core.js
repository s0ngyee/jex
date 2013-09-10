/**
 * JEX
 *
 * JEX is a light weight UI library for Anjuke KFS team.
 * It is designed to separate the common component on the web page from business logic layer.
 * Currently the basic operation for dom is based on JockJS.
 *
 * @module core
 * @submodule core
 * @main EX
 * @author songyee
 * @since 0.1.0
 */
;(function(J) {
    /**
     * define library's host
     * @namespace J.EX
     */
    var H = J.EX = J.EX || {};

    /**
     * Namespace for javascript
     *
     * @method namespace
     * @return {Object} Reference to the namespace object created
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
     * Define empty function
     *
     * @class Empty
     * @constructor
     */
    function Empty() {

    }

    J.mix(J.EX, {
        empty: Empty
    });

    var ObjectCreate = Object.create;

    /**
     * Create an object
     *
     * @method createObject
     * @param {Object} proto
     * @param {constructor} constructor
     * @returns {Object} newProto
     */
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
     * Class inherit
     *
     * @method inherit
     * @param {Function} r the object to modify
     * @param {Function} s the object to inherit
     * @param {Object} [px] prototype properties to add/override
     * @param {Object} [sx] static properties to add/override
     * @return {Object} r
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
     * Singleton design pattern
     *
     * @method singleton
     * @param {Function} fn
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


