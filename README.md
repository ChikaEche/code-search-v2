# CodeSearch

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.3.

# About

This project mimics Sourcegraph, it searches a code base based on user queries (e.g import) and displays all occurrencies of the search query. Currently, the user uploads a code base from the local machine.

# How it works

- User creates project => An index is created for the project on Meilisearch and aslo the project is created on firestore

- User uploads a folder/codebase => All the files in the codebase which is part of the acceptable files will be parsed and the text in the files are stored both in firestore and Meilisearch

Warning - Avoid uploading node_modules folder to avoid slowing down your machine. Although the program won't accept files in node_modules.

- User searches under a project/codebase => The user searches for a particular word in the codebase. Using Meilisearch to search for the keyword and displays all occurrencies of the keyword to the user

# current acceptable files
'ts', 'md', 'js', 'java', 'json', 'html', 'go', 'py'

# upcoming features

- Upload a codebase from github

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

