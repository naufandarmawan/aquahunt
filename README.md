# Fish Species Management App (TypeScript Version)

This is a Next.js web application for managing fish species data, built with TypeScript. It allows users to view, search, add, edit, and delete fish species information.

## Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

## Getting Started

1. Clone the repository:
   ```
   git clone https://github.com/your-username/fish-species-management.git
   cd fish-species-management
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env.local` file in the root directory and add the following environment variables:
   ```
   NEXT_PUBLIC_API_URL=https://test.api.sahabatlautlestari.com
   ```

4. Run the development server:
   ```
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Features

- View a list of fish species
- Search for specific species
- Pagination for species list
- View details of individual species
- Admin authentication
- Add new species (admin only)
- Edit existing species (admin only)
- Delete species (admin only)

## Admin Login

To access admin features, use the following credentials:

- Username: userdemo
- Password: Password#123

## Project Structure

- `app/`: Contains the main pages of the application
- `components/`: Reusable React components
- `public/`: Static assets
- `styles/`: Global styles
- `types/`: TypeScript type definitions

## TypeScript

This project uses TypeScript for improved type safety and developer experience. The `tsconfig.json` file in the root directory contains the TypeScript compiler options.

## API Documentation

The API documentation can be found at [API Documentation Link]. Import the provided API collection and environment files into Postman for testing.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.