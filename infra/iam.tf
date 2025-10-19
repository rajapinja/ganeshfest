resource "aws_iam_role" "ecs_task_execution" {
  name = "${var.project}-ecs-exec-role"
  assume_role_policy = data.aws_iam_policy_document.ecs_task_assume.json
}

data "aws_iam_policy_document" "ecs_task_assume" {
  statement { actions = ["sts:AssumeRole"], principals { identifiers = ["ecs-tasks.amazonaws.com"], type = "Service" } }
}

resource "aws_iam_role_policy_attachment" "ecs_execution_attach" {
  role = aws_iam_role.ecs_task_execution.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}
