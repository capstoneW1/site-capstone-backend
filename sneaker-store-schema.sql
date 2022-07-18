CREATE TABLE users (
    id          SERIAL PRIMARY KEY,
    email       TEXT NOT NULL UNIQUE CHECK (POSITION('@' IN email) > 1),
    password    TEXT NOT NULL,
    first_name  TEXT NOT NULL,
    last_name   TEXT NOT NULL,
    country     TEXT,
    shoe_size   INTEGER
);

CREATE TABLE shoe (
    id              SERIAL PRIMARY KEY,
    name            TEXT NOT NULL,
    brand           TEXT NOT NULL,
    release_date    TEXT NOT NULL,
    description     TEXT NOT NULL,
    price           NUMERIC(5, 2) NOT NULL,
    img_url         TEXT NOT NULL
);

CREATE TABLE wishlist (
    id          SERIAL PRIMARY KEY,
    user_id     INTEGER NOT NULL,
    shoe_id     INTEGER NOT NULL,
    created_at  TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (shoe_id) REFERENCES shoe(id) ON DELETE CASCADE
);