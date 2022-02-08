#!/usr/bin/env node
const program = require('commander');
const chalk = require('chalk');
const init = require('../lib/init');


// 版本号
program.version('1.0.0');

program.on('--help', function() {
  console.log('');
  console.log(chalk.green('xinsirnuxt-cli命令说明'));
  console.log('xinsirnuxt-cli init -- 初始化xinsirnuxt模板');
  console.log('');
});

program.command('init')
  .alias('i')
  .description('初始化xinsirnuxt模板')
  .action(init);


program.parse(process.argv);
  
if (!process.argv.slice(2).length) {
  program.help();
}
