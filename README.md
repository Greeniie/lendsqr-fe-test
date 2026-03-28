# Lendsqr Frontend Assessment

![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue?logo=typescript)
![SCSS](https://img.shields.io/badge/SCSS-1.98.0-pink)
![Jest](https://img.shields.io/badge/Jest-30.3.0-red?logo=jest)
![JSON Server](https://img.shields.io/badge/json--server-1.0.0-lightgrey)

This project is an assessment task for the **Frontend Developer** role at **Lendsqr**. It is a web application built from a Figma design snippet of the **Lendsqr Admin Console**.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Demo](#demo)
- [Installation](#installation)
- [Mock API](#mock-api)
- [Running Tests](#running-tests)
- [Usage](#usage)
- [Author](#author)

---

## Features

- User management table with filtering, sorting, and pagination  
- Action menus with **View Details**, **Blacklist**, and **Activate** options  
- Fully typed with **TypeScript** for type safety  
- SCSS modules for component-level styling  
- Mock API served via **JSON Server**  
- Unit and integration tests covering **positive and negative scenarios**

---

## Tech Stack

- **React** + **TypeScript**  
- **SCSS**  
- **Jest** & **React Testing Library** for testing  
- **json-server** for mock API  

---

## Demo

> This is based on the Lendsqr Admin Console design snippet on figma.  

- Run the dev server locally to explore the UI.
- Filters, pagination, and action menus work with the mock API.

---

## Installation

 **Clone the repository**

```bash
git clone <repository-url>
cd lendsqr-fe-test
npm run dev 

```


## Mock API

The app uses a mock API generated from json-generator.com
.

Run the JSON server:

```bash
npx json-server users.json
```
The API will be available at: http://localhost:4000

## Running Tests

This project uses Jest and React Testing Library.

1. Run all tests in watch mode:

```bash
npx jest --watchAll
```

2. Tests include both positive and negative scenarios for robust coverage.

-Usage
Navigate through the users table.
Apply filters or reset them.
Click action menus to view user details, blacklist, or activate users.
Use pagination buttons to navigate multiple pages.

## Author
Tejiri Anthony