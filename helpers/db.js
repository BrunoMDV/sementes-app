import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("places.db");

const query = "DROP TABLE photos";

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS photos (id INTEGER PRIMARY KEY NOT NULL,title TEXT NOT NULL ,imageUri TEXT NOT NULL,lat REAL NOT NULL,lng REAL NOT NULL);",
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const insertPhoto = (title, imageUri, lat, lng) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO photos (title,imageUri,lat,lng) VALUES (?,?,?,?); `,
        [title, imageUri, lat, lng],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const fetchPhotos = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT id, title, imageUri, lat, lng FROM photos",
        [],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};
