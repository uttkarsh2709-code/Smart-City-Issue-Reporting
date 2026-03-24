-- Smart City Issue Reporting System - Database Schema
-- MySQL Database

-- Create Database
CREATE DATABASE IF NOT EXISTS smart_city_db;
USE smart_city_db;

-- Drop tables if they exist (for fresh install)
DROP TABLE IF EXISTS issue_images;
DROP TABLE IF EXISTS issues;
DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS users;

-- Users Table
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    address VARCHAR(255),
    role VARCHAR(20) DEFAULT 'CITIZEN',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_role (role)
);

-- Departments Table
CREATE TABLE departments (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    contact_email VARCHAR(100),
    contact_phone VARCHAR(15),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Issues Table
CREATE TABLE issues (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    department_id BIGINT,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(50) NOT NULL,
    location VARCHAR(255),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    status VARCHAR(30) DEFAULT 'PENDING',
    priority VARCHAR(20) DEFAULT 'MEDIUM',
    image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL,
    INDEX idx_user_id (user_id),
    INDEX idx_status (status),
    INDEX idx_category (category)
);

-- Insert Sample Departments
INSERT INTO departments (name, description, contact_email, contact_phone) VALUES
('Road & Transportation', 'Handles road repairs, potholes, traffic signals', 'roads@smartcity.gov', '1800-111-001'),
('Water Supply', 'Water leakage, supply issues, quality', 'water@smartcity.gov', '1800-111-002'),
('Electricity', 'Street lights, power outages', 'electricity@smartcity.gov', '1800-111-003'),
('Sanitation', 'Garbage collection, cleanliness', 'sanitation@smartcity.gov', '1800-111-004'),
('Public Works', 'General maintenance and repairs', 'publicworks@smartcity.gov', '1800-111-005');

-- Insert Sample Admin User (password: admin123)
INSERT INTO users (email, password, full_name, phone, address, role) VALUES
('admin@smartcity.gov', '$2a$10$xQxZ9Z9Z9Z9Z9Z9Z9Z9Z9eKxH8J9Z9Z9Z9Z9Z9Z9Z9Z9Z9Z9Z', 'Admin User', '9999999999', 'Municipal Office', 'ADMIN');

-- Insert Sample Citizen Users (password: user123)
INSERT INTO users (email, password, full_name, phone, address, role) VALUES
('john.doe@gmail.com', '$2a$10$xQxZ9Z9Z9Z9Z9Z9Z9Z9Z9eKxH8J9Z9Z9Z9Z9Z9Z9Z9Z9Z9Z9Z', 'John Doe', '9876543210', '123 Main Street', 'CITIZEN'),
('jane.smith@gmail.com', '$2a$10$xQxZ9Z9Z9Z9Z9Z9Z9Z9Z9eKxH8J9Z9Z9Z9Z9Z9Z9Z9Z9Z9Z9Z', 'Jane Smith', '9876543211', '456 Park Avenue', 'CITIZEN');

-- Insert Sample Issues
INSERT INTO issues (user_id, department_id, title, description, category, location, status, priority) VALUES
(2, 1, 'Large pothole on MG Road', 'There is a big pothole near the traffic signal causing accidents', 'Road', 'MG Road, City Center', 'PENDING', 'HIGH'),
(3, 3, 'Street light not working', 'Street light pole number 45 not working for 3 days', 'Electricity', 'Park Street', 'IN_PROGRESS', 'MEDIUM'),
(2, 4, 'Garbage not collected', 'Garbage has not been collected for the past week', 'Sanitation', 'Sector 12', 'RESOLVED', 'LOW');

-- Query to verify data
SELECT * FROM users;
SELECT * FROM departments;
SELECT * FROM issues;
