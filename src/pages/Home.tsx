import { useEffect, useState } from "react";
import SkillTreeCollectionsMap from "../data/SkillTreeCollectionsMap";
import { getCompletedSkills } from "../utils/indexedDB";
import CollectionsCard from "../components/CollectionsCard";

export default function Home() {
  const [progressData, setProgressData] = useState<Map<string, number>>(new Map());

  useEffect(() => {
    const fetchProgressData = async () => {
      const progressMap = new Map<string, number>();
      for (const collection of SkillTreeCollectionsMap.keys()) {
        const skills = SkillTreeCollectionsMap.get(collection) || [];
        const completedSkills = await getCompletedSkills();
        const completedSkillsInCollection = completedSkills.filter(
          (skill) => skill.collection === collection
        );
        const progress = (completedSkillsInCollection.length / skills.length) * 100;
        progressMap.set(collection, progress);
      }
      setProgressData(progressMap);
    };

    fetchProgressData();
  }, []);

  return (
    <div>
      <h2>Select a collection</h2>
      {Array.from(SkillTreeCollectionsMap.keys()).map((collection) => (
        <CollectionsCard
          key={collection}
          collection={collection}
          progress={progressData.get(collection) || 0}
        />
      ))}
    </div>
  );
}