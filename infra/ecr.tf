resource "aws_ecr_repository" "backend" {
  name = "${var.project}-backend"
  image_scanning_configuration { scan_on_push = true }
  tags = { project = var.project }
}

resource "aws_ecr_repository" "frontend" {
  name = "${var.project}-frontend"
  image_scanning_configuration { scan_on_push = true }
  tags = { project = var.project }
}
