# NODE WITH AWS SQS SERVICE

## Description
###### This is a back-end script or worker to run only the SQS AWS service on the server. SQS is used to send and receive message in queue. We are use FIFO queue to send and receive message.
    

## Pre-requisition
###### Some of the major project requirements are:
    - Install Node 8+
    - Install AWS SDK (npm install aws-sdk --save)
    

## Environment
###### I have created a sample .env file in sample_files, please check and create on `.env` file on the root. There is a module called dotenv, which set the environment variable in the system.
 ```
    Required Env Variable:
    
    SERVER_PORT=<Port to run server>
    SERVER_HOST=<Host like localhost/127.0.0.1/0.0.0.0>
    BASE_URL=<Base url like http://localhost:3001>
    QUEUE_NAME=<AWS Queue name abc.fifo>
    QUEUE_URL=<Queue url https://sqs.us-east-2.amazonaws.com/78976779788/abc.fifo>
    VISIBILITY_TIMEOUT=<Visibility timeout like 300, 400, 500, 600 second>
    DELAY_SECOND=<Delay in second 0>
    
```

# Run
###### To run the project you only need to use below commad.
```
    Got to the working directory 'sqs_implementation'
    run command 'npm install'
    run command 'node index.js or 'npm start'
    
```

##### *Note: You must set the environment variable (.env) to run the project successfully.*
###### Thank you