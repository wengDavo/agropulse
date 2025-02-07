CREATE TABLE subscriptions (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    subscription_type_id INT NOT NULL,
	subscription_status_id INT NOT NULL,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (subscription_type_id) REFERENCES subscription_types(id),
	FOREIGN KEY (subscription_status_id) REFERENCES subscription_statuses(id)
);

