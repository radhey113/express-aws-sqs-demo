'use strict';

class AppConstants {
    APP_NAME = 'Gold_Distribution';
    DEFAULT_DELAY = 0;
    VISIBILITY_TIMEOUT = 600;

    RESPONSE_CODE = {
        SUCCESS: 200,
        NOT_FOUND: 404,
        BAD_REQUEST: 400,
        UN_AUTHORIZED: 401
    }
}

module.exports = new AppConstants();
