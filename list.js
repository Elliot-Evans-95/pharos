#!/usr/bin/env node
'use strict';

const program = require('commander');
const runLighthouse = require('./run');
const projectVersion = require('./package.json').version;

program
    .version(projectVersion)
    .parse(process.argv);

runLighthouse(program);
