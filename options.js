#!/usr/bin/env node
'use strict'

const program = require('commander')
const execute = require('./pharos')

program
  .version(require('./package.json').version)
  .option('--sites <sites>', 'a comma delimited list of site urls to analyze with Lighthouse', (str) => str.split(','), [])
  .parse(process.argv)

execute(program)