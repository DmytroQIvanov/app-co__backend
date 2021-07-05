const fs = require('fs');

const createUsersTable = `CREATE TABLE
                          IF NOT EXISTS users (
                              id INTEGER,
                              first_name TEXT,
                              last_name TEXT,
                              email TEXT,
                              gender TEXT,
                              ip_address TEXT
                          );`;

const createStatsTable = `CREATE TABLE
                          IF NOT EXISTS users_statistic (
                              user_id INTEGER,
                              date TEXT,
                              page_views INTEGER,
                              clicks INTEGER
                          );`;

const insertUser = `INSERT INTO users
                    (id, first_name, last_name,
                     email, gender, ip_address) VALUES(?, ?, ?, ?, ?, ?);`;

const insertStat = `INSERT INTO users_statistic
                    (user_id, date,
                     page_views, clicks) VALUES(?, ?, ?, ?);`;


exports.createTables = (db, callback) => {
  db.run(createUsersTable, () => {
    db.run(createStatsTable, () => {
      callback();
    });
  });
};

const fillUsers = (db, callback) => {
  db.get(`SELECT COUNT(*) AS count FROM users;`, (err, row) => {
    if (err) throw err;
    if (row.count == 0) {
      fs.readFile('./users.json', (err, data) => {
        if (err) throw err;
        console.log('Parsing users');
        const users = JSON.parse(data);
        console.log('Inserting users');
        db.serialize(() => {
          const stmt = db.prepare(insertUser);
          for (const user of users) {
            stmt.run(user.id, user.first_name, user.last_name,
                     user.email, user.gender, user.ip_address);
          }
          stmt.finalize(callback);
        });
      });
    }
    else callback();
  });
};

const fillUsersStat = (db, callback) => {
  db.get(`SELECT COUNT(*) AS count FROM users_statistic;`, (err, row) => {
    if (err) throw err;
    if (row.count == 0) {
      fs.readFile('./users_statistic.json', (err, data) => {
        if (err) throw err;
        console.log('Parsing users stat');
        const usersStats = JSON.parse(data);
        console.log('Inserting users stat');
        db.serialize(() => {
          const stmt = db.prepare(insertStat);
          for (const stat of usersStats) {
            stmt.run(stat.user_id, stat.date,
                     stat.page_views, stat.clicks);
          }
          stmt.finalize(callback);
        });
      });
    }
    else callback();
  });
};

exports.fillTables = (db, callback) => {
  fillUsers(db, () => {
    fillUsersStat(db, callback);
  });
};