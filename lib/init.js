// 初始化模板文件
const fs = require('fs');
const inquirer = require('inquirer');
const ora = require('ora');
const chalk = require('chalk');
const symbols = require('log-symbols');
const download = require('download-git-repo');

module.exports = function () {
  inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: '请输入项目名称',
      validate (val) {
        if (!val) {
            return '请输入项目名称';
        }
        if (fs.existsSync(val)) {
            return '您输入的项目名称已存在，请更换项目名称';
        } else {
            return true;
        }
    }
    }
  ]).then(async(answers) => {
    try {
      const projectName = answers.projectName;
      const spinner = ora('正在创建...');
      spinner.start();
      download('direct:https://gitee.com/xinsiroffice/xinsirnuxt', projectName, { clone: true }, function (err) {
        if (err) {
          spinner.succeed();
          console.log(symbols.success, chalk.green(`${projectName}创建成功！`));
          console.log(`
            cd ${projectName}
            npm run install
            npm run dev

            更多相关信息，请查看README
          `);
        } else {
          spinner.fail();
          console.log(symbols.error, chalk.red('项目模板创建失败！请尝试使用：\n git clone https://gitee.com/xinsiroffice/xinsirnuxt'));
        }
      })
    } catch (error) {
      spinner.fail();
      console.log(symbols.error, chalk.red('项目模板创建失败'));
      console.log(symbols.error, chalk.red(error));
    }
  })
}
