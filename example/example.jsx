var Example = React.createClass({
    render: function() {
        return <DagreGraph />;
    }
});

React.render(
    <Example />,
    document.getElementById('dagre-graph-example')
);
