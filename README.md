Node js project.

For start:
## 'npm i'
## 'npm run dev'

Tech stack: 
## express, sqlite3

Dev-dependencies:
## nodemon

### Production: https://app--co.herokuapp.com
### Frontend: https://github.com/DmytroQIvanov/app-co__frontend

# Routes

### /user/:id
Returns user 
{
    "id": 2,
    "first_name": "Hamil",
    "last_name": "Cressey",
    "email": "hcressey1@delicious.com",
    "gender": null,
    "ip_address": "45.225.25.145",
    "total_page_views": 11987,
    "total_clicks": 13849
}

### /users 
(?page=1 default 1)
(?limit=20 default 20)
Return array of users

### /users-length
Returns number of users 
{
    "usersLength": 1000
}

### /user-data/:id
Returns :
{
    "user": [
        {
            "page_views": 699,
            "clicks": 289,
            "date": "2019-10-16"
        },
...]
}







