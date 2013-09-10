/**
 *
 * @module core
 * @submodule dom
 * @author songyee
 * @since 0.1.0
 */
;(function(J) {
    /**
     * @namespace J.EX.dom
     */
    J.EX.namespace('J.EX.dom');

    /**
     * check if the root element contains the el
     *
     * @method contains
     * @param {Node} root
     * @param {Node} el
     * @returns {Boolean}
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
     * convert html string to js dom objects
     *
     * @method parseDOM
     * @param {String} str
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
