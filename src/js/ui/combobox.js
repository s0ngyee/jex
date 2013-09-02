;(function(J) {

    /**
     * VIP ui package
     */
    J.EX.namespace('J.EX.ui.VIP');

    J.EX.namespace('J.dom.fn.vip');

    /**
     * Combobox
     * @constructor
     */
    function Combobox() {

        var defOpts = {
            ti: '<li data-value="{$value}">{$key}</li>'
        };

        var a = arguments,
            o = a[0] || {},
            opts = J.mix(defOpts, o),
            self = this;
        Combobox.superclass.constructor.call(this, opts);

        this.elMnu = J.s('.menu-inp', self.el[0]).eq(0);
        this.elList = J.s('.pull-menu-list', self.el[0]).eq(0);
        this.elTxt = J.s('[name=' + self.elId+'_txt]', self.el[0]).eq(0);
        this.elVal = J.s('[name=' + self.elId+'_val]', self.el[0]).eq(0);

        var init = function() {
            self.refresh();

            /**
             * show drop down list
             */
            self.elMnu.on('click', function(){
                if(self.enable) {
                    self.isExpand = !self.isExpand;
                    self.isExpand ? self.elList.show() : self.elList.hide();
                }
            });

            /**
             * drop down list hide
             */
            J.g(J.D).on('mousedown', function(evt){
                var evt = evt || window.event,
                    el = evt.srcTarget || evt.srcElement;
                if (self.isExpand == true && !J.EX.dom.contains(self.el[0], el)) {
                    self.elList.hide();
                    self.isExpand = false;
                }
            });
        };

        init();
    }

    Combobox.prototype = {
        refresh: function() {
            Combobox.superclass.refresh.call(this);
            var self = this,
                itmHtml = '<li data-value="-1">' + this.idk + '</li>';

            /**
             * show scroll bar
             */
            if(this.ds.length > self.mxsn) {
                this.elList.addClass('scroll-show');
            }

            /**
             * append item
             */
            this.ds.each(function(o, i){
                var key;
                if (typeof o == 'object') {
                    key = o.length > 1 ? o[1] : o[0];
                    key = self.ikp + key + self.iks;
                    itmHtml += self.ti.replace(/\{\$value\}/, o[0])
                        .replace(/\{\$key\}/, key);
                } else {
                    key = self.ikp + o + self.iks;
                    itmHtml += self.ti.replace(/\{\$value\}/, o)
                        .replace(/\{\$key\}/, key);
                }
            });
            this.elList.html(itmHtml);

            /**
             * select item
             */
            var elItems = J.s('ul > li', self.el[0]);
            elItems.each(function(i, o){
                (function(){
                    J.g(o).on('click', function(){
                        var el = J.g(o),
                            key = el.html(),
                            val = el.attr('data-value');
                        self.isExpand = false;
                        self.val = val;
                        self.elTxt.val(key);
                        self.elVal.val(val);
                        self.elList.hide();
                        /**
                         * set current ds
                         */
                        self.ds.each(function(o){
                            if(typeof o == 'object') {
                                if(o[0] == val) {
                                    self.si = o;
                                }
                            } else {
                                if(o == val) {
                                    self.si = o;
                                }
                            }
                        });
                        if(self.onselect) {
                            self.onselect.call(self);
                        }
                    })
                })()
            });
        },
        reset: function(){
            Combobox.superclass.reset.call(this);
            this.elTxt.val(this.idk);
            this.elVal.val('');
        }
    };

    J.EX.inherit(Combobox, J.EX.ui.combobox);

    J.mix(J.EX.ui.VIP, {
        combobox: Combobox
    });

    J.dom.fn.vip.combobox = function(o) {
        return new Combobox(o);
    }

})(J);