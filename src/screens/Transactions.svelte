<script>
    const { ipcRenderer } = require('electron');
    import { onMount } from 'svelte';
    import { links } from 'svelte-routing';

    // Components
    import TransactionList from '../components/TransactionList.svelte';

    let transactions = [];

    export let userId;
    onMount(() => {
        ipcRenderer.send('get-user-transactions', { userId });
    });

    // IPC Listeners
    ipcRenderer.on('user-transactions-sent', (event, data) => {
        const tsx = JSON.parse(data.transactions);
        transactions = tsx;
        console.log(transactions);
    });
</script>

<div class="d-flex justify-content-between mt-2" use:links>
    <h3>Transactions</h3>
    <a href="/add-transaction" class="btn btn-primary btn-lg">+</a>
</div>

<TransactionList {transactions} />
