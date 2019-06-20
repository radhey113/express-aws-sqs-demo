'use strict';

const {
    sqsSendMessage, sqsReceiveMessage, deleteMessage
} = require('../operations/sqs_operations');
const {RESPONSE_CODE, DEFAULT_DELAY} = require('../utils/constants');


class MessageController {

    /**
     * Send message from this route handler
     */
    async sendMessage(req, res) {
        try {
            let id = Date.now();
            id = String(id);
            const params = { 
                MessageBody: req.body.message, 
                DelaySeconds: process.env.DELAY_SECOND || DEFAULT_DELAY,
                MessageGroupId: id,
                MessageDeduplicationId: id,
            };
            
            let result = await sqsSendMessage(params);
            res.jsonp({statusCode: RESPONSE_CODE.SUCCESS, data: result});
        } catch(error) {
            res.jsonp(error);
        }
    }

    /**
     * Receive message from this route handler
     */
    async receiveMessage(req, res) {
        try {
            let result = await sqsReceiveMessage();
            res.jsonp({statusCode: RESPONSE_CODE.SUCCESS, data: result});
        } catch(error) {
            res.jsonp(error);
        }
    }
}

module.exports = new MessageController();