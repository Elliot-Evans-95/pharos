'use strict';

const cmd = require('node-cmd');
const async = require('async');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

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

        async.parallel([
            function () {
                cmd.get(
                    `lighthouse ${_formattedSites} --quiet --output=${output} --output-path=${_outputName}.${output} --chrome-flags="--headless"`,
                    function(error){
                        if (error) {
                            throw new RunLighthouseException(error);
                        }
                        //slackChannelLighthouseResult(_formattedSites, _outputName, output)
                    }
                )
            }
        ], function (error) {
            throw new RunLighthouseException(error);
        });
    }
}

function slackChannelLighthouseResult(site, fileName, outputType) {
    const _currentTime = Date.now();
    const _request = new XMLHttpRequest();
    let _url = "https://hooks.slack.com/services/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";

    // if(outputType === 'html') {
    //     let siteResult = getHtmlResult(fileName);
    // } else {
    //     let siteResult = getJsonResult(fileName);
    // }

    let siteResult = '30';
    let _data = JSON.stringify({"text": `Date: ${_currentTime} \n URL: ${site} \n Result: ${siteResult}`});

    _request.open('POST', _url, true);
    _request.setRequestHeader('Content-Type', 'application/json');
    _request.send(_data);
}

function getHtmlResult() {
    return '80';
}

function getJsonResult() {
    return '90';
}
