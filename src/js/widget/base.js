/**
 * Created with IntelliJ IDEA.
 * User: bsy
 * Date: 13-8-3
 * Time: 上午1:09
 * To change this template use File | Settings | File Templates.
 */

/**
 * J widget
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

    WidgetBase.prototype = {
        _bind: function() {

        },
        validate: function(){
            //console.log('###### uiBase validate #####');
        }
    };

    J.mix(J.EX.widget, {
        base: WidgetBase
    });

})(J);