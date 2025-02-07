CREATE TABLE accounts (
    id SERIAL PRIMARY KEY,                   
    user_id INT NOT NULL,                     
    account_id UUID DEFAULT gen_random_uuid(), 
    billing_address VARCHAR(255) NOT NULL,  
    payment_method VARCHAR(100) NOT NULL,  
    payment_status VARCHAR(50) DEFAULT 'active', 
    payment_provider VARCHAR(100),            
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

