CREATE TABLE IF NOT EXISTS codes (
    code VARCHAR(10) PRIMARY KEY,
    destination TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT now()
);
