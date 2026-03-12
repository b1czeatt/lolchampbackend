import Database from 'better-sqlite3';

const db = new Database('./data/database.sqlite');

db.prepare(`
    CREATE TABLE IF NOT EXISTS lolchamps(
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(60),
    role TEXT,
    lane TEXT,
    difficulty INTEGER,
    blue_essence INTEGER,
    damage_type TEXT,
    description TEXT
    )
    `).run()

db.prepare(`
    CREATE TABLE IF NOT EXISTS users(
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
    )
    `).run()

    export default db;