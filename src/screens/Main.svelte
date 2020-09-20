<script>
    const { ipcRenderer } = require('electron');
    import { onMount } from 'svelte';
    // Components
    import BarChart from '../components/BarChart.svelte';

    let userId;
    let user;
    let transactions = [];
    const date = new Date();
    let startDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        1
    ).toISOString();
    let endDate = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
    ).toISOString();
    onMount(() => {
        userId = localStorage.getItem('userId');
        ipcRenderer.send('get-user', { userId });
        ipcRenderer.send('get-user-transactions-by-date', {
            userId,
            startDate,
            endDate,
        });
    });

    // IPC Listeners
    ipcRenderer.on('user-sent', (event, data) => {
        user = JSON.parse(data.user);
    });
    ipcRenderer.on('user-transactions-sent', (event, data) => {
        const tsx = JSON.parse(data.transactions);
        transactions = tsx;
    });
</script>

<h1>Hello {user ? user.username : ''}</h1>
<h3>
    Your Balance: {#if user}<span
            class={user.balance > 0 ? 'text-success' : 'text-danger'}>
            {user.balance} $
        </span>{/if}
    {#if transactions.length === 0}
        <h4>Loading chart ...</h4>
    {:else}
        <BarChart
            {transactions}
            startDateString={startDate}
            endDateString={endDate} />
    {/if}
</h3>
