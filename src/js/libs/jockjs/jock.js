/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 *
 * 这是框架核心主文件，需要用到框架，此文件必须要载入，
 *
 * 注意：全局变量 J 不能重复定义
 * 注意：此文件涉及到整站JS稳定正常运行的核心，请勿随意修改
 *
 *
 * @path: base/base.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/09/27
 *
 */


/**
 * 构造J对象
 *
 */
(function (W) {
    var BaseStart = +new Date(), PageStart = W.PAGESTART || BaseStart, hs = 'hasOwnProperty', mix = function (l, r, w) {
            if(w){
                var N = {};
                for (var n in l){ if (l[hs](n))N[n] = l[n]}
                for (var n in r){if (r[hs](n))N[n] = r[n]}
                return N;
            }
            for (var p in r) {if (r[hs](p)) {l[p] = r[p];} }return l;
        }, base = {},slice = Array.prototype.slice,jsH = 'http://services.kfs.anjuke.test/js/',cssH = 'http://services.kfs.anjuke.test/css/', _ = {}, times = {
        PS:PageStart,
        BS:BaseStart,
        CL:PageStart
    };

    var version = 'jock', readyList = [], callList = [], jsModules = [], cssModules = [], D = W.document, h = D.getElementsByTagName('head')[0], dE = D.documentElement, A = arguments, U = A[2],  s = A[1].split(','), aL = s[0], rL = s[1], aT = s[2], dT = s[3], cL = s[4], sC = s[5], rS = s[6], C = s[7], ld = s[8], old = 'on' + ld, isReady = 0, bind = 0, sT = W.setTimeout,sI = W.setInterval, conf = {
            v:version, u:jsH, m:'/', c:'utf-8', s:cssH
        }, S = D[rS], Dt = D[aT], c2t = {}, IS = {}, nu = navigator.userAgent, R = RegExp, JS = 'js', CSS = 'css';


    /**
     * 增加引用，便于调用
     * @type {Object}
     */
    var link = {
        W:W,
        D:D,
        St:sT,
        Si:sI
    };


    /**
     * 遍历Object中所有元素。
     *
     * @param {Object} object 需要遍历的Object
     * @param {Function} callback 对每个Object元素进行调用的函数
     * @return {Object} 原对象
     *
     */
    function each(object, callback) {
        var i = 0, I, length = object.length, isObj = length === U;
        if (isObj) {
            for (I in object) {
                if (callback.call(object[ I ], I, object[ I ]) === false) {
                    break;
                }
            }
        } else {
            for (; i < length;) {
                if (callback.call(object[ i ], i, object[ i++ ]) === false) {
                    break;
                }
            }
        }
        return object;
    }

    function Tp( o ) {
        return o === null ? String( o ) : c2t[ Object.prototype.toString.call(o) ] || U;
    }

    (function(){
        each("Boolean Number String Function Array Date RegExp Object".split(" "), function(i, name) {
            var lowerName = name.toLowerCase();
            c2t[ "[object " + name + "]" ] = lowerName;
            IS['is'+name] = function(o){
                return Tp(o) === lowerName
            };
        });
        IS.isWindow = function( object ) {
            return object && IS.isObject(object) && "setInterval" in object;
        };
        IS.isUndefined = function( object ){
            return object === U;
        }
    })();




    /**
     * 提供自定义模块支持， 注：为保证自定义模块名称与核心类库模块名称冲突，
     * 自定义模块命名规则为 “模块类别_用途”，中间用 “_” ，
     *
     *      注册模块    J.add('u_login',object);
     *      使用模块    J.u_log etc...
     *
     *
     */
    mix(base, {
        /**
         * 绑定mix方法
         */
        mix:mix,
        /**
         * 添加核心模块，如果添加的模块已经存在，原模块将被重写，
         * 可以利用此特性进行多态开发, 但是这存在一定的风险，禁止覆盖核心模块
         * @param {String} module 模块名称
         * @param {Object | Function} object 模块对象
         */
        add:function (module, object) {
            if(IS.isFunction(object)){
                _[module] = object;
                return;
            }
            var m = {};
            _.mix(m, object);
            return _.mix(_[module] = _[module] || {}, m);
        },
        ua:{
            ua:nu,
            chrome : /chrome\/(\d+\.\d+)/i.test(nu) ? + R.$1 : U,
            firefox : /firefox\/(\d+\.\d+)/i.test(nu) ? + R.$1 : U,
            ie : /msie (\d+\.\d+)/i.test(nu) ? (D.documentMode || + R.$1) : U,
            opera : /opera(\/| )(\d+(\.\d+)?)(.+?(version\/(\d+(\.\d+)?)))?/i.test(nu) ?  + ( R.$6 || R.$2 ) : U,
            safari : /(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i.test(nu) && !/chrome/i.test(nu) ? + (R.$1 || R.$2) : U
        }
    });

    /**
     * 绑定Ready事件
     */
    function bindReady() {
        if (bind)
            return;
        bind = 1;
        if (C === S)
            return finishRready();
        if (D[aL]) {
            D[aL](cL, function () {
                D[rL](cL, arguments.callee, 0), finishRready()
            }, 0);
            W[aL](ld, function () {
                W[rL](ld, arguments.callee, 0), finishRready(1)
            }, 0);
        } else if (Dt) {
            Dt(sC, function () {
                if (C === S)
                    D[dT](sC, arguments.callee), finishRready()
            });
            W[aT](old, function () {
                W[dT](old, arguments.callee), finishRready(1)
            });

            if (dE.doScroll && null == W['frameElement']) {
                (function () {
                    if (isReady)
                        return;
                    try {
                        dE.doScroll('left');
                    } catch (e) {
                        return sT(arguments.callee, 1);
                    }
                    finishRready();
                })()
            }
        }
    }

    /**
     * 加入任务队列，
     * 文档结构建立后会执行callback回调
     * @param {Function} callback
     */
    function ready(callback) {
        bindReady();
        isReady ? callback.call() : readyList.push(callback);
    }

    /**
     * 完成文档结构，如果队列有任务就执行任务
     */
    function finishRready(isLoad) {
        isLoad && (times.PL = getTime());
        if (!isReady) {
            if (!D.body) {
                return sT(finishRready, 1);
            }
            isReady = 1;
            times.CL = getTime();
            if (readyList) {
                var fn, i = 0;
                while (( fn = readyList[i++])) {
                    fn.call();
                }
                readyList = null;
            }
            return 0
        }
    }

    /**
     * 资源加载器，
     * 资源加载成功后会执行callback回调
     * @param {String} url 资源地址
     * @param {String} type 资源类型 || callback
     * @param {Function} callback
     */
    function loadResource(url, type, callback) {
        var n;
        IS.isFunction(type) && (callback = type);
        type = /\.(js|css)/g.exec(url.toLowerCase()), type = type ? type[1] : JS;
        if (JS === type) {
            n = D.createElement('script');
            n.type = 'text/javascript';
            n.src = url;
            n.async = 'true';
            n.charset = conf.c;
        } else if (CSS === type) {
            n = D.createElement('link');
            n.type = 'text/css';
            n.rel = 'stylesheet';
            n.href = url;
	    h.appendChild(n);
	    return;
        }

        n.onload = n[sC] = function () {
            var rs = this[rS];
            if (!rs || 'loaded' === rs || C === rs) {
                callback && callback();
                n.onload = n[sC] = null;
            }
        };
        h.appendChild(n);
    }

    /**
     * 获取模块资源地址
     * @param {Array} m 模块
     * @param {String} t 类型
     * @return {String} 资源地址
     */
    function buildUrl(m,t) {
        t || (t = JS);
        return conf[t == JS ? 'u':'s'] + m.join(conf.m) + conf.m + conf.v + '.' + t;
    }

    /**
     * 查看模块所否存在
     * @param {String} m 模块
     * @param {String} t 类型
     * @return {Boolean}
     */
    function moduleExits(m,t) {
        if(t == CSS) return inArray(m, cssModules) > -1;
        var o = m.split('.'), n = o.length, M = _[o[0]];
        return (n === 1 && M) ? true : (n === 2 && M && M[o[1]]) ? true : false;
    }

    /**
     * 过滤重复或已存在的模块
     * @param m 模块数组
     * @param {String} t 类型
     * @return {Array}
     */
    function filterModules(m,t){
        var l = m.length, M = [], R = [], re, K;
        while(l--){
            K = m[l];
            if(/^\w+$/.test(K)){
                M.push(K)
            }
        }
        l = m.length;
        while(l--){
            K = m[l];
            if(re = K.match(/^(\w+)\.\w+$/)){
                if(inArray(re[1], M) != -1){
                    m.splice(l,1);
                }
            }
        }
        l = m.length;
        while(l--){
            K = m[l];
            if(inArray(K, R) == -1 && ( t == CSS || !moduleExits(K,t) )){
                R.push(K);
            }
        }
        return R.sort();
    }

    function inArray( item, array ) {
        var i = 0, l;

        if ( array ) {
            l = array.length;

            for ( ; i < l; i++ ) {
                if ( array[ i ] === item ) {
                    return i;
                }
            }
        }

        return -1;
    }

    /**
     * 指定需要使用那些模块
     * @param {Array|String} require 依赖的模块，
     *         多个模块用数组的方式 ['module1','module2'] , 只依赖一个模块可直接传入模块字符串
     * @param {Function} callback 回调函数
     *         模块如果存在或加载完成后执行回调函数
     * @param {String} type 资源类型
     *         模块如果存在或加载完成后执行回调函数
     * @param {Boolean|Number} delay || undefined
     *         指定数字为延迟执行，单位毫秒，
     *         留空则等待ready后合并成一个请求
     *         ‘async’ 则立即请求，这样使用务必清楚所使用的核心模块安全可用，非特殊要求，否则不推荐这样使用
     * @return null
     */
    function use(require, callback, type, delay) {
        var mod, mods = [], cmods = [], i = 0, isJs;

        (type != JS && type != CSS) && (delay = type, type = JS), isJs = (type == JS);

        if (IS.isArray(require)) {
            while ((mod = require[i++])) (isJs ? mods : cmods).push(mod);
        } else if (IS.isString(require)) {
            (isJs ? mods : cmods).push(require);
        }

        mods = filterModules(isJs ? mods : cmods, type);

        if(IS.isNumber(delay)){
            ready(function () {
                var m, M = [], i = 0;
                while ((m = mods[i++]) && !moduleExits(m,type)) M.push(m);
                if (M.length) {
                    loadResource(buildUrl(M,type), type, callback)
                } else callback && callback.call()
            }.delay(delay));
        }else{
            if(!isReady && !delay){
                i = 0;
                while ((mod = mods[i++])) (isJs ? jsModules : cssModules).push(mod);
                callback && callList.push(callback);
            }else if(mods.length)
                loadResource(buildUrl(mods,type), type, callback)
            else callback && callback.call()
        }
    }


    /**
     * ready后执行队列任务
     */
    ready(function () {

        var mods = filterModules(jsModules, JS);
        function fCallbacks(){
            var fn , i = 0;
            while ( fn = callList[i++] ) fn.call();
            jsModules = callList = null;
        }
        if (mods.length) {
            loadResource(buildUrl(mods, JS), JS, fCallbacks);
            mods = [];
        }else fCallbacks();

        mods = filterModules(cssModules, CSS);
        if (mods.length) {
            loadResource(buildUrl(mods, CSS), CSS);
            cssModules = [];
        }

    });


    /**
     * 扩展ready方法
     */
    Function.prototype.ready = function () {
        ready.call(_,this)
    };

    /**
     * 扩展require方法
     */
    Function.prototype.require = function () {
        var a = arguments, args = slice.call(a), cssM = args[1];
        (IS.isArray(cssM) || IS.isString(cssM)) && (use.apply(_, [].concat([cssM], [null,CSS], slice.call(a,2))) , args.splice(1,1));
        args.splice(1,0,this,JS);
        use.apply(_, args)
    };

    /**
     * 扩展Function，延迟执行
     * @name delay
     * @function
     *
     */
    Function.prototype.delay = function(timeout){
        var m = this, args = slice.call(arguments, 1);
        sT(function() {
            return m.apply(m, args);
        }, timeout || 0);
    };


    /**
     * 在页面中插入 style 标签，设置特定的样式
     * @param cssText {String} 样式字符串
     * @param newStyle {Boolean} 使用新的Style标签添加
     */
    function rules(cssText, newStyle){
        var r = D.createTextNode(cssText),s;
        if(newStyle || !(s = D.getElementsByTagName('style')[0])){
            h.appendChild(s = D.createElement('style'));
            s.type = 'text/css';
        }
        s.styleSheet ? s.styleSheet.cssText += r.nodeValue : s.appendChild(r);
        return s;
    }

    function getTime(){
        return +new Date()
    }


    /**
     * 构造ready，load，use方法
     */
    _.base = mix(base, {
        ready:ready,
        finish:finishRready,
        load:loadResource,
        use:use,
        rules:rules,
        each:each,
        type:Tp,
        getTime:getTime,
        times:times,
        slice:slice
    });

    /**
     * 数据缓存
     * @type {}
     */
    _.data = {};

    /**
     * 提升 base 子集
     */
    mix(_, base);
    mix(_, IS);
    mix(_, link);

    W['J'] = _;

})(window, 'addEventListener,removeEventListener,attachEvent,detachEvent,DOMContentLoaded,onreadystatechange,readyState,complete,load', undefined);
/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: lang/lang.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/05/28
 *
 */



J.add('lang');
/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: lang/drag.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/12/10
 *
 */


/// require('lang.lang');


/**
 * 使dom对象具有拖动行为
 *
 * @grammar J.drag(options)
 *
 * @name J.lang.drag
 * @param {Object} options 配置项
 * @return {Object}
 *
 */
J.drag = J.lang.drag = function (options) {

};
/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: lang/extend.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/01/12
 *
 */



/// require('lang.lang');


/**
 * 对象继承。
 *
 * @grammar J.lang.extend(target, source)
 *
 * @name J.lang.extend
 * @param {Object} target 父对象
 * @param {Object} source 子对象
 * @return {Object} 对象
 *
 */
J.extend = J.lang.extend = function (target, source) {
    // 目前调用base到mix方法，只进行对象拷贝
    return J.mix(target, source);
};
/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: lang/inArray.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/02/15
 *
 */



/// require('lang.lang');


/**
 * 判断是否出现在数组中
 *
 * @grammar J.inArray( item, array )
 *
 * @name J.lang.inArray
 * @param {Object | String | Int} item 要查找的对象
 * @param {Array} array 被查找的数组
 * @return {Int} 查找到的索引
 *
 */
J.inArray = J.lang.inArray = function( item, array ) {
    var i = 0, len;

    if ( array ) {
        len = array.length;

        for ( ; i < len; i++ ) {
            // Skip accessing in sparse arrays
            if ( i in array && array[ i ] === item ) {
                return i;
            }
        }
    }

    return -1;
};/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: lang/keys.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/01/30
 *
 */


/// require('lang.lang');


/**
 * 获取目标对象的键名列表
 *
 * @grammar J.lang.keys(source)
 *
 * @name J.lang.keys
 * @param {Object} source 目标对象
 * @return {Array} 键名列表
 *
 */
J.keys = J.lang.keys = function (source) {
    var result = [], resultLen = 0, k;
    for (k in source) {
        if (source.hasOwnProperty(k)) {
            result[resultLen++] = k;
        }
    }
    return result;
};
/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: lang/merge.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/01/12
 *
 */



/// require('lang.lang');


/**
 * 合并数组，返回新数组。
 *
 * @grammar J.merge(array, results)
 *
 * @name J.lang.merge
 * @param {Array} first
 * @param {Array} second
 * @return {Array}
 *
 */
J.merge = J.lang.merge = function( first, second ) {
	var i = first.length,
	    j = 0;
	if ( J.isNumber(second.length) ) {
	    for ( var l = second.length; j < l; j++ ) {
	        first[ i++ ] = second[ j ];
	    }
	} else {
	    while ( !J.isUndefined(second[j]) ) {
	        first[ i++ ] = second[ j++ ];
	    }
	}
	first.length = i;

	return first;
};/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: lang/makeArray.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/01/12
 *
 */



/// require('lang.lang');
/// require('lang.merge');


/**
 * 制造数组，返回新对象。
 *
 * @grammar J.makeArray(array, results)
 *
 * @name J.lang.makeArray
 * @param {Array} array
 * @param {Object} results
 * @return {Object|Array}
 *
 */
J.makeArray = J.lang.makeArray = function( array, results ) {
	var ret = results || [];

	if ( array != null ) {
		var type = J.type( array );
		if ( array.length == null || type === "string" || type === "function" || type === "regexp" || J.isWindow( array ) ) {
			Array.prototype.push.call( ret, array );
		} else {
			J.merge( ret, array );
		}
	}

	return ret;
};/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: lang/values.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/01/31
 *
 */

/// require('lang.lang');


/**
 * 获取目标对象的值列表
 *
 * @grammar J.lang.values(source)
 *
 * @name J.lang.values
 * @param {Object} source 目标对象
 * @return {Array} 值列表
 *
 */
J.values = J.lang.values = function (source) {
    var result = [], resultLen = 0, k;
    for (k in source) {
        if (source.hasOwnProperty(k)) {
            result[resultLen++] = source[k];
        }
    }
    return result;
};
/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: string/trim.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/08/24
 *
 */


/**
 * 删除目标字符串两端的空白字符
 *
 * @param {string} source 目标字符串
 * @returns {string} 删除两端空白字符后的字符串
 *
 */
String.prototype.trim = function () {
    return this.replace(/(^[\s\t\xa0\u3000]+)|([\u3000\xa0\s\t]+$)/g,'');
};/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: dom/dom.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/08/23
 *
 */

/// require('lang.merge');
/// require('string.trim');

/**
 * @namespace J.dom
 */
(function (J, W, D) {

    function g(id) {
        var domElm = new elem(id);
        return domElm.length ? domElm : null;
    }

    function s(selector, element) {
        return new select(selector, element)
    }

    function elem(id) {
        var selector = id;
        if (id === "body" && D.body) {
            this[0] = D.body;
            this.length = 1;
            this.selector = selector;
            return this
        }
        if (id instanceof elem){
            return id
        }

        if (id = ( id && id.nodeType ) ? id : D.getElementById(id)) {
            this[0] = id;
            this.length = 1;
        }
        this.selector = selector;
        return this;
    }

    var T = 'getElementsByTagName', C = 'getElementsByClassName', dom = g, float = 'float', cssFloat = 'cssFloat', opacity = 'opacity', U = J.isUndefined,

    Fix_ATTS = (function () {
        var result = {};
        if (J.ua.ie < 8) {
            result['for'] = 'htmlFor';
            result['class'] = 'className';
        } else {
            result['htmlFor'] = 'for';
            result['className'] = 'class';
        }
        return result;
    })(),

    valFix = (function () {
        function input(element, value) {
            switch (element.type.toLowerCase()) {
                case 'checkbox':
                case 'radio':
                    return inputSelector(element, value);
                default:
                    return valueSelector(element, value);
            }
        }

        function inputSelector(element, value) {
            if (U(value))  return element.checked ? element.value : null;
            else element.checked = !!value;
        }

        function valueSelector(element, value) {
            if (U(value)) return element.value; else element.value = value;
        }

        function select(element, value) {
            if (U(value))
                return selectOne(element);
        }

        function selectOne(element) {
            var index = element.selectedIndex;
            return index >= 0 ? optionValue(element.options[index]) : null;
        }

        function optionValue(opt) {
            return (!U(opt['value'])) ? opt.value : opt.text;
        }

        return {
            input:input,
            textarea:valueSelector,
            select:select,
            button:valueSelector
        };
    })();


    var fn = elem.prototype = {
        show:function () {
            this.get().style.display = '';
            return this
        },

        hide:function () {
            this.get().style.display = 'none';
            return this
        },

        visible: function() {
            return this.get().style.display != 'none';
        },

        remove:function(){
            var element = this.get();
            element.parentNode && element.parentNode.removeChild(element);
            return this
        },

        attr:function (key, value) {
            var element = this.get();
            if ('style' === key) {
                if (U(value)) return element.style.cssText; else element.style.cssText = value;
                return this;
            }
            key = Fix_ATTS[key] || key;
            if (J.isString(key))
                if (U(value)) return element.getAttribute(key); else (value === null) ? this.removeAttr(key) : element.setAttribute(key, value);
            else {
                for (var k in key) {
                    this.attr(k, key[k]);
                }
            }
            return this;
        },

        /**
         * 移除属性
         * @param key
         */
        removeAttr:function(key){
            this.get().removeAttribute(key);
            return this;
        },

        /**
         * 为元素添加className
         * @param className
         * @return this
         */
        addClass:function (className) {
            var element = this.get();
            if (!this.hasClass(className))
                element.className += (element.className ? ' ' : '') + className;
            return this;
        },

        /**
         * 移除目标元素的className
         * @param className
         * @return this
         */
        removeClass:function (className) {
            var element = this.get();
            element.className = element.className.replace(
                new RegExp("(^|\\s+)" + className + "(\\s+|$)"), ' ').trim();
            return this;
        },

        /**
         * 判断元素是否拥有指定的className
         * @param className
         * @return {Boolean}
         */
        hasClass:function (className) {
            var element = this.get();
            var elementClassName = element.className;
            return (elementClassName.length > 0 && (elementClassName == className ||
              new RegExp("(^|\\s)" + className + "(\\s|$)").test(elementClassName)));
        },

        /**
         * 获取样式
         * @param style
         * @returns {*}
         */
        getStyle: function(style) {
            var element = this.get();
            style = style == float ? cssFloat : style;
            var value = element.style[style];
            if (!value || value == 'auto') {
                var css = D.defaultView.getComputedStyle(element, null);
                value = css ? css[style] : null;
            }
            if (style == opacity) return value ? parseFloat(value) : 1.0;
            return value == 'auto' ? null : value;
        },

        /**
         * 设置样式
         * @param styles
         * @returns {*}
         */
        setStyle: function(styles) {
            var element = this.get(), elementStyle = element.style, match;
            if (J.isString(styles)) {
                element.style.cssText += ';' + styles;
                styles.indexOf(opacity) > 0 && this.setOpacity(styles.match(/opacity:\s*(\d?\.?\d*)/)[1]);
            }
            for (var property in styles)
                if (property == opacity) this.setOpacity(styles[property]);
                else
                elementStyle[(property == float || property == cssFloat) ?
                (elementStyle.styleFloat ? 'styleFloat' : cssFloat) :
                property] = styles[property];

            return this;
        },

        getOpacity: function() {
            return this.getStyle(opacity);
        },

        setOpacity: function(value) {
            this.get().style.opacity = (value == 1 || value === '') ? '' : (value < 0.00001) ? 0 : value;
            return this;
        },

        append:function(element){
            this.get().appendChild(element.nodeType === 1 ? element : element.get());
            return this;
        },

        appendTo:function(element){
            getRealElement(element).append(this.get());
            return this;
        },

        html:function(html){
            var self = this.get();
            if(!J.isUndefined(html)){
                if(html.nodeType === 1)
                    return this.append(html)
                self.innerHTML = html;
                return this;
            }
            return self.innerHTML;
        },

        val:function(value){
            var element = this.get(), V = valFix[element.tagName.toLowerCase() || element.type];
            V = V ? V (element, value) : null;
            return (U(value)) ? V : this;
        },

        s:function (selector) {
            return new select(selector, (this[0].nodeType === 1) ? this[0] : D);
        },

        get:function (index) {
            var index = index || 0, elm = this[index];
            if(!elm) throw('selector "'+this.selector+'" element is not found.');
            return elm;
        },

        width:function(){
            return getWH(this).width
        },

        height:function(){
            return getWH(this).height
        },

        offset:function() {
            var target = this.get();
            if(target && J.isUndefined(target.offsetLeft)) {
                target = target.parentNode;
            }
            var pageCoord = (function(element){
                var coord = {
                    x : 0,
                    y : 0
                };
                while(element) {
                    coord.x += element.offsetLeft;
                    coord.y += element.offsetTop;
                    element = element.offsetParent;
                }
                return coord;
            })(target);
            return {
                x : pageCoord.x,
                y : pageCoord.y
            };
        },

        /**
         * 将目标元素添加到基准元素之后
         * @param element 插入的元素
         */
        insertAfter:function (element) {
            var self = this.get(), parent = self.parentNode;
            if(parent){
                parent.insertBefore(element.nodeType === 1 ? element : element.get(), self.nextSibling);
            }
            return this;
        },

        /**
         * 将目标元素添加到基准元素之前
         * @param element 插入的元素
         */
        insertBefore:function (element) {
            var self = this.get(), parent = self.parentNode;
            if(parent){
                parent.insertBefore(element.nodeType === 1 ? element : element.get(), self);
            }
            return this;
        },

        /**
         * 将目标元素添加到基准元素第一个子节点之前
         * @param element 插入的元素
         */
        insertFirst:function (element) {
            var first = this.first();
            first ? first.insertBefore(element) : this.append(element);
            return this;
        },

        insertFirstTo:function (element) {
            getRealElement(element).insertFirst(this.get());
            return this;
        },

        /**
         * 将目标元素添加到基准元素最后一个子节点之后
         * @param element 插入的元素
         */
        insertLast:function (element) {
            return this.append(element)
        },

        /**
         * 获取目标元素的第一个元素节点
         */
        first:function () {
            return matchNode(this.get(), 'nextSibling', 'firstChild');
        },

        /**
         * 获取目标元素的最后一个元素节点
         */
        last:function () {
            return matchNode(this.get(), 'previousSibling', 'lastChild');
        },

        /**
         * 获取目标元素的下一个兄弟元素节点
         */
        next:function () {
            return matchNode(this.get(), 'nextSibling', 'nextSibling');
        },

        /**
         * 获取目标元素的上一个兄弟元素节点
         */
        prev:function () {
            return matchNode(this.get(), 'previousSibling', 'previousSibling');
        },

        /**
         *
         * @param expression '.className' | 'tagName' | '.className tagName'
         * @return {DOMObject}
         */
        up: function (expression) {
            var element = this.get();
            if (arguments.length == 0) return dom(element.parentNode);
            var i = 0, isNumber = J.isNumber(expression), R;
            isNumber || (R = expression.match(/^(\.)?(\w+)$/));
            while (element = element['parentNode']) {
                if (element.nodeType == 1)
                    if(isNumber && i == expression) return g(element);
                    else if(R && ((R[1] && R[2] == element.className) || R[2].toUpperCase() == element.tagName)) return g(element);
                i++;
            }
            return null;
        },

        /**
         *
         * @param expression '.className' | 'tagName' | '.className tagName'
         * @return {DOMObject}
         */
        down: function (expression) {
            var element = this.get();
            if (arguments.length == 0) return this.first();
            return J.isNumber(expression) ? new select('*', element).eq(expression) : new select(expression, element);
        },

        /**
         * 提交表单
         */
        submit: function(){
            this.get().submit();
        },

        eq:function (i) {
            i = i || 0;
            return g(this[ i === -1 ? this.length - 1 : i ]);
        },

        empty:function(){
            return this.html('');
        },

        length:0,
        splice:[].splice
    };

    J.mix(dom,{
        dom:dom,
        create:create,
        fn:fn,
        s:s,
        g:g
    });

    function getRealElement(element){
        return J.isString(element) ? dom(element) : element
    }

    function matchNode(element, direction, start) {
        for (var node = element[start]; node; node = node[direction]) {
            if (node.nodeType == 1) {
                return dom(node);
            }
        }
        return null;
    }

    function getWH(element) {
        var el = element.get();

        if(element.visible()){
            return { width:el.offsetWidth, height:el.offsetHeight }
        }

        var sty = el.style, stys, wh, ostys = {
            visibility:sty.visibility,
            position:sty.position,
            display:sty.display
        };

        stys = {
            visibility:'hidden',
            display:'block'
        };
        if (ostys.position !== 'fixed')
            stys.position = 'absolute';

        element.setStyle(stys);

        wh = {
            width:el.offsetWidth,
            height:el.offsetHeight
        };

        element.setStyle(ostys);

        return wh;
    }

    function create(tagName, attributes){
        var el = D.createElement(tagName), jEl = dom(el);
        return (U(attributes)) ? jEl : jEl.attr(attributes);
    }

    /**
     * class 选择器查询
     * @param selector '.className' | 'tagName' | '.className tagName'
     * @param element content | null
     * @return []
     */
    function select(selector, element) {
        this.selector = selector;

        // J.sizzle
        if (J.sizzle) return J.merge(this, J.sizzle(selector, element));

        var match = selector ? selector.match(/^(\.)?(\w+)(\s(\w+))?/) : null, result = [], len, i, elements, node, tagName;
        element = element || D;
        // div       -> [  "div"  ,   undefined  ,   "div"  ,   undefined  ,   undefined  ]
        // .ttt      -> [  ".ttt"  ,   "."  ,   "ttt"  ,   undefined  ,   undefined  ]
        // .ttt span -> [  ".ttt span"  ,   "."  ,   "ttt"  ,   " span"  ,   "span"  ]
        if (match && match[1]) {
            // 初始化tagName参数
            tagName = match[4] ? match[4].toUpperCase() : '';
            // 查询元素
            if (element[C]) {
                elements = element[C](match[2]);
                len = elements.length;
                for (i = 0; i < len; i++) {
                    node = elements[i];
                    if (tagName && node.tagName != tagName) {
                        continue;
                    }
                    result.push(node);
                }
            } else {
                var className = new RegExp("(^|\\s)" + match[2] + "(\\s|$)");
                elements = tagName ? element[T](tagName) : (element.all || element[T]("*"));
                len = elements.length;
                for (i = 0; i < len; i++) {
                    node = elements[i];
                    className.test(node.className) && result.push(node);
                }
            }
        } else {
            result = element[T](selector)
        }

        return J.merge(this, result)

    }

    select.prototype = {
        each:function (callback) {
            var i = 0, length = this.length;
            for (; i < length;) {
                if (callback.call(this[ i ], i, g(this[ i++ ])) === false) {
                    break;
                }
            }
            return this;
        },
        eq:function (i) {
            var i = i || 0, elm = this[ i === -1 ? this.length - 1 : i ];
            if(!elm) throw('"'+this.selector+'" element does not exist.');
            return g(elm);
        },
        get:function(i) {
            return this.eq(i);
        },
        length:0,
        splice:[].splice
    };

    J.mix(J, {
        dom:dom,
        create:create,
        s:s,
        g:g
    });

})(J, window, document);/*!
 * Sizzle CSS Selector Engine
 *  Copyright 2012, The Dojo Foundation
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://sizzlejs.com/
 */
(function(e,t,n){function rt(e,t,n,r){var i=0,s=t.length;for(;i<s;i++)G(e,t[i],n,r)}function it(e,t,n,r,i,s){var o,u=Y.setFilters[t.toLowerCase()];return u||G.error(t),(e||!(o=i))&&rt(e||"*",r,o=[],i),o.length>0?u(o,n,s):[]}function st(e,t,r,i,s){var o,u,a,f,l,c,h,p,d=0,m=s.length,y=j.POS,b=new RegExp("^"+y.source+"(?!"+g+")","i"),w=function(){var e=1,t=arguments.length-2;for(;e<t;e++)arguments[e]===n&&(o[e]=n)};for(;d<m;d++){y.exec(""),e=s[d],f=[],a=0,l=i;while(o=y.exec(e)){p=y.lastIndex=o.index+o[0].length;if(p>a){h=e.slice(a,o.index),a=p,c=[t],k.test(h)&&(l&&(c=l),l=i);if(u=D.test(h))h=h.slice(0,-5).replace(k,"$&*");o.length>1&&o[0].replace(b,w),l=it(h,o[1],o[2],c,l,u)}}l?(f=f.concat(l),(h=e.slice(a))&&h!==")"?rt(h,f,r,i):v.apply(r,f)):G(e,t,r,i)}return m===1?r:G.uniqueSort(r)}function ot(e,t,n){var r,i,s,o=[],u=0,f=A.exec(e),l=!f.pop()&&!f.pop(),c=l&&e.match(L)||[""],h=Y.preFilter,p=Y.filter,d=!n&&t!==a;for(;(i=c[u])!=null&&l;u++){o.push(r=[]),d&&(i=" "+i);while(i){l=!1;if(f=k.exec(i))i=i.slice(f[0].length),l=r.push({part:f.pop().replace(C," "),captures:f});for(s in p)(f=j[s].exec(i))&&(!h[s]||(f=h[s](f,t,n)))&&(i=i.slice(f.shift().length),l=r.push({part:s,captures:f}));if(!l)break}}return l||G.error(e),o}function ut(e,t,n){var s=t.dir,o=p++;return e||(e=function(e){return e===n}),t.first?function(t,n){while(t=t[s])if(t.nodeType===1)return e(t,n)&&t}:function(t,n){var u,a=o+"."+i,f=a+"."+r;while(t=t[s])if(t.nodeType===1){if((u=t[m])===f)return t.sizset;if(typeof u=="string"&&u.indexOf(a)===0){if(t.sizset)return t}else{t[m]=f;if(e(t,n))return t.sizset=!0,t;t.sizset=!1}}}}function at(e,t){return e?function(n,r){var i=t(n,r);return i&&e(i===!0?n:i,r)}:t}function ft(e,t,n){var r,i,s=0;for(;r=e[s];s++)Y.relative[r.part]?i=ut(i,Y.relative[r.part],t):(r.captures.push(t,n),i=at(i,Y.filter[r.part].apply(null,r.captures)));return i}function lt(e){return function(t,n){var r,i=0;for(;r=e[i];i++)if(r(t,n))return!0;return!1}}var r,i,s,o,u,a=e.document,f=a.documentElement,l="undefined",c=!1,h=!0,p=0,d=[].slice,v=[].push,m=("sizcache"+Math.random()).replace(".",""),g="[\\x20\\t\\r\\n\\f]",y="(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+",b=y.replace("w","w#"),w="([*^$|!~]?=)",E="\\["+g+"*("+y+")"+g+"*(?:"+w+g+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+b+")|)|)"+g+"*\\]",S=":("+y+")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|((?:[^,]|\\\\,|(?:,(?=[^\\[]*\\]))|(?:,(?=[^\\(]*\\))))*))\\)|)",x=":(nth|eq|gt|lt|first|last|even|odd)(?:\\((\\d*)\\)|)(?=[^-]|$)",T=g+"*([\\x20\\t\\r\\n\\f>+~])"+g+"*",N="(?=[^\\x20\\t\\r\\n\\f])(?:\\\\.|"+E+"|"+S.replace(2,7)+"|[^\\\\(),])+",C=new RegExp("^"+g+"+|((?:^|[^\\\\])(?:\\\\.)*)"+g+"+$","g"),k=new RegExp("^"+T),L=new RegExp(N+"?(?="+g+"*,|$)","g"),A=new RegExp("^(?:(?!,)(?:(?:^|,)"+g+"*"+N+")*?|"+g+"*(.*?))(\\)|$)"),O=new RegExp(N.slice(19,-6)+"\\x20\\t\\r\\n\\f>+~])+|"+T,"g"),M=/^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,_=/[\x20\t\r\n\f]*[+~]/,D=/:not\($/,P=/h\d/i,H=/input|select|textarea|button/i,B=/\\(?!\\)/g,j={ID:new RegExp("^#("+y+")"),CLASS:new RegExp("^\\.("+y+")"),NAME:new RegExp("^\\[name=['\"]?("+y+")['\"]?\\]"),TAG:new RegExp("^("+y.replace("[-","[-\\*")+")"),ATTR:new RegExp("^"+E),PSEUDO:new RegExp("^"+S),CHILD:new RegExp("^:(only|nth|last|first)-child(?:\\("+g+"*(even|odd|(([+-]|)(\\d*)n|)"+g+"*(?:([+-]|)"+g+"*(\\d+)|))"+g+"*\\)|)","i"),POS:new RegExp(x,"ig"),needsContext:new RegExp("^"+g+"*[>+~]|"+x,"i")},F={},I=[],q={},R=[],U=function(e){return e.sizzleFilter=!0,e},z=function(e){return function(t){return t.nodeName.toLowerCase()==="input"&&t.type===e}},W=function(e){return function(t){var n=t.nodeName.toLowerCase();return(n==="input"||n==="button")&&t.type===e}},X=function(e){var t=!1,n=a.createElement("div");try{t=e(n)}catch(r){}return n=null,t},V=X(function(e){e.innerHTML="<select></select>";var t=typeof e.lastChild.getAttribute("multiple");return t!=="boolean"&&t!=="string"}),$=X(function(e){e.id=m+0,e.innerHTML="<a name='"+m+"'></a><div name='"+m+"'></div>",f.insertBefore(e,f.firstChild);var t=a.getElementsByName&&a.getElementsByName(m).length===2+a.getElementsByName(m+0).length;return u=!a.getElementById(m),f.removeChild(e),t}),J=X(function(e){return e.appendChild(a.createComment("")),e.getElementsByTagName("*").length===0}),K=X(function(e){return e.innerHTML="<a href='#'></a>",e.firstChild&&typeof e.firstChild.getAttribute!==l&&e.firstChild.getAttribute("href")==="#"}),Q=X(function(e){return e.innerHTML="<div class='hidden e'></div><div class='hidden'></div>",!e.getElementsByClassName||e.getElementsByClassName("e").length===0?!1:(e.lastChild.className="e",e.getElementsByClassName("e").length!==1)}),G=function(e,t,n,r){n=n||[],t=t||a;var i,s,o,u,f=t.nodeType;if(f!==1&&f!==9)return[];if(!e||typeof e!="string")return n;o=et(t);if(!o&&!r)if(i=M.exec(e))if(u=i[1]){if(f===9){s=t.getElementById(u);if(!s||!s.parentNode)return n;if(s.id===u)return n.push(s),n}else if(t.ownerDocument&&(s=t.ownerDocument.getElementById(u))&&tt(t,s)&&s.id===u)return n.push(s),n}else{if(i[2])return v.apply(n,d.call(t.getElementsByTagName(e),0)),n;if((u=i[3])&&Q&&t.getElementsByClassName)return v.apply(n,d.call(t.getElementsByClassName(u),0)),n}return ht(e,t,n,r,o)},Y=G.selectors={cacheLength:50,match:j,order:["ID","TAG"],attrHandle:{},createPseudo:U,find:{ID:u?function(e,t,n){if(typeof t.getElementById!==l&&!n){var r=t.getElementById(e);return r&&r.parentNode?[r]:[]}}:function(e,t,r){if(typeof t.getElementById!==l&&!r){var i=t.getElementById(e);return i?i.id===e||typeof i.getAttributeNode!==l&&i.getAttributeNode("id").value===e?[i]:n:[]}},TAG:J?function(e,t){if(typeof t.getElementsByTagName!==l)return t.getElementsByTagName(e)}:function(e,t){var n=t.getElementsByTagName(e);if(e==="*"){var r,i=[],s=0;for(;r=n[s];s++)r.nodeType===1&&i.push(r);return i}return n}},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(B,""),e[3]=(e[4]||e[5]||"").replace(B,""),e[2]==="~="&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),e[1]==="nth"?(e[2]||G.error(e[0]),e[3]=+(e[3]?e[4]+(e[5]||1):2*(e[2]==="even"||e[2]==="odd")),e[4]=+(e[6]+e[7]||e[2]==="odd")):e[2]&&G.error(e[0]),e},PSEUDO:function(e){var t,n=e[4];return j.CHILD.test(e[0])?null:(n&&(t=A.exec(n))&&t.pop()&&(e[0]=e[0].slice(0,t[0].length-n.length-1),n=t[0].slice(0,-1)),e.splice(2,3,n||e[3]),e)}},filter:{ID:u?function(e){return e=e.replace(B,""),function(t){return t.getAttribute("id")===e}}:function(e){return e=e.replace(B,""),function(t){var n=typeof t.getAttributeNode!==l&&t.getAttributeNode("id");return n&&n.value===e}},TAG:function(e){return e==="*"?function(){return!0}:(e=e.replace(B,"").toLowerCase(),function(t){return t.nodeName&&t.nodeName.toLowerCase()===e})},CLASS:function(e){var t=F[e];return t||(t=F[e]=new RegExp("(^|"+g+")"+e+"("+g+"|$)"),I.push(e),I.length>Y.cacheLength&&delete F[I.shift()]),function(e){return t.test(e.className||typeof e.getAttribute!==l&&e.getAttribute("class")||"")}},ATTR:function(e,t,n){return t?function(r){var i=G.attr(r,e),s=i+"";if(i==null)return t==="!=";switch(t){case"=":return s===n;case"!=":return s!==n;case"^=":return n&&s.indexOf(n)===0;case"*=":return n&&s.indexOf(n)>-1;case"$=":return n&&s.substr(s.length-n.length)===n;case"~=":return(" "+s+" ").indexOf(n)>-1;case"|=":return s===n||s.substr(0,n.length+1)===n+"-"}}:function(t){return G.attr(t,e)!=null}},CHILD:function(e,t,n,r){if(e==="nth"){var i=p++;return function(e){var t,s,o=0,u=e;if(n===1&&r===0)return!0;t=e.parentNode;if(t&&(t[m]!==i||!e.sizset)){for(u=t.firstChild;u;u=u.nextSibling)if(u.nodeType===1){u.sizset=++o;if(u===e)break}t[m]=i}return s=e.sizset-r,n===0?s===0:s%n===0&&s/n>=0}}return function(t){var n=t;switch(e){case"only":case"first":while(n=n.previousSibling)if(n.nodeType===1)return!1;if(e==="first")return!0;n=t;case"last":while(n=n.nextSibling)if(n.nodeType===1)return!1;return!0}}},PSEUDO:function(e,t,n,r){var i=Y.pseudos[e]||Y.pseudos[e.toLowerCase()];return i||G.error("unsupported pseudo: "+e),i.sizzleFilter?i(t,n,r):i}},pseudos:{not:U(function(e,t,n){var r=ct(e.replace(C,"$1"),t,n);return function(e){return!r(e)}}),enabled:function(e){return e.disabled===!1},disabled:function(e){return e.disabled===!0},checked:function(e){var t=e.nodeName.toLowerCase();return t==="input"&&!!e.checked||t==="option"&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,e.selected===!0},parent:function(e){return!Y.pseudos.empty(e)},empty:function(e){var t;e=e.firstChild;while(e){if(e.nodeName>"@"||(t=e.nodeType)===3||t===4)return!1;e=e.nextSibling}return!0},contains:U(function(e){return function(t){return(t.textContent||t.innerText||nt(t)).indexOf(e)>-1}}),has:U(function(e){return function(t){return G(e,t).length>0}}),header:function(e){return P.test(e.nodeName)},text:function(e){var t,n;return e.nodeName.toLowerCase()==="input"&&(t=e.type)==="text"&&((n=e.getAttribute("type"))==null||n.toLowerCase()===t)},radio:z("radio"),checkbox:z("checkbox"),file:z("file"),password:z("password"),image:z("image"),submit:W("submit"),reset:W("reset"),button:function(e){var t=e.nodeName.toLowerCase();return t==="input"&&e.type==="button"||t==="button"},input:function(e){return H.test(e.nodeName)},focus:function(e){var t=e.ownerDocument;return e===t.activeElement&&(!t.hasFocus||t.hasFocus())&&(!!e.type||!!e.href)},active:function(e){return e===e.ownerDocument.activeElement}},setFilters:{first:function(e,t,n){return n?e.slice(1):[e[0]]},last:function(e,t,n){var r=e.pop();return n?e:[r]},even:function(e,t,n){var r=[],i=n?1:0,s=e.length;for(;i<s;i+=2)r.push(e[i]);return r},odd:function(e,t,n){var r=[],i=n?0:1,s=e.length;for(;i<s;i+=2)r.push(e[i]);return r},lt:function(e,t,n){return n?e.slice(+t):e.slice(0,+t)},gt:function(e,t,n){return n?e.slice(0,+t+1):e.slice(+t+1)},eq:function(e,t,n){var r=e.splice(+t,1);return n?e:r}}};Y.setFilters.nth=Y.setFilters.eq,Y.filters=Y.pseudos,K||(Y.attrHandle={href:function(e){return e.getAttribute("href",2)},type:function(e){return e.getAttribute("type")}}),$&&(Y.order.push("NAME"),Y.find.NAME=function(e,t){if(typeof t.getElementsByName!==l)return t.getElementsByName(e)}),Q&&(Y.order.splice(1,0,"CLASS"),Y.find.CLASS=function(e,t,n){if(typeof t.getElementsByClassName!==l&&!n)return t.getElementsByClassName(e)});try{d.call(f.childNodes,0)[0].nodeType}catch(Z){d=function(e){var t,n=[];for(;t=this[e];e++)n.push(t);return n}}var et=G.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return t?t.nodeName!=="HTML":!1},tt=G.contains=f.compareDocumentPosition?function(e,t){return!!(e.compareDocumentPosition(t)&16)}:f.contains?function(e,t){var n=e.nodeType===9?e.documentElement:e,r=t.parentNode;return e===r||!!(r&&r.nodeType===1&&n.contains&&n.contains(r))}:function(e,t){while(t=t.parentNode)if(t===e)return!0;return!1},nt=G.getText=function(e){var t,n="",r=0,i=e.nodeType;if(i){if(i===1||i===9||i===11){if(typeof e.textContent=="string")return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=nt(e)}else if(i===3||i===4)return e.nodeValue}else for(;t=e[r];r++)n+=nt(t);return n};G.attr=function(e,t){var n,r=et(e);return r||(t=t.toLowerCase()),Y.attrHandle[t]?Y.attrHandle[t](e):V||r?e.getAttribute(t):(n=e.getAttributeNode(t),n?typeof e[t]=="boolean"?e[t]?t:null:n.specified?n.value:null:null)},G.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e)},[0,0].sort(function(){return h=0}),f.compareDocumentPosition?s=function(e,t){return e===t?(c=!0,0):(!e.compareDocumentPosition||!t.compareDocumentPosition?e.compareDocumentPosition:e.compareDocumentPosition(t)&4)?-1:1}:(s=function(e,t){if(e===t)return c=!0,0;if(e.sourceIndex&&t.sourceIndex)return e.sourceIndex-t.sourceIndex;var n,r,i=[],s=[],u=e.parentNode,a=t.parentNode,f=u;if(u===a)return o(e,t);if(!u)return-1;if(!a)return 1;while(f)i.unshift(f),f=f.parentNode;f=a;while(f)s.unshift(f),f=f.parentNode;n=i.length,r=s.length;for(var l=0;l<n&&l<r;l++)if(i[l]!==s[l])return o(i[l],s[l]);return l===n?o(e,s[l],-1):o(i[l],t,1)},o=function(e,t,n){if(e===t)return n;var r=e.nextSibling;while(r){if(r===t)return-1;r=r.nextSibling}return 1}),G.uniqueSort=function(e){var t,n=1;if(s){c=h,e.sort(s);if(c)for(;t=e[n];n++)t===e[n-1]&&e.splice(n--,1)}return e};var ct=G.compile=function(e,t,n){var r,i,s,o=q[e];if(o&&o.context===t)return o;i=ot(e,t,n);for(s=0;r=i[s];s++)i[s]=ft(r,t,n);return o=q[e]=lt(i),o.context=t,o.runs=o.dirruns=0,R.push(e),R.length>Y.cacheLength&&delete q[R.shift()],o};G.matches=function(e,t){return G(e,null,null,t)},G.matchesSelector=function(e,t){return G(t,null,null,[e]).length>0};var ht=function(e,t,n,s,o){e=e.replace(C,"$1");var u,a,f,l,c,h,p,m,g,y=e.match(L),b=e.match(O),w=t.nodeType;if(j.POS.test(e))return st(e,t,n,s,y);if(s)u=d.call(s,0);else if(y&&y.length===1){if(b.length>1&&w===9&&!o&&(y=j.ID.exec(b[0]))){t=Y.find.ID(y[1],t,o)[0];if(!t)return n;e=e.slice(b.shift().length)}m=(y=_.exec(b[0]))&&!y.index&&t.parentNode||t,g=b.pop(),h=g.split(":not")[0];for(f=0,l=Y.order.length;f<l;f++){p=Y.order[f];if(y=j[p].exec(h)){u=Y.find[p]((y[1]||"").replace(B,""),m,o);if(u==null)continue;h===g&&(e=e.slice(0,e.length-g.length)+h.replace(j[p],""),e||v.apply(n,d.call(u,0)));break}}}if(e){a=ct(e,t,o),i=a.dirruns++,u==null&&(u=Y.find.TAG("*",_.test(e)&&t.parentNode||t));for(f=0;c=u[f];f++)r=a.runs++,a(c,t)&&n.push(c)}return n};a.querySelectorAll&&function(){var e,t=ht,n=/'|\\/g,r=/\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,i=[],s=[":active"],o=f.matchesSelector||f.mozMatchesSelector||f.webkitMatchesSelector||f.oMatchesSelector||f.msMatchesSelector;X(function(e){e.innerHTML="<select><option selected></option></select>",e.querySelectorAll("[selected]").length||i.push("\\["+g+"*(?:checked|disabled|ismap|multiple|readonly|selected|value)"),e.querySelectorAll(":checked").length||i.push(":checked")}),X(function(e){e.innerHTML="<p test=''></p>",e.querySelectorAll("[test^='']").length&&i.push("[*^$]="+g+"*(?:\"\"|'')"),e.innerHTML="<input type='hidden'>",e.querySelectorAll(":enabled").length||i.push(":enabled",":disabled")}),i=i.length&&new RegExp(i.join("|")),ht=function(e,r,s,o,u){if(!o&&!u&&(!i||!i.test(e)))if(r.nodeType===9)try{return v.apply(s,d.call(r.querySelectorAll(e),0)),s}catch(a){}else if(r.nodeType===1&&r.nodeName.toLowerCase()!=="object"){var f=r.getAttribute("id"),l=f||m,c=_.test(e)&&r.parentNode||r;f?l=l.replace(n,"\\$&"):r.setAttribute("id",l);try{return v.apply(s,d.call(c.querySelectorAll(e.replace(L,"[id='"+l+"'] $&")),0)),s}catch(a){}finally{f||r.removeAttribute("id")}}return t(e,r,s,o,u)},o&&(X(function(t){e=o.call(t,"div");try{o.call(t,"[test!='']:sizzle"),s.push(Y.match.PSEUDO)}catch(n){}}),s=new RegExp(s.join("|")),G.matchesSelector=function(t,n){n=n.replace(r,"='$1']");if(!et(t)&&!s.test(n)&&(!i||!i.test(n)))try{var u=o.call(t,n);if(u||e||t.document&&t.document.nodeType!==11)return u}catch(a){}return G(n,null,null,[t]).length>0})}(),t.sizzle=G})(window,J);
(function(dom, sizzle){
	if(dom && sizzle){
		dom.find = sizzle;
	}
})(J.dom, J.sizzle);/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: json/json.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/02/14 情人节
 *
 */


/*
    http://www.JSON.org/json2.js
    2011-10-19

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

    See http://www.JSON.org/js.html


    This code should be minified before deployment.
    See http://javascript.crockford.com/jsmin.html

    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
    NOT CONTROL.


    This file creates a global JSON object containing two methods: stringify
    and parse.

        JSON.stringify(value, replacer, space)
            value       any JavaScript value, usually an object or array.

            replacer    an optional parameter that determines how object
                        values are stringified for objects. It can be a
                        function or an array of strings.

            space       an optional parameter that specifies the indentation
                        of nested structures. If it is omitted, the text will
                        be packed without extra whitespace. If it is a number,
                        it will specify the number of spaces to indent at each
                        level. If it is a string (such as '\t' or '&nbsp;'),
                        it contains the characters used to indent at each level.

            This method produces a JSON text from a JavaScript value.

            When an object value is found, if the object contains a toJSON
            method, its toJSON method will be called and the result will be
            stringified. A toJSON method does not serialize: it returns the
            value represented by the name/value pair that should be serialized,
            or undefined if nothing should be serialized. The toJSON method
            will be passed the key associated with the value, and this will be
            bound to the value

            For example, this would serialize Dates as ISO strings.

                Date.prototype.toJSON = function (key) {
                    function f(n) {
                        // Format integers to have at least two digits.
                        return n < 10 ? '0' + n : n;
                    }

                    return this.getUTCFullYear()   + '-' +
                         f(this.getUTCMonth() + 1) + '-' +
                         f(this.getUTCDate())      + 'T' +
                         f(this.getUTCHours())     + ':' +
                         f(this.getUTCMinutes())   + ':' +
                         f(this.getUTCSeconds())   + 'Z';
                };

            You can provide an optional replacer method. It will be passed the
            key and value of each member, with this bound to the containing
            object. The value that is returned from your method will be
            serialized. If your method returns undefined, then the member will
            be excluded from the serialization.

            If the replacer parameter is an array of strings, then it will be
            used to select the members to be serialized. It filters the results
            such that only members with keys listed in the replacer array are
            stringified.

            Values that do not have JSON representations, such as undefined or
            functions, will not be serialized. Such values in objects will be
            dropped; in arrays they will be replaced with null. You can use
            a replacer function to replace those with JSON values.
            JSON.stringify(undefined) returns undefined.

            The optional space parameter produces a stringification of the
            value that is filled with line breaks and indentation to make it
            easier to read.

            If the space parameter is a non-empty string, then that string will
            be used for indentation. If the space parameter is a number, then
            the indentation will be that many spaces.

            Example:

            text = JSON.stringify(['e', {pluribus: 'unum'}]);
            // text is '["e",{"pluribus":"unum"}]'


            text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
            // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

            text = JSON.stringify([new Date()], function (key, value) {
                return this[key] instanceof Date ?
                    'Date(' + this[key] + ')' : value;
            });
            // text is '["Date(---current time---)"]'


        JSON.parse(text, reviver)
            This method parses a JSON text to produce an object or array.
            It can throw a SyntaxError exception.

            The optional reviver parameter is a function that can filter and
            transform the results. It receives each of the keys and values,
            and its return value is used instead of the original value.
            If it returns what it received, then the structure is not modified.
            If it returns undefined then the member is deleted.

            Example:

            // Parse the text. Values that look like ISO date strings will
            // be converted to Date objects.

            myData = JSON.parse(text, function (key, value) {
                var a;
                if (typeof value === 'string') {
                    a =
/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
                    if (a) {
                        return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                            +a[5], +a[6]));
                    }
                }
                return value;
            });

            myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
                var d;
                if (typeof value === 'string' &&
                        value.slice(0, 5) === 'Date(' &&
                        value.slice(-1) === ')') {
                    d = new Date(value.slice(5, -1));
                    if (d) {
                        return d;
                    }
                }
                return value;
            });


    This is a reference implementation. You are free to copy, modify, or
    redistribute.
*/

/*jslint evil: true, regexp: true */

/*members "", "\b", "\t", "\n", "\f", "\r", "\"", JSON, "\\", apply,
    call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
    getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
    lastIndex, length, parse, prototype, push, replace, slice, stringify,
    test, toJSON, toString, valueOf
*/


// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.



J.add('json',(function () {
    var JSON = window['JSON'] || {};

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        },
        rep;


    function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === 'string'
                ? c
                : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
    }


    function str(key, holder) {

// Produce a string from holder[key].

        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

        if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

// What happens next depends on the value's type.

        switch (typeof value) {
        case 'string':
            return quote(value);

        case 'number':

// JSON numbers must be finite. Encode non-finite numbers as null.

            return isFinite(value) ? String(value) : 'null';

        case 'boolean':
        case 'null':

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.

            return String(value);

// If the type is 'object', we might be dealing with an object or an array or
// null.

        case 'object':

// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.

            if (!value) {
                return 'null';
            }

// Make an array to hold the partial results of stringifying this object value.

            gap += indent;
            partial = [];

// Is the value an array?

            if (Object.prototype.toString.apply(value) === '[object Array]') {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                v = partial.length === 0
                    ? '[]'
                    : gap
                    ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']'
                    : '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }

// If the replacer is an array, use it to select the members to be stringified.

            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    if (typeof rep[i] === 'string') {
                        k = rep[i];
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            } else {

// Otherwise, iterate through all of the keys in the object.

                for (k in value) {
                    if (Object.prototype.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

            v = partial.length === 0
                ? '{}'
                : gap
                ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}'
                : '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
    }

// If the JSON object does not yet have a stringify method, give it one.

    if (!J.isFunction(JSON.stringify)) {
        JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

            var i;
            gap = '';
            indent = '';

// If the space parameter is a number, make an indent string containing that
// many spaces.

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }

// If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === 'string') {
                indent = space;
            }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                    (typeof replacer !== 'object' ||
                    typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }

// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.

            return str('', {'': value});
        };
    }


// If the JSON object does not yet have a parse method, give it one.

    if (!J.isFunction(JSON.parse)) {
        JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with '()' and 'new'
// because they can cause invocation, and '=' because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
// replace all simple value tokens with ']' characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or ']' or
// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

            if (/^[\],:{}\s]*$/
                    .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
                        .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                        .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

                j = eval('(' + text + ')');

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

                return typeof reviver === 'function'
                    ? walk({'': j}, '')
                    : j;
            }

// If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError('JSON.parse');
        };
    }

    return {
        stringify: JSON.stringify,
        parse : JSON.parse
    };
}()));
/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 *
 * 这是ajax核心文件，
 *
 *
 * @path: ajax/ajax.js
 * @author: Jock
 * @version: 1.0.1
 * @date: 2012/10/19
 *
 */


(function (J, W) {

    /**
     * 初始配置
     * @param {Boolean} async                 是否异步请求。默认为true（异步）
     * @param {String | Object} data         需要发送的数据。
     * @param {Object} headers               要设置的头信息
     * @return {Function} onSuccess           请求成功时触发，      function(XMLHttpRequest xhr, string responseText)
     * @return {Function} onFailure           请求失败时触发，      function(XMLHttpRequest xhr)
     * @return {Function} onBeforerequest     发送请求之前触发，    function(XMLHttpRequest xhr)
     * @return {Function} onTimeout           发送请求超时触发，    function(XMLHttpRequest xhr)
     * @param {String} cache                 是否需要缓存，默认为true（缓存）
     */
    var defaultOpts = {
        url:'',
        async:true,
        data:'',
        callback:'',
        headers:'',
        onSuccess:'',
        onFailure:'',
        onBeforerequest:'',
        onTimeout:'',
        cache:true,
        timeout:5000, // 毫秒
        type:''
    }, encode = encodeURIComponent, ajaxObj, D = document, head = D.head || D.getElementsByTagName( "head" )[0], aboutBlank = 'about:blank', I = 0;

    function Ajax(url, options, method) {

        var xhr, opts = defaultOpts, eventHandlers = {}, timerHander, timeout;

        J.isString(url) ? (opts.url = url) : (opts = J.mix(opts, url || {}, true));
        J.isFunction(options) ? (opts.onSuccess = options) : (opts = J.mix(opts, options || {}, true));

        timeout = parseInt(opts.timeout);

        if(opts.url == '') return null;

        method = method.toUpperCase();

        J.each("onSuccess onFailure onBeforerequest onTimeout".split(' '), function (i, k) {
            eventHandlers[k] = opts[k];
        });

        if (opts.type == 'jsonp') {
            method == 'GET' ? getJSONP() : postJSONP();
        } else {
            return request();
        }

        function clearTimeOut(){
            (timeout > 0 && timerHander) && clearTimeout(timerHander);
        }

        function domDispose(element, container){
            if(head && element){
                element = container||element;
                if (element && element.parentNode) {
                    head.removeChild(element);
                }
                element = undefined;
            }
        }

        function domLoad(element, container){
            element.onload = element.onreadystatechange = function (_, isAbort) {
                if (isAbort || !element.readyState || /loaded|complete/.test(element.readyState)) {
                    clearTimeOut();
                    element.onload = element.onreadystatechange = null;
                    isAbort && fire('Failure');
                    setTimeout(function(){
                        domDispose(element, container);
                    },500);
                }
            };
            if (timeout > 0) {
                timerHander = setTimeout(function () {
                    fire("Timeout");
                    domDispose(element, container)
                }, timeout);
            }
        }

        function getJSONP() {
            var script = D.createElement('script');
            domLoad(script);
            script.async = opts.async;
            script.charset = 'utf-8';
            script.src = buildUrl();
            head.insertBefore( script, head.firstChild );
        }

        function postJSONP() {
            var guid = 'J__ID' + J.getTime().toString(16) + '' + (++I),
                sojContainer = D.createElement('div'),
                form = D.createElement('form'),
                inputs = [], items = opts.data;

            sojContainer.innerHTML = '<iframe id="' + guid + '" name="' + guid + '"></iframe>';
            sojContainer.style.display = 'none';

            for (var k in items) {
                inputs.push("<input type='hidden' name='" + k + "' value='" + items[k] + "' />")
            }
            opts.callback && inputs.push("<input type='hidden' name='callback' value='" + opts.callback + "' />");
            form.innerHTML = inputs.join('');
            form.action = opts.url;
            form.method = 'post';
            form.target = guid;
            sojContainer.appendChild(form);
            head.insertBefore( sojContainer, head.firstChild );

            var a = D.getElementById(guid);

            a && domLoad(a, sojContainer);

            form.submit();
            //a.src = aboutBlank;
            /*form.action = aboutBlank;
            form.method = 'get';
            form.target = '_self';*/
            form = null;
        }

        function request() {
            try {
                var async = opts.async, headers = opts.headers, data = opts.data, aUrl;

                xhr = getXHR();

                headers['X-Request-With'] = 'XMLHttpRequest';

                if (method == 'GET') {
                    aUrl = buildUrl();
                    data = null
                } else {
                    aUrl = opts.url;
                    if (data && !J.isString(data)) (data = param(data));
                }

                xhr.open(method, aUrl, async);

                if (async) {
                    xhr.onreadystatechange = stateChangeHandler;
                }

                // 在open之后再进行http请求头设定
                if (method == 'POST') {
                    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                }

                for (var key in headers) {
                    if (headers.hasOwnProperty(key)) {
                        xhr.setRequestHeader(key, headers[key]);
                    }
                }

                fire('Beforerequest');

                if (timeout > 0) {
                    timerHander = setTimeout(function () {
                        xhr.onreadystatechange = function () {};
                        xhr.abort();
                        fire("Timeout");
                    }, timeout);
                }

                xhr.send(data);

                if (!async) {
                    stateChangeHandler();
                }
            } catch (ex) {
                fire('Failure');
            }
            return xhr;
        }

        function buildUrl() {
            var data = opts.data, url = opts.url;
            if (data && !J.isString(data)) (data = param(data));
            if (method == "GET") {
                data && (url += fn() + data);
                (opts.type == 'jsonp' && opts.callback) && (url += fn() + 'callback=' + opts.callback);
                opts.cache || (url += fn() + 'J' + J.getTime())
            }
            function fn() {
                return url.indexOf('?') > 0 ? '&' : '?'
            }

            return url;
        }

        function param(a) {
            var s = [ ];

            function add(key, value) {
                s[ s.length ] = encode(key) + '=' + encode(value);
            }

            for (var j in a)
                add(j, J.isFunction(a[j]) ? a[j]() : a[j]);
            return s.join("&").replace(/%20/g, "+");
        }


        /**
         * readyState发生变更时调用
         *
         * @ignore
         */
        function stateChangeHandler() {
            if (xhr.readyState == 4) {
                clearTimeOut();
                try {
                    var stat = xhr.status;
                } catch (ex) {
                    // 在请求时，如果网络中断，Firefox会无法取得status
                    fire('Failure');
                    return;
                }
                if ((stat >= 200 && stat < 300) || stat == 304 || stat == 1223) {
                    fire('Success');
                } else {
                    fire('Failure');
                }
                xhr.onreadystatechange = function () {};
                if (opts.async) {
                    xhr = null;
                }
            }
        }

        /**
         * 获取XMLHttpRequest对象
         *
         * @ignore
         * @return {XMLHttpRequest} XMLHttpRequest对象
         */
        function getXHR() {
            if (W.ActiveXObject) {
                try {
                    return new ActiveXObject("Msxml2.XMLHTTP");
                } catch (e) {
                    try {
                        return new ActiveXObject("Microsoft.XMLHTTP");
                    } catch (e) {
                    }
                }
            }
            if (W.XMLHttpRequest) {
                return new XMLHttpRequest();
            }
        }

        /**
         * 触发事件
         *
         * @ignore
         * @param {String} type 事件类型
         */
        function fire(type) {
            type = 'on' + type;
            var handler = eventHandlers[type], responseRet;
            if (handler) {
                if (type != 'onSuccess') {
                    handler(xhr);
                } else {
                    try {
                        responseRet = (opts.type == 'json') ? (new Function("return (" + xhr.responseText + ")"))() : xhr.responseText
                    } catch (error) {
                        return handler(xhr.responseText);
                    }
                    handler(responseRet);
                }
            }
        }


    }

    ajaxObj = J.add('ajax');

    J.each('get post'.split(' '), function (i, v) {
        /**
         *
         * 发送一个get请求
         *
         * @grammar J.get(url | options [,function | options])
         *
         *    options.url               String
         *    options.data              Object | String
         *    options.type              String
         *    options.timeout           Int
         *    options.onSuccess         Function
         *    options.onFailure         Function
         *    options.onBeforerequest   Function
         *    options.async,            Boolean
         *
         *
         * @name J.ajax.get
         * @param {String|Object} options 请求的url或参数配置
         * @param {Object|Function} options 参数配置或者回调函数
         * @return {Object}
         *
         */

        /**
         * 发送一个post请求
         *
         * @grammar J.post(url | options [,function | options])
         *
         *    options.url               String
         *    options.data              Object | String
         *    options.type              String
         *    options.timeout           Int
         *    options.onSuccess         Function
         *    options.onFailure         Function
         *    options.onBeforerequest   Function
         *    options.async,            Boolean
         *
         *
         * @name J.ajax.post
         * @param {String|Object} options 请求的url或参数配置
         * @param {Object|Function} options 参数配置或者回调函数
         * @return {Object}
         *
         */

        ajaxObj[v] = function (url, options) {
            return new Ajax(url, options, v)
        };
    });

    J.mix(J, ajaxObj);

})(J, window);/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: event/event.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/08/29
 *
 *
 *
 *
 */

/**
 *
KEY_BACKSPACE:8,
KEY_TAB:9,
KEY_RETURN:13,
KEY_ESC:27,
KEY_LEFT:37,
KEY_UP:38,
KEY_RIGHT:39,
KEY_DOWN:40,
KEY_DELETE:46,
KEY_HOME:36,
KEY_END:35,
KEY_PAGEUP:33,
KEY_PAGEDOWN:34,
KEY_INSERT:45,
 */

(function (J, W, D) {

    J.add('event', {
        DA:'dataavailable',
        LO:'losecapture',
        ME:'mouseenter',
        ML:'mouseleave',
        CACHE:[],
        fix:getResponder,
        fixName:fixEventName,
        getKeyCode:function (event) {
            return event.which || event.keyCode;
        },
        g:function(element){
            return (!element) ? '' : J.isString(element) ? D.getElementById(element) : (element && (element === W || element === D || (element.nodeType && element.nodeType === 1))) ? element : element.get(0);
        }
    });

    var E = J.event, dom = J.dom, ME = E.ME, ML = E.ML, U= 'unload', docEl = D.documentElement, isIE = J.ua.ie;
    E.MMES = 'on'+ ME in docEl && 'on'+ ML in docEl;

    dom && dom.fn && J.each('on un once fire'.split(' '), function(i, v){
        dom.fn[v] = function(){
            E[v].apply(null, [this.get()].concat(J.slice.call(arguments)));
            return this;
        }
    });

    function extend(event, element, data, preventDefault, stopPropagation) {
        if (!event) return false;
        var d = 'preventDefault',p = 'stopPropagation',c = 'currentTarget';

        event[c] || (event[c] = element);
        event[d] || (event[d] = function () {
            event.returnValue = false;
        });
        event[p] || (event[p] = function () {
            event.cancelBubble = true;
        });
        event.stop = function () {
            event[d]();
            event[p]()
        };

        if (preventDefault) event[d]();
        if (stopPropagation) event[p]();

        return event;
    }

    function getResponder(element, type, handler, data, preventDefault, stopPropagation) {
        return function (event) {
            if (type.indexOf(':') > -1 && event && event.eventName !== type) return false;
            if (!E.MMES && (type === ME || type === ML)) {
                var a = event.currentTarget || element, b = event.relatedTarget;
                //火狐支持compareDocumentPosition(), 其他浏览器支持 contains();
                if (!(a != b && !(a.contains ? a.contains(b) : !!(a.compareDocumentPosition(b) & 16) ))) return false;
            }
            extend(event, element, data, preventDefault, stopPropagation);
            handler.call(element, event, data);
        };
    }

    function fixEventName(e) {
        var translations = { mouseenter:"mouseover", mouseleave:"mouseout" };
        return (translations[e] || e);
    }

    // 释放内存，防止造成内存泄漏
    if (isIE)
        W.attachEvent('on'+U, function(){
            var e, E = J.event, a = E.CACHE, l = a.length, dE = 'detachEvent';
            while (l--) {
                e = a[l];
                e.e[dE]('on' + e.t, e.r, false);
                if (e.t.indexOf(':') > -1) {
                    e.e[dE]("on"+ E.DA, e.r);
                    e.e[dE]("on"+ E.LO, e.r);
                }
                a.splice(l, 1);
            }
        });
    else
        W.addEventListener(U, function () {}, false);

})(J, window, document);
/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: event/fire.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/08/29
 *
 */

/// require('event.event');

/**
 * 触发已经注册的事件。
 * @name J.event.fire
 * @function
 * @grammar J.fire(element, type, [,data [,bubble]])
 * @param {HTMLElement|string|window} element 目标元素或目标元素id
 * @param {string} type 事件类型
 * @param {Object} data 需要传递的数据 ，通过 event.data 获取
 * @param {Boolean} bubble || true 是否冒泡
 *
 * @shortcut fire
 * @meta standard
 *
 * @returns {Event}
 */
J.fire = J.event.fire = function(element, type, data, bubble) {

    var event, E = J.event, DA = E.DA, LO = E.LO, D = document;

    if( (element = E.g(element)).length == 0 ) return false;

    bubble = bubble || true;

    if (element == D && D.createEvent && !element.dispatchEvent)
        element = D.documentElement;


    if (D.createEvent) {
        event = D.createEvent('HTMLEvents');
        event.initEvent(DA, bubble, true);
    } else {
        event = D.createEventObject();
        event.eventType = bubble ? 'on'+DA : 'on'+LO;
    }

    event.eventName = type;
    event.data = data || { };

    if (D.createEvent)
        element.dispatchEvent(event); else
        element.fireEvent(event.eventType, event);

    return event;
};/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: event/getPageX.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/08/31
 *
 */


/**
 * 获取鼠标事件的鼠标x坐标
 * @name J.event.getPageX
 * @function
 * @grammar J.event.getPageX(event)
 * @param {Event} event 事件对象
 *
 * @returns {number} 鼠标事件的鼠标x坐标
 */
J.event.getPageX = function (event) {
    var doc = document, docEl = doc.documentElement,  body = doc.body || { scrollLeft:0 };
    return event.pageX || (event.clientX + (docEl.scrollLeft || body.scrollLeft) - (docEl.clientLeft || 0));
};
/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: event/getPageY.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/08/31
 *
 */


/**
 * 获取鼠标事件的鼠标y坐标
 * @name J.event.getPageY
 * @function
 * @grammar J.event.getPageY(event)
 * @param {Event} event 事件对象
 *
 * @returns {number} 鼠标事件的鼠标y坐标
 */
J.event.getPageY = function (event) {
    var doc = document, docEl = doc.documentElement, body = doc.body || { scrollTop:0 };
    return  event.pageY || (event.clientY + (docEl.scrollTop || body.scrollTop) - (docEl.clientTop || 0));
};
/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: event/on.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/08/29
 *
 */


/// require('event.event');

/**
 * 为目标元素添加事件监听器
 * @name J.event.on
 * @function
 * @grammar J.on(element, type, handler [,data [,preventDefault [,stopPropagation]]])
 * @param {HTMLElement|string|window} element 目标元素或目标元素id
 * @param {string} type 事件类型
 * @param {Function} handler 需要添加的监听器
 * @param {Object} data 需要传递的数据 ，通过 event.data 获取
 * @param {Boolean} preventDefault 阻止事件默认行为
 * @param {Boolean} stopPropagation 停止事件冒泡
 *
 * @shortcut on
 * @meta standard
 * @see J.event.un
 *
 * @returns {HTMLElement|window} 目标元素
 */

J.on = J.event.on = function (element, type, handler, data, preventDefault, stopPropagation) {

    var E = J.event, a = E.CACHE, responder, isFire = type.indexOf(':') > -1, aD = 'addEventListener', aT = 'attachEvent', DA = E.DA, LO = E.LO;

    if( (element = E.g(element)).length == 0 ) return false;

    responder = E.fix(element, type, handler, data, preventDefault, stopPropagation);

    if (!E.MMES) type = E.fixName(type);

    if (element[aD])
        element[aD](isFire ? DA : type, responder, false); else {
        if (isFire) {
            element[aT]("on" + DA, responder);
            element[aT]("on" + LO, responder);
        } else element[aT]("on" + type, responder);
    }

    a.push({
        e:element,
        t:type,
        h:handler,
        r:responder
    });

    return element;
};
/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: event/un.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/08/29
 *
 */


/// require('event.event');


/**
 * 为目标元素移除事件监听器
 * @name J.event.un
 * @function
 * @grammar J.un(element, type, handler)
 * @param {HTMLElement|string|window} element 目标元素或目标元素id
 * @param {string} type 事件类型
 * @param {Function} handler 需要移除的监听器
 *
 * @shortcut un
 * @meta standard
 * @see J.event.on
 *
 * @returns {HTMLElement|window} 目标元素
 */

J.un = J.event.un = function (element, type, handler) {

    var E = J.event, a = E.CACHE,  DA = E.DA, LO = E.LO, l = a.length, e, elmAll = !type, typeAll = !handler, isFire , rE = 'removeEventListener', dT = 'detachEvent';

    if( (element = E.g(element)).length == 0 ) return false;

    if (!E.MMES && !type) {
        type = E.fixName(type);
    }

    while (l--) {
        e = a[l];
        if (e.e == element && (elmAll || e.t == type) && (typeAll || e.h == handler)) {
            isFire = e.t.indexOf(':') > -1;
            if (element[rE])
                element[rE](isFire ? DA : (type || e.t), e.r, false); else {
                if (isFire) {
                    element[dT]("on"+DA, e.r);
                    element[dT]("on"+LO, e.r);
                } else element[dT]("on" + (type || e.t), e.r);
            }
            a.splice(l, 1);
        }

    }

    return element;

};/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: event/once.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/08/29
 *
 */


/// require('event.event');
/// require('event.on');
/// require('event.un');

/**
 * 为目标元素添加一次事件绑定
 * @name J.event.once
 * @function
 * @grammar J.once(element, type, handler)
 * @param {HTMLElement|string} element 目标元素或目标元素id
 * @param {string} type 事件类型
 * @param {Function} handler 需要添加的监听器
 * @see J.event.un,J.event.on
 *             
 * @returns {HTMLElement} 目标元素
 */
J.once = J.event.once = function(element, type, handler){
    function onceListener(event){
        handler.call(element,event);
        J.event.un(element, type, onceListener);
    } 
    J.event.on(element, type, onceListener);
    return element;
};
/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 *
 * 这是cookie核心文件，
 *
 *
 * @path: cookie/cookie.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/02/10
 *
 */

(function(J){
    var D = document,
        millisecond = 24 * 60 * 60 * 1000,
        encode = encodeURIComponent,
        decode = decodeURIComponent;

    /**
     * 验证字符串是否合法的cookie值
     *
     * @param {String} val cookie值
     * @return {Boolean} 是否合法的cookie值
     */
    function validString(val){
        return J.isString(val) && '' !== val;
    }

    /**
     * 设置cookie
     *
     * @param {String} name cookie名称
     * @param {String} value cookie值
     * @param {String} date cookie过期时间
     * @param {String} path cookie path
     * @param {String} domain cookie domain
     * @param {String} secure cookie secure
     * @return null
     */
    function setCookie(name, value, date, domain, path, secure){
        D.cookie = decode(name) + "=" + String(encode( value )) +
                ((date) ? ";expires=" + date.toGMTString() : "") +
                ";path=" + (validString(path) ? path : "/") +
                (validString(domain) ? ";domain=" + domain : "" ) +
                ((secure) ? ";secure" : "" );
    }

    var cookie = {
        /**
         * 获取cookie值
         *
         * @param {String} name cookie名称
         * @return {String} cookie值
         */
        getCookie: function (name) {
            var ret = null, m, result;
            if (validString(name)) {
                m = new RegExp("(?:^|)" + decode(name) + "=([^;]*)(?:;|$)",'ig');
                while((result = m.exec(D.cookie)) != null){
                    ret = decode(result[1])||null;
                }
            }
            return ret;
        },
        /**
         * 设置cookie
         *
         * @param {String} name cookie名称
         * @param {String} value cookie值
         * @param {String} expires cookie过期时间 （单位天）
         * @param {String} path cookie path
         * @param {String} domain cookie domain
         * @param {String} secure cookie secure
         * @return null
         */
        setCookie: function(name, value, expires, domain, path, secure) {
            var date = '';
            if (expires) {
                date = new Date();
                date.setTime(date.getTime() + expires * millisecond);
            }
            setCookie(name, value, date, domain, path, secure)
        },
        /**
         * 删除cookie
         *
         * @param {String} name cookie名称
         * @return null
         */
        rmCookie: function(name, domain, path, secure){
            if ( cookie.getCookie( name ) ) D.cookie = decode(name) + "=" +
                ";path=" + (validString(path) ? path : "/") +
                ( ( domain ) ? ";domain=" + domain : "" ) +
                ";expires=Thu, 01-Jan-1970 00:00:01 GMT";
        }
    };

    J.add('cookie', cookie);

    J.mix(J, cookie);

})(J);

/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: site/site.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/11/15
 *
 */


J.add('site');/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: site/init.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/11/15
 *
 */

/// require('site.site');
;(function ($) {
    'use strict';

    /*
    * Add integers, wrapping at 2^32. This uses 16-bit operations internally
    * to work around bugs in some JS interpreters.
    */
    function safe_add(x, y) {
        var lsw = (x & 0xFFFF) + (y & 0xFFFF),
            msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xFFFF);
    }

    /*
    * Bitwise rotate a 32-bit number to the left.
    */
    function bit_rol(num, cnt) {
        return (num << cnt) | (num >>> (32 - cnt));
    }

    /*
    * These functions implement the four basic operations the algorithm uses.
    */
    function md5_cmn(q, a, b, x, s, t) {
        return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
    }
    function md5_ff(a, b, c, d, x, s, t) {
        return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
    }
    function md5_gg(a, b, c, d, x, s, t) {
        return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
    }
    function md5_hh(a, b, c, d, x, s, t) {
        return md5_cmn(b ^ c ^ d, a, b, x, s, t);
    }
    function md5_ii(a, b, c, d, x, s, t) {
        return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
    }

    /*
    * Calculate the MD5 of an array of little-endian words, and a bit length.
    */
    function binl_md5(x, len) {
        /* append padding */
        x[len >> 5] |= 0x80 << ((len) % 32);
        x[(((len + 64) >>> 9) << 4) + 14] = len;

        var i, olda, oldb, oldc, oldd,
            a =  1732584193,
            b = -271733879,
            c = -1732584194,
            d =  271733878;

        for (i = 0; i < x.length; i += 16) {
            olda = a;
            oldb = b;
            oldc = c;
            oldd = d;

            a = md5_ff(a, b, c, d, x[i],       7, -680876936);
            d = md5_ff(d, a, b, c, x[i +  1], 12, -389564586);
            c = md5_ff(c, d, a, b, x[i +  2], 17,  606105819);
            b = md5_ff(b, c, d, a, x[i +  3], 22, -1044525330);
            a = md5_ff(a, b, c, d, x[i +  4],  7, -176418897);
            d = md5_ff(d, a, b, c, x[i +  5], 12,  1200080426);
            c = md5_ff(c, d, a, b, x[i +  6], 17, -1473231341);
            b = md5_ff(b, c, d, a, x[i +  7], 22, -45705983);
            a = md5_ff(a, b, c, d, x[i +  8],  7,  1770035416);
            d = md5_ff(d, a, b, c, x[i +  9], 12, -1958414417);
            c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
            b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
            a = md5_ff(a, b, c, d, x[i + 12],  7,  1804603682);
            d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
            c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
            b = md5_ff(b, c, d, a, x[i + 15], 22,  1236535329);

            a = md5_gg(a, b, c, d, x[i +  1],  5, -165796510);
            d = md5_gg(d, a, b, c, x[i +  6],  9, -1069501632);
            c = md5_gg(c, d, a, b, x[i + 11], 14,  643717713);
            b = md5_gg(b, c, d, a, x[i],      20, -373897302);
            a = md5_gg(a, b, c, d, x[i +  5],  5, -701558691);
            d = md5_gg(d, a, b, c, x[i + 10],  9,  38016083);
            c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
            b = md5_gg(b, c, d, a, x[i +  4], 20, -405537848);
            a = md5_gg(a, b, c, d, x[i +  9],  5,  568446438);
            d = md5_gg(d, a, b, c, x[i + 14],  9, -1019803690);
            c = md5_gg(c, d, a, b, x[i +  3], 14, -187363961);
            b = md5_gg(b, c, d, a, x[i +  8], 20,  1163531501);
            a = md5_gg(a, b, c, d, x[i + 13],  5, -1444681467);
            d = md5_gg(d, a, b, c, x[i +  2],  9, -51403784);
            c = md5_gg(c, d, a, b, x[i +  7], 14,  1735328473);
            b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);

            a = md5_hh(a, b, c, d, x[i +  5],  4, -378558);
            d = md5_hh(d, a, b, c, x[i +  8], 11, -2022574463);
            c = md5_hh(c, d, a, b, x[i + 11], 16,  1839030562);
            b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
            a = md5_hh(a, b, c, d, x[i +  1],  4, -1530992060);
            d = md5_hh(d, a, b, c, x[i +  4], 11,  1272893353);
            c = md5_hh(c, d, a, b, x[i +  7], 16, -155497632);
            b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
            a = md5_hh(a, b, c, d, x[i + 13],  4,  681279174);
            d = md5_hh(d, a, b, c, x[i],      11, -358537222);
            c = md5_hh(c, d, a, b, x[i +  3], 16, -722521979);
            b = md5_hh(b, c, d, a, x[i +  6], 23,  76029189);
            a = md5_hh(a, b, c, d, x[i +  9],  4, -640364487);
            d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
            c = md5_hh(c, d, a, b, x[i + 15], 16,  530742520);
            b = md5_hh(b, c, d, a, x[i +  2], 23, -995338651);

            a = md5_ii(a, b, c, d, x[i],       6, -198630844);
            d = md5_ii(d, a, b, c, x[i +  7], 10,  1126891415);
            c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
            b = md5_ii(b, c, d, a, x[i +  5], 21, -57434055);
            a = md5_ii(a, b, c, d, x[i + 12],  6,  1700485571);
            d = md5_ii(d, a, b, c, x[i +  3], 10, -1894986606);
            c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
            b = md5_ii(b, c, d, a, x[i +  1], 21, -2054922799);
            a = md5_ii(a, b, c, d, x[i +  8],  6,  1873313359);
            d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
            c = md5_ii(c, d, a, b, x[i +  6], 15, -1560198380);
            b = md5_ii(b, c, d, a, x[i + 13], 21,  1309151649);
            a = md5_ii(a, b, c, d, x[i +  4],  6, -145523070);
            d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
            c = md5_ii(c, d, a, b, x[i +  2], 15,  718787259);
            b = md5_ii(b, c, d, a, x[i +  9], 21, -343485551);

            a = safe_add(a, olda);
            b = safe_add(b, oldb);
            c = safe_add(c, oldc);
            d = safe_add(d, oldd);
        }
        return [a, b, c, d];
    }

    /*
    * Convert an array of little-endian words to a string
    */
    function binl2rstr(input) {
        var i,
            output = '';
        for (i = 0; i < input.length * 32; i += 8) {
            output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xFF);
        }
        return output;
    }

    /*
    * Convert a raw string to an array of little-endian words
    * Characters >255 have their high-byte silently ignored.
    */
    function rstr2binl(input) {
        var i,
            output = [];
        output[(input.length >> 2) - 1] = undefined;
        for (i = 0; i < output.length; i += 1) {
            output[i] = 0;
        }
        for (i = 0; i < input.length * 8; i += 8) {
            output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << (i % 32);
        }
        return output;
    }

    /*
    * Calculate the MD5 of a raw string
    */
    function rstr_md5(s) {
        return binl2rstr(binl_md5(rstr2binl(s), s.length * 8));
    }

    /*
    * Calculate the HMAC-MD5, of a key and some data (raw strings)
    */
    function rstr_hmac_md5(key, data) {
        var i,
            bkey = rstr2binl(key),
            ipad = [],
            opad = [],
            hash;
        ipad[15] = opad[15] = undefined;
        if (bkey.length > 16) {
            bkey = binl_md5(bkey, key.length * 8);
        }
        for (i = 0; i < 16; i += 1) {
            ipad[i] = bkey[i] ^ 0x36363636;
            opad[i] = bkey[i] ^ 0x5C5C5C5C;
        }
        hash = binl_md5(ipad.concat(rstr2binl(data)), 512 + data.length * 8);
        return binl2rstr(binl_md5(opad.concat(hash), 512 + 128));
    }

    /*
    * Convert a raw string to a hex string
    */
    function rstr2hex(input) {
        var hex_tab = '0123456789abcdef',
            output = '',
            x,
            i;
        for (i = 0; i < input.length; i += 1) {
            x = input.charCodeAt(i);
            output += hex_tab.charAt((x >>> 4) & 0x0F) +
                hex_tab.charAt(x & 0x0F);
        }
        return output;
    }

    /*
    * Encode a string as utf-8
    */
    function str2rstr_utf8(input) {
        return unescape(encodeURIComponent(input));
    }

    /*
    * Take string arguments and return either raw or hex encoded strings
    */
    function raw_md5(s) {
        return rstr_md5(str2rstr_utf8(s));
    }
    function hex_md5(s) {
        return rstr2hex(raw_md5(s));
    }
    function raw_hmac_md5(k, d) {
        return rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d));
    }
    function hex_hmac_md5(k, d) {
        return rstr2hex(raw_hmac_md5(k, d));
    }

    function md5(string, key, raw) {
        if (!key) {
            if (!raw) {
                return hex_md5(string);
            }
            return raw_md5(string);
        }
        if (!raw) {
            return hex_hmac_md5(key, string);
        }
        return raw_hmac_md5(key, string);
    }

    if (typeof define === 'function' && define.amd) {
        define(function () {
            return md5;
        });
    } else {
        $.md5 = md5;
    }
}(this));

(function () {
    var site = J.site, D = document,
        expire = 365 * 5,
        location = D.location,
        host = location.host,
        href = location.href,
        isDev = /\.(dev\.|test)/.test(host),
        isAifang = /aifang\.com/.test(host),
        guidDateString,
        baseDomain;

    function pad(source){
        return ('00'+source).match(/\d{2}$/)[0]
    }

    var date = new Date(),
        month = date.getMonth()+1,
        date2   = date.getDate(),
        hours   = date.getHours(),
        minutes = date.getMinutes(),
        seconds = date.getSeconds();

    guidDateString = pad(month) + pad(date2) + pad(hours) + pad(minutes) + pad(seconds);

    if(!isDev){
        baseDomain = '.' + (isAifang ? 'aifang' : 'anjuke') + '.com';
    }else{
        baseDomain = host.replace(/\w+\./,'');
    }

    site.info = {
        isNew:0,
        baseDomain:baseDomain,
        time:date.getTime(),
        host:host,
        href:href,
        dev:isDev,
        ref:D.referrer,
        isAifang:isAifang
    };

    site.cookies = {
        ctid:'ctid',
        guid:'aQQ_ajkguid',
        ssid:'sessid',
        auid:'aQQ_ajkauthinfos',
        said:'aQQ_afsales_uid',
        moblieAd:'mobile_guide'
    };

    function createGuid() {
        var str = isAifang ? 'I' : 'X';
        //return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + SU8());
        return (SU8() + '-' + S4() + '-' + S4() + '-' + S4() + '-C' + str + guidDateString);
    }

    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1).toUpperCase();
    }

    function SU8() {
        var s = md5(J.ua.ua + href + (D.lastModified || '')),
            l = s.length;
        return l >= 8 ? s.substring(l - 8, l).toUpperCase() : S4() + S4();
    }

    site.createGuid = createGuid;

    site.init = function(p){
        p = p || {};
        var cks = site.cookies, ckGuid = cks.guid, ckCity = cks.ctid, ckSession = cks.ssid, cityId = p.city_id || '',
            setCookie = J.setCookie, getCookie = J.getCookie;

        site.info.version = p.page_version || '';

        function vCookie(){
            getCookie(ckGuid) || (site.info.isNew = 1, setCookie(ckGuid, createGuid(), expire, baseDomain));
        }

        if(getCookie(ckSession)){
            vCookie();
        }else{
            setCookie(ckSession, createGuid(), 0, baseDomain);
            vCookie();
        }

        ( cityId && (cityId != getCookie(ckCity)) ) && setCookie(ckCity, cityId, expire, baseDomain);

        site.info.ctid = cityId || getCookie(ckCity);
        p.cityAlias && (site.info.cityAlias = p.cityAlias);


    };
})();
/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: site/tracker.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/11/15
 *
 */

/// require('site.site');


(function () {

    var site = J.site, siteCookies = site.cookies, siteInfo = site.info, EventTracker;

    // 以下用于页面曝光量统计，以及SOJ A标签处理
    var sojTag = "soj", traceTag = 'data-trace', traceFinished = false, v, d, Arr = [], Ret = {}, l, http = 'http://';


    function getCustomData() {
        traceFinished || getDataTrace();
        var U = [];
        for (var item in Ret) {
            U.push('"' + item + '":[' + Ret[item].join(',') + ']')
        }
        return U;
    }

    function setData(items) {
        for (var key in items) {
            /^\d+$/.test(items[key]) && (Ret[key] || (Ret[key] = []), Ret[key].push(items[key]))
        }
    }

    function sojBase(s, v) {
        s.on("click", function () {
            var r, i, n = this.href;
            if (!n.match(/^http/) || n.match(/from=/))return;
            r = n.split("#"), i = r[0] + (n.match(/\?/) ? "&" : "?") + "from=" + encodeURIComponent(v), r[1] && (i += "#" + r[1]), this.href = i
        });
    }

    function getDataTrace() {
        J.s("a").each(function (i, s) {
            (d = s.attr(traceTag)) && Arr.push(d);
            (d = s.attr(sojTag)) && sojBase(s, d);
        });
        v = eval('([' + Arr.join(',') + '])');
        l = v.length;
        while (l--) {
            setData(v[l]);
        }
        traceFinished = true;
    }

    site.soj = function (e) {
        J.g(e).s("a").each(function (i, s) {
            (d = s.attr(sojTag)) && sojBase(s, d);
        });
    };

    // 以下是页面停留时间获取
    site.waited = function (target, id) {
        J.on(window, 'unload', function () {
            var getCookie = J.getCookie, siteCookies = site.cookies,
            data = {
                starttime:J.times.PS,
                endtime:J.getTime(),
                target:target,
                id:id,
                guid:getCookie(siteCookies.guid),
                ssid:getCookie(siteCookies.ssid)
            }, url;
            if(site.info.dev){
                url = 'dev.aifang'
            }else{
                url = site.info.isAifang ? 'aifang' : 'fang.anjuke';
            }
            url = http + 'www.' + url + '.com/lenger.html';
            J.get({url:url, data:data, type:'jsonp'});
        });
    };

    /**
     * AA log && SOJ
     * @param s site
     * @param p page
     * @param u user Cookie Name
     * @returns Tracker Object
     */
    site.tracker = function (s, p, u) {
        var D = document, o = {}, getCookie = J.getCookie, customData = [], m = {
            track:track,
            addCustomParam : function(params){
                params && J.each(params, function(i, v){
                    customData.push(J.isNumber(i) ? v : '"' + i + '":"' + v + '"')
                });
            },
            getCustomParam : function(){
                return customData.length ? '{' + customData.join(",") + '}' : ''
            }
        };
        s && (o.site = s);
        p && (o.page = p);
        o.referrer = D.referrer || '';

        J.each('Site Page PageName Referrer Uid Method NGuid NCtid NLiu NSessid NUid Cst CustomParam SendType'.split(' '), function (i, v) {
            var a = v.substring(0, 1).toLowerCase() + v.substring(1);
            m['set' + v] = function (v) {
                o[a] = v
            }
        });

        function buildParams() {
            var ret = {
                p:o.page,
                h:D.location.href,
                r:o.referrer || D.referrer || '',
                site:o.site || '',
                guid:getCookie(o.nGuid || siteCookies.guid) || '',
                ctid:getCookie(o.nCtid || siteCookies.ctid) || '',
                luid:getCookie(o.nLiu || 'lui') || '',
                ssid:getCookie(o.nSessid || siteCookies.ssid) || '',
                uid:u || getCookie(o.nUid || siteCookies.said) || '0',
                t:siteInfo.time
            };
            o.method && (ret.m = o.method);
            (o.cst && /[0-9]{13}/.test(o.cst)) && (ret.lt = ret.t - parseInt(o.cst));
            o.pageName && (ret.pn = o.pageName);
            ret.cp = o.customParam ? o.customParam : m.getCustomParam();
            return ret
        }

        function track(url) {
            !J.isUndefined(o.customParam) || m.addCustomParam(getCustomData());// 添加曝光量统计
            var P = buildParams(), T = '.com/st';
            url = url || 'http://' + ((siteInfo.dev) ? 'soj.dev.aifang' + T : 's.anjuke' + T + 'b');
            try{
                J[o.sendType||'post']({url:url, type:'jsonp', data:P});
            }catch(e){
            }
        }

        return m;
    };

    /**
     * @param o.site site
     * @param o.page page
     * @param o.referrer referrer
     * @param o.options options
     */
    site.eventTracking = function(o){
        EventTracker = EventTracker || new site.tracker();
        EventTracker.setSendType('get');
        EventTracker.setSite(o.site);
        o.page && EventTracker.setPage(o.page);
        o.page && EventTracker.setPageName(o.page);
        o.referrer && EventTracker.setReferrer(o.referrer);
        o.customparam ? EventTracker.setCustomParam(o.customparam) : EventTracker.setCustomParam("");
        EventTracker.track();
    }

})();/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: utils/utils.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/11/15
 *
 */


J.add('utils');/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: utils/base.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/11/15
 *
 */

/// require('utils.utils');

(function () {

    // private method for UTF-8 decoding
    function utf8_decode(utftext) {
        var string = "", i = 0, c ,c1, c2, c3, s = S;

        while ( i < utftext.length ) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += S.fromCharCode(c);
                i++;
            }
            else if((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i+1);
                string += S.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i+1);
                c3 = utftext.charCodeAt(i+2);
                string += S.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }

        return string;
    }

    // private method for UTF-8 encoding
    function utf8_encode(string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += S.fromCharCode(c);
            }
            else if((c > 127) && (c < 2048)) {
                utftext += S.fromCharCode((c >> 6) | 192);
                utftext += S.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += S.fromCharCode((c >> 12) | 224);
                utftext += S.fromCharCode(((c >> 6) & 63) | 128);
                utftext += S.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    }

    var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", S = String;

    J.utils.base = {

        // public method for encoding
        encode : function (input) {
            var output = "";
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            var i = 0;

            input = utf8_encode(input);

            while (i < input.length) {

                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);

                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;

                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }

                output = output +
                keyStr.charAt(enc1) + keyStr.charAt(enc2) +
                keyStr.charAt(enc3) + keyStr.charAt(enc4);

            }

            return output;
        },

        // public method for decoding
        decode : function (input) {
            var output = "";
            var chr1, chr2, chr3;
            var enc1, enc2, enc3, enc4;
            var i = 0;

            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

            while (i < input.length) {

                enc1 = keyStr.indexOf(input.charAt(i++));
                enc2 = keyStr.indexOf(input.charAt(i++));
                enc3 = keyStr.indexOf(input.charAt(i++));
                enc4 = keyStr.indexOf(input.charAt(i++));

                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;

                output = output + S.fromCharCode(chr1);

                if (enc3 != 64) {
                    output = output + S.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + S.fromCharCode(chr3);
                }

            }

            output = utf8_decode(output);

            return output;

        }
    };

})();/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: ui/ui.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/10/11
 *
 */


J.add('ui');/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: ui/autocomplete.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/10/11
 *
 */

/// require('ui.ui');
/// require('string.trim');

/**
 * @namespace J.ui.autocomplete
 *
 * @require dom.dom, event.on, event.un
 *
 *
 */
(function (J, D) {

    /**
     * 缺省的选项配置
     * @type {Object}
     */
    var defaultOpts = {
        url:'/',
        dataKey:'',
        filterHtml: true,
        autoSubmit: true,
        forceClear:false,
        defer: 0,
        width: 0,
        params: {},
        source: null,
        offset:{
            x:0,
            y:-1
        },
        query: '',
        placeholder:'',
        toggleClass:'',
        cache:true,
        onForceClear:null,
        onResult:null,
        onChange:null,
        onSelect:null,
        onFoucs:null,
        onKeyPress:null,
        onBlur:null,
        onKeyUp:null,
        dataMap:null, // {id:'k', name:'v}
        itemBuild:null,
        tpl:'autocomplete_def'
    };

    /**
     * Auto Complete Function
     * @param el 需要绑定的输入框
     * @param options 扩展选项
     * @constructor
     */
    function Autocomplete(el, options) {
        var disabled = false, el = J.g(el), equaled = -1, selectedIndex = -1, currentValue = el.val().trim(), CACHED = [], DATA = [], opts, aId, isShow = false, divs,
            mainContainer, container, valueChangeTimer = null, ignoreValueChange = false, intervalTimer = null, st;

        (function(){
            el.attr('autocomplete', 'off');
            opts = J.mix(defaultOpts, options || {}, true);
            aId = 'Autocomplete_' + getId();
            opts.width || (opts.width = el.width()-2);
            opts.query = (opts.query || el.attr('name') || 'q');
            if(currentValue === '' && opts.placeholder){
                el.val(opts.placeholder);
                opts.toggleClass && el.removeClass(opts.toggleClass);
            }
            buildMain();
            bindEvent();
        })();

        function setPlaceholder(value){
            opts.placeholder = value
        }

        function getId(){
            return Math.floor(Math.random() * 0x1000000).toString(16);
        }

        function buildMain(){
            J.g('body').first().insertBefore(mainContainer = J.create('div', {style:'position:absolute;z-index:10100' ,'class':'autoMobie' }).html('<div class="'+opts.tpl+'" id="' + aId + '" style="display:none; width:'+opts.width+'px"></div>'));
            container = J.g(aId);
        }

        function fixPosition() {
			var offset = el.offset();
			mainContainer.setStyle({ top: (offset.y + el.height() + opts.offset.y) + 'px', left: (offset.x + opts.offset.x) + 'px' });
		}

        function bindEvent(){
            J.on(el, J.ua.opera ? 'keypress' : 'keydown', KeyPress);
            J.on(el, 'keyup', keyup);
            J.on(el, 'blur', blur);
            J.on(el, 'focus', focus);
        }

        function KeyPress(e){
            if (disabled) { return; }
            (opts.onKeyPress) && opts.onKeyPress(el);
			switch (e.keyCode) {
				case 27: //KEY_ESC:
					el.val(currentValue.trim());
					hide();
					break;
				case 9: //KEY_TAB:
				case 13: //KEY_RETURN:
					if (selectedIndex === -1) {
						hide();
						return;
					}
					select(null, selectedIndex);
					break;
				case 38: //KEY_UP:
					moveUp();
					break;
				case 40: //KEY_DOWN:
					moveDown();
					break;
				default:
					return;
			}
			e.preventDefault();
        }

        function keyup(e){
            if (disabled) return;
            (opts.onKeyUp) && opts.onKeyUp(el);
			switch (e.keyCode) {
				case 38: //KEY_UP:
				case 40: //KEY_DOWN:
                case 13: //KEY_RETURN:
                case 27: //KEY_ESC:
					return;
			}
            if(ignoreValueChange) return;
            if(el.val().trim()=='') hide();
			clearTimeout(valueChangeTimer);
			valueChangeTimer = setTimeout(valueChange, opts.defer);
        }

        function blur(e){
            clearTimeout(valueChangeTimer);
            clearInterval(intervalTimer);
            (opts.onBlur) && opts.onBlur(e);
            J.on(D,'click',function(){
                if(opts.forceClear){
                    if(equaled == -1) {
                        el.val('');
                        opts.onForceClear && opts.onForceClear(el);
                    }
                    else onSelect(equaled);
                }
                hide();
                J.un(D, 'click', arguments.callee);
            });
            if(opts.placeholder && el.val().trim() === ''){
                opts.toggleClass && el.removeClass(opts.toggleClass);
                el.val(opts.placeholder);
            }
        }
        //mark onchange
        function focus(){
            if (disabled) { return; }
            (opts.onFocus) && opts.onFocus(el);
            if (opts.placeholder == el.val().trim()){
                el.val('');
                opts.toggleClass && el.addClass(opts.toggleClass);
                // return;
            }
            intervalTimer = setInterval(function(){
                if(currentValue != (el.val().trim()) && !ignoreValueChange) valueChange();
            },30);
        }

        function valueChange(){
			if (disabled || ignoreValueChange) {
				ignoreValueChange = false;
				return;
			}
            if(!(currentValue = el.val().trim())) return;
            selectedIndex = -1;
            onChange(selectedIndex);
			getData();
        }

        function getCacheKey(){
            return encodeURIComponent(currentValue.trim());
        }

        function getData(){
            if(opts.source){
                suggest(opts.source);
                return;
            }
            var a;
            if(opts.cache && (a = CACHED[getCacheKey()])) return suggest(a,'c');
            if(st) return;
            st = true;
            opts.params[opts.query] = currentValue.trim();
            J.get({
                url:opts.url,
                type:'json',
                data:opts.params,
                onSuccess:suggest
            });
        }

        function buildData(a){
            var dataArr = [];
            if(J.isString(a)) return dataArr;
            J.each(a, function(i, v){
                dataArr.push(buildItem(i,v));
            });
            return dataArr;
        }

        function buildItem(k, v){
            var ret = {};
            if(J.isString(v)){
                return { k:k,v:v,l:v};
            }else{
                ret = opts.dataMap ? opts.dataMap(v) : v;
                ret.v || (ret.v = getFirstValue(v));
                ret.k || (ret.k = ret.v);
                ret.l || (ret.l = ret.v);
            }
            return ret;
        }

        function suggest(a, cached){
            var div, t, val, elVal = el.val();
            st = false;
            equaled = -1;

            if(cached){
                DATA = a
            }else{
                // 兼容 jQuery autocomplete 数据格式
                a = opts.dataKey && a[opts.dataKey] || a.data || a;
                DATA = buildData(a);
            }

            (opts.onResult) && opts.onResult(el, DATA);

            if (!DATA || DATA.length === 0) {
				hide();
				return;
			}

            cached || (CACHED[getCacheKey()] = DATA);

            container.empty();

            J.each(DATA, function(i, v){
                cached || (opts.itemBuild && J.mix( v, opts.itemBuild(v) || {} ) );
                t = opts.filterHtml ? getValue(v.v) : v.v;
                if(t == elVal) equaled = i;
                v.l && (div = J.create('div', {"class": selectedIndex === i ? 'ui_item ui_sel':'ui_item', title:t}).html(v.l).appendTo(container)).on('mouseover', activate, i).on('click', select, i, true, true);
            });
            show();
            divs = container.s('div');
        }

        function getFirstValue(values){
            var firstValue;
            J.each(values, function(i, v){
                firstValue = v;
                return false;
            });
            return firstValue;
        }


        function activate(e, selIndex){
            divs.each(function(i, div){
                div.removeClass('ui_sel')
            });
            divs.eq(selectedIndex = selIndex).addClass('ui_sel');
        }

        function select(e, selIndex){
            e && e.stop();
            equaled = selIndex;
            var form, item;
            ignoreValueChange = true;
            if(!J.isUndefined(selIndex)){
                item = DATA[selIndex];
                J.mix( item, onSelect(selIndex) || {} );
                el.val( currentValue = ( opts.filterHtml ? getValue(item.v) : item.v) );
            }
            hide();
            if(opts.autoSubmit && (form = el.up('form'))){
                if (opts.placeholder == el.val().trim()){
                    el.val('');
                }
                form && form.get().submit();
            }
        }

        function getValue(v){
            return v ? v.trim().replace(/<\/?[^>]*>/g,'') : '';
        }

        function moveUp(){
            if (selectedIndex <= 0)  return;
            var div;
            ignoreValueChange = true;
            el.val( currentValue = getValue((div = divs.eq(--selectedIndex).addClass('ui_sel')).html()) );
            div.next().removeClass('ui_sel');
            onChange(selectedIndex);
        }

        function moveDown(){
            if (!isShow || selectedIndex === divs.length-1)  return;
            var div;
            ignoreValueChange = true;
            el.val( currentValue = getValue((div = divs.eq(++selectedIndex).addClass('ui_sel')).html()) );
            selectedIndex > 0 && div.prev().removeClass('ui_sel');
            onChange(selectedIndex);
        }

        function onChange(selIndex){
            (opts.onChange && selIndex != -1) && opts.onChange(DATA[selIndex]);
        }

        function onSelect(selIndex){
            return (opts.onSelect && selIndex != -1) && opts.onSelect(DATA[selIndex]);
        }

        function show(){
            selectedIndex = -1;
			isShow || (container.show(),isShow = true);
            fixPosition();
        }

        function hide(){
            selectedIndex = -1;
            ignoreValueChange = false;
			isShow && (container.empty().hide(),isShow = false);
        }

        function enable(){
            disabled = false;
        }

        function disable(){
            disabled = true;
        }

        function setParams(params, rewrite){
            opts.params = (!rewrite) ? J.mix(opts.params, params, true) : params;
        }

        return {
            setParams:setParams,
            setPlaceholder:setPlaceholder,
            enable:enable,
            disable:disable,
            hide:hide,
            show:show
        };
	}


    J.dom.fn.autocomplete = function(options){
        return new Autocomplete(this.get(), options)
    };

    J.ui.autocomplete = Autocomplete;


})(J, document);/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: ui/dialog.js
 * @author: hqyun
 * @version: 1.0.0
 * @date: 2012/12/04
 *
 */

/// require('ui.ui');

;
(function () {

    function Dialog() {
        function alert() {
            var panel = new J.ui.panel({
                title:'提示信息',
                content:'<span>确定要删除吗？</span>',
                ok:'确定',
                cancel:'取消',
                onOk:function () {
                    panel.close();
                    //console.log('已点击确认')
                },
                onCancel:function () {
                    panel.close();
                    //console.log('操作被取消')
                },
                onClose:function () {
                    //console.log('对话框被关闭')
                }
            });
        }

        function confirm() {
            var panel = new J.ui.panel({
                title:'提示信息',
                content:'<span>确定要删除吗？</span>',
                ok:'确定',
                cancel:'取消',
                onOk:function () {
                    panel.close();
                    //console.log('已点击确认')
                },
                onCancel:function () {
                    panel.close();
                    //console.log('操作被取消')
                },
                onClose:function () {
                    //console.log('对话框被关闭')
                }
            });
        }
    }

    J.ui.dialog = Dialog;

})();/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * Form表单提交组件
 *
 * @path: ui/form.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2013/03/12
 *
 */

/// require('ui.ui');

;
(function (J) {

    /**
     * 缺省的选项配置
     * @type {Object}
     */
    var defaultOpts = {
        formId: '',  // Form表单ID
        data: {}     // 自定义数据 {key:'value'}
    };
    /**
     * Form Function
     * @param options 扩展选项
     * @constructor
     */
    function Form(options) {

        var formElm, data, group, opts, m = {
            getData: getFormElementsValue
        };

        // Initialize
        (function () {
            // 继承defaultOpts而不污染defaultOpts
            opts = J.mix(defaultOpts, options || {}, true);
            formElm = J.g(opts.formId);
            getFormElementsValue();
            buildAjaxMathed();
        })();

        /**
         * 构造 get & post 方法，调用ajax对应的方法，参数传递参照ajax get和post 参数说明
         */
        function buildAjaxMathed(){
            J.each(['get','post'],function(i, v){
                m[v] = function(url, options){
                    var newData = getFormElementsValue(),
                        ajaxData = J.mix(newData, options ? options.data || {} : url.data || {});
                    options ? options.data = ajaxData : url.data = ajaxData;
                    J[v].call(null, url, options);
                };
            });
        }

        /**
         * 获取所有表单元素值
         * @return {Object}
         */
        function getFormElementsValue() {
            data = {};
            group = {};
            var elm;

            formElm.s("*").each(function (i, element) {
                ((elm = element.get()) && elm.type && !elm.disabled) && filterAvailableElement(element);
            });
            filterGroupObject();
            J.mix(data, group);
            return J.mix(data, opts.data || {});
        }

        /**
         * 对分组的对象做JSON处理
         */
        function filterGroupObject() {
            J.each(group, function (i, v) {
                if (J.isObject(v))
                    group[i] = toJSON(v);
            });
        }

        /**
         * JSON字符串处理
         * @param obj json对象
         * @return {String}
         */
        function toJSON(obj) {
            var objArr = [];
            J.each(obj, function (i, v) {
                objArr.push('"' + i + '":"' + v + '"');
            });
            return '{' + objArr.join(',') + '}';
        }

        /**
         * 只针对有效的表单做处理
         * @param element
         */
        function filterAvailableElement(element) {
            var elm = element.get();
            switch (elm.type.toLowerCase()) {
                case 'checkbox':
                case 'radio':
                    if(!elm.checked) break;
                case 'hidden':
                case 'text':
                case 'select-one':
                case 'textarea':
                    buildElementValue(element);
            }
        }

        /**
         * 构建和获取表单元素的值或组织数据数组
         * @param element 有效的表单元素
         */
        function buildElementValue(element) {
            var elm = element.get(), key = elm.name || elm.id, elmValue = element.val();
            var match = key.match(/^(\w+)\[(\d*)\]$/);
            if (!match) {
                data[key] = elmValue;
            } else {
                if (!((elm.type === 'checkbox' || elm.type === 'radio') && !elmValue)) {
                    if (match[2]) {
                        group[match[1]] || (group[match[1]] = {});
                        group[match[1]][match[2]] = elmValue;
                    } else {
                        group[match[1]] || (group[match[1]] = []);
                        group[match[1]].push(elmValue)
                    }
                }
            }
        }

        /**
         * 公开接口
         */
        return m;
    }

    /**
     * 扩展dom form方法，
     * @param data
     * @returns {Form}
     */
    J.dom.fn.form = function(data){
        var o = {
            formId: this,
            data:data||{}
        };
        return new Form(o);
    };

    J.ui.form = Form;

})(J);/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: page/page.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/08/28
 *
 */
(function () {

    var W = window, D = document, DE = D.documentElement;

    function B(){
        return D.body
    }

    function C(){
        return D.compatMode == 'BackCompat' ? B() : DE
    }

    J.add('page', {
        /**
         * 获取页面高度
         * @name J.page.getHeight
         * @function
         * @grammar J.page.getHeight()
         * @see J.page.getWidth
         *
         * @returns {number} 页面高度
         */
        height:function () {
            return Math.max(DE.scrollHeight, B().scrollHeight, C().clientHeight);
        },

        /**
         * 获取页面宽度
         * @name J.page.getWidth
         * @function
         * @grammar J.page.getWidth()
         * @see J.page.getHeight
         *
         * @returns {number} 页面宽度
         */
        width:function () {
            return Math.max(DE.scrollWidth, B().scrollWidth, C().clientWidth);
        },
        /**
         * 获取横向滚动量
         *
         * @return {number} 横向滚动量
         */
        scrollLeft:function () {
            return W.pageXOffset || DE.scrollLeft || B().scrollLeft;
        },
        /**
         * 获取纵向滚动量
         *
         * @returns {number} 纵向滚动量
         */
        scrollTop:function () {
            return W.pageYOffset || DE.scrollTop || B().scrollTop;
        },

        /**
         * 获取页面视觉区域高度
         * @name J.page.viewHeight
         * @function
         * @grammar J.page.viewHeight()
         *
         * @returns {number} 页面视觉区域高度
         */
        viewHeight:function () {
            return C().clientHeight;
        },

        /**
         * 获取页面视觉区域宽度
         * @name J.page.viewWidth
         * @function
         * @grammar J.page.viewWidth()
         *
         * @returns {number} 页面视觉区域宽度
         */
        viewWidth:function () {
            return C().clientWidth;
        }
    });
})();
/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: ui/guide.js
 * @author: Hqyun
 * @version: 1.0.0
 * @date: 2013/02/06
 *
 */

/// require('ui.ui');
/// require('page');

;
(function (J) {

    // 在此作用域下定义的对象或变量，会在多个对象实例内被共享使用

    /**
     * 缺省的选项配置
     * @type {Object}
     */
    var defaultOpts = {
        data:[],
        startIndex:0,
        onComplete:null,
        offsetTarget:'body'
    }, glbMain;

    /**
     * 缺省的选项配置
     * @type {Object}
     */
    var defaultStepOpts = {
        src:'',
        style:'',
        close:null,
        next:null,
        prev:null,
        reStart:null
    };

    /**
     * Guide Function
     * @param options 扩展选项
     * @constructor
     */
    function Guide(options) {

        var guideBox, guideMask, GUIDES = [], opts, stepIndex = 0, stepCurrentIndex = 0, stepLength, guideBoxOffset,boxIfm;

        // Initialize
        (function(){
            // 继承defaultOpts而不污染defaultOpts
            opts = J.mix(defaultOpts, options || {}, true);
            stepLength = opts.data.length;
            guideBoxOffset = J.g(opts.offsetTarget).offset();
            (glbMain || (glbMain = J.create('div', {style:'padding:0;margin:0;'}).insertFirstTo('body')))
                // 创建遮罩层
                .append( guideMask = J.create('div', {style: getCssText(true)}).setStyle({width:J.page.width()+'px',height:J.page.height()+'px'}) )
                // 创建应到此引导层盒子
                .append( guideBox = J.create('div', {style: getCssText(false)}).setStyle({top:guideBoxOffset.y+'px',left:guideBoxOffset.x+'px'}) );

            boxIfm = J.create('iframe', {style: 'z-index:-1;position:absolute; top:0; left:0; filter:Alpha(opacity=0.5);', 'scrolling': 'no', 'frameborder': '0'}).insertFirstTo(guideBox);
            boxIfm.setStyle({
                width: 950 + 'px',
                height: (guideMask.height()-1) + 'px'
            });

            // 呈现第一步
            showGuideSteps(stepIndex = opts.startIndex);
        })();

        /**
         * 获得css样式
         * @param isMask 是否是遮罩样式
         * @return {String}
         */
        function getCssText(isMask){
            var m = ''
                + 'filter: Alpha(Opacity=50);'
                + 'opacity:0.5;'
                + 'background: #000;';
            var s = ''
                + 'position: absolute;'
                + 'z-index: 10001;'
                + 'left: 0;'
                + 'top: 0;';
            return isMask ? m + s : s;
        }

        /**
         * 显示Guide流程，
         * 初始化，上一步，下一步，从头开始，可以直接调用这个方法
         */
        function showGuideSteps(stepIndex){
            hideGuideSteps();
            stepCurrentIndex = getFixedStepIndex(stepIndex);
            stepsActionFactory('show', GUIDES[stepCurrentIndex] || (GUIDES[stepCurrentIndex] = getGuideCurrentSteps()))
        }

        /**
         * 隐藏Guide流程，
         */
        function hideGuideSteps(){
            stepsActionFactory('hide')
        }

        /**
         * Step 工厂方法
         * @param method 方法名称
         * @param steps 单个流程的所有 step
         */
        function stepsActionFactory(method, steps){
            (steps || GUIDES[stepCurrentIndex]) && J.each(steps || GUIDES[stepCurrentIndex], function(i, v){
                v[method]();
            });
        }

        /**
         * 获得修正后索引
         * @param stepIndex
         * @return {Number}
         */
        function getFixedStepIndex(stepIndex){
            return stepIndex < 0 ? 0 : stepIndex > stepLength ? stepLength : stepIndex;
        }

        /**
         * 获取Guide数据
         * @return {Object}
         */
        function getGuideStepData(){
            return opts.data[stepCurrentIndex];
        }

        /**
         * 处理每一个Guide数据，转换成真是的Step对象
         * @return {Object}
         */
        function getGuideCurrentSteps(){
            var steps = [];
            J.each(getGuideStepData(), function(i, v){
                steps.push( new Step(v) );
            });
            return steps;
        }

        /**
         * 下一步
         */
        function next(){
            showGuideSteps(++stepIndex);
        }

        /**
         * 上一步
         */
        function prev(){
            showGuideSteps(--stepIndex);
        }

        /**
         * 从第一个重新开始
         */
        function reStart(){
            showGuideSteps(0);
        }

        /**
         * 关闭Guide
         */
        function close(){
            J.each(GUIDES, function(i, v){
                stepsActionFactory('remove', v);
            });
            guideMask.remove();
            guideBox.remove();
            opts.onComplete && opts.onComplete();
        }

        /**
         * 设置整体偏移量
         * @param offset
         */
        function setOffset(offset){
            opts.offset = offset;
        }

        /**
         * 设置回调函数
         * @param callback
         */
        function setOnComplete(callback){
            opts.onComplete = callback
        }

        /**
         * Step Function
         * @param options 扩展选项
         * @constructor
         */
        function Step(options){

            var BUTTONS = [], stepOpts, stepContainer, actions = {
                // 事件映射
                close:close,
                next:next,
                prev:prev,
                reStart:reStart
            };

            // Initialize
            (function(){
                stepOpts = J.mix(defaultStepOpts, options || {}, true);
                createStepContainer();
            })();

            /**
             * 构建Step容器
             */
            function createStepContainer(){
                var styleCss = 'position:absolute;z-index:10002;';
                var filterCss = 'width:'+stepOpts.style.width+';height:'+stepOpts.style.height+';background:url("'+ stepOpts.src +'") no-repeat 0 0;_background-image:none;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+ stepOpts.src +'")'
                stepContainer = J.create('div').setStyle(styleCss).setStyle(stepOpts.style).append( J.create('div').setStyle(filterCss) );
                J.each(actions,function(i, v){
                    stepOpts[i] && createStepButton(stepOpts[i], v)
                });
                guideBox.append( stepContainer );
            }

            /**
             * 构建Step行为按钮
             * @param buttonData
             * @param callback
             */
            function createStepButton(buttonData, callback){
                BUTTONS.push( J.create('div').setStyle('position:absolute;cursor:pointer;z-index:10003;').setStyle(buttonData).appendTo(stepContainer).on('click', callback) );
            }

            /**
             * 析构Step上所有事件
             */
            function unBindEvents(){
                J.each(BUTTONS, function(i, v){
                    v.un();
                })
            }

            /**
             * 显示Step
             */
            function show(){
                stepContainer.show();
            }

            /**
             * 隐藏Step
             */
            function hide(){
                stepContainer.hide();
            }

            /**
             * 从Guide容器删除当前Step
             */
            function remove(){
                unBindEvents();
                stepContainer.remove();
            }

            return {
                show:show,
                hide:hide,
                remove:remove
            };
        }

        /**
         * 公开接口
         */
        return {
            close:close,
            next:next,
            reStart:reStart,
            prev:prev,
            setOffset:setOffset,
            setOnComplete:setOnComplete
        };
    }

    J.ui.guide = Guide;

})(J);/**
 * Aifang Javascript Framework.
 * Copyright 2013 ANJUKE Inc. All rights reserved.
 *
 * @path: ui/guide.js
 * @author: hqyun
 * @version: 1.0.0
 * @date: 2013/01/25
 *
 */

/// require('ui.ui');
/// require('page');

;
(function (J) {
    /**
     * 缺省的选项配置
     * @type {Object}
     */
    var offset = 0,data = [];

    /**
     * Guide Function
     * @param options 扩展选项
     * @constructor
     */
    function Guide(options) {/*console.log('options:',options);*/
        var data = options.data, guidesObj = [], step = 0, handler;

        function init(){
            createPanel();
            guidesObj.push(new create());
        }
        function createTarget(){
            J.each(guidesObj,function(i,obj){
                obj.remove();
            });
            if(!!data[step]){
                J.each(data[step],function(i,obj){
                    obj.close && (obj.close.handler=close);
                    obj.prev && (obj.prev.handler = prev);
                    obj.next && (obj.next.handler = next);
                    obj.restart && (obj.restart.handler = reStart);
                    var obj = new create(obj);
                    obj.insert();
                    guidesObj.push(obj);
                });
            }
        }

        init();
        //每个小对象（即每个图片对象）
        function create(opts){
            var src = opts.src, sty= opts.style.join(";"), close=opts.close, prev= opts.prev, restart= otps.restart, next=opts.next;
            var newTag;
            var obj = J.create('div').attr({
                style:sty
            }).setStyle('background: url("'+src+'") no-repeat 0 0;"," _background-image: none;","filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+src+'");');

            close && createTag(styles,close.handler);
            prev && createTag(styles,prev.handler);
            restart && createTag(styles,restart.handler);
            next && createTag(styles,next.handler);

            function createTag(sty,handler){
                newTag = J.create('span').attr({
                    style:sty
                }).setStyle('display:inline-block; position:absolute;');

                newTag.on('click',handler);
            }

            function remove(){
                J.remove(newTag);
                newTag.un('click');
            }

            function insert(){
                J.append(newTag);
            }

            m = {
                insert:insert,
                remove:remove
            }

            return m;
        }

        //创建遮罩层
        function createPanel(){
            return J.create('div').addClass('guide_mask_panel').insertFirstTo(main);
            J.create('div').addClass('guide_main_panel').insertFirstTo(main);
        }

        function next(){
            step++;
        }

        function prev(){
            step&&step--;
        }

        function close(){
            closeMask();
            J.each(guidesObj,function(i,obj){
                obj.remove();
            });

        }

        function closeMask(){
            J.s('guide_mask_panel').eq(0)&&J.s('guide_mask_panel').eq(0).remove();
            J.s('guide_main_panel').eq(0)&&J.s('guide_main_panel').eq(0).remove();
        }

        function reStart(){
            step = 0;
            createTarget
        }

        m = {
            close:close,
            next:next,
            prev:prev,
            reset:reset
        }

        return m;
    }

    J.ui.guide = Guide;

    /*function aa(){
     function remove(){

     }

     function insert(){

     }

     m = {
     insert:insert,
     remove:remove
     }

     return m;
     }*/

})(J);/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: ui/panel.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/12/05
 *
 */

/// require('ui.ui');
/// require('page');

;
(function (J) {
    /**
     * 缺省的选项配置
     * @type {Object}
     */
    var defaultOpts = {
        autoClose: '',
        scroll:false,
        mask: true,
        modal: true,
        title: '',
        content: '',
        close: true,
        ok: '',
        cancel: '',
        width: 360,
        height: '',
        position: {}, // {top:'',left:'',right:'',bottom:''}
        drag: false,
        fixed: '',
        onClose: null,
        onOk: null,
        onCancel: null,
        custom:null,
        tpl: 'panel_def'
    }, main, boxModal, identityIndex = 0;

    /**
     * Panel Function
     * @param options 扩展选项
     * @constructor
     */
    function Panel(options) {
        var m, boxPanel, boxIfm, boxTitle, boxContent, boxClose, boxFooter, opts , tpl , page = J.page, timer, title, boxTopRadius = '0 0', boxBottomRadius = '0 0', okDisable = false, okBt, cancelBt, pageWidth = page.width(), pageHeight = page.height();

        main || (main = insertFirst('body', {style: 'padding:0;margin:0'}));


        /**
         * Initialize
         */
        (function() {
            opts = J.mix(defaultOpts, options || {}, true);
            opts.modal && (boxModal || (boxModal = createModal()), boxModal.show());
            opts.mask && boxModal.addClass('panel_modal_mask');
            tpl = opts.tpl;
            title = opts.title;
            boxPanel = J.create('div', {style: 'z-index:10001;position:absolute', 'class': tpl, 'id':(tpl + Math.random()).replace(/\./,'')+(++identityIndex)});
            boxIfm = J.create('iframe', {style: 'z-index:-1;position:absolute;', 'scrolling': 'no', 'frameborder': '0'});
            boxPanel.append(boxIfm);
            opts.mask && boxPanel.addClass(tpl + '_mask');
            title && (boxTitle = appendTo(boxPanel, 'title').html(title));
            opts.close && (boxClose = appendTo(boxPanel, 'close', 'a')).attr('href', 'javascript:;').on('click', close, null, true, true);
            boxContent = appendTo(boxPanel, 'box');
            title || (boxContent.setStyle('border-top:0'), boxTopRadius = '5px 5px');
            opts.ok ? createFooter() : (boxContent.setStyle('border-bottom:0'), boxBottomRadius = '5px 5px');
            boxContent.setStyle('border-radius:' + boxTopRadius + ' ' + boxBottomRadius);
            main.append(boxPanel);
            var s = {};
            J.each(['width','height'],function(i, v){
                opts[v] && (s[v] = opts[v] + 'px');
            });
            boxPanel.setStyle(s);

            if(opts.content){
                setContent(opts.content);
            }else{
                fixPosition();
            }
            opts.autoClose && setAutoClose(opts.autoClose);
            opts.custom && opts.custom(boxPanel)

        })();


        /**
         * 设置自动关闭
         * @param second 秒
         */
        function setAutoClose(second){
            timer = setTimeout(close, (parseInt(second) - 1) * 1000);
        }


        function createFooter() {
            boxFooter = appendTo(boxPanel, 'footer');
            var ok = opts.ok, cancel = opts.cancel;
            okBt = appendTo(boxFooter, 'button', 'a').attr('href', 'javascript:;').addClass(tpl + '_ok').html(ok);
            cancel && (cancelBt = appendTo(boxFooter, 'button', 'a')).attr('href', 'javascript:;').html(cancel);
            (opts.onOk && okBt) && okBt.on('click', function () {
                if (okDisable) {
                    return false;
                }
                opts.onOk(m)
            }, null, true, true);
            (opts.onCancel && cancelBt) && cancelBt.on('click', function () {
                opts.onCancel(m)
            }, null, true, true);
        }

        function removeFooter(){
            if(boxFooter){
                J.s('.' + opts.tpl + '_button').each(function(i, v){
                    v.un()
                });
                boxFooter.remove();
            }
        }

        function createModal() {
            return J.create('div').addClass('panel_modal').setStyle({
                backgroundColor: '#333',
                zIndex: 10000,
                width: page.width() + 'px',
                height: page.height() + 'px',
                position: 'absolute',
                left: '0',
                top: '0'
            }).insertFirstTo(main);
        }

        function fixPosition(width, height) {
            var viewHeight = page.viewHeight(), viewWidth = page.viewWidth(),
                scrollTop = !opts.fixed ? page.scrollTop() : 0, scrollLeft = !opts.fixed ? page.scrollLeft() : 0,
                position = opts.position || {},
                panelWidth = width || boxPanel.width(), panelHeight = (height || boxPanel.height() - 2), s = {
                    width: panelWidth + 'px'
                };

            J.each(position, function (i, v) {
                s[i] = v + 'px';
            });

            // 如果panel的高度超过一屏，设置panel内的content为滚动条，达到panel在一屏内显示的目的
            if (panelHeight > viewHeight) {
                if(opts.scroll){
                    boxContent.setStyle('height:' + (viewHeight - 140) + 'px;overflow-y:auto;');
                    panelHeight = boxPanel.height();
                }else{
                    s.top = '0';
                }
            }

            //s.height = panelHeight + 'px';  modify by hqyun 2013.03.28
            s.top || (s.top = ((viewHeight / 2) - (panelHeight / 2) + scrollTop + 'px'));
            s.left || (s.left = ((viewWidth / 2) - (panelWidth / 2) + scrollLeft + 'px'));
            s.right && (s.left = 'auto');
            s.bottom && (s.top = 'auto');
            boxPanel.setStyle(s);

            if (opts.fixed) {
                s = {};
                if (J.ua.ie == 6) {
                    var html = document.getElementsByTagName('html')[0],
                        boxPanelStyle = boxPanel.get().style,
                        dom = '(document.documentElement || document.body)',
                        oldTop = parseInt(boxPanelStyle.top || 0),
                        oldLeft = parseInt(boxPanelStyle.left || 0);
                    // 给IE6 fixed 提供一个"不抖动的环境"
                    // 只需要 html 与 body 标签其一使用背景静止定位即可让IE6下滚动条拖动元素也不会抖动
                    // 注意：IE6如果 body 已经设置了背景图像静止定位后还给 html 标签设置会让 body 设置的背景静止(fixed)失效
                    if (document.body.currentStyle.backgroundAttachment !== 'fixed') {
                        html.style.backgroundImage = 'url(about:blank)';
                        html.style.backgroundAttachment = 'fixed';
                    }
                    boxPanelStyle.setExpression('top', 'eval(' + dom + '.scrollTop + ' + oldTop + ') + "px"');
                    boxPanelStyle.setExpression('left', 'eval(' + dom + '.scrollLeft + ' + oldLeft + ') + "px"');
                } else {
                    s.position = 'fixed';
                }
                boxPanel.setStyle(s);
            }

            boxIfm.setStyle({
                width: boxPanel.width() + 'px',
                height: (boxPanel.height()-1) + 'px'
            });
        }

        function insertFirst(container, attrs) {
            return J.create('div', attrs || {}).insertFirstTo(container);
        }

        function appendTo(container, type, tagName) {
            return J.create(tagName || 'div', {'class': tpl + '_' + type}).appendTo(container);
        }

        // public

        function close() {
            timer && clearTimeout(timer);
            boxClose && boxClose.un('click');
            boxPanel.remove();
            (opts.modal && boxModal) && boxModal.removeClass('panel_modal_mask').hide();
            opts.onClose && opts.onClose();
        }

        function setContent(content, width, height) {
            boxContent.html(content);
            fixPosition(width, height);
        }

        function setTitle(content) {
            boxTitle.html(content)
        }

        function setOptions(newOpts) {
            opts = J.mix(opts, newOpts || {});
        }

        function setOkDisable(boolDisable){
            boolDisable ? okBt.addClass(tpl + '_ok_disable') : okBt.removeClass(tpl + '_ok_disable');
            okDisable = boolDisable;
        }

        m = {
            close: close,
            setTitle: setTitle,
            setContent: setContent,
            setAutoClose: setAutoClose,
            setOptions: setOptions,
            setOkDisable: setOkDisable,
            removeFooter:removeFooter
        }

        return m;

    }

    J.ui.panel = Panel;

})(J);/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * 表单验证组件
 *
 * @path: ui/validate.js
 * @author: sushazhang, Jock
 * @version: 1.2
 * @date: 2013/03/11
 *
 */
/// require('ui.ui');
;
(function (J) {

    /**
     * 缺省的选项配置
     * @type {Object}
     */
    var classNames = {
        checked:'v_checked',
        info:'v_info',
        error:'v_error',
        success:'v_success',
        tooltip:'v_tooltip'
    };
    /**
     * 缺省的选项配置
     * @type {Object}
     */
    var defaultOpts = {
        auto: true, // 自动验证，如失去焦点自动验证
        formId: '',     // Form ID
        glbOk: '',      // 全局正确信息
        glbError: '',   // 全局错误信息
        onSuccess: '',  // 验证成功回调
        onError: '',    // 验证错误回调（非单个验证错误，如文本框失去焦点触发的验证错误不会回调）
        custom: '',     // 自定义验证
        event: '',      // 自定义事件
        autoSubmit: false,  // 自动提交，默认关闭
        forceShow: true, // 提示信息为空强制显示
        infoTagName: 'span', // 缺省如果提示信息元素不存在，那么创建的标签名称定义
        tpl: 'validate_def', // 皮肤模板
        classNames:classNames// 自定义 class 样式
    };

    //所有的正则表达式
    var RegExpMaps = {
        require: "^(.|\n)+?$", //非空
        intege: "^-?[0-9]+$", //整数
        intege1: "^([1-9]|[1-9][0-9]+)$", //正整数 不包括0
        intege2: "^(0|[1-9]+)$", //正整数 包含0
        decmal: "^-?(0|[1-9][0-9]*)(.[0-9]+)?$", //浮点数（包含0）
        decmal1: "^(0|[1-9][0-9]*)(.[0-9]+)?$", //正浮点数 （包含0）
        decmal2: "^(0|[1-9][0-9]*)(.[0-9]{1,2})?$", //正浮点数 （包含0 保留两位小数）
        email: "^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$", //邮件
        url: "^((http|https|ftp):\/\/)?[a-zA-Z0-9\-\\.]+\\.[A-Za-z]{2,3}(/.*)?$", //url
        chinese: "^[\u4E00-\u9FA5\uF900-\uFA2D]+$", //仅中文
        zipcode: "^[0-9]{6}$", //邮编
        qq: "^[1-9][0-9]{4,9}$", //QQ号码
        tel: "^[0-9]{3,4}-[0-9]{7,9}(-[0-9]{1,4})?$", //电话号码的函数,区号必填
        tel1: "^([0-9]{3,4}-)?[0-9]{7,9}(-[0-9]{1,4})?$", //电话号码的函数,区号非必填
        mobile: "^1(3|5|8|4)[0-9]{9}$", //手机
        username: "^\w+$", //用来用户注册。匹配由数字、26个英文字母或者下划线组成的字符串
        letter: "^[A-Za-z]+$"                    //字母
    };


    /**
     * Validate Function
     * @param options 扩展选项
     * @constructor
     */
    function Validate(options) {

        var GROUPS = {}, CACHE = [], opts, formElm, CUSTOM = {}, submiting = false, onErrorCallbacked = false;

        /**
         * Initialize
         */
        (function () {
            opts = J.mix(defaultOpts, options||{}, true);
            if(options && options.classNames){
                opts.classNames = J.mix(classNames, options.classNames, true);
            }
            formElm = J.g(opts.formId);
            formElm.addClass(opts.tpl);
            formElm.s("*").each(function (i, element) {
                addValidateItem(element);
            });
            formElm.on('submit', function (e) {
                e.stop();
                // 如果是第一次提交，立即开始验证
                if(!submiting){
                    validate();
                }
            });
        })();


        /**
         * =========================================
         * 单个元素验证，一个元素一个对象,
         * 一个元素可能有多个验证类型
         * 初始化时将所有要做的事情都准备好，便于后续操作
         * =========================================
         *
         * @param elm HTMLElement
         * @param validateString  验证规则自定义字符串，格式如：require$必填错误$$tel$请填写正确的手机号码
         * @param taskerTrigger 每次任务完成触发任务调度
         * @return {Object}
         * @constructor
         */
        function ValidateObject(elm, validateString, taskerTrigger) {

            var status = -1, placeholder = elm.attr('placeholder'),
                validateMessage = {ok: '', error: ''},
                validateCenter,                             // 验证中心;
                validateData = validateString.split('$$'),  // 验证规则数据;
                validateItems = [],                         // 当前验证对象的所有验证类型
                infoTarget, groupId, information, customId, events = [], eventFuns = {};

            /**
             * Initialize
             */
            (function () {
                var tempMessage, vType, target, validateItem, require = false, infoMessage = '', autoValidate = '';

                // 单个元素上所有的验证条件组合成验证集合
                J.each(validateData, function (i, vString) {
                    tempMessage = vString.split('$');
                    vType = tempMessage[0] || '';
                    if (vType !== 'ok' && vType !== 'error' && vType !== 'target' && vType !== 'info' && vType !== 'event' && vType != 'auto') {
                        validateItems.push(validateItem = filterGroup(vString, elm));
                        if (vType === 'group') groupId = validateItem.groupId;
                        if (vType === 'custom' && (customId = elm.get().id)) CUSTOM[customId] = -1;
                    } else if (vType === 'target') {
                        target = J.g(tempMessage[1]); // 目标提示元素
                    } else if (vType === 'require') {
                        require = true;
                    } else if (vType === 'info') {
                        infoMessage = tempMessage[1] || '';
                    } else if (vType === 'event') {
                        var eventString = tempMessage[1], eventArr = eventString.split('|');
                        if(eventArr.length > 1){
                            if(eventArr[0] !== 'error' && eventArr[0] !== 'success' && eventArr[0] !== 'info'){
                                events.push({
                                    eventType:eventArr[0],
                                    eventId:eventArr[1]
                                });
                            }else{
                                eventFuns[eventArr[0]] = opts.event[eventArr[1]];
                            }
                        }
                    } else if (vType == 'auto'){
                        if(tempMessage[1]){
                            autoValidate = (tempMessage[1] == 'true') ? true : false;
                        }
                    } else {
                        validateMessage[tempMessage[0]] = tempMessage[1] || ''; // 提取当前公共的正确和错误信息
                    }
                });

                if (!groupId) {
                    infoTarget = target || createInfoElement(opts.infoTagName, elm, infoMessage);
                } else {
                    infoTarget = J.g(groupId) || createInfoElement(opts.infoTagName, elm, infoMessage, groupId);
                    GROUPS[groupId].ok = validateMessage.ok;
                    GROUPS[groupId].error = validateMessage.error;
                    GROUPS[groupId].require = require;
                    // 将事件映射到分组数据缓存
                    eventFuns && (GROUPS[groupId].eventFuns = eventFuns);
                }
                information = infoTarget && infoTarget.html();
                validateCenter = new ValidateCenter(elm, validateItems, validateFinish);
                elementBindEvent(autoValidate);

            })();


            /**
             * 创建元素
             * @param tagName 标签名称
             * @param elm
             * @param infoMessage 默认填充消息
             * @param id elmId
             * @returns {*}
             */
            function createInfoElement(tagName, elm, infoMessage, id) {
                return J.create(tagName, {'class': opts.classNames.tooltip, id:id||''}).html(infoMessage).appendTo(elm.up());
            }

            /**
             * 单个表单验证完成
             * @param status 单个表单验证返回的状态
             * @param message 提示信息
             */
            function validateFinish(status, message) {
                // 第一事件更新状态
                setStatus(status);
                // 如果有任何不同过，复位submiting状态
                if(status === -1) submiting = false;

                // 显示提示信息
                toggleInformation(status, filterMessage(status, message), (status == 0));

                // 回调触发任务，告知状态的变化
                taskerTrigger();

                var customEventNameArray = ['error', 'info', 'success'], index = status + 1;
                // 如果是分组，则取GROUPS上映射的事件
                if(groupId){
                    eventFuns = GROUPS[groupId].eventFuns;
                }
                // 回调单个自定义正确或错误事件
                eventFuns[customEventNameArray[index]] && eventFuns[customEventNameArray[index]](elm);
            }

            /**
             * 消息过滤
             * @param statusCode -1 | 0 | 1
             * @param message
             * @return {*}
             */
            function filterMessage(statusCode, message) {
                if (statusCode === 0) {
                    return message;
                }
                // 首先拿传入的message信息，如果空则拿单个验证错误信息，如果没有则拿单个元素全局的提示信息，如果没有则拿Group分组的提示信息，都没有则拿验证对象的全局提示信息
                return message || ((statusCode === -1) ? (validateMessage.error || (groupId && GROUPS[groupId].error) || opts.glbError) : (statusCode === 1) ? (validateMessage.ok || (groupId && GROUPS[groupId].ok) || opts.glbOk) : '');
            }

            /**
             * 显示或隐藏提示信息
             * @param status 状态码
             * @param message 消息内容
             * @param hide 是否隐藏
             */
            function toggleInformation(status, message, hide) {
                var classNames = opts.classNames, infoClassArray = [classNames.error, classNames.info, classNames.success];
                if (infoTarget) {
                    clearInfoClass(infoTarget);
                    if (!hide && ((status === 0 && !!message) || (status !== 0 && (!!message || opts.forceShow)))) {
                        infoTarget.show();
                        infoTarget.addClass(infoClassArray[status + 1]);
                        infoTarget.html(message);
                    } else {
                        infoTarget.hide();
                    }
                }

                function clearInfoClass(elm) {
                    J.each(infoClassArray, function (i, v) {
                        elm.removeClass(v);
                    });
                }
            }

            /**
             * 筛选和缓存分组对象
             * @param vString 验证种类字符串 格式如：require$请填写总楼层数
             * @param elm
             * @return {Object}
             */
            function filterGroup(vString, elm) {
                var vItem = buildValidateItem(vString), groupId = vItem.groupId;
                vItem.elm = elm;
                vItem.placeholder = placeholder;
                if (vItem.type === 'group' && groupId) {
                    GROUPS[groupId] || (GROUPS[groupId] = {items: [], source: null, status: -1});
                    vItem.condition && (GROUPS[groupId].condition = vItem.condition);
                    vItem.message && (GROUPS[groupId].message = vItem.message);
                    vItem.groupType && (GROUPS[groupId].groupType = vItem.groupType);
                    GROUPS[groupId].items.push(vItem);
                }
                return vItem;
            }

            /**
             * 子数据处理,组织验证对象
             * @param vString 验证种类字符串 格式如：require$请填写总楼层数
             * @return {Object}
             */
            function buildValidateItem(vString) {
                //初始化组织数据类型  不通类型的数据转换对象
                var vArray = vString.split("$"),
                    vType = vArray[0] ? vArray[0] : '',     // 验证类型
                    vMessage = vArray[1] ? vArray[1] : '', // 验证提示消息, 验证规则串，不同类型，字符串组合也不一样，格式如：group1|count|至少选2项|>=2 或者如：请输入5-1000以内的数字|5-1000
                    vConditions = vMessage.split("|"),
                    vCondition = '',
                    vHalfChars = true;

                var retValue = {
                    type: vType,
                    message: vMessage
                };

                if (vType == 'group') {                     // 分组验证字符串 格式如：group1|checked|至少选2项|>=2
                    var groupId = vConditions[0],           // 分组ID -- group1
                        groupType = vConditions[1] || '',   // 分组类型 -- checked
                        groupMessage = vConditions[2] || '',// 分组验证提示 -- 至少选2项
                        groupCondition = vConditions[3] || '';// 分组验证规则串 -- >=2
                    return J.mix(retValue, {
                        groupType: groupType,
                        groupId: groupId,
                        message: groupMessage,
                        condition: groupCondition
                    }, true);
                } else { // 范围验证字符串 格式如：请输入5-1000以内的数字|5-1000
                    if (vConditions.length > 0) {
                        vMessage = vConditions[0];
                        vCondition = vConditions[1];
                        if(vConditions[2]){
                            vHalfChars = (vConditions[2] == 'true') ? true : false;
                        }
                    }
                    return J.mix(retValue, {
                        message: vMessage,
                        condition: vCondition,
                        halfChars: vHalfChars
                    }, true);
                }
            }

            /**
             * 绑定事件
             * @param autoValidate 是否自动验证
             */
            function elementBindEvent(autoValidate) {
                var elmType = elm.attr('type'), tagName = elm.get().tagName, callback;

                function customEventBind(elm, type, callback){
                    elm.on(type, function(){
                        callback(elm);
                    });
                }

                function doTrigger() {
                    // 清除checked属性
                    if (groupId && 'text' !== elmType && 'TEXTAREA' !== tagName && elmType !== 'checkbox' && elmType !== 'radio'){
                        var checkedClassName = opts.classNames.checked;
                        GROUPS[groupId] && J.each(GROUPS[groupId].items, function(i, v){
                            v.elm.attr('checked',null);
                            v.elm.removeClass(checkedClassName);
                        });
                        elm.attr('checked', true);
                        elm.addClass(checkedClassName);
                    }
                    // 如果是分组，或者状态等于 -1 的才触发验证
                    if (groupId || getStatus() === -1) {
                        submiting = false; // 任何非提交按钮触发的验证，都需要复位状态，意味着验证不够通过与否都不会触发提交动作
                        trigger();
                    }
                }

                function doBind(key) {
                    elm.on(key, function(){
                        // 当个元素上设置是否自动验证要优先全局设置
                        // 如果自动验证，将事件加入队列，否则，设置最简单的隐藏
                        ( (autoValidate !== '') ? autoValidate : opts.auto ) ? setTimeout(doTrigger, 0) : toggleInformation(0, '', true);
                    });
                }

                if ('text' === elmType || 'TEXTAREA' === tagName) {
                    elm.on('focus', function () {
                        // 如果获得焦点已经在验证的过程中，不对状态进行复位，失去焦点就不会做重复的验证
                        if(getStatus() !== -2) setStatus(-1);
                        toggleInformation(0, filterMessage(getStatus(), information), false);
                    });
                    doBind('blur');
                } else if(elmType != 'hidden'){
                    doBind('click');
                }

                events && J.each(events, function(index, ev){
                    if(opts.event && (callback = opts.event[ev.eventId])){
                        if(groupId && GROUPS[groupId]){
                            J.each(GROUPS[groupId].items, function(i, v){
                                customEventBind(v.elm, ev.eventType, callback);
                            });
                        }else{
                            customEventBind(elm, ev.eventType, callback);
                        }
                    }
                });
            }

            /**
             * 验证触发器
             */
            function trigger() {
                // -2 是验证中，如果不是在验证中，开始执行验证
                if(getStatus() !== -2){
                    setStatus(-2); // 标记为验证中
                    validateCenter.doValidate();
                }

            }

            /**
             * 获取状态
             * @returns {number}
             */
            function getStatus() {
                return status;
            }

            /**
             * 设置状态
             * @param st 状态码
             */
            function setStatus(st) {
                if(customId) CUSTOM[customId] = st;
                status = st;
            }

            return {
                elm: elm,
                trigger: trigger,
                groupId:groupId,
                validateItems: validateItems,
                infoTarget: infoTarget,
                setStatus: setStatus,
                getStatus: getStatus,
                placeholder: placeholder
            }

        }


        /**
         * =========================================
         * 验证中心，处理各种验证
         * =========================================
         *
         * @param elm 验证元素
         * @param validateItems 单个元素对应的验证集合
         * @param finishCallback 验证结束回调，传入 (statusCode, message)
         *        statusCode : -1 | 0 | 1
         *        -1 : 验证失败
         *        0  ：无操作，通常显示初始化提示信息
         *        1  ：验证通过
         * @return {Object}
         * @constructor
         */
        function ValidateCenter(elm, validateItems, finishCallback) {

            /**
             * 验证核心入口，单个输入框包含的所有验证类型
             */
            function doValidate() {
                var status = 0, groupId = null, elmVal = elm.val(), inCustom = false;

                J.each(validateItems, function (i, vItem) {


                    // 如果是disabled，或者不是必填但内容为空的可跳过验证
                    if ((elmVal == '' && vItem.type != 'require')) {
                        return true;
                    }

                    switch (vItem.type) {
                        case 'group':
                            var GRP = GROUPS[groupId = vItem.groupId];
                            GROUPS[groupId].source = elm.get();
                            // 修复分组类型，解决了页面中不许要每一个都必须写明分组类型
                            vItem.groupType || (vItem.groupType = GRP.groupType);
                            GROUPS[groupId].status = status = groupAction(vItem);
                            if (status === -1) {
                                finishCallback(status, GRP.message);
                                return false;
                            }
                            break;
                        case 'range':
                            status = rangeAction(vItem);
                            if (status === -1) {
                                finishCallback(status, vItem.message);
                                return false;
                            }
                            break;
                        case 'length':
                            status = lenAction(vItem);
                            if (status === -1) {
                                finishCallback(status, vItem.message);
                                return false;
                            }
                            break;
                        case 'custom':
                            inCustom = true;
                            customAction(vItem, function(res){
                                finishCallback(res.status, res.message || (res.status == -1 ? vItem.message : ''));
                            });
                            break;
                        default:
                            status = regAction(vItem);
                            if (status === -1) {
                                finishCallback(status, vItem.message);
                                return false;
                            }
                            break;
                    }
                });
                if (status !== -1 && !inCustom) {
                    finishCallback(status, '');
                }

            }

            /**
             * 用户自定义验证
             * @param vItem
             * @param success
             */
            function customAction(vItem, success) {
                var customFn, customId = vItem.elm.get().id;
                if(opts.custom && (customFn = opts.custom[customId])){
                    /**
                     * 执行用户定义的函数，传入参数，和回调函数
                     */
                    customFn(vItem.elm, function(res){
                        success(res);
                    });
                }
            }


            /**
             * 验证规则解析
             * @param type
             * @param o
             * @param condition
             * @return {*}
             */
            function conditionTranscoding(type, o, condition) {
                if (condition) {
                    var match;
                    if (type === 'checked' || type === 'range' || type === 'length') {
                        /**
                         * 1-3 [  "1-3"  ,   undefined  ,   undefined  ,   "1"  ,   "3"  ]
                         * >=1 [  ">=1"  ,   ">="  ,   undefined  ,   undefined  ,   "1"  ]
                         * <=3 [  "<=3"  ,   undefined  ,   "<="  ,   undefined  ,   "3"  ]
                         * 3   [  "3"  ,   undefined  ,   undefined  ,   undefined  ,   "3"  ]
                         */
                        if (match = condition.match(/^(?:(>=)|(<=)|(?:(\d+)-))*(\d+)$/)) {
                            if (match[3] && match[3] == o && o == 0){
                                return 0;
                            }else if (match[3] && match[4]) { // 1-3
                                return (o >= match[3] && o <= match[4]) ? 1 : -1;
                            } else if (match[1] && match[4]) { // >=1
                                return (o >= match[4]) ? 1 : -1;
                            } else if (match[2] && match[4]) { // <=3
                                return (o <= match[4]) ? 1 : -1;
                            } else if (match[4]) { // 3
                                return (o == match[4]) ? 1 : -1;
                            }
                            return -1;
                        }
                    } else if (type === 'equal_string' || type === 'equal_intege' || type === 'equal_date'  || type === 'equal_time') {
                        /**
                         * a=b [  "a>=b"  ,   "a"  ,   "="  ,   "b"  ]
                         * a>b
                         * a>=b
                         * a<b
                         * a<=b
                         */
                        if (match = condition.match(/^(\w+)(=|>|>=|<|<=)(\w+)$/)) {
                            var status = -1, a = match[1], f = match[2], b = match[3], A = o[a], B = o[b];
                            if (A == '' && B == '')
                                return 0;
                            else if (A == '' || B == '') {
                                return -1;
                            }

                            function getEqualValue(F, A, B) {
                                switch (F) {
                                    case '>':
                                        return (A > B) ? 1 : -1;
                                        break;
                                    case '>=':
                                        return (A >= B) ? 1 : -1;
                                        break;
                                    case '<':
                                        return (A < B) ? 1 : -1;
                                        break;
                                    case '<=':
                                        return (A <= B) ? 1 : -1;
                                        break;
                                    default:
                                        return 0;
                                }
                                return 0;
                            }

                            function equalDateTime(f, A, B){
                                A = Date.parse(A.replace(/-/g, '/'));
                                B = Date.parse(B.replace(/-/g, '/'));
                                if(!A || !B)
                                    return -1;
                                return getEqualValue(f, A, B);
                            }

                            if (type === 'equal_string' && f == '=') { // 字符串比较
                                return (A === B) ? 1 : -1;
                            } else if (type === 'equal_intege') {
                                if (!/^\d+(?:\.\d+)*$/.test(A) || !/^\d+(?:\.\d+)*$/.test(B)) {
                                    return -1
                                } else {
                                    return getEqualValue( f, parseInt(A), parseInt(B) );
                                }
                            } else if (type === 'equal_date') {
                                return equalDateTime(f, A, B);
                            } else if (type === 'equal_time') {
                                var Y = '2012-01-01 ';
                                A = Y + A;
                                B = Y + B;
                                return equalDateTime(f, A, B);
                            }


                            return status;
                        }
                    } else {
                        return -1;
                    }

                } else {
                    return -1
                }
            }

            /**
             * 分组元素验证
             * @param vItem 单个分组验证
             * @return {Boolean}
             */
            function groupAction(vItem) {
                var groupStatus = true, GRP = GROUPS[vItem.groupId];
                function equalDo(equalKey) {
                    var elemArr = {};
                    J.each(GRP.items, function (i, k) {
                        elemArr[k.elm.get().id] = k.elm.val();
                    });
                    return conditionTranscoding(equalKey, elemArr, GRP.condition);
                }

                function checkedDo() {
                    var count = 0, elm, el, elmType;
                    J.each(GRP.items, function (i, k) {
                        elm = k.elm, el = elm.get(), elmType = elm.attr('type');
                        (el.checked || ( (elmType !== 'checkbox' && elmType !== 'radio') && elm.attr('checked') ) ) && count++;
                    });
                    return conditionTranscoding('checked', count, GRP.condition);
                }

                function allDo() {
                    var status = 1;
                    J.each(GRP.items, function (i, k) {
                        if (regAction(k, k.groupType) === -1) return (status = -1);
                    });
                    return status;
                }


                switch (vItem.groupType) {
                    case 'equal_string':
                    case 'equal_intege':
                    case 'equal_date':
                    case 'equal_time':
                        groupStatus = equalDo(vItem.groupType);
                        break;
                    case 'checked':
                        groupStatus = checkedDo();
                        break;
                    default:
                        groupStatus = allDo();
                }
                return groupStatus;
            }

            /**
             * 正则验证动作
             * @param vItem
             * @param validateType 强制验证类型
             * @return {Number}
             */
            function regAction(vItem, validateType) {
                var reg = RegExpMaps[validateType || vItem.type], obj = new RegExp(reg), val = vItem.elm.val();
                // 去左右空格验证
                val && (val = val.replace(/(^[\s\t\xa0\u3000]+)|([\u3000\xa0\s\t]+$)/g,''));
                return (obj.test(val)) ? 1 : -1;
            }

            /**
             * 数值范围验证
             * @param vItem
             * @return {Number}
             */
            function rangeAction(vItem) {
                var o = vItem.elm.val();
                if (!/^\d+(\.\d+)?$/.test(o) || o == '') {
                    return -1;
                }
                return conditionTranscoding('range', parseInt(o), vItem.condition);
            }

            /**
             * 字符长度范围验证
             * @param vItem
             * @return {Number}
             */
            function lenAction(vItem) {
                var val = vItem.elm.val();
                // 去左右空格验证
                val && (val = val.replace(/(^[\s\t\xa0\u3000]+)|([\u3000\xa0\s\t]+$)/g,''));
                return conditionTranscoding('range', vItem.halfChars ? getHalfChars(val) : val.length, vItem.condition);
            }

            /**
             * 英文字符取半，中文字符取个
             * abcd中国，算3个长度
             * @param str 字符串
             * @returns {number}
             */
            function getHalfChars(str) {
                var cArr = str.match(/[^\x00-\xff]/g), len = (cArr && cArr.length) || 0;
                return Math.round((str.length - len) / 2) + len;
            }


            return {
                doValidate: doValidate
            }
        }


        /**
         * 动态添加验证元素
         * @param element 验证元素，是J.dom实例
         */
        function addValidateItem(element) {
            element = J.g(element);
            var validateString;
            if (validateString = element.attr('data-validate')) {
                CACHE.push(new ValidateObject(element, validateString, taskerTrigger));
            }
        }

        /**
         * 动态移除验证元素
         * @param element
         */
        function rmValidateItem(element) {
            element = J.g(element).get();
            var l = CACHE.length;
            while (l--) {
                if (element === CACHE[l].elm.get()) {
                    CACHE[l].elm.un();
                    CACHE.splice(l, 1);
                }
            }
        }

        /**
         * 获取所有验证是否都通过
         * @return {Boolean}
         */
        function getAllIsSuccess() {
            var finished = true;
            J.each(CACHE, function (i, vObj) {
                if (vObj.groupId) {
                    var GRP = GROUPS[vObj.groupId];

                    if (GRP.require && GRP.status === -1) {// 如果是必填项，且验证未通过的
                        return (finished = false);
                    } else if (vObj.elm.val() !== '' && GRP.status === -1) {// 如果不是必填项，内容为空，且验证未通过
                        return (finished = false);
                    } else {
                        return (finished = true);
                    }
                } else if(vObj.elm.get().disabled){
                    return (finished = true);
                } else if (vObj.getStatus() === -1 || vObj.getStatus() === -2) { // 验证未通过或者在验证过程中的
                    return (finished = false);
                }
            });
            return finished;
        }

        /**
         * 对外公开的验证入口
         */
        function validate(targetElm) {
            submiting = true;
            onErrorCallbacked = false;
            var isTriggering = false;
            targetElm = (targetElm && targetElm.get) ? targetElm.get() : targetElm;

            J.each(CACHE, function (i, vObj) {
                if(targetElm){
                    if(vObj.elm.get() === targetElm){
                        triggering(vObj);
                        return false;
                    }
                    return true;
                }
                triggering(vObj);
            });

            function triggering(vObj){
                if (vObj.groupId) { // group处理方式
                    var GRP = GROUPS[vObj.groupId];
                    // 分组验证未通过，且验证触发源为空，或者触发源等于最后一次操作的元素，才开始触发验证动作
                    if (GRP.status === -1 && (!GRP.source || GRP.source === vObj.elm.get())) {
                        vObj.trigger();
                        isTriggering = true;
                    }
                } else if (vObj.getStatus() === -1 && !vObj.elm.get().disabled ) { // 非group处理方式
                    vObj.trigger();
                    isTriggering = true;
                }
            }

            // 如果没有任何 Tringger 发生，把所有权交给任务触发器
            if(!isTriggering && !targetElm){
                taskerTrigger();
            }
        }

        /**
         * 任务回调触发器
         */
        function taskerTrigger(){
            var taskerReady = true;
            // 检查所有任务状态
            J.each(CUSTOM, function(i, v){
                if(v === -1 || v === -2){
                    return (taskerReady = false);
                }
            });

            //console. log('taskerTrigger', submiting, taskerReady)
            // 如果是点击提交按钮触发的验证，并且tasker都是完成的，并且所有验证都是通过的，完成验证
            if (submiting && taskerReady && getAllIsSuccess()) {
                // 完成验证
                validateComplate();
            }else if(!onErrorCallbacked){
                onErrorCallbacked = true;
                opts.onError && opts.onError(formElm);
            }
        }

        /**
         * 完成验证，自动提交或执行回调
         */
        function validateComplate() {
            submiting = false;
            if (opts.autoSubmit) {
                formElm.get().submit();
            } else {
                opts.onSuccess && opts.onSuccess(formElm);
            }
        }

        /**
         * 重置验证对象
         * @param elements
         */
        function resetItems(elements){
            var vobj, target;

            if(J.isString(elements)){
                reset(elements);
            }else{
                J.each(elements, function(i, v){
                    reset(v);
                });
            }
            function reset(element){
                if(vobj = findValidateByElm(element)){
                    vobj.setStatus(-1);
                    (target = vobj.infoTarget) && target.hide()
                }
            }
        }

        function findValidateByElm(element){
            element = J.g(element).get();
            var l = CACHE.length;
            while (l--) {
                if (element === CACHE[l].elm.get()) {
                    return CACHE[l];
                }
            }
            return null;
        }

        return {
            resetItems: resetItems,
            addItem: addValidateItem,
            rmItem: rmValidateItem,
            validate: validate
        };

    }

    J.dom.fn.validate = function(options){
        var o = options || {};
        o.formId = this;
        return new Validate(o);
    };

    J.ui.validate = Validate;

})(J);