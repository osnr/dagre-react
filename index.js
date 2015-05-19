(function(root, modules, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD.
        var carry = function(React, dagre) {
            return factory(root, React, dagre);
        };
        define(['react', 'dagre'], carry);
    } else {
        // Browser globals
        root.DagreReact = factory(root, modules[0], modules[1]);
    }
})(this,
   (typeof require === 'function' ?
       [require('react'), require('dagre')] :
       [React, dagre]
   ),
function(window, React, dagre) {
    'use strict';

    var Graph = React.createClass({displayName: 'Graph',
        render: function() {
            // construct a new graph from scratch
            // because dagre mutates g for the layout
            var g = new dagre.graphlib.Graph();

            g.setGraph({});

            React.Children.forEach(this.props.children, function(child) {
                if (child.type === Vertex) {
                    g.setNode(child.key, { label: child, width: child.props.width, height: child.props.height });

                } else if (child.type === Edge) {
                    g.setEdge(child.props.source, child.props.target, { label: child });
                }
            });

            dagre.layout(g);

            // now render
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
                    points: edge.points
                });
            });

            return (
                React.createElement("g", React.__spread({},  this.props), 
                    nodes, 
                    edges
                )
            );
        }
    });
    
    var Vertex = React.createClass({displayName: 'Vertex',
        render: function() {
            return (
                React.createElement("g", React.__spread({transform: "translate("+
                   (this.props.x-(this.props.width/2))+","+
                   (this.props.y-(this.props.height/2))+")"}, 
                   this.props), 

                    this.props.children
                )
            );
        }
    });

    var Edge = React.createClass({displayName: 'Edge',
        render: function() {
            var points = this.props.points;

            var path = "M" + points[0].x + " " + points[0].y + " ";
            for (var i = 1; i < points.length; i++) {
                path += "L" + points[i].x + " " + points[i].y + " ";
            }

            return React.createElement("path", React.__spread({},  this.props, {d: path}));
        }
    });

    var exports = {
        Graph: Graph,
        Vertex: Vertex,
        Edge: Edge
    };

    if (typeof module === 'undefined') {
        window.DagreReact = exports;
    } else {
        module.exports = exports;
    }

    return exports;
});
