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
        while (_) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeTemplates = exports.evaluateTemplates = exports.readTemplateFiles = exports.ensureRoot = void 0;
var path_1 = require("path");
var fs_extra_1 = require("fs-extra");
var handlebars_1 = __importDefault(require("handlebars"));
exports.ensureRoot = function () { return __awaiter(void 0, void 0, void 0, function () {
    var cwd, packageJsonExists, srcExists;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                cwd = process.cwd();
                return [4 /*yield*/, fs_extra_1.pathExists(path_1.join(cwd, 'package.json'))];
            case 1:
                packageJsonExists = _a.sent();
                return [4 /*yield*/, fs_extra_1.pathExists(path_1.join(cwd, '/src'))];
            case 2:
                srcExists = _a.sent();
                if (!packageJsonExists || !srcExists) {
                    throw new Error('s-scripts must be run in the project root.');
                }
                return [2 /*return*/];
        }
    });
}); };
exports.readTemplateFiles = function (templatePath, templateFiles) { return Promise.all(templateFiles.map(function (templateFile) {
    var targetPath = path_1.join(__dirname, '../../template_files/', templatePath, templateFile);
    return fs_extra_1.readFile(targetPath, 'utf8');
})); };
exports.evaluateTemplates = function (templates, data) {
    handlebars_1.default.registerHelper('toInterfaceName', function (str) { return "" + str[0].toUpperCase() + str.substring(1) + "State"; });
    return templates.map(function (template) {
        var renderer = handlebars_1.default.compile(template);
        return renderer(data);
    });
};
exports.writeTemplates = function (projectPath, files, data) { return Promise.all(files.map(function (file, i) { return __awaiter(void 0, void 0, void 0, function () {
    var target;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                target = path_1.join(process.cwd(), projectPath, file);
                return [4 /*yield*/, fs_extra_1.ensureFile(target)];
            case 1:
                _a.sent();
                return [4 /*yield*/, fs_extra_1.writeFile(target, data[i])];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })); };
exports.default = (function (name) { return __awaiter(void 0, void 0, void 0, function () {
    var storeTemplates, evaluatedTemplates, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('Creating store: ', __dirname);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                return [4 /*yield*/, exports.ensureRoot()];
            case 2:
                _a.sent();
                return [4 /*yield*/, exports.readTemplateFiles('store', [
                        'store.ts',
                        'store.test.ts',
                    ])];
            case 3:
                storeTemplates = _a.sent();
                evaluatedTemplates = exports.evaluateTemplates(storeTemplates, { name: name });
                return [4 /*yield*/, exports.writeTemplates('src/stores', [
                        name + ".ts",
                        name + ".test.ts",
                    ], evaluatedTemplates)];
            case 4:
                _a.sent();
                return [3 /*break*/, 6];
            case 5:
                e_1 = _a.sent();
                console.log(e_1.message);
                process.exit(1);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=createStore.js.map