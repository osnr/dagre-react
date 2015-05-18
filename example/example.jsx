var Graph = DagreGraph.Graph;
var Vertex = DagreGraph.Vertex;
var Edge = DagreGraph.Edge;

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

        return (
            <Graph className="graph" width="500" height="500">
                {["bar", "baz"].map(toVertex)}
                <Vertex width={70} height={30}
                        key={"foo"}
                        className="foo">
                    <rect width={70} height={30} />
                    <text>
                        {"foo"}
                    </text>
                </Vertex>

                <Edge source="foo" target="baz" />
                <Edge source="bar" target="baz" />
            </Graph>
        );
    }
});

React.render(
    <Example />,
    document.getElementById('dagre-graph-example')
);
