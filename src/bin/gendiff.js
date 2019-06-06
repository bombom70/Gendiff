#!/usr/bin/env node
import commander from 'commander';

const program = require('commander');

program
  .arguments('<firstConfig> <secondConfig>')
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .parse(process.argv);

if (!program.args.length) program.help();