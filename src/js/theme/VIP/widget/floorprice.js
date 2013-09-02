/**
 * Created with IntelliJ IDEA.
 * User: bsy
 * Date: 13-8-3
 * Time: 上午1:27
 * To change this template use File | Settings | File Templates.
 */
;(function(J) {


    /**
     * Floor Price Widget
     * @constructor
     */
    function FloorPrice() {
        var defOpts = {
            num: 1,
            ds: [],
            cfs: [],
            info: []
        };

        var a = arguments,
            o = a[0] || {},
            opts = J.mix(defOpts, o),
            self = this;

        this.num = opts.num;
        this.ds = opts.ds;
        this.cfs = opts.cfs;
        this.cf = null;
        this.ppr = '<div class="pub-floor-box"></div>';
        this.pprl = '<ul class="vol-list"></ul>';
        this.tcf = '<label><input type="checkbox" name="chk_floor_id[]" class="flr-chk-inp" id="chk_floor_id_{$num}" value="{$num}" />{$num}层</label>';
        this.tpi = '<li id="flr_d_{$num}"><div class="vol-inf-mod"><span class="vol-item item-a">{$num} 层</span><span class="vol-item item-b"><input type="text" name="floor_unite_price[]" class="comm-inp inp-def" value=""/></span><span class="vol-item item-c"><input type="text" name="floor_prop_num[]" class="comm-inp-s inp-def" value=""/></span></div></li>';

        FloorPrice.superclass.constructor.call(this, opts);

        var init = function() {
            /**
             * insert sub panel
             */
            var subPnlsHtml = self.ppr + self.ppr;
            self.el.html(subPnlsHtml);

            /**
             * init check box
             */
            renderFloorList();
        }

        var renderFloorList = function() {
            var ID_CHK_ALL = 'chk_floor_all',
                elPnl = J.s('.pub-floor-box', self.el[0]).eq(0),
                chkPnlHtml = '<div class="pub-sel-floor"></div>',
                itmHtml = '<label><input type="checkbox" name="chk_floor_all" class="flr-chk-inp" id="' + ID_CHK_ALL + '" value="-1"/>全选</label>',
                elChkPnl;
            elPnl.html(chkPnlHtml);
            elChkPnl = J.s('.pub-sel-floor', elPnl[0]).eq(0);
            for (var i = 0; i < self.num; i++) {
                itmHtml += self.tcf.replace(/\{\$num\}/g, i + 1)
                    .replace(/\{\$checked\}/, '');
            }
            elChkPnl.html(itmHtml);

            /**
             * check item event
             */
            var elChkItms = J.s('.flr-chk-inp', elChkPnl[0]);
            elChkItms.each(function(i, o) {
                (function(){
                    J.g(o).on('click', function(){
                        var el = J.g(o),
                            elVal = el[0].value,
                            elchk = el[0].checked,
                            id = el.attr('id'),
                            elChkAll = J.g(ID_CHK_ALL),
                            chkall = elChkAll[0].checked,
                            elChks = J.s('[name*="chk_floor_id"]:checked');
                        if(id == ID_CHK_ALL) {
                            /**
                             * set all checkbox checked
                             */
                            elChkItms.each(function(j, p) {
                                var val = p[0].value;
                                p[0].checked = chkall;
                                if(chkall && val != -1) {
                                    self.cfs.push(val);
                                } else {
                                    self.cfs = [];
                                }
                            });
                            if(chkall) {
                                addFloorPriceAll();
                            } else {
                                removeFloorPriceAll();
                            }
                        } else {
                            if(elchk) {
                                self.cfs.push(elVal);
                                self.cf = elVal;
                                addFloorPrice();
                            } else {
                                var tcfs = []
                                self.cfs.each(function(v, k){
                                    if(v != elVal) {
                                        tcfs.push(v);
                                    }
                                });
                                self.cfs = tcfs;
                                self.cf = elVal;
                                removeFloorPrice();
                            }

                            if(elChks.length === elChkItms.length - 1 && !chkall) {
                                elChkAll[0].checked = true;
                            }

                            if(elChks.length < elChkItms.length - 1 && chkall) {
                                elChkAll[0].checked = false;
                            }
                        }
                    })
                })()
            });
        }

        var renderFloorPriceHeader = function() {
            var headHtml  = '<div class="volume-price-head" id="volum_price_head">';
            headHtml += '<div class="set-volume-hd">';
            headHtml += '<span class="volume-sp">批量设置价格：<input type="text" name="price_m" id="price_m" class="comm-inp inp-def"/>元/平米</span>';
            headHtml += '<span class="volume-sp"><em class="pub-volm-line"></em></span>';
            headHtml += '<span class="volume-sp">批量设置数量：<input type="text" name="num_m" id="num_m" class="comm-inp-s inp-def"/>套</span>';
            headHtml += '</div>';
            headHtml += '<div class="set-volume-shd">';
            headHtml += '<span class="vol-item item-a">楼层</span>';
            headHtml += '<span class="vol-item item-b"><em class="red-mark">*</em>价格</span>';
            headHtml += '<span class="vol-item item-c"><em class="red-mark">*</em>数量（套）</span>';
            headHtml += '</div>';
            headHtml += '</div>';

            var elPnl = J.s('.pub-floor-box', self.el[0]).eq(1);
            elPnl.html(headHtml + self.pprl);

            /**
             *  bind multi set price and num
             */
            var elPriceM = J.g('price_m'),
                elNumM = J.g('num_m');

            elPriceM.on('keyup', function(evt) {
                var evt = evt || window.event,
                    el = evt.srcTarget || evt.srcElement,
                    elPriceItms = J.s('.vol-inf-mod .comm-inp'),
                    price = J.g(el).val();
                elPriceItms.each(function(i, o) {
                    J.g(o).val(price);
                })
            });

            elNumM.on('keyup', function(evt) {
                var evt = evt || window.event,
                    el = evt.srcTarget || evt.srcElement,
                    elNumItms = J.s('.vol-inf-mod .comm-inp-s'),
                    num = J.g(el).val();
                elNumItms.each(function(i, o) {
                    J.g(o).val(num);
                });
            });
        }

        var addFloorPrice = function() {
            /**
             * if head exist
             */
            var elHead = J.g('volum_price_head');
            if(!elHead) {
                renderFloorPriceHeader();
            }

            var elPricePnl = J.s('.vol-list', self.el[0]).eq(0),
                piHtml = self.tpi.replace(/\{\$num\}/g, self.cf),
                elPriItm = J.g(J.EX.dom.parseDOM(piHtml)[0]);

            var sumPropTotal = function(){
                var sum = 0,
                    elFlrNums = J.s('[name*=floor_prop_num]'),
                    elPropNum = J.g('prop_sale_num');
                elFlrNums.each(function(i, o){
                    sum += parseInt(J.g(o).val());
                });
                elPropNum.val(sum);
            }

            elPricePnl.append(elPriItm);
            elPriItm.on('keyup', sumPropTotal)
                .on('change', sumPropTotal);
        }

        var removeFloorPrice = function() {
            J.g('flr_d_' + self.cf).remove();

            /**
             * if is is the last item
             */
            if(self.cfs.length == 0) {
                removeFloorPriceAll();
            }
        }

        var addFloorPriceAll = function() {
            /**
             * if head exist
             */
            var elHead = J.g('volum_price_head');
            if(!elHead) {
                renderFloorPriceHeader();
            }

            self.cfs.each(function(v, k){
                var elPriItm = J.g('flr_d_'+v);
                if(!elPriItm) {
                    self.cf = v;
                    addFloorPrice();
                }
            })
        }

        var removeFloorPriceAll = function() {
            var elPricePnl = J.s('.pub-floor-box').eq(1);
            elPricePnl.html('');
        }
        init();
    }

    J.EX.inherit(FloorPrice, J.EX.widget.base);

    J.mix(J.EX.widget.VIP, {
        floorprice: FloorPrice
    });

    J.dom.fn.vip.floorprice = function(o) {
        return new FloorPrice(o);
    }
})(J);