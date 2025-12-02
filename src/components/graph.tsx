"use client"
import { useEffect, useRef } from "react";
import { NodeDatapoint } from "@/app/page";
import * as d3 from "d3";

export default function ForceGraph({ nodes, links }: any) {
  const svgRef = useRef(null);
  const simulationRef = useRef<SimulationNodeDatum>(null);

  useEffect(() => {

    function handleZoom(e: any)
    {
      d3.selectAll("svg g").attr('transform', e.transform);
    }

    let zoom = d3.zoom().on('zoom', handleZoom);
    
    const svg = d3.select(svgRef.current).call(zoom);
    const width = 800;
    const height = 600;
    // Initialize simulation once
    if (!simulationRef.current) {
      simulationRef.current = d3.forceSimulation()
        .force("link", d3.forceLink().id((d: NodeDatapoint) => d.id).distance(80))
        .force("charge", d3.forceManyBody().strength(-200))
        .force("center", d3.forceCenter(width / 2, height / 2));
    }

    const simulation = simulationRef.current;

    // Clear existing elements before re-render
    svg.selectAll("*").remove();

    // Draw links
    const link = svg.append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", (d: any) => Math.sqrt(d.value || 1));

    // Draw nodes
    const node = svg.append("g")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("r", 8)
      .attr("fill", "steelblue")
      .call(drag(simulation));

    // Node labels (optional)
    const label = svg.append("g")
      .selectAll("text")
      .data(nodes)
      .join("text")
      .text((d:any) => d.id)
      .attr("font-size", 10)
      .attr("dx", 12)
      .attr("dy", "0.35em");

    // Simulation tick handler
    simulation.nodes(nodes).on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node
        .attr("cx", (d: any) => d.x)
        .attr("cy", (d: any) => d.y);

      label
        .attr("x", (d: any) => d.x)
        .attr("y", (d: any) => d.y);
    });

    simulation.force("link").links(links);

    // Restart simulation with updated data
    simulation.alpha(1).restart();

    // Cleanup when component unmounts
    return () => {
      simulation.stop();
    };
  }, [nodes, links]); // Re-run when data changes

  return <svg ref={svgRef} width={800} height={600}></svg>;
}

// Simple D3 drag handler
function drag(simulation: any) {
  function dragstarted(event: any, d: any) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(event: any, d: any) {
    d.fx = event.x;
    d.fy = event.y;
  }

  function dragended(event: any, d: any) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }

  return d3.drag()
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended);
}

