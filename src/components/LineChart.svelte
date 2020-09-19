<script>
    import moment from 'moment';
    import FusionCharts from 'fusioncharts';
    import Charts from 'fusioncharts/fusioncharts.charts';
    import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
    import SvelteFC, { fcRoot } from 'svelte-fusioncharts';
    export let transactions;
    fcRoot(FusionCharts, Charts, FusionTheme);
    let dataSource = {
        chart: {
            caption: 'Balance',
            xAxisname: 'Time    ',
            yAxisName: 'Amount (In USD)',
            numberPrefix: '$',
            enableMultiSlicing: '1',
            theme: 'fusion',
        },
        data: transactions.map(transaction => ({
            label: moment(transaction.date).format('MMMM Do YYYY'),
            value: transaction.newBalance,
        })).reverse(),
    };

    let chartConfig = {
        type: 'line',
        width: '600',
        height: '400',
        renderAt: 'chart-container',
        dataSource,
    };
</script>

<div id="chart-container">
    <SvelteFC {...chartConfig} />
</div>
