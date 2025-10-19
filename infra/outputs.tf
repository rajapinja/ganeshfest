output "ecr_backend_repo" { value = aws_ecr_repository.backend.repository_url }
output "ecr_frontend_repo" { value = aws_ecr_repository.frontend.repository_url }
output "alb_dns" { value = aws_lb.alb.dns_name }
output "frontend_bucket" { value = aws_s3_bucket.frontend.bucket }
output "cloudfront_domain" { value = aws_cloudfront_distribution.cdn.domain_name }
output "rds_endpoint" { value = aws_db_instance.postgres.address }
output "db_secret_arn" { value = aws_secretsmanager_secret.db_credentials.arn }
output "ecs_cluster" { value = aws_ecs_cluster.this.name }
