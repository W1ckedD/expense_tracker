<script>
    const { ipcRenderer } = require('electron');
    import { navigate } from 'svelte-routing';
    export let userId;
    let error;
    let title = '';
    let desc = '';
    let type = '';
    let amount = 0;
    let date = '';
    const handleSubmit = e => {
        e.preventDefault();
        if (!type) {
            error = 'Please select a type';
            return;
        }
        if (!title) {
            error = 'Please enter a title';
            return;
        }
        if (!amount) {
            error = 'Please enter an amount';
            return;
        }
        const transaction = {
            userId,
            type,
            title,
            desc,
            amount
        };
        if (date) {
            transaction['date'] = date;
        }
        ipcRenderer.send('add-transaction', { transaction: JSON.stringify(transaction) })
    }
    // IPC Listeners
    ipcRenderer.on('transaction-added', (event, data) => {
        navigate('/transactions', { replace: true });
    })
</script>
<form on:submit={handleSubmit}>
    {#if error}
        <div class="alert alert-danger" role="alert">{error}</div>
    {/if}
    <div class="form-group">
        <label>Type</label>
        <select class="form-control" bind:value={type}>
            <option value="" disabled>Select a type</option>
            <option value="purchase">Purchase</option>
            <option value="income">Income</option>
        </select>
    </div>
    <div class="form-group">
        <label>Title</label>
        <input type="text" class="form-control" bind:value={title}>
    </div>
    <div class="form-group">
        <label>Description</label>
        <textarea class="form-control" bind:value={desc}></textarea>
    </div>
    <div class="form-group">
        <label>Amount</label>
        <input type="number" class="form-control" bind:value={amount}>
    </div>
    <div class="form-group">
        <label>Date</label>
        <input type="date" class="form-control" bind:value={date}>
    </div>
    <button type="submit" class="btn btn-primary btn-block mt-2">Add Transaction</button>
</form>