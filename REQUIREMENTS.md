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
    order_id: number references orders table,
    product_id: number references products table
)

## API Endpoints
#### Products
- Index `GET` /products
- Show  `GET` /products/:id
- Create [token required] `POST` /products
    {
        "name": "TV",
        "price": "99323"
    }
    authentication header: Bearer tttttt.tttttt.tttttt


#### Users
- Index [token required]
- Show [token required]
- Create N[token required]

#### Orders
- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

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


