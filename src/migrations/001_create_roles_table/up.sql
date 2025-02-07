CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,         -- Role name (e.g., 'user', 'system')
    description TEXT
);

