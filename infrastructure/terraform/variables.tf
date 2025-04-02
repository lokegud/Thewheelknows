variable "aws_region" {
  description = "The AWS region to deploy resources"
  type        = string
  default     = "us-west-1"
}

variable "domain_name" {
  description = "The domain name for the website"
  type        = string
  default     = "thewheelknows.com"
}

variable "govee_api_key" {
  description = "Govee API key"
  type        = string
  sensitive   = true
}

variable "govee_device_id" {
  description = "Govee device ID"
  type        = string
  default     = "C5:85:D4:AD:FC:EA:48:A3"
}

variable "govee_model" {
  description = "Govee device model"
  type        = string
  default     = "H5083"
}
