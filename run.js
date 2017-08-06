'use strict';

const cmd = require('node-cmd');
const async = require('async');

module.exports = runLighthouse;

function createSitesArray(sites) {
    return sites.split(',');
}

function runLighthouse(userOptions) {

    if (userOptions.sites === null || userOptions.sites === undefined) {
        console.error("You must pass in a Site URL");
        process.exit(1);
    }

    let siteArray = createSitesArray(userOptions.sites);
    anotherOne(userOptions.output, siteArray);
}

function RunLighthouseException(error) {
    console.error(`Something went wrong when running Lighthouse: ${error}`);
    process.exit(1);
}

function anotherOne(output, sites) {
    for(let i = 0; i < sites.length; i++) {
        let formattedSites = sites[i];
        let outputName = formattedSites.replace(/\//g, '');

        async.parallel([
            function () {
                cmd.get(
                    `lighthouse ${formattedSites} --quiet --output=${output} --output-path=${outputName}.${output} --chrome-flags="--headless"`,
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
