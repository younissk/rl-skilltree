import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SkillTreeCollectionsMap from "../data/SkillTreeCollectionsMap";
import NetworkGraph from "../components/NetworkGraph";
import { getCompletedSkills } from "../utils/indexedDB";
import { JSONFormat } from "../utils/generateNodes";

const CollectionPage = () => {
  const { collection } = useParams();
  const [data, setData] = useState<JSONFormat[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!collection) return;

      const collectionData = SkillTreeCollectionsMap.get(collection);
      if (!collectionData) {
        setData(null);
        return;
      }

      const completedSkills = await getCompletedSkills();
      const updatedData = collectionData.map((item) => {
        const isCompleted = completedSkills.some(
          (skill) => skill.id === item.id && skill.collection === collection
        );
        return { ...item, completed: isCompleted };
      });

      setData(updatedData);
    };

    fetchData();
  }, [collection]);

  if (!collection) {
    return <div>No collection selected</div>;
  }

  if (!data) {
    return <div>No data found for collection {collection}</div>;
  }

  return <NetworkGraph data={data} collection={collection} />;
};

export default CollectionPage;