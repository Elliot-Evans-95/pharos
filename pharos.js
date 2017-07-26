#!/usr/bin/env node
'use strict'

const cmd = require('node-cmd');
const async = require('async');

console.log(program);

async.parallel( [

    function () {
        cmd.run('lighthouse http://peugeotoffers.localiis/ --quiet');
    },

    function () {
        cmd.run('lighthouse http://motorradoffers.localiis/ --quiet');
    },

    function () {
        cmd.run('lighthouse http://minioffers.localiis/ --quiet');
    }

], function ( error) {
    throw error;
} );
