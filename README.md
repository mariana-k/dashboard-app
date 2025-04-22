# Financial Dashboard

A modern, responsive financial dashboard built with React, TypeScript, and Tailwind CSS.


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

### AWS Deployment

1. Create an EC2 instance:
   ```bash
   # Create security group
   aws ec2 create-security-group --group-name financial-dashboard-sg --description "Security group for financial dashboard"
   aws ec2 authorize-security-group-ingress --group-name financial-dashboard-sg --protocol tcp --port 80 --cidr 0.0.0.0/0

   # Launch EC2 instance
   aws ec2 run-instances \
     --image-id ami-0c55b159cbfafe1f0 \
     --count 1 \
     --instance-type t2.micro \
     --key-name your-key-pair \
     --security-groups financial-dashboard-sg
   ```

2. Set up GitHub Secrets:
   - `AWS_ACCESS_KEY_ID`: Your AWS access key
   - `AWS_SECRET_ACCESS_KEY`: Your AWS secret key

3. Push to main branch to trigger deployment:
   ```bash
   git push origin main
   ```

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
