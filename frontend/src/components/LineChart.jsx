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
    Category,
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

    const LinePrimaryXAxis = {
        valueType: 'DateTime',
        labelFormat: 'y',
        intervalType: 'Year',
    };

    const LinePrimaryYAxis = {
        labelFormat: '%{value}',
        rangePadding: 'None',
        minimum: 0,
        maximum: 20,
        interval: 1,
        lineStyle: { width: 0 },
        majorTickLines: { width: 0 },
        minorTickLines: { width: 0 },
    };

    return (
        <ChartComponent
            id='line-chart'
            height='420px'
            primaryXAxis={{
                valueType: 'DateTime',
                title: 'Day',
                labelFormat: 'MM/dd',
            }}
            primaryYAxis={{ valueType: 'Double', title: 'No. Errors' }}
            chartArea={{ border: { width: 0 } }}
            tooltip={{ enable: true }}
            background={'rgba(255, 255, 255, 0.15)'}
        >
            <Inject
                services={[LineSeries, DateTime, Legend, Tooltip, Category]}
            />
            <SeriesCollectionDirective>
                {data?.map((item, index) => (
                    <SeriesDirective id={index} {...item} />
                ))}
            </SeriesCollectionDirective>
        </ChartComponent>
    );
};

export default LineChart;
