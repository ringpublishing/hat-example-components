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
exports.WebsitesAPIComponent = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const _ = __importStar(require("lodash"));
const graphql_api_client_1 = require("@ringpublishing/graphql-api-client");
const graphql_tag_1 = require("graphql-tag");
const link_1 = __importDefault(require("next/link"));
const WebsitesAPIComponent_module_scss_1 = __importDefault(require("../../css/WebsitesAPIComponent/WebsitesAPIComponent.module.scss"));
const { OcdnUrl } = require('@ras-tech/ocdn');
async function WebsitesAPIComponent(params) {
    const accessKey = process.env.WEBSITE_API_PUBLIC;
    const secretKey = process.env.WEBSITE_API_SECRET;
    const spaceUuid = process.env.WEBSITE_API_NAMESPACE_ID;
    const query = (0, graphql_tag_1.gql) `
        query($limit: Int!, $offset: Int!){
            stories(limit: $limit, offset: $offset) {
                edges {
                    node {
                        id
                        title
                        mainPublicationPoint{
                            url
                        }
                        image{
                            url
                        }
                    }
                }
            }
        }
    `;
    const variables = {
        limit: params.config.limit,
        offset: params.config.offset || 0,
    };
    const websitesApiClient = new graphql_api_client_1.WebsitesApiClientBuilder({ accessKey, secretKey, spaceUuid }).buildApolloClient();
    const response = await websitesApiClient.query({ query, variables });
    const stories = _.get(response, 'data.stories.edges');
    if (!params.context.customData) {
        params.context.customData = { ListItemsIds: [] };
    }
    if (!params.context.customData.ListItemsIds) {
        params.context.customData.ListItemsIds = [];
    }
    return (0, jsx_runtime_1.jsx)("ul", { className: 'WebsitesAPIComponent ' + WebsitesAPIComponent_module_scss_1.default.list, children: stories.map(edge => {
            var _a;
            const node = edge.node;
            const ocdnBucketName = process.env.NEXT_PUBLIC_OCDN_BUCKET_NAME;
            const ocdnTransformKey = process.env.NEXT_PUBLIC_OCDN_TRANSFORM_KEY;
            let imageUrl = (_a = node.image) === null || _a === void 0 ? void 0 : _a.url;
            if (ocdnBucketName && ocdnTransformKey && imageUrl) {
                const cropImage = new OcdnUrl();
                cropImage.init(imageUrl);
                cropImage.setKey(ocdnTransformKey);
                cropImage.setBucket(ocdnBucketName);
                cropImage.resizeCropAuto(200, 120);
                imageUrl = cropImage.getUrl();
            }
            if (params.context.customData.ListItemsIds.includes(node.id)) {
                return null;
            }
            else {
                params.context.customData.ListItemsIds.push(node.id);
                return (0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsxs)(link_1.default, { href: node.mainPublicationPoint.url, children: [node.image ?
                                (0, jsx_runtime_1.jsx)("img", { src: imageUrl }) : null, (0, jsx_runtime_1.jsx)("span", { children: node.title })] }) });
            }
        }) });
}
exports.WebsitesAPIComponent = WebsitesAPIComponent;
//# sourceMappingURL=WebsitesAPIComponent.js.map