(function(root, modules, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD.
        var carry = function(React, dagre) {
            return factory(root, React, dagre);
        };
        define(['react', 'dagre'], carry);
    } else {
        // Browser globals
        root.DagreGraph = factory(root, modules[0], modules[1]);
    }
})(this,
   typeof require === 'function' ?
       [require('react'), require('dagre')] :
       [React, dagre],
function(window, React, dagre) {
    'use strict';

    var DagreGraph = React.createClass({
        render: function() {
            return <div>foo</div>;
        }
    });

    if (typeof module === 'undefined') {
        window.DagreGraph = DagreGraph;
    } else {
        module.exports = DagreGraph
    }

    return Foo;
})();
