import React from 'react';
import * as _ from 'lodash';
import styles from "../../css/ExternalAPIComponent/ExternalAPIComponent.module.scss";

export type ExternalAPIComponentParams = {
    location: string,
    cssModuleClass: any
}

export async function ExternalAPIComponent(params: ExternalAPIComponentParams) {
    const res = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${params.location}&appid=1f3c5ae0f38df8fd7bc09ad6874a4039`);
    const data = await res.json();

    return <div className={['ExternalAPIComponent', styles.ExternalAPIComponent, params.cssModuleClass].join(' ')}>
        <h2>Weather in {data.name}</h2>
        <table className={"table"}>
            <tbody>
            <tr>
                <th>Weather</th>
                <td>{_.get(data, 'weather.0.main')}</td>
            </tr>
            <tr>
                <th>Temperature</th>
                <td>{parseInt(_.get(data, 'main.temp')) - 273} C</td>
            </tr>
            <tr>
                <th>Feel temperature</th>
                <td>{parseInt(_.get(data, 'main.feels_like')) - 273} C</td>
            </tr>
            <tr>
                <th>Humidity</th>
                <td>{_.get(data, 'main.humidity')}</td>
            </tr>
            <tr>
                <th>Pressure</th>
                <td>{_.get(data, 'main.pressure')}</td>
            </tr>
            <tr>
                <th>Wind speed</th>
                <td>{_.get(data, 'wind.speed')}</td>
            </tr>
            </tbody>
        </table>
    </div>;
}

