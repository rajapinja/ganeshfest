import { motion } from "framer-motion";
import {
  CheckCircle,
  Database,
  Server,
  Cloud,
  Shield,
  Layers,
  GitBranch,
  Code2,
  Globe,
  Lock,
  MessageSquare,
  Cpu,
  FileText,
} from "lucide-react";

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

const techStack = [
  {
    category: "Frontend",
    icon: <Globe className="w-5 h-5 text-sky-500" />,
    items: ["React", "Vite", "TailwindCSS", "UnoCSS"],
  },
  {
    category: "Backend",
    icon: <Cpu className="w-5 h-5 text-orange-500" />,
    items: ["Spring Boot", "Feign Client", "Http Client", "Postman"],
  },
  {
    category: "Security & Auth",
    icon: <Lock className="w-5 h-5 text-red-600" />,
    items: ["OAuth2", "Keycloak", "Spring Security", "WebSecurity"],
  },
  {
    category: "Database",
    icon: <Database className="w-5 h-5 text-green-600" />,
    items: ["Postgres", "pgAdmin"],
  },
  {
    category: "Messaging",
    icon: <MessageSquare className="w-5 h-5 text-indigo-600" />,
    items: ["Kafka", "Kafka Manager"],
  },
];

export default function DeploymentSteps() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-12">
      <h1 className="text-2xl font-bold mb-6 text-center">
        🚀 Deployment Steps for Ganesh Fest App
      </h1>

      {/* Deployment Steps */}
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

      {/* Tech Stack */}
      <div>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Code2 className="w-6 h-6 text-blue-600" /> Tech Stack
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {techStack.map((group, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15 }}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow p-4"
            >
              <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                {group.icon}
                {group.category}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item, j) => (
                  <li
                    key={j}
                    className="text-xs px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-sm"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}