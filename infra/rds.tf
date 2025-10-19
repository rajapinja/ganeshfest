resource "aws_db_subnet_group" "rds" {
  name = "${var.project}-rds-subnet"
  subnet_ids = [for s in aws_subnet.private : s.id]
}

resource "aws_db_instance" "postgres" {
  identifier = "${var.project}-db"
  allocated_storage = var.db_allocated_storage
  engine = "postgres"
  engine_version = "15.4"
  instance_class = var.db_instance_class
  username = "dbadmin"
  password = random_password.db.result
  db_subnet_group_name = aws_db_subnet_group.rds.name
  vpc_security_group_ids = [aws_security_group.db.id]
  multi_az = var.db_multi_az
  skip_final_snapshot = true
  publicly_accessible = false
  tags = { Name = "${var.project}-postgres" }
}

resource "aws_security_group" "db" {
  name = "${var.project}-db-sg"
  vpc_id = aws_vpc.this.id
  ingress { from_port = 5432, to_port = 5432, protocol = "tcp", security_groups = [aws_security_group.alb.id] }
  egress { from_port = 0, to_port = 0, protocol = "-1", cidr_blocks = ["0.0.0.0/0"] }
}
