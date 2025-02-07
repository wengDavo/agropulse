DROP TABLE subscriptions;
CREATE TABLE chats (
    id SERIAL PRIMARY KEY,             
    user_id INT NOT NULL,             
    session_id UUID DEFAULT gen_random_uuid(), 
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

