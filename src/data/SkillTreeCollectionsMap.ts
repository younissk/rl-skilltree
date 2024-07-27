import { JSONFormat } from "../utils/generateNodes";
import calisthenics from "./calisthenics.json";


const SkillTreeCollectionsMap: Map<string, JSONFormat[]> = new Map([
    ["calisthenics", calisthenics],
]);

export default SkillTreeCollectionsMap;