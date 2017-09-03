#!/usr/bin/env node
"use strict";var program=require("commander"),executeLighthouse=require("./run"),projectVersion=require("./package.json").version;program.version(projectVersion).option("-s, --sites <sites>","What url(s) should lighthouse run").option("-out, --output <output>","To determine what type of output you would like").option("-slack, --slack-token <token>","Slack Token to pass the result to your channel").parse(process.argv),executeLighthouse(program);"use strict";function createSitesArray(e){return e.split(",")}function executeLighthouse(e){null!==e.sites&&void 0!==e.sites||process.exit(1);var t=createSitesArray(e.sites);runCustomLighthouse(e.output,t)}function RunLighthouseException(e){process.exit(1)}function runCustomLighthouse(e,t){for(var u=0;u<t.length;u++)!function(u){var i=t[u],o=i.replace(/\//g,""),n=o+"."+e;async.parallel([function(){cmd.get("lighthouse "+i+" --quiet --output="+e+" --output-path="+n+' --chrome-flags="--headless"',function(e){if(e)throw new RunLighthouseException(e);require("lighthouse-quaggy")(i,n)})}],function(e){throw new RunLighthouseException(e)})}(u)}var cmd=require("node-cmd"),async=require("async");module.exports=executeLighthouse;
//# sourceMappingURL=all.js.map