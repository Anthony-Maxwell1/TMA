import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

// --- Types (keep loose for now, you can refine later)
type Data = {
  pages: Record<string, any>;
};

// --- Setup
const adapter = new JSONFile<Data>("data/db.json");
const db = new Low<Data>(adapter, { pages: {} });

// --- Init (must be called once)
export async function initDB() {
  await db.read();
  db.data ||= { pages: {} };
  await db.write();
}

// --- Get value by path
export function get(path: string): any {
  const keys = path.split(".");
  return keys.reduce((acc: any, key) => acc?.[key], db.data);
}

// --- Set value by path
export async function set(path: string, value: any, merge = false) {
  const keys = path.split(".");
  let current: any = db.data;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!(key in current)) current[key] = {};
    current = current[key];
  }

  const lastKey = keys[keys.length - 1];

  if (merge && typeof value === "object") {
    current[lastKey] = {
      ...(current[lastKey] || {}),
      ...value,
    };
  } else {
    current[lastKey] = value;
  }

  await db.write();
}

// --- Delete value
export async function remove(path: string) {
  const keys = path.split(".");
  let current: any = db.data;

  for (let i = 0; i < keys.length - 1; i++) {
    current = current?.[keys[i]];
    if (!current) return;
  }

  delete current[keys[keys.length - 1]];
  await db.write();
}
