\echo 'Delete and recreate sneaker_store db?'
\prompt 'Return for yes or control-C to cancel > ' answer

DROP DATABASE sneaker_store;
CREATE DATABASE sneaker_store;
\connect sneaker_store

\i sneaker-store-schema.sql