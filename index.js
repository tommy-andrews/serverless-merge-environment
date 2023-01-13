'use strict';

const {
    assign,
    isArray,
    isPlainObject
} = require('lodash');

class ServerlessMergeEnvironment {
    constructor (serverless) {
        this.serverless = serverless;
        serverless.configSchemaHandler.defineCustomProperties({
            type: 'object',
            properties: {
                mergeEnvironment: {
                    type: 'array'
                },
            },
            required: ['mergeEnvironment']
        });

        this.hooks = {
            'before:package:initialize': this.mergeConfig.bind(this),
            'before:offline:start:init': this.mergeConfig.bind(this),
            'before:invoke:local:invoke': this.mergeConfig.bind(this)
        };
    }

    mergeConfig () {
        console.log('Merging environment variables');
        if (!this.serverless.service.provider.environment) {
            this.serverless.service.provider.environment = {};
        }
        if (isArray(this.serverless.service.custom.mergeEnvironment)) {
            this.serverless.service.custom.mergeEnvironment.forEach((subValue) => {
                this.assignValue(this.serverless.service.provider.environment, subValue);
            })
        } else {
            this.assignValue(this.serverless.service.provider.environment, value);
        }
    }

    assignValue (collection, value) {
        if (isPlainObject(value)) {
            // Only merge objects
            assign(collection, value);
        }
    }
}

module.exports = ServerlessMergeEnvironment;
