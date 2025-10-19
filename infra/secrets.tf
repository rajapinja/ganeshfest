resource "random_password" "db" {
  length = 16
  override_characters = "!@#%&*()-_=+"
}

resource "aws_secretsmanager_secret" "db_credentials" {
  name = "${var.project}/db-credentials"
}

resource "aws_secretsmanager_secret_version" "db_credentials_version" {
  secret_id = aws_secretsmanager_secret.db_credentials.id
  secret_string = jsonencode({
    username = "dbuser"
    password = random_password.db.result
  })
}
