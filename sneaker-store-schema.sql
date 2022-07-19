CREATE TABLE users (
    id          SERIAL PRIMARY KEY,
    email       TEXT NOT NULL UNIQUE CHECK (POSITION('@' IN email) > 1),
    password    TEXT NOT NULL,
    first_name  TEXT NOT NULL,
    last_name   TEXT NOT NULL,
    country     TEXT DEFAULT 'US',
    shoe_size   INTEGER DEFAULT 0
);

CREATE TABLE wishlist (
    id          SERIAL PRIMARY KEY,
    user_id     INTEGER NOT NULL,
    shoe_id     INTEGER NOT NULL,
    created_at  TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);