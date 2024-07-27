import { GraphEdge, GraphNode } from "reagraph";

export interface JSONFormat {
  id: string;
  label: string;
  level: string;
  connectedTo: string[];
  description: string;
  completed: boolean;
  prerequisites: string[];
  completedRequirement: boolean;
  resources: string[];
}

const levelToColor: Map<string, string> = new Map([
  ["beginner", "red"],
  ["intermediate", "green"],
  ["advanced", "blue"],
]);

export const generateNodesAndEdgesFromJson = (json: JSONFormat[]): { nodes: GraphNode[], edges: GraphEdge[] } => {
  const nodes: GraphNode[] = [];
  const edges: GraphEdge[] = [];

  json.forEach((item) => {
    const fillColor = item.completed ? "yellow" : levelToColor.get(item.level);

    const newNode: GraphNode = {
      id: item.id,
      label: item.label,
      fill: fillColor,
      data: { ...item }
    };

    nodes.push(newNode);

    // Create edges for connectedTo
    item.connectedTo.forEach((targetId) => {
      if (json.some(node => node.id === targetId)) { // Ensure targetId exists in the JSON data
        const newEdge: GraphEdge = {
          id: `${item.id}-${targetId}`,
          source: item.id,
          target: targetId,
          label: `${item.id}-${targetId}`
        };
        edges.push(newEdge);
      }
    });

    // Create edges for prerequisites
    item.prerequisites.forEach((sourceId) => {
      if (json.some(node => node.id === sourceId)) { // Ensure sourceId exists in the JSON data
        const newEdge: GraphEdge = {
          id: `${sourceId}-${item.id}`,
          source: sourceId,
          target: item.id,
          label: `${sourceId}-${item.id}`
        };
        edges.push(newEdge);
      }
    });
  });

  return { nodes, edges };
};