/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';

// chart options
const barChartOptions = {
    chart: {
        type: 'bar',
        height: 365,
        toolbar: {
            show: false
        }
    },
    plotOptions: {
        bar: {
            columnWidth: '45%',
            borderRadius: 4
        }
    },
    dataLabels: {
        enabled: false
    },
    xaxis: {
        categories: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
        axisBorder: {
            show: false
        },
        axisTicks: {
            show: false
        }
    },
    yaxis: {
        show: false
    },
    grid: {
        show: false
    }
};

// ==============================|| MONTHLY BAR CHART ||============================== //

const MonthlyBarChart = ({values, dates}) => {
    const theme = useTheme();

    const { primary, secondary } = theme.palette.text;
    const info = theme.palette.info.light;

    const [series, setSeries] = useState([
        {
            data: [...values]
        }
    ]);

    useEffect(() => {
        setSeries([{ data: [...values] }])
        setOptions({
            ...barChartOptions,
            xaxis: { ...barChartOptions.xaxis, categories: [...dates] },
        });
    }, [values, setSeries])

    const [options, setOptions] = useState({...barChartOptions, xaxis:{...barChartOptions.xaxis, categories:[...dates]}});

    useEffect(() => {
        setOptions((prevState) => ({
            ...prevState,
            colors: [info],
            xaxis: {
                labels: {
                    style: {
                        colors: [secondary, secondary, secondary, secondary, secondary, secondary, secondary]
                    }
                }
            },
            tooltip: {
                theme: 'light'
            }
        }));
    }, [primary, info, secondary]);

    return (
        // eslint-disable-next-line react/react-in-jsx-scope
        <div id="chart">
            <ReactApexChart options={options} series={series} type="bar" height={365} />
        </div>
    );
};

export default MonthlyBarChart;