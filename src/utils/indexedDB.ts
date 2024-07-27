import { openDB } from 'idb';

const DB_NAME = 'SkillTreeDB';
const STORE_NAME = 'completedSkills';

const initDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    },
  });
};

export const addCompletedSkill = async (skill: any) => {
  const db = await initDB();
  await db.put(STORE_NAME, { ...skill, collection: skill.collection });
};

export const getCompletedSkills = async () => {
  const db = await initDB();
  return await db.getAll(STORE_NAME);
};