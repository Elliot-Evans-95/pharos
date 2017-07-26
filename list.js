#!/usr/bin/env node
'use strict';

const program = require('commander');
const run = require('./run');
const projectVersion = require('./package.json').version;

program
    .version(projectVersion)
    .option('<sites>', 'test sites')
    .parse(process.argv);

run(program);
