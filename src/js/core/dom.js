/**
 *
 * @path: core/dom.js
 * @author: songyee
 * @date: 2013/08/14
 * @version: 0.1.0
 */
;(function(J) {
    J.EX.namespace('J.EX.dom');
    /**
     * @desc check if the root element contains the el
     * @param root
     * @param el
     * @returns {*}
     */
    function contains (root, el) {
        if (root.compareDocumentPosition)
            return root === el || !!(root.compareDocumentPosition(el) & 16);
        if (root.contains && el.nodeType === 1){
            return root.contains(el) && root !== el;
        }
        while ((el = el.parentNode))
            if (el === root) return true;
        return false;
    }

    /**
     * @desc convert html string to js dom objects
     * @param str
     * @returns {NodeList}
     */
    function parseDOM(str) {
        var el = document.createElement("div");
        el.innerHTML = str;
        return el.childNodes;
    }

    J.mix(J.EX.dom, {
        contains: contains,
        parseDOM: parseDOM
    });

})(J);
