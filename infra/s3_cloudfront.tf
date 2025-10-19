resource "aws_s3_bucket" "frontend" {
  bucket = var.frontend_bucket_name != "" ? var.frontend_bucket_name : "${var.project}-frontend-${random_id.bucket_id.hex}"
  acl = "public-read"
  versioning { enabled = true }
  website { index_document = "index.html" }
  tags = { Name = "${var.project}-frontend" }
}

resource "random_id" "bucket_id" { byte_length = 4 }

# CloudFront (simple config)
resource "aws_cloudfront_distribution" "cdn" {
  enabled = true
  origin {
    domain_name = aws_s3_bucket.frontend.bucket_regional_domain_name
    origin_id = "S3-${aws_s3_bucket.frontend.id}"
    s3_origin_config { origin_access_identity = "" }
  }
  default_cache_behavior { allowed_methods = ["GET","HEAD"], cached_methods = ["GET","HEAD"], target_origin_id = "S3-${aws_s3_bucket.frontend.id}", viewer_protocol_policy = "redirect-to-https", forwarded_values { query_string = false, cookies { forward = "none" } } }
  viewer_certificate {
    cloudfront_default_certificate = true
  }
  restrictions { geo_restriction { restriction_type = "none" } }
  tags = { Name = "${var.project}-cdn" }
}
