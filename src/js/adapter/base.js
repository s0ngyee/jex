/**
 * JEX adapter
 *
 * @module adapter
 * @submodule base
 * @namespace J.EX.adapter
 * @author songyee
 * @since 0.1.0
 */
;(function(J) {

    /**
     * ui base package
     * @namespace J.EX.ui
     */
    J.EX.namespace('J.EX.adapter');

    /**
     * AdapterBase
     *
     * @class AdapterBase
     * @constructor
     *
     */
    function AdapterBase() {

    }

    J.mix(J.EX.adapter, {
        base: AdapterBase
    });

})(J);