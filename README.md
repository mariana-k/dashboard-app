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

### AWS Deployment (ECS Fargate)

We're using AWS ECS Fargate for deployment, which is a serverless container orchestration service. No EC2 instances are needed as AWS manages the underlying infrastructure.

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

1. Get AWS account info:
   ```bash
   # Get account ID
   aws sts get-caller-identity --query Account --output text

   # Get subnet ID
   aws ec2 describe-subnets --query 'Subnets[0].SubnetId' --output text

   # Get security group ID
   aws ec2 describe-security-groups --group-names financial-dashboard-sg --query 'SecurityGroups[0].GroupId' --output text
   ```

2. Create ECS task execution role:
   ```bash
   # Create role
   aws iam create-role \
     --role-name ecsTaskExecutionRole \
     --assume-role-policy-document '{
       "Version": "2012-10-17",
       "Statement": [
         {
           "Effect": "Allow",
           "Principal": {
             "Service": "ecs-tasks.amazonaws.com"
           },
           "Action": "sts:AssumeRole"
         }
       ]
     }'

   # Attach policy
   aws iam attach-role-policy \
     --role-name ecsTaskExecutionRole \
     --policy-arn arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy
   ```

3. Create security group:
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
   ```

4. Create ECR repository:
   ```bash
   aws ecr create-repository \
     --repository-name financial-dashboard \
     --region us-east-1
   ```

5. Create ECS cluster:
   ```bash
   aws ecs create-cluster \
     --cluster-name financial-dashboard-cluster \
     --region us-east-1
   ```

6. Create ECS service:
   ```bash
   aws ecs create-service \
     --cluster financial-dashboard-cluster \
     --service-name financial-dashboard-service \
     --task-definition financial-dashboard-task \
     --desired-count 1 \
     --launch-type FARGATE \
     --network-configuration "awsvpcConfiguration={subnets=[YOUR_SUBNET_ID],securityGroups=[YOUR_SECURITY_GROUP_ID],assignPublicIp=ENABLED}"
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
   - Name: `AWS_ACCOUNT_ID`
     Value: Your AWS Account ID (get it with: `aws sts get-caller-identity --query Account --output text`)
   - Name: `SUBNET_ID`
     Value: Your VPC subnet ID (get it with: `aws ec2 describe-subnets --query 'Subnets[0].SubnetId' --output text`)
   - Name: `SECURITY_GROUP_ID`
     Value: Your security group ID (get it with: `aws ec2 describe-security-groups --group-names financial-dashboard-sg --query 'SecurityGroups[0].GroupId' --output text`)

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
   - The GitHub Actions workflow will:
     1. Build and push Docker image to ECR
     2. Create/update ECS task definition
     3. Deploy the new task definition

Your app will be available at the public IP of the Fargate task. To get the IP:

#### Option 1: AWS Console
1. Go to AWS Console → ECS
2. Click on your cluster (`financial-dashboard-cluster`)
3. Click on "Services" tab
4. Click on your service (`financial-dashboard-service`)
5. Click on "Tasks" tab
6. Click on the running task
7. In the "Network" section, you'll see the "Public IP" field

#### Option 2: AWS CLI
```bash
# Get the task ARN
TASK_ARN=$(aws ecs list-tasks --cluster financial-dashboard-cluster --service-name financial-dashboard-service --query 'taskArns[0]' --output text)

# Get the network interface ID
NETWORK_INTERFACE_ID=$(aws ecs describe-tasks --cluster financial-dashboard-cluster --tasks $TASK_ARN --query 'tasks[0].attachments[0].details[?name==`networkInterfaceId`].value' --output text)

# Get the public IP
aws ec2 describe-network-interfaces --network-interface-ids $NETWORK_INTERFACE_ID --query 'NetworkInterfaces[0].Association.PublicIp' --output text
```

Note: The IP might change if the task restarts. For a stable URL, you should set up an Application Load Balancer (ALB) with a domain name.

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
