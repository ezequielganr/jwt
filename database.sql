CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    gender INT,
    phone VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    username VARCHAR(255),
    password VARCHAR(255),
    province VARCHAR(255),
    city VARCHAR(255),
    street VARCHAR(255),
    zipcode VARCHAR(255),
    status INT DEFAULT 0,
    date_created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
