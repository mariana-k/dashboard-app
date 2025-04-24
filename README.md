# Financial Dashboard

A modern, responsive financial dashboard built with React, TypeScript, and Tailwind CSS.

## Live Demo
Check out the live demo at [https://dashboard-app-two-phi.vercel.app/](https://dashboard-app-two-phi.vercel.app/)

<img width="500" alt="Screenshot 2025-04-23 at 14 58 57" src="https://github.com/user-attachments/assets/8c8f1888-b53c-4405-bf23-43c53653ac7e" />

<img width="500" alt="Screenshot 2025-04-23 at 14 59 22" src="https://github.com/user-attachments/assets/2cd7b666-bfb6-4aca-9055-ca5dac69b4e7" />


## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- React Router
- React Query
- Recoil
- React Hook Form
- Zod
- Chart.js
- Lucide React

## Getting Started

### Local Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Docker Development

1. Clone the repository
2. Start the development container:
   ```bash
   docker-compose up dev
   ```
   The app will be available at http://localhost:5173

### Docker Production

1. Clone the repository
2. Build and start the production container:
   ```bash
   docker-compose up app
   ```
   The app will be available at http://localhost:80


#### Deploy

1. Create a Pull Request to main branch:
   ```bash
   git checkout -b feature/your-feature
   # Make your changes
   git add .
   git commit -m "Your changes"
   git push origin feature/your-feature
   ```
   Then create a PR on GitHub from your feature branch to main.

2. Review and merge the PR:
   - The deployment will automatically start when the PR is merged to main

## Project Structure

```
src/
├── components/      # Reusable UI components
├── pages/          # Page components
├── store/          # Recoil state management
├── lib/            # Utilities and API functions
└── main.tsx        # Application entry point
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
