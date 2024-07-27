import { useState } from "react";
import { GraphCanvas, GraphNode } from "reagraph";
import {
  generateNodesAndEdgesFromJson,
  JSONFormat,
} from "../utils/generateNodes";
import Modal from "./Modal";

const NetworkGraph = ({ data, collection }: { data: JSONFormat[]; collection: string }) => {
  const { nodes, edges } = generateNodesAndEdgesFromJson(data);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<JSONFormat>();

  const handleNodeClick = (node: GraphNode) => {
    const data = node.data;

    console.log(data);

    if (data) {
      setModalData(data);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalData(undefined);
  };

  return (
    <>
      <GraphCanvas nodes={nodes} edges={edges} onNodeClick={handleNodeClick} />
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        collection={collection}
        data={modalData || ({} as JSONFormat)}
      />
    </>
  );
};

export default NetworkGraph;
