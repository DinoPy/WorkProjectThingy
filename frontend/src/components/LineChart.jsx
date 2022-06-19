import React from 'react';
import {
    ChartComponent,
    SeriesCollectionDirective,
    SeriesDirective,
    Inject,
    DateTime,
    Legend,
    Tooltip,
    LineSeries,
} from '@syncfusion/ej2-react-charts';

const LineChart = (props) => {
    const convertToDate = (string) => {
        return new Date(string);
    };

    const groupedDates = (item) =>
        item?.items?.reduce((groupedData, item) => {
            const date = convertToDate(item.createdAt).toLocaleDateString();

            if (!groupedData[date]) {
                groupedData[date] = [item];
            } else {
                groupedData[date].push(item);
            }
            return groupedData;
        }, {});

    const data = props.lists?.map((item) => {
        return {
            dataSource: Object.keys(groupedDates(item)).map((i) => {
                return {
                    x: new Date(i),
                    y: groupedDates(item)[i].length,
                };
            }),
            xName: 'x',
            yName: 'y',
            name: item.name,
            width: '2',
            marker: { visible: true, width: 10, height: 10 },
            type: 'Line',
        };
    });

    console.log(groupedDates(props.lists[0]));

    return (
        <ChartComponent
            id='line-chart'
            height='420px'
            chartArea={{ border: { width: 0 } }}
            tooltip={{ enable: true }}
            background={'rgba(44, 47, 72, 0.25)'}
        >
            <Inject services={[LineSeries, DateTime, Legend, Tooltip]} />
            <SeriesCollectionDirective>
                {data?.map((item, index) => (
                    <SeriesDirective id={index} {...item} />
                ))}
            </SeriesCollectionDirective>
        </ChartComponent>
    );
};

export default LineChart;
