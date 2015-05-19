var Graph = DagreReact.Graph;
var Vertex = DagreReact.Vertex;
var Edge = DagreReact.Edge;

var Example = React.createClass({
    render: function() {
        var toVertex = function(name) {
            return (
                <Vertex width={50} height={50}
                        key={name}>
                    <rect width={50} height={50} />
                    <text>
                        {name}
                    </text>
                </Vertex>
            );
        };
        
        var arrow = "<marker id=\"markerArrow\" markerWidth=\"6\" markerHeight=\"4\" \
                             refx=\"5\" refy=\"2\" orient=\"auto\"> \
                         <path d=\"M 0,0 V 4 L6,2 Z\" class=\"arrow\" /> \
                     </marker>";

        return (
            <svg width="500" height="500">
                <defs dangerouslySetInnerHTML={{__html: arrow}} />

                <Graph className="graph">
                    {["bar", "baz"].map(toVertex)}
                    <Vertex width={70} height={30}
                            key={"foo"}
                            className="foo">
                        <rect width={70} height={30} />
                        <text>
                            {"foo"}
                        </text>
                    </Vertex>

                    <Edge markerEnd="url(#markerArrow)" source="foo" target="baz" />
                    <Edge source="bar" target="baz" />
                </Graph>
            </svg>
        );
    }
});

React.render(
    <Example />,
    document.getElementById('dagre-graph-example')
);
