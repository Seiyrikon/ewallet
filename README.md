# E-Wallet

Welcome to the E-Wallet repository! This project is developed using AngularJS with Typescript for the frontend, and Spring Boot Java for the API server, and MySQL as the database.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Frontend](#frontend)
  - [Tech Stack](#tech-stack-frontend)
  - [Folder Structure Frontend](#folder-structure-frontend)
- [Backend](#backend)
  - [Tech Stack](#tech-stack-backend)
  - [Folder Structure Backend](#project-structure-backend)
- [Run Application](#run-application)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

E-Wallet aims to assist the users in managing their finances using e-wallets. E-Wallets serves as your digital wallet that simulates your physical wallet or other e-wallet such as BPI, BDO, GCash, and etc. 

## Features

- Informative Dashboard: Allows users to accurately track their finances on a daily, monthly, and yearly basis.
- E-Wallet: Allows users to create their e-wallets. E-Wallets can be freely modified as much as the user wants (ex. Add e-wallet, edit e-wallet's name, delete e-wallet, deposit funds, withdraw funds).
- Transfer Funds: Allows the users to transfer funds from their own e-wallets, to other user's e-wallets, and to their friend's e-wallets.
- Friends: Allows the user to connect with other users as their friends.
- Chat: Allows the users to communicate to other users or their friends.
- Activity Logs: Allows the user to monitor their actions in a detailed and comprehensive way.

## Getting Started

### Prerequisites

Before you begin, make sure you have the following tools installed:

- Node.js
- npm (Node Package Manager)
- Java Development Kit, preferably version 17 or higher (JDK 17)
- MySQL Server
- MySQL Workbench

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/ewallet.git
   cd ewallet

## Frontend

### Tech Stack (Frontend)

- AngularJS with Typescript
- Angular for UI components
- Tailwind CSS

### Folder Structure Frontend

```bash
ewalelt/frontend/src
├───app
│   ├───component
│   │   ├───common
│   │   │   ├───cancel-modal
│   │   │   ├───delete-modal
│   │   │   ├───expired-session
│   │   │   ├───leave-modal
│   │   │   └───logout-modal
│   │   ├───dashboard
│   │   │   ├───chat
│   │   │   │   └───chat
│   │   │   ├───chat-session
│   │   │   │   └───chat-session
│   │   │   ├───friend
│   │   │   ├───main-content
│   │   │   ├───profile
│   │   │   ├───request
│   │   │   ├───search
│   │   │   │   └───search
│   │   │   ├───side-nav
│   │   │   ├───top-nav
│   │   │   ├───transaction
│   │   │   └───wallet
│   │   │       ├───add-wallet
│   │   │       ├───transfer-fund
│   │   │       │   ├───friend-wallet
│   │   │       │   ├───other-wallet
│   │   │       │   └───own-wallet
│   │   │       └───view-wallet
│   │   │           ├───deposit
│   │   │           └───withdraw
│   │   ├───error404
│   │   ├───login
│   │   └───register
│   ├───interface
│   ├───service
│   │   ├───auth
│   │   ├───chat
│   │   ├───deposit
│   │   │   └───guard
│   │   ├───file
│   │   ├───friend
│   │   ├───guard
│   │   ├───login
│   │   ├───logout
│   │   ├───overall
│   │   ├───principal
│   │   ├───profile
│   │   │   └───guard
│   │   ├───register
│   │   ├───transaction
│   │   ├───user
│   │   ├───wallet
│   │   │   └───guard
│   │   └───withdraw
│   │       └───guard
│   └───shared
└───assets
```

## Backend

### Tech Stack (Backend)

- Spring Boot Java
- MySQL database 

### Folder Structure Backend

```bash
ewalelt/backend/src
├───main
│   ├───java
│   │   └───ewallet
│   │       └───backend
│   │           ├───config
│   │           ├───controller
│   │           ├───dao
│   │           ├───dto
│   │           │   └───mapper
│   │           ├───model
│   │           └───service
│   │               └───serviceimpl
│   └───resources
│       ├───mapper
│       ├───static
│       └───templates
└───test
    └───java
        └───ewallet
            └───backend
```

## Run Application
- Clone the E-Wallet repository.
- Open it on Visual Studio Code.
- Run MySQL Workbench and connect to your server.
- Run the MySQL script located on database folder.
- Go back to Visual Studio Code then run the backend system (Find BackendApplication.java file then click run).
- Go to the file path of ewallet/frontend/.
- Run npm install.
- Run the frontend system by typing npm run start.
