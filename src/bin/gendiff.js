#!/usr/bin/env node

import commander from 'commander';
import diff from '..';

const program = commander;

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((before, after) => console.log(diff(before, after)))
  .parse(process.argv);