#Bookshop

```http   
GET http://localhopst:5173 HTTP/1.1
```
Create a new User
```http
POST http://localhost:8080/user HTTP/1.1
Content-Type:application/json

{
   "name":"John",
   "surname":"Doe",
   "email":"JohnDoe@gmail.com",
   "password":"password"
}
```
And then you can edit your DATA

```http
PUT http://localhost:8080/user/1
Content-Type:application/json
```
```http
DELETE http://localhost:8080/user/:id
Content-Type:application/json
```
