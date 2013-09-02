/**
 * Created with IntelliJ IDEA.
 * User: bsy
 * Date: 13-8-3
 * Time: 上午1:22
 * To change this template use File | Settings | File Templates.
 */
;(function(J) {
    /**
     * Text
     * @constructor
     */
    function TextField() {
        var defOpts = {

        };
        var a = arguments,
            o = a[0] || {},
            opts = J.mix(defOpts, o),
            self = this;
        TextField.superclass.constructor.call(this, opts);
    }

    J.EX.inherit(TextField, J.EX.ui.textfield);

    J.mix(J.EX.ui.VIP, {
        text: TextField
    });
})(J);