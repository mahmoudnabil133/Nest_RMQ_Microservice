# 🛠️ Microservice Project with RabbitMQ, MySQL, MongoDB, and Docker

This project is a microservices-based application built with NestJS that utilizes **RabbitMQ** for inter-service communication. It is composed of two main services:
- **Admin Service** (Product Service): Manages products with **MySQL** and **TypeORM**
- **Main Service**: Listens for product events (`create`, `update`, `delete`) and stores relevant data with **MongoDB**

Both services communicate via RabbitMQ, allowing for a loosely-coupled, event-driven architecture.

## 📦 Project Structure

- **Admin Service (Product Service)**: Handles product creation, updates, and deletions.
- **Main Service**: Listens to events emitted by the Admin Service, processing these to maintain a synchronized product store.

## 🛠️ Technologies Used

![RabbitMQ](https://img.shields.io/badge/-RabbitMQ-FF6600?logo=RabbitMQ&logoColor=white) 
![NestJS](https://img.shields.io/badge/-NestJS-E0234E?logo=nestjs&logoColor=white)
![MySQL](https://img.shields.io/badge/-MySQL-4479A1?logo=mysql&logoColor=white)
![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?logo=mongodb&logoColor=white)
![Docker](https://img.shields.io/badge/-Docker-2496ED?logo=docker&logoColor=white)

## 🧰 Requirements

- **Node.js** (v18 or higher)
- **Docker** (for containerization)
- **RabbitMQ** (cloud or local setup)
- **MySQL** (for Admin Service)
- **MongoDB** (for Main Service)

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/microservice-project.git
cd microservice-project
