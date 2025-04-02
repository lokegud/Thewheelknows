import boto3
import os

def lambda_handler(event, context):
    # Get target function name from environment variable
    target_function = os.environ['TARGET_FUNCTION_NAME']
    
    # Create Lambda client
    lambda_client = boto3.client('lambda')
    
    # Set concurrency to 0 (effectively disabling the function)
    try:
        response = lambda_client.put_function_concurrency(
            FunctionName=target_function,
            ReservedConcurrentExecutions=0
        )
        print(f"Disabled {target_function} by setting concurrency to 0")
        
        # Send SNS notification for manual recovery
        sns_client = boto3.client('sns')
        sns_client.publish(
            TopicArn=os.environ['SNS_TOPIC_ARN'],
            Subject=f"ALERT: Lambda {target_function} disabled due to high traffic",
            Message=f"Your Lambda function {target_function} was receiving too many requests (>150/hour) and has been automatically disabled to prevent excessive billing. Please check your application and re-enable manually once resolved."
        )
        
        return {
            'statusCode': 200,
            'body': f"Successfully disabled {target_function}"
        }
    except Exception as e:
        print(f"Error disabling function: {str(e)}")
        return {
            'statusCode': 500,
            'body': f"Error: {str(e)}"
        }
