\echo 'Delete and recreate sneaker_store db?'
\prompt 'Return for yes or control-C to cancel > ' answer

DROP DATABASE sneaker_store;
CREATE DATABASE sneaker_store;
\connect sneaker_store

SET CLIENT_ENCODING TO 'utf8';
\i sneaker-store-schema.sql

\i sneaker-store-seed.sql