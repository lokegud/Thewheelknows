# Architecture Documentation

## Overview

This project implements a simple web application that shows whether "The Wagon" is open or closed based on the state of a Govee smart plug (H5083). 

## Components

1. **Frontend**: Static HTML/CSS/JS hosted on Amazon S3
2. **API Gateway**: Provides HTTP endpoint for checking wagon status
3. **Lambda Function**: Polls the Govee API to determine device status
4. **CloudWatch Alarm**: Monitors for excessive traffic
5. **Safety Function**: Auto-disables the primary function if traffic exceeds thresholds

## Data Flow

1. User visits thewheelknows.com
2. Frontend JavaScript calls the API Gateway endpoint
3. API Gateway triggers the Lambda function
4. Lambda function checks the Govee API for device status
5. Response is returned to the browser
6. Frontend displays "OPEN" or "CLOSED" based on the response

## Monitoring and Safety

CloudWatch monitors function invocations. If they exceed 150/hour, the safety function automatically disables the main Lambda to prevent excessive costs.
