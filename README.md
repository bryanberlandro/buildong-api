# BUILDONG 👷‍♂️ : Service and API 

## Introduction

This backend project provides APIs for selling furniture items and offering construction services for complete design sets such as kitchen sets. The API allows users to register, login, view, and manage products, constructions, and testimonials.

## Table of Contents

- [Introduction](#introduction)
- [Technologies Used](#technologies-used)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
  - [Constructions](#constructions)
  - [Products](#products)
  - [Reviews](#reviews)
  - [Testimonials](#testimonials)
- [License](#license)

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT for authentication
- Cloudinary

## Usage
The api can be accessed at ```http://localhost:3000``` by default. Use an API client like postman or cURL to interact with the endpoints.

## API Endpoints
### Authentication
- ```POST``` /login
- ```POST``` /register

### Products
- ```GET``` /products
- ```GET``` /products/:prodId
- ```POST``` /products
- ```PATCH``` /products/:prodId
- ```DELETE``` /products/:prodId
#### Example : 
``` json
    {
        "_id": "665300bba666dc8c86916233",
        "name": "Semen uhuy",
        "reviews": [
            {
                "_id": "665302d7e94a55617a303650",
                "user": "Admin",
                "product": "665300bba666dc8c86916233",
                "product_image": "http://example.com/product.jpg",
                "rating": 5,
                "desc": "Kursinya Nyaman Bangetttt",
                "like": 2,
                "published_at": "2024-05-26T09:37:21.750Z",
                "__v": 0
            },
            {
                "_id": "66530440e94a55617a303656",
                "user": "Epoy",
                "product": "665300bba666dc8c86916233",
                "product_image": "http://example.com/product.jpg",
                "rating": 3,
                "desc": "Aku kasih bintang 3 dulu ya ka, barangnya belum sampai",
                "like": 2,
                "published_at": "2024-05-26T09:37:21.750Z",
                "__v": 0
            }
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
```

### Reviews
- ```GET``` /reviews
- ```POST``` /products/:prodId/reviews
- ```DELETE``` /reviews/:reviewId
- ```PATCH``` /reviews/:reviewId
#### Example : 
```json
    {
        "_id": "665302d7e94a55617a303650",
        "user": "Admin",
        "user_image": "admin.jpg",
        "product": "665300bba666dc8c86916233",
        "product_image": "http://example.com/product.jpg",
        "rating": 5,
        "desc": "Kursinya Nyaman Bangetttt",
        "like": 2,
        "published_at": "2024-05-26T09:37:21.750Z",
        "__v": 0
    },
```

### Construction
- ```GET``` /constructions
- ```POST``` /constructions
- ```DELETE`` /constructions/:constructionId
- ```PATCH``` /constructions/:constructionId
#### Example : 
```json
    {
        "project_timeline": {
            "start": "2024-06-10T00:00:00.000Z",
            "finish": "2025-05-10T00:00:00.000Z",
            "duration": "11 bulan 0 minggu 4 hari"
        },
        "_id": "66533aa53474e37d77f6be0c",
        "design_name": "TS KITCHEN",
        "location": "Depok",
        "total_price": 20586004,
        "image": "image.png",
        "square_meters": 20,
        "province": "West Java",
        "style": "Minimalist",
        "category": "Home",
        "descriptions": "Home Made Kitchen",
        "reviews": [
            "665340015b90d75bcf1f229c"
        ],
    "__v": 1
    }
```

### Testimonials
- ```GET``` /testimonials
- ```POST``` /constructions/:constructionId/testimonials
- ```DELETE``` /testimonials/:testiId
- ```PATCH``` /testimonials/:testiId
#### Example : 
```json
    {
        "_id": "665340015b90d75bcf1f229c",
        "user": "Epoy",
        "construction": "66533aa53474e37d77f6be0c",
        "product_image": "http://example.com/product.jpg",
        "rating": 3,
        "desc": "Aku kasih bintang 3 dulu ya ka, barangnya belum sampai",
        "like": 2,
        "published_at": null,
        "__v": 0
    }
```

## License
Proyek ini dilisensikan di bawah lisensi MIT. Lihat file [LICENSE](./LICENSE) untuk informasi lebih lanjut.
