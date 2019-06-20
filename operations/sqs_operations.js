'use strict';

/*** Required module for SQS queue based messaging service */
const aws = require('aws-sdk');
const path = require('path');
aws.config.loadFromPath(path.resolve(__dirname, "../config/sqs_config.json"));
const {VISIBILITY_TIMEOUT} = require('../utils/constants');

const sqsAwsInstance = new aws.SQS();
const commonQueueParams = {
    QueueUrl: process.env.QUEUE_URL,
};

class MessageOperations {

    constructor() {
        this.sqsSendMessage = this.sqsSendMessage.bind(this);
        this.sqsReceiveMessage = this.sqsReceiveMessage.bind(this);
        this.deleteMessage = this.deleteMessage.bind(this);
     }

    /**
    * Send message to sqs service
    * @param {params} params 
    */
    async sqsSendMessage(params) {
        return new Promise((resolve, reject) => {
            params = { ...commonQueueParams, ...params };
            sqsAwsInstance.sendMessage(params, function (error, data) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(data);
                }
            });
        });
    }

    /**
    * Receive message to sqs service
    */
    async sqsReceiveMessage() {
        return new Promise((resolve, reject) => {
            try {
                let params = { ...commonQueueParams, VisibilityTimeout: Number(process.env.VISIBILITY_TIMEOUT) || VISIBILITY_TIMEOUT };
                sqsAwsInstance.receiveMessage(params, (error, result) => {
                    if (error) {
                        throw error;
                    }
                    let messageResult = result;
                    let deleteParams = {
                        ...commonQueueParams,
                        // ReceiptHandle: ((result || {}).Messages[0] || {}).ReceiptHandle
                    };
                    // await this.deleteMessage(deleteParams);
                    return resolve(messageResult);
                });
            } catch (error) {
                reject(error)
            }
        });
    }

    /**
    * Delete message to sqs service
    * @param {params} params 
    */
    async deleteMessage(params) {
        return new Promise((resolve, reject) => {
            try {
                sqsAwsInstance.deleteMessage({ params }, (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(result);
                })
            } catch (error) {
                throw error;
            }
        })
    }
}

module.exports = new MessageOperations();
