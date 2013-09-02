/**
 * Created with IntelliJ IDEA.
 * User: bsy
 * Date: 13-8-3
 * Time: 上午12:51
 * To change this template use File | Settings | File Templates.
 */
;(function(J) {
    /**
     * MaskBase
     * @constructor
     */
    function MaskBase() {
        var defOpts = {
            modal: '',
            zidx: 9999,
            tpl: '<div id="mask" style="display:none;background-color: rgb(0, 0, 0);width: 100%; position: absolute;opacity: 0.5;z-index: {$zidx};"></div>'
        };

        var a = arguments,
            o = a[0] || {},
            opts = J.mix(defOpts, o),
            self = this;
        this.modal = opts.modal;
        this.zidx = opts.modal.zidx ? opts.modal.zidx - 1 : opts.zidx;
        this.tpl = opts.tpl.replace(/\{\$zidx\}/, opts.zidx);

        MaskBase.superclass.constructor.call(this, opts);

        var init = function() {
            self.el = J.g(J.EX.dom.parseDOM(self.tpl)[0]);
            self.el.setStyle({
                'height': J.page.height() + 'px',
                'left': J.page.scrollLeft() + 'px',
                'top': J.page.scrollTop() + 'px'
            });
            J.g(J.D.body).append(self.el[0]);

            self.el.on('click', function() {
                self.remove();
            })
        }
        init();
    }

    MaskBase.prototype = {
        show: function() {
            this.el.show();
        },
        hide: function() {
            this.el.hide();
        },
        remove: function() {
            this.el.remove();
            if(this.modal) {
                this.modal.remove();
            }
        }
    }

    J.EX.inherit(MaskBase, UIBase);

    J.mix(J.EX.ui, {
        mask: MaskBase
    });

})(J);
