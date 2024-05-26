# Project Backend: Furniture and Construction Services API

## Introduction

This backend project provides APIs for selling furniture items and offering construction services for complete design sets such as kitchen sets. The API allows users to register, login, view, and manage products, constructions, and testimonials.

## Table of Contents

- [Introduction](#introduction)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
  - [Constructions](#constructions)
  - [Products](#products)
  - [Reviews](#reviews)
  - [Testimonials](#testimonials)
- [Technologies Used](#technologies-used)
- [License](#license)

## Usage
The api can be accessed at 'http://localhost:3000' by default. Use an API client like postman or cURL to interact with the endpoints.

## API Endpoints
### Authentication
- POST /login
    - return TOKEN
- POST /register

### Products
- GET /products
    - get all products
- GET /products/:prodId
    - get one product
- POST /products
- PATCH /products/:prodId
- DELETE /products/:prodId
``` json
    {
  "products": [
    {
      "_id": "665300bba666dc8c86916233",
      "name": "Semen uhuy",
      "reviews": [
        "665302d7e94a55617a303650",
        "66530440e94a55617a303656"
      ],
      "image": "img/Semen.jpg",
      "desc": "Semen ini sangat bagus",
      "item_sold": 0,
      "category": "Furniture",
      "stock": 10,
      "unit_price": 50000,
      "published_at": null,
      "__v": 2
    }
  ],
  "meta": {
    "total_users": 1
  }
}
```

### Reviews
- POST /products/:prodId/reviews
- DELETE /reviews/:reviewId

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT for authentication
