# blue.cloud React.js Coding Challange

This template includes basic "create-react-app" template and dev-server for mock data.

## Tasks

- Clone this repository to your machine.
- Fetch data from /api/users
- Show list of users
- Filter data with filter components by name, age, isAvailable, company name (fetch from server to list companies) as mentioned below with query like /api/users?name=tea
- Change URL with filter values
- Fill filter components by URL if page is opened by filtered URL

## Additional Tasks

- Develop a caching mechanism with Context API and cache company list
- Develop as dynamically as possible

### Usage

- Use "npm run server" for mock data
- Server listens endpoints below

### Endpoints

- http://localhost:3001/api/users -> UserList
- http://localhost:3001/api/companies -> CompanyList

### Filter queries

- name: string (works like includes)
- age: number (works like equal)
- isAvailable: boolean (works like equal)
- companyName: string (works like includes)
