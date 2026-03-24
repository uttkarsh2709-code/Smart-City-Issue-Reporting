-- Insert Departments (idempotent - safe to run on every startup)
MERGE INTO departments (name, description, contact_email, contact_phone, created_at)
KEY (name)
VALUES
('Road & Transportation', 'Handles road infrastructure, potholes, traffic signals, and public transport issues', 'roads@smartcity.gov', '+91-1234567890', CURRENT_TIMESTAMP);

MERGE INTO departments (name, description, contact_email, contact_phone, created_at)
KEY (name)
VALUES
('Water Supply', 'Manages water supply, leakage, quality, and distribution issues', 'water@smartcity.gov', '+91-1234567891', CURRENT_TIMESTAMP);

MERGE INTO departments (name, description, contact_email, contact_phone, created_at)
KEY (name)
VALUES
('Electricity', 'Handles power supply, streetlights, and electrical infrastructure', 'electricity@smartcity.gov', '+91-1234567892', CURRENT_TIMESTAMP);

MERGE INTO departments (name, description, contact_email, contact_phone, created_at)
KEY (name)
VALUES
('Sanitation', 'Manages waste collection, drainage, and cleanliness issues', 'sanitation@smartcity.gov', '+91-1234567893', CURRENT_TIMESTAMP);

MERGE INTO departments (name, description, contact_email, contact_phone, created_at)
KEY (name)
VALUES
('Public Works', 'Handles parks, public buildings, and general civic amenities', 'publicworks@smartcity.gov', '+91-1234567894', CURRENT_TIMESTAMP);

-- Insert Sample Users (idempotent - safe to run on every startup)
-- Password for all sample users is hashed version of 'password' using BCrypt
MERGE INTO users (full_name, email, password, phone, address, role, created_at)
KEY (email)
VALUES
('Admin User', 'admin@smartcity.com', '$2a$10$XQrW8zV9RQWU5F9sP9LYVuJ4HJZa3GV6QiZLZ5YCgFKpVCkBGKG5G', '+91-9876543210', '123 Admin Street, City Hall', 'ADMIN', CURRENT_TIMESTAMP);

MERGE INTO users (full_name, email, password, phone, address, role, created_at)
KEY (email)
VALUES
('John Doe', 'john@example.com', '$2a$10$XQrW8zV9RQWU5F9sP9LYVuJ4HJZa3GV6QiZLZ5YCgFKpVCkBGKG5G', '+91-9876543211', '456 Citizen Lane, Sector 1', 'CITIZEN', CURRENT_TIMESTAMP);

MERGE INTO users (full_name, email, password, phone, address, role, created_at)
KEY (email)
VALUES
('Jane Smith', 'jane@example.com', '$2a$10$XQrW8zV9RQWU5F9sP9LYVuJ4HJZa3GV6QiZLZ5YCgFKpVCkBGKG5G', '+91-9876543212', '789 Public Road, Sector 2', 'CITIZEN', CURRENT_TIMESTAMP);
