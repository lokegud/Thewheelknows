provider "aws" {
  region = var.aws_region
}

# S3 bucket for website hosting
resource "aws_s3_bucket" "website" {
  bucket = var.domain_name
  
  tags = {
    Name        = var.domain_name
    Environment = "production"
  }
}

resource "aws_s3_bucket_website_configuration" "website" {
  bucket = aws_s3_bucket.website.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "error.html"
  }
}

resource "aws_s3_bucket_policy" "website" {
  bucket = aws_s3_bucket.website.id
  policy = data.aws_iam_policy_document.website.json
}

data "aws_iam_policy_document" "website" {
  statement {
    principals {
      type        = "*"
      identifiers = ["*"]
    }
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.website.arn}/*"]
  }
}

# Lambda function for wagon status
resource "aws_lambda_function" "wagon_status" {
  function_name    = "wagon-status"
  handler          = "index.handler"
  runtime          = "nodejs18.x"
  filename         = "../backend/lambda/wagon-status.zip"
  source_code_hash = filebase64sha256("../backend/lambda/wagon-status.zip")
  role             = aws_iam_role.lambda_exec.arn
  timeout          = 10
  
  environment {
    variables = {
      GOVEE_API_KEY  = var.govee_api_key
      GOVEE_DEVICE_ID = var.govee_device_id
      GOVEE_MODEL    = var.govee_model
    }
  }
}

# API Gateway
resource "aws_api_gateway_rest_api" "api" {
  name        = "wagon-status-api"
  description = "API for wagon status"
}

resource "aws_api_gateway_resource" "resource" {
  rest_api_id = aws_api_gateway_rest_api.api.id
  parent_id   = aws_api_gateway_rest_api.api.root_resource_id
  path_part   = "status"
}

resource "aws_api_gateway_method" "method" {
  rest_api_id   = aws_api_gateway_rest_api.api.id
  resource_id   = aws_api_gateway_resource.resource.id
  http_method   = "GET"
  authorization_type = "NONE"
}

resource "aws_api_gateway_integration" "integration" {
  rest_api_id = aws_api_gateway_rest_api.api.id
  resource_id = aws_api_gateway_resource.resource.id
  http_method = aws_api_gateway_method.method.http_method
  type        = "AWS_PROXY"
  integration_http_method = "POST"
  uri         = aws_lambda_function.wagon_status.invoke_arn
}
