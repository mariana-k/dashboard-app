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

#### Prerequisites

1. Install AWS CLI:
   ```bash
   brew install awscli
   ```

2. Install Docker:
   ```bash
   brew install --cask docker
   ```
   Start Docker Desktop from Applications or:
   ```bash
   open -a Docker
   ```

3. Configure AWS credentials:
   ```bash
   aws configure
   ```
   Enter your:
   - AWS Access Key ID
   - AWS Secret Access Key
   - Default region (e.g., us-east-1)
   - Default output format (json)

#### Setup AWS Resources

1. Create a key pair:
   ```bash
   aws ec2 create-key-pair \
     --key-name financial-dashboard-key \
     --query 'KeyMaterial' \
     --output text > financial-dashboard-key.pem
   chmod 400 financial-dashboard-key.pem
   ```

2. Create security group:
   ```bash
   # Create security group
   aws ec2 create-security-group \
     --group-name financial-dashboard-sg \
     --description "Security group for financial dashboard"

   # Allow HTTP traffic
   aws ec2 authorize-security-group-ingress \
     --group-name financial-dashboard-sg \
     --protocol tcp \
     --port 80 \
     --cidr 0.0.0.0/0

   # Allow HTTPS traffic
   aws ec2 authorize-security-group-ingress \
     --group-name financial-dashboard-sg \
     --protocol tcp \
     --port 443 \
     --cidr 0.0.0.0/0

   # Allow SSH access (optional)
   aws ec2 authorize-security-group-ingress \
     --group-name financial-dashboard-sg \
     --protocol tcp \
     --port 22 \
     --cidr 0.0.0.0/0
   ```

3. Get latest Amazon Linux 2 AMI ID:
   ```bash
   aws ec2 describe-images \
     --owners amazon \
     --filters "Name=name,Values=amzn2-ami-hvm-*-x86_64-gp2" \
     --query 'sort_by(Images, &CreationDate)[-1].[ImageId]' \
     --output text
   ```

4. Launch EC2 instance:
   ```bash
   aws ec2 run-instances \
     --image-id <AMI_ID_FROM_PREVIOUS_COMMAND> \
     --count 1 \
     --instance-type t2.micro \
     --key-name financial-dashboard-key \
     --security-groups financial-dashboard-sg
   ```

5. Create ECR repository:
   ```bash
   aws ecr create-repository \
     --repository-name financial-dashboard \
     --region us-east-1
   ```

6. Get ECR repository URI:
   ```bash
   aws ecr describe-repositories \
     --repository-names financial-dashboard \
     --region us-east-1 \
     --query 'repositories[0].repositoryUri' \
     --output text
   ```

7. Login to ECR:
   ```bash
   aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <REPOSITORY_URI>
   ```

#### Setup GitHub Secrets

1. Go to your GitHub repository
2. Click "Settings" tab
3. In the left sidebar, click "Secrets and variables" → "Actions"
4. Click "New repository secret"
5. Add these secrets:
   - Name: `AWS_ACCESS_KEY_ID`
     Value: Your AWS Access Key ID
   - Name: `AWS_SECRET_ACCESS_KEY`
     Value: Your AWS Secret Access Key

#### Deploy

1. Push to main branch:
   ```bash
   git push origin main
   ```

The GitHub Actions workflow will:
1. Build the Docker image
2. Push it to ECR
3. Deploy to ECS

Your app will be available at your EC2 instance's public IP.

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
