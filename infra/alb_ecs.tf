resource "aws_lb" "alb" {
  name = "${var.project}-alb"
  load_balancer_type = "application"
  subnets = [for s in aws_subnet.public : s.id]
  security_groups = [aws_security_group.alb.id]
  enable_deletion_protection = false
  tags = { Name = "${var.project}-alb" }
}

resource "aws_security_group" "alb" {
  name = "${var.project}-alb-sg"
  vpc_id = aws_vpc.this.id
  ingress { from_port = 80, to_port = 80, protocol = "tcp", cidr_blocks = ["0.0.0.0/0"] }
  egress { from_port = 0, to_port = 0, protocol = "-1", cidr_blocks = ["0.0.0.0/0"] }
}

resource "aws_ecs_cluster" "this" { name = "${var.project}-cluster" }

resource "aws_cloudwatch_log_group" "ecs" {
  name = "/ecs/${var.project}"
  retention_in_days = 30
}

# Do NOT register the task definition with a fixed image here; CI will register updated task defs.
