'use strict';

const cmd = require('node-cmd');
const async = require('async');

module.exports = executeLighthouse;

function createSitesArray(sites) {
    return sites.split(',');
}

function executeLighthouse(userOptions) {

    if (userOptions.sites === null || userOptions.sites === undefined) {
        console.error("You must pass in a Site URL");
        process.exit(1);
    }

    let siteArray = createSitesArray(userOptions.sites);
    runCustomLighthouse(userOptions.output, siteArray);
}

function RunLighthouseException(error) {
    console.error(`Something went wrong when running Lighthouse: ${error}`);
    process.exit(1);
}

function runCustomLighthouse(output, sites) {
    for(let i = 0; i < sites.length; i++) {
        let _formattedSites = sites[i];
        let _outputName = _formattedSites.replace(/\//g, '');
        let _outputFile = `${_outputName}.${output}`;

        async.parallel([
            function () {
                cmd.get(
                    `lighthouse ${_formattedSites} --quiet --output=${output} --output-path=${_outputFile} --chrome-flags="--headless"`,
                    function(error){
                        if (error) {
                            throw new RunLighthouseException(error);
                        }
                        require('./../node_modules/lighthouse-quaggy/dist/slackChannel')(_formattedSites, _outputFile);
                    }
                )
            }
        ], function (error) {
            throw new RunLighthouseException(error);
        });
    }
}
