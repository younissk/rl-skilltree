import React from "react";
import "./Modal.css";
import { JSONFormat } from "../../utils/generateNodes";
import SkillTreeCollectionsMap from "../../data/SkillTreeCollectionsMap";
import { addCompletedSkill } from "../../utils/indexedDB";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: JSONFormat;
  collection: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, data, collection }) => {
  const collectionData = SkillTreeCollectionsMap.get(collection);

  const prerequisiteSkills = collectionData?.filter((item) =>
    item.connectedTo?.includes(data.id)
  );

  const connectedSkills = collectionData?.filter((item) =>
    item.prerequisites?.includes(data.id)
  );

  const handleMarkAsCompleted = async () => {
    await addCompletedSkill({ ...data, collection });
    onClose();
    // refresh the page
    window.location.reload();
  };

  return (
    <div className={`modal ${isOpen ? "open" : ""}`}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h3>{data.label}</h3>
        <p>
          <strong>Description:</strong> {data.description}
        </p>
        <p>
          <strong>Completed:</strong> {data.completed ? "Yes" : "No"}
        </p>
        <p>
          <strong>Prerequisites:</strong>{" "}
          {prerequisiteSkills?.map((skill) => skill.label).join(", ") || "None"}
        </p>
        <p>
          <strong>Next Skills:</strong>{" "}
          {connectedSkills?.map((skill) => skill.label).join(", ") || "None"}
        </p>
        <p>
          <strong>Completed Requirement:</strong>{" "}
          {data.completedRequirement ? "Yes" : "No"}
        </p>
        <p>
          <strong>Resources:</strong>{" "}
          {data.resources?.map((resource, index) => (
            <a
              key={index}
              href={resource}
              target="_blank"
              rel="noopener noreferrer"
            >
              {resource}
            </a>
          ))}
        </p>
        <button onClick={handleMarkAsCompleted}>
          Mark as completed
        </button>
      </div>
    </div>
  );
};

export default Modal;