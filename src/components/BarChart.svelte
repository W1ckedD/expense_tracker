<script>
    import { onMount, afterUpdate } from 'svelte';
    import Chart from 'chart.js';
    import moment from 'moment';
    export let transactions;
    export let startDateString;
    export let endDateString;
    let startDate = new Date(startDateString);
    let endDate = new Date(endDateString);
    function createChart() {
        const keys = [];
        for (let i = startDate.getDate(); i <= endDate.getDate(); i++) {
            keys.push(
                moment(
                    new Date(startDate.getFullYear(), startDate.getMonth(), i)
                ).format('MMM Do')
            );
        }
        const values = [];
        for (let i = startDate.getDate(); i <= endDate.getDate(); i++) {
            const days = transactions.filter(
                transaction =>
                    new Date(transaction.date).getDate() == i &&
                    transaction.type === 'purchase'
            );
            if (!days) {
                values.push(0);
            } else {
                const expenses = days.map(transaction => transaction.amount);
                const sum = expenses.reduce((acc, item) => {
                    return acc + item;
                }, 0);
                values.push(sum);
            }
        }
        const canvas = document.getElementById('chart');
        const chart = new Chart(canvas, {
            type: 'bar',
            data: {
                labels: keys,
                datasets: [
                    {
                        label: 'Monthly Expenses',
                        data: values,
                        backgroundColor: '#2780e3',
                    },
                ],
            },
            options: {
                scales: {
                    yAxes: [
                        {
                            scaleLabel: {
                                display: true,
                                labelString: 'US $',
                            },
                        },
                    ],
                },
            },
        });
    }
    onMount(createChart);
    afterUpdate(createChart);
</script>

<canvas id="chart" />
