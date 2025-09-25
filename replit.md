# Enterprise Comment System

## Overview

This is a full-stack web application that provides a modern comment system. Users can post comments with their name and email, view all comments in chronological order, and delete comments. The application is built with a Django REST API backend and a Next.js React frontend, designed for scalability and maintainability.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: Next.js with React for server-side rendering capabilities and optimized performance
- **Styling**: Custom CSS with modern design patterns, gradients, and responsive layouts
- **State Management**: React hooks (useState, useEffect) for local component state
- **HTTP Client**: Axios for API communication with the backend
- **Component Structure**: Modular components (CommentForm, CommentList) for reusability

### Backend Architecture
- **Framework**: Django with Django REST Framework for robust API development
- **API Design**: RESTful endpoints following standard HTTP methods
- **Data Models**: Simple Comment model with content, author information, and timestamps
- **Database**: Django ORM with migration system for schema management
- **Security**: CORS handling for cross-origin requests, environment variable configuration

### Data Storage
- **Database**: Uses Django's default SQLite database (configurable for other databases)
- **Models**: Single Comment model with fields for content, author_name, author_email, and timestamps
- **Ordering**: Comments ordered by creation date (newest first)

### API Structure
- **Base URL**: `/api/comments/`
- **Endpoints**:
  - GET/POST `/api/comments/` - List all comments or create new comment
  - DELETE `/api/comments/<id>/` - Delete specific comment
- **Serialization**: Django REST Framework serializers for data validation and transformation

### Authentication & Authorization
- **Current State**: No authentication system implemented
- **Access Control**: Open API endpoints allowing anonymous comment posting and deletion
- **Security Considerations**: Basic CORS configuration, environment-based secret key management

## External Dependencies

### Backend Dependencies
- **Django**: Web framework for rapid development
- **Django REST Framework**: API development toolkit
- **django-cors-headers**: Cross-origin resource sharing handling
- **python-dotenv**: Environment variable management

### Frontend Dependencies
- **Next.js**: React framework with SSR capabilities
- **React**: UI library for component-based development
- **Axios**: HTTP client for API requests
- **Sharp**: Image optimization (included with Next.js)

### Development Tools
- **Package Management**: npm for frontend, pip for backend
- **Development Servers**: Next.js dev server (port 5000), Django dev server (port 8000)
- **Database**: SQLite (default Django database)

### Infrastructure Considerations
- **CORS Configuration**: Allows frontend-backend communication during development
- **Environment Variables**: Used for sensitive configuration like secret keys
- **Static Files**: Django static file handling for admin interface and API
- **Hot Reloading**: Both frontend and backend support development hot reloading