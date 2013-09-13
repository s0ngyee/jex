/**
 * JEX widget
 *
 * @module widget
 * @submodule dialog
 * @namespace J.EX.widget.dialog
 * @author songyee
 * @since 0.1.0
 */
;(function(J) {

    /**
     * DialogBase
     * @constructor
     */
    function DialogBase() {
        var defOpts = {
            title: '',
            width: 200,
            height: 100,
            zidx: 10000,
            cls: '',
            url: '',
            body: '',
            comps: [],
            pnl: '<div></div>',
            show_mask: true,
            is_ajax: false,
            onconfirm: null
        };

        var a = arguments,
            o = a[0] || {},
            opts = J.mix(defOpts, o),
            self = this;

        this.title = opts.title;
        this.width = opts.width;
        this.height = opts.height;
        this.zidx = opts.zidx;
        this.cls = opts.cls;
        this.url = opts.url;
        this.body = opts.body;
        this.comps = opts.comps;
        this.pnl = opts.pnl;
        this.show_mask = opts.show_mask;
        this.is_ajax = opts.is_ajax;
        this.onconfirm = opts.onconfirm;

        DialogBase.superclass.constructor.call(this, opts);

        var init = function() {
            /**
             * init the dialog panel
             */
            self.el = J.g(J.EX.dom.parseDOM(self.pnl)[0]);

            if(self.cls) {
                self.el.addClass(self.cls);
            }
            self.el.setStyle({
                'position': 'absolute',
                'width': self.width + 'px',
                'minHeight': self.height + 'px',
                'left': J.page.viewWidth() / 2 - self.width / 2 + J.page.scrollLeft() + 'px',
                'top': J.page.viewHeight() / 2 - self.height / 2 + J.page.scrollTop() + 'px',
                'zIndex': self.zidx
            });

            /**
             * append to body
             */
            J.g(J.D.body).append(self.el[0]);

            /**
             * set mask
             */
            self.mask = new J.EX.ui.mask({
                modal: self.el
            });
        }
        init();
    }

    DialogBase.prototype = {
        show: function() {
            if(this.show_mask) {
                this.mask.show();
            }
        },
        close: function() {
            this.remove();
        },
        remove: function() {
            this.el.remove();
            if(this.show_mask) {
                this.mask.remove();
            }
        },
        confirm: function() {
            if(this.onconfirm) {
                this.onconfirm();
            }
        },
        cancel: function() {
            this.remove();
        }
    }

    J.EX.inherit(DialogBase, J.EX.widget.base);

    J.mix(J.EX.widget, {
        dialog: DialogBase
    });
})(J);