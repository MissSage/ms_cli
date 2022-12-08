import { program } from 'commander';
import create from './order/create';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
// ts-cli -v、ts-cli --version
// 临时禁用规则，保证这里可以通过 require 方法获取 package.json 中的版本号
/* eslint-disable @typescript-eslint/no-var-requires */
program
    .version(`${require('../package.json').version}`, '-v --version')
    .usage('<command> [options]');
// ts-cli create newPro
program
    .command('create <app-name>')
    .description('Create new project from => ts-cli create yourProjectName')
    .action(async (name) => {
    // 创建命令具体做的事情都在这里，name 是你指定的 newPro
    await create(name);
});
program.parse(process.argv);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUNwQyxPQUFPLE1BQU0sTUFBTSxnQkFBZ0IsQ0FBQztBQUNwQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQ3ZDLE1BQU0sT0FBTyxHQUFHLGFBQWEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQy9DLDZCQUE2QjtBQUM3QixrREFBa0Q7QUFDbEQsdURBQXVEO0FBQ3ZELE9BQU87S0FDSixPQUFPLENBQUMsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxjQUFjLENBQUM7S0FDaEUsS0FBSyxDQUFDLHFCQUFxQixDQUFDLENBQUM7QUFFaEMsdUJBQXVCO0FBQ3ZCLE9BQU87S0FDSixPQUFPLENBQUMsbUJBQW1CLENBQUM7S0FDNUIsV0FBVyxDQUFDLDBEQUEwRCxDQUFDO0tBQ3ZFLE1BQU0sQ0FBQyxLQUFLLEVBQUUsSUFBWSxFQUFFLEVBQUU7SUFDN0IsbUNBQW1DO0lBQ25DLE1BQU0sTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3JCLENBQUMsQ0FBQyxDQUFDO0FBRUwsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMifQ==