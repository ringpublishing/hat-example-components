"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExternalAPIComponent = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const _ = __importStar(require("lodash"));
const ExternalAPIComponent_module_scss_1 = __importDefault(require("../../css/ExternalAPIComponent/ExternalAPIComponent.module.scss"));
async function ExternalAPIComponent(params) {
    const res = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${params.location}&appid=1f3c5ae0f38df8fd7bc09ad6874a4039`);
    const data = await res.json();
    return (0, jsx_runtime_1.jsxs)("div", { className: ['ExternalAPIComponent', ExternalAPIComponent_module_scss_1.default.ExternalAPIComponent, params.cssModuleClass].join(' '), children: [(0, jsx_runtime_1.jsxs)("h2", { children: ["Weather in ", data.name] }), (0, jsx_runtime_1.jsx)("table", { className: "table", children: (0, jsx_runtime_1.jsxs)("tbody", { children: [(0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("th", { children: "Weather" }), (0, jsx_runtime_1.jsx)("td", { children: _.get(data, 'weather.0.main') })] }), (0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("th", { children: "Temperature" }), (0, jsx_runtime_1.jsxs)("td", { children: [parseInt(_.get(data, 'main.temp')) - 273, " C"] })] }), (0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("th", { children: "Feel temperature" }), (0, jsx_runtime_1.jsxs)("td", { children: [parseInt(_.get(data, 'main.feels_like')) - 273, " C"] })] }), (0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("th", { children: "Humidity" }), (0, jsx_runtime_1.jsx)("td", { children: _.get(data, 'main.humidity') })] }), (0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("th", { children: "Pressure" }), (0, jsx_runtime_1.jsx)("td", { children: _.get(data, 'main.pressure') })] }), (0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("th", { children: "Wind speed" }), (0, jsx_runtime_1.jsx)("td", { children: _.get(data, 'wind.speed') })] })] }) })] });
}
exports.ExternalAPIComponent = ExternalAPIComponent;
//# sourceMappingURL=ExternalAPIComponent.js.map