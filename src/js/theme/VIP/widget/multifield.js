/**
 * Created with IntelliJ IDEA.
 * User: bsy
 * Date: 13-8-4
 * Time: 上午11:13
 * To change this template use File | Settings | File Templates.
 */
;(function(J) {
    /**
     * MultiField
     * @constructor
     */
    function MultiField() {
        var defOpts = {
            fields: [],
            min: 0
        };
        var a = arguments,
            o = a[0] || {},
            opts = J.mix(defOpts, o),
            self = this;

        this.fields = opts.fields;
        this.min = opts.min;

        MultiField.superclass.constructor.call(this, opts);

        var init = function() {

        }

        init();
    }

    J.EX.inherit(MultiField, J.EX.widget.group);

    J.mix(J.EX.widget.VIP, {
        multifield: MultiField
    });
})(J);