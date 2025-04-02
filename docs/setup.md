# Setup Guide

## Prerequisites

- AWS Account
- Govee Smart Plug (H5083)
- Govee Developer API Key
- Domain registered in Route 53

## Deployment Steps

1. **Set up S3 Website**:
   - Create bucket named after your domain
   - Upload frontend files
   - Enable static website hosting
   - Set bucket policy for public read access

2. **Create Lambda Functions**:
   - Deploy wagon-status function
   - Deploy safety function
   - Set environment variables for API key and device ID

3. **Configure API Gateway**:
   - Create REST API
   - Create GET method pointing to wagon-status Lambda
   - Enable CORS
   - Deploy API to "Prod" stage

4. **Set up CloudWatch Alarm**:
   - Create alarm for Lambda invocations >150/hour
   - Link alarm to safety function

5. **Configure DNS**:
   - Create A record in Route 53 pointing to S3 website

## Maintenance

- Check CloudWatch metrics regularly
- Monitor cost in AWS Billing dashboard
