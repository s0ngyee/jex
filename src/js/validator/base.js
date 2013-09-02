(function(J) {

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
            elId: '',
            onload: null
        };

        var a = arguments,
            o = a[0] || {},
            opts = J.mix(defOpts, o),
            self = this;

        this.elId = opts.elId;
        this.el = J.g(this.elId);
        this.onload = opts.onload;
        this._init(opts);
    }

    WidgetBase.prototype = {
        _init: function() {
        },
        validate: function(){

        }
    };

    J.mix(J.EX.widget, {
        base: WidgetBase
    });
})(J);