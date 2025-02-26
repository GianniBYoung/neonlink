const Database = require("better-sqlite3");
let db = new Database("./db/bookmarks.sqlite");

const bookmarks = require("./bookmarks");
const users = require("./users");
const tags = require("./tags");
const categories = require("./categories");
const bgImages = require("./bgImages");

function init() {
  console.log("Starting up...");
  db.prepare(
    `CREATE TABLE IF NOT EXISTS tags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT
  )`
  ).run();
  db.prepare(
    `CREATE TABLE IF NOT EXISTS bookmarksTags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    bookmarkId INTEGER,
    tagId INTEGER,
    UNIQUE (bookmarkId,tagId) ON CONFLICT IGNORE
  )`
  ).run();
  db.prepare(
    `CREATE TABLE IF NOT EXISTS bookmarks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    url TEXT,
    title TEXT,
    desc TEXT,
    search TEXT,
    icon TEXT,
    categoryId INEGER,
    created TIMESTAMP
    DEFAULT CURRENT_TIMESTAMP
  )`
  ).run();
  db.prepare(
    `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    passwordHash TEXT,
    salt TEXT,
    usergroup INTEGER,
    uuid TEXT
  )`
  ).run();
  db.prepare(
    `CREATE TABLE IF NOT EXISTS category (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    color TEXT
  )`
  ).run();
  db.prepare(
    `CREATE TABLE IF NOT EXISTS categoryPosition (
    categoryId INTEGER,
    position INTEGER
  )`
  ).run();
  db.prepare(
    `CREATE TABLE IF NOT EXISTS bgImages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    url TEXT,
    uuid TEXT
  )`
  ).run();
  db.prepare(
    `CREATE TABLE IF NOT EXISTS userSettings (
    uuid TEXT PRIMARY KEY,
    maxNumberOfLinks INTEGER,
    linkInNewTab INTEGER,
    useBgImage INTEGER,
    bgImage TEXT,
    columns INTEGER,
    cardStyle TEXT,
    enableNeonShadows INTEGER,
    cardPosition TEXT  
  )`
  ).run();
  db.prepare(
    `CREATE TABLE IF NOT EXISTS appSettings (
    useNologin INTEGER  
  )`
  ).run();
  db.prepare(
    `CREATE TABLE IF NOT EXISTS bookmarkPosition (
      bookmarkId INTEGER PRIMARY KEY,
      categoryId INTEGER,
      position INTEGER 
  )`
  ).run();
  path();
}

function path() {
  //Path bgImages. Add uuid column.
  if (columnExist("bgImages", "uuid") === false) {
    console.log("Patching bgImage table");
    try {
      db.prepare("ALTER TABLE bgImages ADD COLUMN uuid TEXT").run();
    } catch (error) {
      console.error(error);
    }
  }
}

function columnExist(tableName, columnName) {
  let columns = db.prepare(`PRAGMA table_info(${tableName})`).all();
  return columns.map((col) => col.name).includes(columnName);
}

module.exports = {
  init,
  ...users,
  ...bookmarks,
  ...tags,
  ...categories,
};
