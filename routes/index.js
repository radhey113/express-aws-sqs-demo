'use strict';
const {sendMessage, receiveMessage} = require('../controllers/message_controllers');

/** Create routes */
class Route {

    constructor(app){
        this.routeInit(app);
    }

    routeInit(app) {
        app.route('/api/sendMessage')
            .post(sendMessage);

        app.route('/api/receiveMessage')
            .get(receiveMessage);
    }
}

module.exports = Route;
