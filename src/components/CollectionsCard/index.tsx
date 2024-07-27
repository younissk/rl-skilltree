import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";

interface CollectionsCardProps {
  collection: string;
  progress: number;
}

const CollectionsCard: React.FC<CollectionsCardProps> = ({
  collection,
  progress,
}) => {
  return (
    <div className="card">
      <Link to={`/${collection}`}>
        <h3>{collection}</h3>
        <p>{progress.toFixed(2)}%</p>
        <div className="progress-bar">
          <div
            className="progress"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </Link>
    </div>
  );
};

export default CollectionsCard;