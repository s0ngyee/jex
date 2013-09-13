/**
 * JEX widget
 *
 * @module widget
 * @submodule base
 * @namespace J.EX.widget.base
 * @author songyee
 * @since 0.1.0
 */
;(function(J) {

    /**
     * widget package
     */
    J.EX.namespace('J.EX.widget');

    /**
     * WidgetBase
     * @constructor
     */
    function WidgetBase() {
        var defOpts = {
            el: '',
            elId: ''
        };

        var a = arguments,
            o = a[0] || {},
            opts = J.mix(defOpts, o),
            self = this;

        this.elId = opts.elId;
        this.el = J.g(this.elId);
    }

    J.mix(J.EX.widget, {
        base: WidgetBase
    });

})(J);