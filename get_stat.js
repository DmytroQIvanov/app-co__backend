const query = `SELECT DISTINCT
                      users.*,
                      SUM(page_views)
                      OVER(PARTITION BY users.id ORDER BY users.id) AS total_page_views,
                      SUM(clicks)
                      OVER(PARTITION BY users.id ORDER BY users.id) AS total_clicks
               FROM users
               INNER JOIN users_statistic
               ON users.id = users_statistic.user_id
               `;
exports.getAllStats = (db,limit=20,page=1, callback) => {
  

  const sql = query + `LIMIT ${limit} OFFSET ${limit*(page-1)}`; // ORDER BY users.id';
  db.all(sql, (err, rows) => {
    if (err) throw err;
    callback(rows);
  });
};

exports.getStatById = (db, id, callback) => {
  const sql = query + ` WHERE users.id = ${id}`;// GROUP BY users.id;`;
  db.get(sql, [], (err, row) => {
    if (err) throw err;
    callback(row);
  })
};

exports.getNumbersOfUsers = (db,callback) => {
  const sql = `SELECT * FROM users`;
  db.all(sql,(err, row) => {
    if (err) throw err;
    console.log(row);
    callback({usersLength:row.length});
  })
};

exports.getUserData = (db,id,startDate="2010-10-10",endDate="2021-10-02",callback) => {
  const sql = `
  SELECT page_views, clicks,date
FROM users_statistic
WHERE user_id =${id}
AND date
BETWEEN '${startDate}' AND '${endDate}'
`
console.log(startDate,endDate)
  db.all(sql,(err, row) => {
    if (err) throw err;
    // console.log(row);
    callback({user:row});
  })
};