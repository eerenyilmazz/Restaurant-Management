# Restaurant Management System

This project leverages cutting-edge technologies to provide a robust solution for managing restaurant operations, including menu management, reservation handling, and customer interactions.

## Technologies Used

- **Backend:**
  - Spring Boot 
  - Spring Security 
  - MySQL database
  
- **Frontend:**
  - Angular 
  - Ng Zorro UI
  
## Project Structure

The project is divided into two main Angular modules:
- **Admin Module:** Handles administrative tasks such as category and product management, and reservation approvals.
- **Customer Module:** Provides functionalities for customers to browse products and make reservation requests.

## Key Features

### Admin Functions

- **Secure Authentication:**
  Admins can securely log in using JWT authentication to access authenticated APIs.
  
- **Category Management:**
  Easily manage menu categories through CRUD operations.
  
- **Product Management:**
  Full control over menu items with operations like create, update, delete, and search.
  
- **Reservation Requests:**
  View and manage reservation requests from customers, including approval and rejection actions.

### Customer Functions

- **Secure Authentication:**
  Customers can log in securely to access their dashboard and make reservation requests.
  
- **Product Browsing:**
  Browse available products directly from the customer dashboard.
  
- **Product Search:**
  Convenient search functionality to find specific products quickly.
  
- **Reservation Requests:**
  Initiate reservation requests for dining tables with preferred date and time.
  
- **Past Reservations:**
  Access history of previous reservation requests for reference.

### UI Experience

- **Ng Zorro UI Integration:**
  Utilizes Ng Zorro UI library to enhance the user interface with a modern and intuitive design.

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

Ensure you have the following installed:
- Node.js
- Angular CLI
- Java Development Kit (JDK)
- MySQL Server

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/eerenyilmazz/Restaurant-Management.git
   ```
   
2. Backend Setup:
   - Navigate to `backend/` folder
   - Configure database connection in `application.properties`
   - Run Spring Boot application
   
3. Frontend Setup:
   - Navigate to `frontend/` folder
   - Install dependencies:
     ```sh
     npm install
     ```
   - Start Angular development server:
     ```sh
     ng serve
     ```

4. Access the application:
   - Open your browser and visit `http://localhost:4200`

## Usage

- **Admin Dashboard:**
  Log in as admin to manage categories, products, and reservations.
  
- **Customer Dashboard:**
  Log in as a customer to browse products and make reservation requests.
