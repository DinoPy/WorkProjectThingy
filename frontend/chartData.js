const lineChartData = [
    [
        { x: new Date(2005, 0, 1), y: 21 },
        { x: new Date(2006, 0, 1), y: 24 },
        { x: new Date(2007, 0, 1), y: 36 },
        { x: new Date(2008, 0, 1), y: 38 },
        { x: new Date(2009, 0, 1), y: 54 },
        { x: new Date(2010, 0, 1), y: 57 },
        { x: new Date(2011, 0, 1), y: 70 },
    ],
];
const lineCustomSeries = [
    {
        dataSource: lineChartData[0],
        xName: 'x',
        yName: 'y',
        name: 'Germany',
        width: '2',
        marker: { visible: true, width: 10, height: 10 },
        type: 'Line',
    },
];
