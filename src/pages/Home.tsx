import SkillTreeCollectionsMap from "../data/SkillTreeCollectionsMap";
import { Link } from "react-router-dom";

export default function Home() {

  return (
    <div>
      <h2>Select a collection</h2>
        {Array.from(SkillTreeCollectionsMap.keys()).map((collection) => (
          <Link to={`/${collection}`} key={collection}>
            {collection}
          </Link>
        ))}
    </div>
  );
}
