const fs = require('fs');

const arg = process.argv[2];
const id = +arg.split('=')[1];
console.log(`id: ${id}`);

fs.readFile('users_statistic.json', (err, data) => {
  let total_views = 0;
  let total_clicks = 0;
  const users = JSON.parse(data);
  for (const user of users)
    if (user.user_id === id) {
      total_views += user.page_views;
      total_clicks += user.clicks;
    }
  console.log(`total_views: ${total_views}`);
  console.log(`total_clicks: ${total_clicks}`);
});
