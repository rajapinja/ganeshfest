import { motion } from "framer-motion";
import { CheckCircle, Database, Server, Cloud, Shield, Layers, GitBranch } from "lucide-react";

const steps = [
  {
    title: "Build Docker Images",
    description:
      "Create Docker images for frontend (React/Vite/Tailwind/UnoCSS) and backend (Spring Boot). Use official images for Postgres, Keycloak, Kafka, etc.",
    icon: <Layers className="w-6 h-6 text-blue-500" />,
  },
  {
    title: "Compose Locally",
    description:
      "Use docker-compose.yml to wire services together (frontend, backend, Postgres, Keycloak, Kafka, pgAdmin, Kafka Manager).",
    icon: <Server className="w-6 h-6 text-indigo-500" />,
  },
  {
    title: "Push to ECR",
    description:
      "Push your Docker images to Amazon Elastic Container Registry (ECR).",
    icon: <Cloud className="w-6 h-6 text-orange-500" />,
  },
  {
    title: "Deploy Services",
    description:
      "Frontend → S3 + CloudFront (React/Vite build). Backend → ECS (Fargate, Spring Boot). Database → RDS (Postgres + pgAdmin). Kafka → MSK. Keycloak → ECS.",
    icon: <Database className="w-6 h-6 text-green-600" />,
  },
  {
    title: "Configure Networking & Security",
    description:
      "Create VPC, private/public subnets, security groups, IAM roles. Expose services via ALB.",
    icon: <Shield className="w-6 h-6 text-red-500" />,
  },
  {
    title: "Set Up CI/CD",
    description:
      "Automate builds and deployments using GitHub Actions or GitLab CI/CD. Ensure React frontend, Spring Boot backend, Keycloak, Kafka are deployed smoothly.",
    icon: <GitBranch className="w-6 h-6 text-purple-500" />,
  },
];

export default function DeploymentSteps() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">
        🚀 Deployment Steps for Ganesh Fest App
      </h1>
      <div className="space-y-6">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="flex items-start space-x-4 bg-white dark:bg-gray-900 rounded-2xl shadow-md p-4"
          >
            {step.icon}
            <div>
              <h2 className="text-lg font-semibold flex items-center gap-2">
                {step.title}
                <CheckCircle className="w-4 h-4 text-green-500" />
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {step.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
