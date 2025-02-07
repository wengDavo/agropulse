CREATE TABLE subscription_types (
    id SERIAL PRIMARY KEY,            
    name VARCHAR(50) NOT NULL,       
    description TEXT,               
    price DECIMAL(10, 2),          
    duration INT,                 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

