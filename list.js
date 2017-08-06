#!/usr/bin/env node
'use strict';

const program = require('commander');
const runLighthouse = require('./run');
const projectVersion = require('./package.json').version;

program
    .version(projectVersion)
    .option('-s, --sites <sites>', 'What url(s) should lighthouse run')
    .option('-out, --output <output>', 'To determine what type of output you would like')
    .parse(process.argv);

executeLighthouse(program);
