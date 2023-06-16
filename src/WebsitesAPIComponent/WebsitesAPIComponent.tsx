import React from 'react';
import * as _ from 'lodash';
import { WebsitesApiClientBuilder } from '@ringpublishing/graphql-api-client';
import {gql} from 'graphql-tag';
import Link from "next/link";
import {ComponentParams} from "hat-ring-components/dist/types/types";
import styles from "../../css/WebsitesAPIComponent/WebsitesAPIComponent.module.scss";

export interface WebsitesAPIComponentParams extends ComponentParams {
    config: {
        limit: number,
        offset: number
    }
}

export async function WebsitesAPIComponent(params: WebsitesAPIComponentParams) {
    const accessKey = process.env.WEBSITE_API_PUBLIC!;
    const secretKey = process.env.WEBSITE_API_SECRET!;
    const spaceUuid = process.env.WEBSITE_API_NAMESPACE_ID!;

    const query = gql`
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

    const websitesApiClient = new WebsitesApiClientBuilder({ accessKey, secretKey, spaceUuid }).buildApolloClient();
    const response = await websitesApiClient.query({ query, variables });

    const stories = _.get(response, 'data.stories.edges');
    // @ts-ignore
    if (!params.context.customData) {
        // @ts-ignore
        params.context.customData = {ListItemsIds: []};
    }

    // @ts-ignore
    if (!params.context.customData.ListItemsIds) {
        // @ts-ignore
        params.context.customData.ListItemsIds = [];
    }
    return <ul className={'WebsitesAPIComponent ' + styles.list}>
        {stories.map(edge => {
            const node = edge.node;
            let imageUrl = node.image?.url;

            // @ts-ignore
            if (params.context.customData.ListItemsIds.includes(node.id)) {
                return null;
            } else {
                // @ts-ignore
                params.context.customData.ListItemsIds.push(node.id);
                return <li>
                    <Link href={node.mainPublicationPoint.url}>{node.image ?
                        <img src={imageUrl}/> : null}
                        <span>{node.title}</span>
                    </Link>
                </li>
            }
        })
        }
    </ul>;
}

