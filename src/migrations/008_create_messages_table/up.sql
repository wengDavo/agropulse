CREATE TABLE messages (
    id SERIAL PRIMARY KEY,             
    chat_id INT NOT NULL,              
	role_id INT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (chat_id) REFERENCES chats(id) ON DELETE CASCADE
);

