INSERT INTO 
	subscription_statuses 
	(name, description, created_at) 
VALUES
	('Active', 'The subscription is currently active and the user has access to all features.', CURRENT_TIMESTAMP),
	('Inactive', 'The subscription is inactive, either expired or cancelled, and the user no longer has access.', CURRENT_TIMESTAMP);

