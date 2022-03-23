# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## Database Tables
# users
(
    id: number primary key
    first_name: string
    last_name: string
    password_digest: string
)

# orders
(
    id: number primary key,
    status: string,
    user_id: number foreign key references to 'users' table
)

# products
(
    id: number primary key,
    name: string,
    price: number
)

# orders_products
(
    id: number primary key,
    quantity: number,
    order_id: number references 'orders' table,
    product_id: number references 'products' table
)

## API Endpoints
#### Products
- Index `GET` /products     > response: array of product objects
- Show  `GET` /products/:id > get specific product using id
- Create [token required] `POST` /products
    {
        "name": "TV",
        "price": "99323"
    }
    authentication header: Bearer tttttt.tttttt.tttttt

#### Users
- Index [token required] `GET` /users     >Auth header: Bearer ttttt.ttttt.tttt
- Show [token required] (args user "id") `GET` /users/:id  >Show user using `id`
- Create N[token required] `POST` /users  >create new user and response token for that user
    ex: 
    `POST` request body =>
    {
        "first_name": "farid",
        "last_name": "faisal",
        "password": "pas12"
    }
    Response token =>
    {
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
            eyJpZCI6MiwiZmlyc3RfbmFtZS.
            K-aSkYQQF58pOo"
    }

#### Orders
- Current Order by user (args: user id)[token required] `GET` /orders/:user_id  > Get current "active" order for that user
    request header token => Bearer ttttt.ttttt.ttttt
    Response ex:
    {
        "id": 2,
        "status": "active",
        "user_id": 1
    }
- Create new order for user (args user_id)[token required] `POST` /orders/:user_id >Create new user 
    Request Auth header ex : Bearer ttttt.tttt.ttttt
    Response:
    {
        "id": 3,
        "status": "active",
        "user_id": 1
    }

#### Cart
- Get a list of orders and their products [token required] `GET` /orders-products 
Response ex: 
[
    {
        "order_id": 2,
        "product_id": 2,
        "quantity": 5,
        "user_id": 1,
        "status": "active"
    },
    {
        "order_id": 2,
        "product_id": 1,
        "quantity": 7,
        "user_id": 1,
        "status": "active"
    },
    {
        "order_id": 1,
        "product_id": 2,
        "quantity": 8,
        "user_id": 1,
        "status": "complete"
    }
]

- Add product to an order [token required] `POST` /orders/:order_id/products
    request ex:
    {
        "quantity": 6,
        "product_id": 2
    }
    response ex:
    {
        "id": 4,
        "quantity": 6,
        "order_id": 2,
        "product_id": 2
    }
- complete active order(if needed) [token required] `GET` /orders/complete/:order_id => response completed order json object



## Data Shapes
#### Product
-  id
- name
- price

#### User
- id
- firstName
- lastName
- password_digest

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)


