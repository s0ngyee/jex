/**
 * JEX adapter
 *
 * @module adapter
 * @submodule base
 * @namespace J.EX.adapter
 * @author songyee
 * @since 0.1.0
 */
;(function(J) {

    /**
     * ui base package
     * @namespace J.EX.ui
     */
    J.EX.namespace('J.EX.adapter');

    /**
     * UIBase
     *
     * @class UIBase
     * @constructor
     *
     */
    function UIBase() {
        /**
         *
         * @config defOpts
         * @type Object
         * @param el {Object} [] defOpts.el
         */
        var defOpts = {
            el: {}
        };

        var a = arguments,
            o = a[0] || {},
            el = a[1] || {},
            opts = J.mix(defOpts, o),
            self = this;

        /**
         * UI object container id
         *
         * @property elId
         * @type String
         */
        this.elId = opts.elId;

        /**
         * UI object container object
         * @property el
         * @type Object
         */
        this.el = opts.elId ? J.g(opts.elId) : '';
    }

    UIBase.prototype = {
        /**
         * UI object validate function
         *
         * @method validate
         */
        validate: function(){

        }
    };

    J.mix(J.EX.ui, {
        base: UIBase
    });

})(J);