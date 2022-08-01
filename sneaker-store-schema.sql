CREATE TABLE users (
    id          SERIAL PRIMARY KEY,
    email       TEXT NOT NULL UNIQUE CHECK (POSITION('@' IN email) > 1),
    password    TEXT NOT NULL,
    first_name  TEXT NOT NULL,
    last_name   TEXT NOT NULL,
    country     TEXT DEFAULT 'US',
    shoe_size   INTEGER DEFAULT 0
);

CREATE TABLE shoes (
    id              SERIAL PRIMARY KEY,
    name            TEXT NOT NULL,
    brand           TEXT NOT NULL,
    colorway        TEXT NOT NULL,
    silhouette      TEXT NOT NULL,
    release_year    TEXT NOT NULL,
    release_date    DATE NOT NULL,
    retail_price    NUMERIC (6, 2) NOT NULL,
    market_price    NUMERIC (6, 2) NOT NULL,
    description     TEXT NOT NULL,
    image_url       TEXT NOT NULL,
    current_bid     NUMERIC (6, 2) NOT NULL,
    lowest_ask      NUMERIC (6, 2) NOT NULL,
    total_sales     INTEGER NOT NULL
);

CREATE TABLE price_history (
    id          SERIAL PRIMARY KEY,
    shoe_id     INTEGER NOT NULL,
    price       NUMERIC (5, 2) NOT NULL,
    date        DATE NOT NULL,
    FOREIGN KEY (shoe_id) REFERENCES shoes(id) ON DELETE CASCADE
);

CREATE TABLE wishlist (
    id          SERIAL PRIMARY KEY,
    user_id     INTEGER NOT NULL,
    shoe_id     INTEGER NOT NULL,
    created_at  TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE shoe_history(
    id          SERIAL PRIMARY KEY,
    shoe_id     INTEGER NOT NULL,
    sep         INTEGER NOT NULL,  
    oct         INTEGER NOT NULL,        
    nov         INTEGER NOT NULL, 
    dec         INTEGER NOT NULL, 
    jan         INTEGER NOT NULL, 
    feb         INTEGER NOT NULL, 
    mar         INTEGER NOT NULL, 
    apr         INTEGER NOT NULL, 
    may         INTEGER NOT NULL, 
    jun         INTEGER NOT NULL, 
    jul         INTEGER NOT NULL, 
    aug         INTEGER NOT NULL, 
    FOREIGN KEY (shoe_id) REFERENCES shoes(id) ON DELETE CASCADE
);