<script>
    const { ipcRenderer } = require('electron');
    import { onMount, afterUpdate } from 'svelte';
    import { links } from 'svelte-routing';

    // Components
    import TransactionList from '../components/TransactionList.svelte';

    let transactions = [];
    let startDate = '';
    let endDate = '';
    let title = '';
    let type = '';
    export let userId;
    onMount(() => {
        ipcRenderer.send('get-user-transactions', { userId });
    });

    const handleSubmit = e => {
        e.preventDefault();
        ipcRenderer.send('transaction-advanced-search', {
            userId,
            startDate: startDate ? startDate : null,
            endDate: endDate ? endDate : null,
            title,
            type: type ? type : null,
        });
    };

    // IPC Listeners
    ipcRenderer.on('user-transactions-sent', (event, data) => {
        const tsx = JSON.parse(data.transactions);
        transactions = tsx;
    });
</script>

<div class="d-flex justify-content-between mt-2" use:links>
    <h3>Transactions</h3>
    <a href="/add-transaction" class="btn btn-primary btn-lg">+</a>
</div>
<form on:submit={handleSubmit}>
    <div class="d-flex justify-content-between p-2">
        <div class="form-group">
            <label>Type</label>
            <select class="form-control" bind:value={type}>
                <option value="">All Types</option>
                <option value="purchase">Purchase</option>
                <option value="income">Income</option>
            </select>
        </div>
        <div class="form-group">
            <label>Title</label>
            <input class="form-control" type="text" bind:value={title} />
        </div>
        <div class="form-group">
            <label>Start Date</label>
            <input class="form-control" type="date" bind:value={startDate} />
        </div>
        <div class="form-group">
            <label>End Date</label>
            <input class="form-control" type="date" bind:value={endDate} />
        </div>
    </div>
    <button type="submit" class="btn btn-primary btn-block mt-2">Search</button>
</form>

<TransactionList {transactions} />
