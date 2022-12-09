"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.end = exports.installFeature = exports.installDevEnviroment = exports.installTypesNode = exports.installTSAndInit = exports.changePackageInfo = exports.initProjectDir = exports.selectFeature = exports.isFileExist = void 0;
/**
 * create 命令需要用到的所有方法
 */
var common_1 = require("../utils/common");
var fs_1 = require("fs");
var inquirer_1 = require("inquirer");
var chalk_1 = require("chalk");
var shell = require("shelljs");
var installFeatureMethod = require("./installFeature");
/**
 * 验证当前目录下是否已经存在指定文件，如果存在则退出进行
 * @param filename 文件名
 */
function isFileExist(filename) {
    // 文件路径
    var file = (0, common_1.getProjectPath)(filename);
    // 验证文件是否已经存在，存在则推出进程
    if ((0, fs_1.existsSync)(file)) {
        (0, common_1.printMsg)((0, chalk_1.red)("".concat(file, " \u5DF2\u7ECF\u5B58\u5728")));
        process.exit(1);
    }
}
exports.isFileExist = isFileExist;
/**
 * 交互式命令行，让用户自己选择需要的功能
 * return ['ESLint', 'Prettier', 'CZ']
 */
function selectFeature() {
    return __awaiter(this, void 0, void 0, function () {
        var feature;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // 清空命令行
                    (0, common_1.clearConsole)();
                    // 输出信息
                    /* eslint-disable @typescript-eslint/no-var-requires */
                    (0, common_1.printMsg)((0, chalk_1.blue)("TS CLI v".concat(require('../../package.json').version)));
                    (0, common_1.printMsg)('Start initializing the project:');
                    (0, common_1.printMsg)('');
                    return [4 /*yield*/, (0, inquirer_1.prompt)([
                            {
                                name: 'feature',
                                type: 'checkbox',
                                message: 'Check the features needed for your project',
                                choices: [
                                    { name: 'ESLint', value: 'ESLint' },
                                    { name: 'Prettier', value: 'Prettier' },
                                    { name: 'CZ', value: 'CZ' },
                                ],
                            },
                        ])];
                case 1:
                    feature = (_a.sent()).feature;
                    return [2 /*return*/, feature];
            }
        });
    });
}
exports.selectFeature = selectFeature;
/**
 * 初始化项目目录
 */
function initProjectDir(projectName) {
    shell.exec("mkdir ".concat(projectName));
    shell.cd(projectName);
    shell.exec('npm init -y');
}
exports.initProjectDir = initProjectDir;
/**
 * 改写项目中 package.json 的 name、description
 */
function changePackageInfo(projectName) {
    var packageJSON = (0, common_1.readJsonFile)('./package.json');
    packageJSON.name = packageJSON.description = projectName;
    (0, common_1.writeJsonFile)('./package.json', packageJSON);
}
exports.changePackageInfo = changePackageInfo;
/**
 * 安装 typescript 并初始化
 */
function installTSAndInit() {
    // 安装 typescript 并执行命令 tsc --init 生成 tsconfig.json
    shell.exec('npm i typescript -D && npx tsc --init');
    // 覆写 tsconfig.json
    var tsconfigJson = {
        compileOnSave: true,
        compilerOptions: {
            target: 'ES2018',
            module: 'commonjs',
            moduleResolution: 'node',
            experimentalDecorators: true,
            emitDecoratorMetadata: true,
            inlineSourceMap: true,
            noImplicitThis: true,
            noUnusedLocals: true,
            stripInternal: true,
            pretty: true,
            declaration: true,
            outDir: 'lib',
            baseUrl: './',
            paths: {
                '*': ['src/*'],
            },
        },
        exclude: ['lib', 'node_modules'],
    };
    (0, common_1.writeJsonFile)('./tsconfig.json', tsconfigJson);
    // 创建 src 目录和 /src/index.ts
    shell.exec('mkdir src && touch src/index.ts');
}
exports.installTSAndInit = installTSAndInit;
/**
 * 安装 @types/node
 * 这是 node.js 的类型定义包
 */
function installTypesNode() {
    shell.exec('npm i @types/node -D');
}
exports.installTypesNode = installTypesNode;
/**
 * 安装开发环境，支持实时编译
 */
function installDevEnviroment() {
    shell.exec('npm i ts-node-dev -D');
    /**
     * 在 package.json 的 scripts 中增加如下内容
     * "dev:comment": "启动开发环境",
     * "dev": "ts-node-dev --respawn --transpile-only src/index.ts"
     */
    var packageJson = (0, common_1.readJsonFile)('./package.json');
    packageJson.scripts['dev:comment'] = '启动开发环境';
    packageJson.scripts['dev'] =
        'ts-node-dev --respawn --transpile-only src/index.ts';
    (0, common_1.writeJsonFile)('./package.json', packageJson);
}
exports.installDevEnviroment = installDevEnviroment;
/**
 * 安装用户选择的功能
 * @param feature 功能列表
 */
function installFeature(feature) {
    feature.forEach(function (item) {
        var func = installFeatureMethod["install".concat(item)];
        func();
    });
    // 安装 husky 和 lint-staged
    installHusky(feature);
    // 安装构建工具
    installFeatureMethod.installBuild(feature);
}
exports.installFeature = installFeature;
/**
 * 安装 husky 和 lint-staged，并根据功能设置相关命令
 * @param feature 用户选择的功能列表
 */
function installHusky(feature) {
    // feature 副本
    var featureBak = JSON.parse(JSON.stringify(feature));
    // 设置 hook
    var hooks = {};
    // 判断用户是否选择了 CZ，有则设置 hooks
    if (featureBak.includes('CZ')) {
        hooks['commit-msg'] = 'commitlint -E HUSKY_GIT_PARAMS';
    }
    // 设置 lintStaged
    var lintStaged = [];
    if (featureBak.includes('ESLint')) {
        lintStaged.push('eslint');
    }
    if (featureBak.includes('Prettier')) {
        lintStaged.push('prettier');
    }
    installFeatureMethod.installHusky(hooks, lintStaged);
}
/**
 * 整个项目安装结束，给用户提示信息
 */
function end(projectName) {
    (0, common_1.printMsg)("Successfully created project ".concat((0, chalk_1.yellow)(projectName)));
    (0, common_1.printMsg)('Get started with the following commands:');
    (0, common_1.printMsg)('');
    (0, common_1.printMsg)("".concat((0, chalk_1.gray)('$'), " ").concat((0, chalk_1.cyan)('cd ' + projectName)));
    (0, common_1.printMsg)("".concat((0, chalk_1.gray)('$'), " ").concat((0, chalk_1.cyan)('npm run dev')));
    (0, common_1.printMsg)('');
}
exports.end = end;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2NyZWF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7R0FFRztBQUNILDBDQVF5QjtBQUN6Qix5QkFBZ0M7QUFDaEMscUNBQWtDO0FBQ2xDLCtCQUFzRDtBQUN0RCwrQkFBaUM7QUFDakMsdURBQXlEO0FBRXpEOzs7R0FHRztBQUNILFNBQWdCLFdBQVcsQ0FBQyxRQUFnQjtJQUMxQyxPQUFPO0lBQ1AsSUFBTSxJQUFJLEdBQUcsSUFBQSx1QkFBYyxFQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3RDLHFCQUFxQjtJQUNyQixJQUFJLElBQUEsZUFBVSxFQUFDLElBQUksQ0FBQyxFQUFFO1FBQ3BCLElBQUEsaUJBQVEsRUFBQyxJQUFBLFdBQUcsRUFBQyxVQUFHLElBQUksOEJBQU8sQ0FBQyxDQUFDLENBQUM7UUFDOUIsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNqQjtBQUNILENBQUM7QUFSRCxrQ0FRQztBQUVEOzs7R0FHRztBQUNILFNBQXNCLGFBQWE7Ozs7OztvQkFDakMsUUFBUTtvQkFDUixJQUFBLHFCQUFZLEdBQUUsQ0FBQztvQkFDZixPQUFPO29CQUNQLHVEQUF1RDtvQkFDdkQsSUFBQSxpQkFBUSxFQUFDLElBQUEsWUFBSSxFQUFDLGtCQUFXLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLE9BQU8sQ0FBRSxDQUFDLENBQUMsQ0FBQztvQkFDbkUsSUFBQSxpQkFBUSxFQUFDLGlDQUFpQyxDQUFDLENBQUM7b0JBQzVDLElBQUEsaUJBQVEsRUFBQyxFQUFFLENBQUMsQ0FBQztvQkFHTyxxQkFBTSxJQUFBLGlCQUFNLEVBQUM7NEJBQy9CO2dDQUNFLElBQUksRUFBRSxTQUFTO2dDQUNmLElBQUksRUFBRSxVQUFVO2dDQUNoQixPQUFPLEVBQUUsNENBQTRD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