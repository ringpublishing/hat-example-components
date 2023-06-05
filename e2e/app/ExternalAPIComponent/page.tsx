import React from "react";
import {ExternalAPIComponent} from "../../../src";

const component = () => (
    <>
        {/* @ts-expect-error Server Component */}
        <ExternalAPIComponent location={'Szczebrzeszyn'} cssModuleClass={''}/>
    </>
);

export default component;
