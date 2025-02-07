CREATE TABLE subscription_statuses (
    id SERIAL PRIMARY KEY,        
    name VARCHAR(50) NOT NULL,   
    description TEXT,           
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

