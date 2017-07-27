'use strict';

const cmd = require('node-cmd');
const async = require('async');

module.exports = runLighthouse;

function runLighthouse(userOptions) {

    if (userOptions.args.length === 0 || userOptions.args.length === null || userOptions.args.length === undefined) {
        throw "You must pass in a Site URL";
    }

    anotherOne(userOptions);
}

function splitArray (site) {
    return site.replace(",", "");
}

function RunLighthouseException(error) {
    this.toString = function() {
        return "Something went wrong when running Lighthouse:" + error;
    };
}

function anotherOne(options) {
    for(let i = 0; i < options.args.length; i++) {
        let formattedSites = splitArray(options.args[i]);

        async.parallel([
            function () {
                cmd.get(
                    `lighthouse ${formattedSites} --quiet`,
                    function(error){
                        if (error) {
                            throw new RunLighthouseException(error);
                        }
                    }
                )
            }
        ], function (error) {
            throw new RunLighthouseException(error);
        });
    }
}