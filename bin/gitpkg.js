#!/usr/bin/env node

'use strict'; // eslint-disable-line strict, lines-around-directive

const cli = require('../build/cli').default;

cli(process.argv.slice(2));
