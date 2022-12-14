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
exports.end = exports.installFeature = exports.installDevEnviroment = exports.installTypesNode = exports.initSrc = exports.installTSAndInit = exports.changePackageInfo = exports.initProjectDir = exports.selectFeature = exports.isFileExist = void 0;
/**
 * create ?????????????????????????????????
 */
var common_1 = require("../utils/common");
var fs_1 = require("fs");
var inquirer_1 = require("inquirer");
var chalk_1 = require("chalk");
var shell = require("shelljs");
var installFeatureMethod = require("./installFeature");
/**
 * ?????????????????????????????????????????????????????????????????????????????????
 * @param filename ?????????
 */
function isFileExist(filename) {
    // ????????????
    var file = (0, common_1.getProjectPath)(filename);
    // ??????????????????????????????????????????????????????
    if ((0, fs_1.existsSync)(file)) {
        (0, common_1.printMsg)((0, chalk_1.red)("".concat(file, " \u5DF2\u7ECF\u5B58\u5728")));
        process.exit(1);
    }
}
exports.isFileExist = isFileExist;
/**
 * ?????????????????????????????????????????????????????????
 * return ['ESLint', 'Prettier', 'CZ']
 */
function selectFeature() {
    return __awaiter(this, void 0, void 0, function () {
        var feature;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // ???????????????
                    (0, common_1.clearConsole)();
                    // ????????????
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
 * ?????????????????????
 */
function initProjectDir(projectName) {
    (0, common_1.printMsg)((0, chalk_1.cyan)("Making dir: ".concat(projectName, "...")));
    shell.exec("mkdir ".concat(projectName));
    shell.cd(projectName);
    (0, common_1.printMsg)('Initting package.json...');
    shell.exec('npm init -y');
}
exports.initProjectDir = initProjectDir;
/**
 * ??????????????? package.json ??? name???description
 */
function changePackageInfo(projectName) {
    var packageJSON = (0, common_1.readJsonFile)('./package.json');
    packageJSON.name = packageJSON.description = projectName;
    (0, common_1.writeJsonFile)('./package.json', packageJSON);
}
exports.changePackageInfo = changePackageInfo;
/**
 * ?????? typescript ????????????
 */
function installTSAndInit() {
    (0, common_1.printMsg)((0, chalk_1.cyan)('Installing typescript...'));
    // ?????? typescript ??????????????? tsc --init ?????? tsconfig.json
    shell.exec('npm i typescript -D && npx tsc --init');
    // ?????? tsconfig.json
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
    (0, common_1.printMsg)((0, chalk_1.cyan)('Generatting tsconfig.json...'));
    (0, common_1.writeJsonFile)('./tsconfig.json', tsconfigJson);
}
exports.installTSAndInit = installTSAndInit;
function initSrc() {
    // ?????? src ????????? /src/index.ts
    shell.exec('mkdir src && touch src/index.ts');
}
exports.initSrc = initSrc;
/**
 * ?????? @types/node
 * ?????? node.js ??????????????????
 */
function installTypesNode() {
    (0, common_1.printMsg)((0, chalk_1.cyan)('Installing @types/node...'));
    shell.exec('npm i @types/node -D');
}
exports.installTypesNode = installTypesNode;
/**
 * ???????????????????????????????????????
 */
function installDevEnviroment() {
    (0, common_1.printMsg)((0, chalk_1.cyan)('Initializing development environment...'));
    shell.exec('npm i ts-node-dev -D');
    /**
     * ??? package.json ??? scripts ?????????????????????
     * "dev:comment": "??????????????????",
     * "dev": "ts-node-dev --respawn --transpile-only src/index.ts"
     */
    var packageJson = (0, common_1.readJsonFile)('./package.json');
    packageJson.scripts['dev:comment'] = '??????????????????';
    packageJson.scripts['dev'] =
        'ts-node-dev --respawn --transpile-only src/index.ts';
    (0, common_1.writeJsonFile)('./package.json', packageJson);
}
exports.installDevEnviroment = installDevEnviroment;
/**
 * ???????????????????????????
 * @param feature ????????????
 */
function installFeature(feature) {
    feature.forEach(function (item) {
        var func = installFeatureMethod["install".concat(item)];
        func();
    });
    // ?????? husky ??? lint-staged
    installHusky(feature);
    // ??????????????????
    installFeatureMethod.installBuild(feature);
}
exports.installFeature = installFeature;
/**
 * ?????? husky ??? lint-staged????????????????????????????????????
 * @param feature ???????????????????????????
 */
function installHusky(feature) {
    (0, common_1.printMsg)((0, chalk_1.cyan)('Initializing husky...'));
    // feature ??????
    var featureBak = JSON.parse(JSON.stringify(feature));
    // ?????? hook
    var hooks = {};
    // ??????????????????????????? CZ??????????????? hooks
    if (featureBak.includes('CZ')) {
        hooks['commit-msg'] = 'commitlint -E HUSKY_GIT_PARAMS';
    }
    // ?????? lintStaged
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
 * ????????????????????????????????????????????????
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2NyZWF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7R0FFRztBQUNILDBDQVF5QjtBQUN6Qix5QkFBZ0M7QUFDaEMscUNBQWtDO0FBQ2xDLCtCQUFzRDtBQUN0RCwrQkFBaUM7QUFDakMsdURBQXlEO0FBRXpEOzs7R0FHRztBQUNILFNBQWdCLFdBQVcsQ0FBQyxRQUFnQjtJQUMxQyxPQUFPO0lBQ1AsSUFBTSxJQUFJLEdBQUcsSUFBQSx1QkFBYyxFQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3RDLHFCQUFxQjtJQUNyQixJQUFJLElBQUEsZUFBVSxFQUFDLElBQUksQ0FBQyxFQUFFO1FBQ3BCLElBQUEsaUJBQVEsRUFBQyxJQUFBLFdBQUcsRUFBQyxVQUFHLElBQUksOEJBQU8sQ0FBQyxDQUFDLENBQUM7UUFDOUIsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNqQjtBQUNILENBQUM7QUFSRCxrQ0FRQztBQUVEOzs7R0FHRztBQUNILFNBQXNCLGFBQWE7Ozs7OztvQkFDakMsUUFBUTtvQkFDUixJQUFBLHFCQUFZLEdBQUUsQ0FBQztvQkFDZixPQUFPO29CQUNQLHVEQUF1RDtvQkFDdkQsSUFBQSxpQkFBUSxFQUFDLElBQUEsWUFBSSxFQUFDLGtCQUFXLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLE9BQU8sQ0FBRSxDQUFDLENBQUMsQ0FBQztvQkFDbkUsSUFBQSxpQkFBUSxFQUFDLGlDQUFpQyxDQUFDLENBQUM7b0JBQzVDLElBQUEsaUJBQVEsRUFBQyxFQUFFLENBQUMsQ0FBQztvQkFHTyxxQkFBTSxJQUFBLGlCQUFNLEVBQUM7NEJBQy9CO2dDQUNFLElBQUksRUFBRSxTQUFTO2dDQUNmLElBQUksRUFBRSxVQUFVO2dDQUNoQixPQUFPLEVBQUUsNENBQTRDO2dDQUNyRCxPQUFPLEVBQUU7b0NBQ1AsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUU7b0NBQ25DLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFO29DQUN2QyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRTtpQ0FDNUI7NkJBQ0Y7eUJBQ0YsQ0FBQyxFQUFBOztvQkFYTSxPQUFPLEdBQUssQ0FBQSxTQVdsQixDQUFBLFFBWGE7b0JBYWYsc0JBQU8sT0FBd0IsRUFBQzs7OztDQUNqQztBQXhCRCxzQ0F3QkM7QUFFRDs7R0FFRztBQUNILFNBQWdCLGNBQWMsQ0FBQyxXQUFtQjtJQUNoRCxJQUFBLGlCQUFRLEVBQUMsSUFBQSxZQUFJLEVBQUMsc0JBQWUsV0FBVyxRQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ2hELEtBQUssQ0FBQyxJQUFJLENBQUMsZ0JBQVMsV0FBVyxDQUFFLENBQUMsQ0FBQztJQUNuQyxLQUFLLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3RCLElBQUEsaUJBQVEsRUFBQywwQkFBMEIsQ0FBQyxDQUFDO0lBQ3JDLEtBQUssQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDNUIsQ0FBQztBQU5ELHdDQU1DO0FBRUQ7O0dBRUc7QUFDSCxTQUFnQixpQkFBaUIsQ0FBQyxXQUFtQjtJQUNuRCxJQUFNLFdBQVcsR0FBZ0IsSUFBQSxxQkFBWSxFQUFjLGdCQUFnQixDQUFDLENBQUM7SUFDN0UsV0FBVyxDQUFDLElBQUksR0FBRyxXQUFXLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztJQUN6RCxJQUFBLHNCQUFhLEVBQWMsZ0JBQWdCLEVBQUUsV0FBVyxDQUFDLENBQUM7QUFDNUQsQ0FBQztBQUpELDhDQUlDO0FBRUQ7O0dBRUc7QUFDSCxTQUFnQixnQkFBZ0I7SUFDOUIsSUFBQSxpQkFBUSxFQUFDLElBQUEsWUFBSSxFQUFDLDBCQUEwQixDQUFDLENBQUMsQ0FBQztJQUMzQyxrREFBa0Q7SUFDbEQsS0FBSyxDQUFDLElBQUksQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO0lBQ3BELG1CQUFtQjtJQUNuQixJQUFNLFlBQVksR0FBUztRQUN6QixhQUFhLEVBQUUsSUFBSTtRQUNuQixlQUFlLEVBQUU7WUFDZixNQUFNLEVBQUUsUUFBUTtZQUNoQixNQUFNLEVBQUUsVUFBVTtZQUNsQixnQkFBZ0IsRUFBRSxNQUFNO1lBQ3hCLHNCQUFzQixFQUFFLElBQUk7WUFDNUIscUJBQXFCLEVBQUUsSUFBSTtZQUMzQixlQUFlLEVBQUUsSUFBSTtZQUNyQixjQUFjLEVBQUUsSUFBSTtZQUNwQixjQUFjLEVBQUUsSUFBSTtZQUNwQixhQUFhLEVBQUUsSUFBSTtZQUNuQixNQUFNLEVBQUUsSUFBSTtZQUNaLFdBQVcsRUFBRSxJQUFJO1lBQ2pCLE1BQU0sRUFBRSxLQUFLO1lBQ2IsT0FBTyxFQUFFLElBQUk7WUFDYixLQUFLLEVBQUU7Z0JBQ0wsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDO2FBQ2Y7U0FDRjtRQUNELE9BQU8sRUFBRSxDQUFDLEtBQUssRUFBRSxjQUFjLENBQUM7S0FDakMsQ0FBQztJQUNGLElBQUEsaUJBQVEsRUFBQyxJQUFBLFlBQUksRUFBQyw4QkFBOEIsQ0FBQyxDQUFDLENBQUM7SUFDL0MsSUFBQSxzQkFBYSxFQUFPLGlCQUFpQixFQUFFLFlBQVksQ0FBQyxDQUFDO0FBQ3ZELENBQUM7QUE3QkQsNENBNkJDO0FBQ0QsU0FBZ0IsT0FBTztJQUNyQiwyQkFBMkI7SUFDM0IsS0FBSyxDQUFDLElBQUksQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO0FBQ2hELENBQUM7QUFIRCwwQkFHQztBQUNEOzs7R0FHRztBQUNILFNBQWdCLGdCQUFnQjtJQUM5QixJQUFBLGlCQUFRLEVBQUMsSUFBQSxZQUFJLEVBQUMsMkJBQTJCLENBQUMsQ0FBQyxDQUFDO0lBQzVDLEtBQUssQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQztBQUNyQyxDQUFDO0FBSEQsNENBR0M7QUFFRDs7R0FFRztBQUNILFNBQWdCLG9CQUFvQjtJQUNsQyxJQUFBLGlCQUFRLEVBQUMsSUFBQSxZQUFJLEVBQUMseUNBQXlDLENBQUMsQ0FBQyxDQUFDO0lBQzFELEtBQUssQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQztJQUNuQzs7OztPQUlHO0lBQ0gsSUFBTSxXQUFXLEdBQUcsSUFBQSxxQkFBWSxFQUFjLGdCQUFnQixDQUFDLENBQUM7SUFDaEUsV0FBVyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsR0FBRyxRQUFRLENBQUM7SUFDOUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7UUFDeEIscURBQXFELENBQUM7SUFDeEQsSUFBQSxzQkFBYSxFQUFjLGdCQUFnQixFQUFFLFdBQVcsQ0FBQyxDQUFDO0FBQzVELENBQUM7QUFiRCxvREFhQztBQUVEOzs7R0FHRztBQUNILFNBQWdCLGNBQWMsQ0FBQyxPQUFzQjtJQUNuRCxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBSTtRQUNuQixJQUFNLElBQUksR0FBRyxvQkFBb0IsQ0FDL0IsaUJBQVUsSUFBSSxDQUFFLENBQ1EsQ0FBQztRQUMzQixJQUFJLEVBQUUsQ0FBQztJQUNULENBQUMsQ0FBQyxDQUFDO0lBQ0gseUJBQXlCO0lBQ3pCLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN0QixTQUFTO0lBQ1Qsb0JBQW9CLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzdDLENBQUM7QUFYRCx3Q0FXQztBQUVEOzs7R0FHRztBQUNILFNBQVMsWUFBWSxDQUFDLE9BQXNCO0lBQzFDLElBQUEsaUJBQVEsRUFBQyxJQUFBLFlBQUksRUFBQyx1QkFBdUIsQ0FBQyxDQUFDLENBQUM7SUFDeEMsYUFBYTtJQUNiLElBQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBRXZELFVBQVU7SUFDVixJQUFNLEtBQUssR0FBRyxFQUFFLENBQUM7SUFDakIsMEJBQTBCO0lBQzFCLElBQUksVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUM3QixLQUFLLENBQUMsWUFBWSxDQUFDLEdBQUcsZ0NBQWdDLENBQUM7S0FDeEQ7SUFFRCxnQkFBZ0I7SUFDaEIsSUFBTSxVQUFVLEdBQWtCLEVBQUUsQ0FBQztJQUNyQyxJQUFJLFVBQVUsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDakMsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztLQUMzQjtJQUNELElBQUksVUFBVSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBRTtRQUNuQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBQzdCO0lBRUQsb0JBQW9CLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxVQUFVLENBQUMsQ0FBQztBQUN2RCxDQUFDO0FBRUQ7O0dBRUc7QUFDSCxTQUFnQixHQUFHLENBQUMsV0FBbUI7SUFDckMsSUFBQSxpQkFBUSxFQUFDLHVDQUFnQyxJQUFBLGNBQU0sRUFBQyxXQUFXLENBQUMsQ0FBRSxDQUFDLENBQUM7SUFDaEUsSUFBQSxpQkFBUSxFQUFDLDBDQUEwQyxDQUFDLENBQUM7SUFDckQsSUFBQSxpQkFBUSxFQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2IsSUFBQSxpQkFBUSxFQUFDLFVBQUcsSUFBQSxZQUFJLEVBQUMsR0FBRyxDQUFDLGNBQUksSUFBQSxZQUFJLEVBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQyxDQUFFLENBQUMsQ0FBQztJQUN0RCxJQUFBLGlCQUFRLEVBQUMsVUFBRyxJQUFBLFlBQUksRUFBQyxHQUFHLENBQUMsY0FBSSxJQUFBLFlBQUksRUFBQyxhQUFhLENBQUMsQ0FBRSxDQUFDLENBQUM7SUFDaEQsSUFBQSxpQkFBUSxFQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ2YsQ0FBQztBQVBELGtCQU9DIn0=