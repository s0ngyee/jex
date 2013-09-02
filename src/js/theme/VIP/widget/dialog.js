/**
 * Created with IntelliJ IDEA.
 * User: bsy
 * Date: 13-8-3
 * Time: 上午1:11
 * To change this template use File | Settings | File Templates.
 */
;(function(J) {

})(J);
(function(J) {

    /**
     * VIP widget package
     */
    J.EX.namespace('J.EX.widget.VIP');

    J.EX.namespace('J.dom.fn.vip');

    /**
     * Dialog
     * @constructor
     */
    function Dialog() {
        var defOpts = {
            pnl_head: '<h2 class="popdiv-box-hd">{$title}</h2>',
            pnl_body: '<div class="popdiv-box-mod"></div>',
            pnl_foot: '<div class="popdiv-box-btn"></div>',
            pnl_field: '<ul class="buld-num-list"></ul>',
            btn_close: '<em class="popdiv-box-close"></em>',
            btn_confirm: '<a href="javascript:void(0);" class="sure-btn">确&nbsp;&nbsp;认</a>',
            btn_cancel: '<a href="javascript:void(0);" >取消</a>',
            body_html: '',
            init: null
        };
        var a = arguments,
            o = a[0] || {},
            opts = J.mix(defOpts, o),
            self = this;

        Dialog.superclass.constructor.call(this, opts);
        this.pnl_head = opts.pnl_head.replace(/\{\$title\}/, this.title);
        this.pnl_body = opts.pnl_body;
        this.pnl_foot = opts.pnl_foot;
        this.pnl_field = opts.pnl_field;
        this.btn_close = opts.btn_close;
        this.btn_confirm = opts.btn_confirm;
        this.btn_cancel = opts.btn_cancel;
        this.body_html = opts.body_html;
        this.init = opts.init;

        var init = function() {
            var elPnlHead = J.g(J.EX.dom.parseDOM(self.pnl_head)[0]),
                elPnlBody = J.g(J.EX.dom.parseDOM(self.pnl_body)[0]),
                elPnlField = J.g(J.EX.dom.parseDOM(self.pnl_field)[0])
            elPnlFoot = J.g(J.EX.dom.parseDOM(self.pnl_foot)[0]),
                elBtnCls = J.g(J.EX.dom.parseDOM(self.btn_close)[0]),
                elBtnConfirm = J.g(J.EX.dom.parseDOM(self.btn_confirm)[0]),
                elBtnCancel = J.g(J.EX.dom.parseDOM(self.btn_cancel)[0]);
            /**
             * dialog head
             */
            elPnlHead.append(elBtnCls);
            self.el.append(elPnlHead);

            /**
             * dialog body
             */
            elPnlField.html(self.body_html);
            /*
             self.comps.each(function(i, o) {

             })
             */
            elPnlBody.append(elPnlField);


            /**
             * dialog foot
             */
            elPnlFoot.append(elBtnConfirm);
            elPnlFoot.append(elBtnCancel);
            elPnlBody.append(elPnlFoot);
            self.el.append(elPnlBody);

            /**
             * bind base event
             */
            elBtnCls.on('click', function(){
                self.close();
            });

            elBtnConfirm.on('click', function(){
                self.confirm();
            });

            elBtnCancel.on('click', function(){
                self.close();
            });

            /**
             * call subclass init
             */
            if(self.init) {
                self.init.call(self);
            }
        };
        init();
    }

    Dialog.prototype = {
        show: function() {
            Dialog.superclass.show.call(this);
        },
        confirm: function() {
            Dialog.superclass.confirm.call(this);
        }
    }

    J.EX.inherit(Dialog, J.EX.widget.dialog);

    J.mix(J.EX.widget.VIP, {
        dialog: Dialog
    });

    J.dom.fn.vip.dialog = function(o) {
        return new Dialog(o);
    }

})(J);