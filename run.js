'use strict';

const cmd = require('node-cmd');
const async = require('async');

module.exports = run;

function run(options) {

    if (options.args.length === 0 || options.args.length === null || options.args.length === undefined) {
        throw "You must pass in a Site URL";
    }

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

function splitArray (site) {
    return site.replace(",", "");
}

function RunLighthouseException(error) {
    this.error = error;
    this.message = 'Something went wrong when running Lighthouse:';
    this.toString = function() {
        return this.message + this.error;
    };
}