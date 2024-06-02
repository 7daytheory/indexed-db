# IndexedDB CRUD Application

This is a simple CRUD (Create, Read, Update, Delete) application that demonstrates how to use IndexedDB for client-side data storage in a web application.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

IndexedDB is a low-level API for client-side storage of significant amounts of structured data, including files/blobs. This application provides a simple interface to manage data using IndexedDB. You can add, read, update, and delete entries in the database.

## Features

- Add new entries to the database
- Display entries from the database
- Update existing entries
- Delete entries
- Clear form fields

## Technologies Used

- HTML5
- CSS3
- JavaScript (Vanilla JS)
- IndexedDB

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/indexeddb-crud-app.git
Navigate to the project directory:

sh
Copy code
cd indexeddb-crud-app
Open index.html in your web browser.

Usage
Add Data: Fill in the "Name" and "Age" fields and click the "Save" button to add a new entry to the database.
Display Data: The data list will automatically update to display the current entries in the database.
Edit Data: Click the "Edit" button next to an entry to populate the form fields with the entry's data. Update the fields and click "Save" to update the entry.
Delete Data: Click the "Delete" button next to an entry to remove it from the database.
Clear Form: Click the "Clear" button to reset the form fields.
Contributing
Contributions are welcome! Please follow these steps to contribute:

Fork the repository.
Create a new branch (git checkout -b feature/your-feature).
Make your changes.
Commit your changes (git commit -am 'Add new feature').
Push to the branch (git push origin feature/your-feature).
Open a Pull Request.