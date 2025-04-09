import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

function GraphVisualization({
    notes,
    connections,
    onNoteSelect,
    selectedNote,
}) {
    const svgRef = useRef();

    useEffect(() => {
        if (!notes.length) return;

        // Clear previous visualization
        d3.select(svgRef.current).selectAll("*").remove();

        const width = svgRef.current.clientWidth;
        const height = svgRef.current.clientHeight;

        // Create svg
        const svg = d3
            .select(svgRef.current)
            .attr("width", width)
            .attr("height", height);

        // Create force simulation
        const simulation = d3
            .forceSimulation(notes)
            .force(
                "link",
                d3
                    .forceLink(connections)
                    .id((d) => d.id)
                    .distance(100)
            )
            .force("charge", d3.forceManyBody().strength(-300))
            .force("center", d3.forceCenter(width / 2, height / 2));

        // Draw links
        const link = svg
            .append("g")
            .selectAll("line")
            .data(connections)
            .enter()
            .append("line")
            .attr("stroke", "#999")
            .attr("stroke-opacity", 0.6)
            .attr("stroke-width", (d) => Math.sqrt(d.similarity * 3));

        // Draw nodes
        const node = svg
            .append("g")
            .selectAll("circle")
            .data(notes)
            .enter()
            .append("circle")
            .attr("r", 10)
            .attr("fill", (d) =>
                selectedNote && d.id === selectedNote.id ? "#ff6347" : "#cfbef7"
            )
            .call(
                d3
                    .drag()
                    .on("start", dragstarted)
                    .on("drag", dragged)
                    .on("end", dragended)
            )
            .on("click", (event, d) => {
                onNoteSelect(d);
            });

        // Add node labels
        const labels = svg
            .append("g")
            .selectAll("text")
            .data(notes)
            .enter()
            .append("text")
            .attr("text-anchor", "middle")
            .attr("dy", ".3em")
            .text(
                (d) =>
                    d.content.substring(0, 20) +
                    (d.content.length > 20 ? "..." : "")
            )
            .style("font-size", "15px")
            .attr("pointer-events", "none");

        // Update positions
        simulation.on("tick", () => {
            link.attr("x1", (d) => d.source.x)
                .attr("y1", (d) => d.source.y)
                .attr("x2", (d) => d.target.x)
                .attr("y2", (d) => d.target.y);

            node.attr(
                "cx",
                (d) => (d.x = Math.max(10, Math.min(width - 10, d.x)))
            ).attr(
                "cy",
                (d) => (d.y = Math.max(10, Math.min(height - 10, d.y)))
            );

            labels.attr("x", (d) => d.x).attr("y", (d) => d.y);
        });

        // Drag functions
        function dragstarted(event) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            event.subject.fx = event.subject.x;
            event.subject.fy = event.subject.y;
        }

        function dragged(event) {
            event.subject.fx = event.x;
            event.subject.fy = event.y;
        }

        function dragended(event) {
            if (!event.active) simulation.alphaTarget(0);
            event.subject.fx = null;
            event.subject.fy = null;
        }
    }, [notes, connections, selectedNote, onNoteSelect]);

    return (
        <div className="graph-container">
            <h2>Network Thoughts</h2>
            <svg ref={svgRef} className="graph-svg"></svg>
        </div>
    );
}

export default GraphVisualization;
