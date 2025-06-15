# MiniBook-API

A simple RESTful API built using **Node.js** and **Express** to manage a collection of books.

You can **add**, **view**, **update**, and **delete** books through API endpoints. Data is stored in a JSON file.

---

##  Features

- Get all books
- Add a new book
- Update book details
- Delete a book
- Logs each request with timestamp and URL

---

##  Tech Stack

- Node.js
- Express.js
- Middleware
- File System (JSON as DB)

---



##  Setup

```bash
npm install
node index.js
````

Server: `http://localhost:3000`

---

## API Endpoints

All routes are under `/books`

| Method | Route       | Description   |
| ------ | ----------- | ------------- |
| GET    | /books      | Get all books |
| POST   | /books      | Add new book  |
| PUT    | /books/\:id | Update book   |
| DELETE | /books/\:id | Delete book   |

---

##  Sample POST Body

```json
{
  "title": "Book Name",
  "author": "Author Name",
  "pages": 123
}
```




