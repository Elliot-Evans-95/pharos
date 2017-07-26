'use strict';

const cmd = require('node-cmd');
const async = require('async');

console.log('yo');

module.exports = run;

function run(options) {
    console.log('SITES:', options.args);

    if (options.args.length === 0 || options.args.length === null || options.args.length === undefined) {
        throw 'ops';
    }

    for(var i = 0; i < options.args.length; i++) {
        var formattedSites = splitArray(options.args[i]);

        async.parallel([
            function () {
                console.log('RUN:', formattedSites);
                cmd.get(
                    `lighthouse ${formattedSites} --quiet`,
                    function(err, data){
                        if (!err) {
                            console.log('WORKING')
                        } else {
                            console.log('error', err)
                        }

                    }
                )
            }
        ], function ( error) {
            throw error;
        });
    }
}

function splitArray (site) {
    return site.replace(",", "");
}