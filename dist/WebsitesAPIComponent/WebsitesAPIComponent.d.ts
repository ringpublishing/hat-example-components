import { ComponentParams } from "hat-ring-components/dist/types/types";
export interface WebsitesAPIComponentParams extends ComponentParams {
    config: {
        limit: number;
        offset: number;
    };
}
export declare function WebsitesAPIComponent(params: WebsitesAPIComponentParams): Promise<JSX.Element>;
