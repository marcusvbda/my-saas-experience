CREATE TABLE IF NOT EXISTS plans (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    price NUMERIC NOT NULL DEFAULT 0 
);

INSERT INTO plans (name, description, price) 
VALUES
    ('Basic', 'Access to basic features and 7 days free trial.', 10),
    ('Pro', 'Includes all features, plus premium support and advanced analytics.', 30),
    ('Enterprise', 'Custom solutions for large organizations with dedicated support.', 0) 
ON CONFLICT (name) 
DO UPDATE SET
    description = EXCLUDED.description,
    price = EXCLUDED.price;
