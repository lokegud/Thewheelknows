output "website_url" {
  description = "S3 website URL"
  value       = aws_s3_bucket_website_configuration.website.website_endpoint
}

output "api_url" {
  description = "API Gateway URL"
  value       = "${aws_api_gateway_deployment.deployment.invoke_url}${aws_api_gateway_stage.stage.stage_name}"
}
