/**
 * JEX ui
 *
 * @path: ui/base.js
 * @author: songyee
 * @date: 2013/08/14
 * @version: 0.1.0
 */
;(function(J) {

    /**
     * ui base package
     */
    J.EX.namespace('J.EX.ui');

    /**
     * uiBase
     * @constructor
     */
    function UIBase() {
        var defOpts = {
            el: ''
        };

        var a = arguments,
            o = a[0] || {},
            el = a[1] || {},
            opts = J.mix(defOpts, o),
            self = this;

        this.elId = opts.elId;
        this.el = opts.elId ? J.g(opts.elId) : '';
    }

    UIBase.prototype = {
        validate: function(){

        }
    };

    J.mix(J.EX.ui, {
        base: UIBase
    });

})(J);