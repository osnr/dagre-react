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
   (typeof require === 'function' ?
       [require('react'), require('dagre')] :
       [React, dagre]
   ),
function(window, React, dagre) {
    'use strict';

    var Graph = React.createClass({
        /*
           node = {
               key: string
               label: string
           }
           this.props.nodes = [node]

           edge = [key1, key2]
           this.props.edges = [edge]
        */
        render: function() {
            // construct a new graph from scratch
            // because dagre mutates g for the layout
            var g = new dagre.graphlib.Graph();

            g.setGraph({});

            React.Children.forEach(this.props.children, function(child) {
                if (child.type === Vertex) {
                    console.log(child);

                    g.setNode(child.key, { label: child, width: child.props.width, height: child.props.height });

                } else if (child.type === Edge) {
                    g.setEdge(child.props.source, child.props.target, { label: child });
                }
            });

            dagre.layout(g);

            // now render
            var arrow;
            if (arrow in this.props) {
                arrow = this.props.arrow;

            } else {
                arrow = "<marker id=\"markerArrow\" markerWidth=\"6\" markerHeight=\"4\" \
                             refx=\"5\" refy=\"2\" orient=\"auto\"> \
                             <path d=\"M 0,0 V 4 L6,2 Z\" class=\"arrow\" /> \
                         </marker>";
            }

            // node svg elements
            var nodes = g.nodes().map(function(v) {
                var node = g.node(v);
                return React.cloneElement(node.label, {
                    x: node.x,
                    y: node.y
                });

            });
            var edges = g.edges().map(function(e) {
                var edge = g.edge(e);
                return React.cloneElement(edge.label, {
                    
                });
            });

            return (
                <svg {...this.props}>
                    <defs dangerouslySetInnerHTML={{__html: arrow}} />
                    {nodes}
                    {edges}
                </svg>
            );
        }
    });
    
    var Vertex = React.createClass({
        render: function() {
            return (
                <g transform={"translate("+
                   (this.props.x-(this.props.width/2))+","+
                   (this.props.y-(this.props.height/2))+")"}
                   {...this.props}>

                    {this.props.children}
                </g>
            );
        }
    });

    var Edge = React.createClass({
        render: function() {
            return <path />;
        }
    });

    var exports = {
        Graph: Graph,
        Vertex: Vertex,
        Edge: Edge
    };

    if (typeof module === 'undefined') {
        window.DagreGraph = exports;
    } else {
        module.exports = exports;
    }

    return exports;
});
