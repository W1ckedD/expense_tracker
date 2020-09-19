<script>
    const { ipcRenderer } = require('electron');
    import { onMount } from 'svelte';

    // Components
    import LineChart from '../components/LineChart.svelte';

    let userId;
    let user;
    let transactions = [];
    onMount(() => {
        userId = localStorage.getItem('userId');
        ipcRenderer.send('get-user', { userId });
        ipcRenderer.send('get-user-transactions', { userId });
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
            class={user.currentBalance > 0 ? 'text-success' : 'text-danger'}>
            {user.currentBalance} $
        </span>{/if}
    {#if transactions.length === 0}
        <h4>Loading transactions ...</h4>
    {:else}
        <LineChart {transactions} />
    {/if}
</h3>
