resource "aws_db_instance" "postgres" {
  allocated_storage    = 20
  engine              = "postgres"
  engine_version      = "15"
  instance_class      = "db.t3.micro"
  username           = "postgres"
  password           = "postgres"
  db_name            = "cards_pruebaBackend"
  publicly_accessible = false
  skip_final_snapshot = true
}