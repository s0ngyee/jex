/**
 * Created with IntelliJ IDEA.
 * User: bsy
 * Date: 13-8-4
 * Time: 上午10:59
 * To change this template use File | Settings | File Templates.
 */
;(function(J) {

    /**
     * GroupBase
     * @constructor
     */
    function GroupBase() {
        var defOpts = {
            itms: [],
            min: 0,
            max: 0,
            rmin: 0
        };
        var a = arguments,
            o = a[0] || {},
            opts = J.mix(defOpts, o),
            self = this;

        this.itms = opts.itms;
        this.min = opts.min;
        this.max = opts.max;
        this.rmin = opts.rmin;

        GroupBase.superclass.constructor.call(this, opts);
    }

    J.EX.inherit(GroupBase, J.EX.widget.base);

    J.mix(J.EX.widget, {
        group: GroupBase
    });
})(J);