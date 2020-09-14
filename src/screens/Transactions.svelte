<script>
    const { ipcRenderer } = require('electron');
    import TransactionsList from '../components/TransactionsList.svelte';
    import TransactionList from '../components/TransactionsList.svelte';
    export let id;
    let type, title, desc, amount, date;
    const createTransaction = e => {
        e.preventDefault();
        const transaction = {
            profileId: id,
            type,
            title,
            desc,
            amount
        };
        date ? transaction['date'] = date : null;
        ipcRenderer.send('create-transaction', { transaction });
    };
    ipcRenderer.on('transaction-created', (event, data) => {
        const transaction = JSON.parse(data.transaction);
        console.log(transaction);
        type = ''; title = ''; desc = ''; amount = 0; date = '';
    })
    const transactions = [
        {
            id: 1,
            type: 'purchase',
            amount: 300,
            date: new Date('2012-02-13'),
        },
        {
            id: 2,
            type: 'income',
            amount: 1200,
        },
    ];
</script>

<div class="d-flex justify-content-between">
    <TransactionsList {transactions} />
    <div class="card card-body m-2">
        <form on:submit={createTransaction}>
            <div class="form-group">
                <label>Type</label>
                <select type="text" class="form-control" bind:value={type}>
                    <option value="" disabled>Select a type</option>
                    <option value="income">Income</option>
                    <option value="purchase">Purchase</option>
                </select>
            </div>
            <div class="form-group">
                <label>Title</label>
                <input type="text" class="form-control" bind:value={title} />
            </div>
            <div class="form-group">
                <label>Description</label>
                <textarea
                    type="text"
                    class="form-control"
                    rows="5"
                    bind:value={desc} />
            </div>
            <div class="form-group">
                <label>Amount</label>
                <input type="number" class="form-control" bind:value={amount} />
            </div>
            <div class="form-group">
                <label>Date</label>
                <input type="date" class="form-control" bind:value={date} />
            </div>
            <button type="submit" class="btn btn-primary">Create Transaction</button>
        </form>
    </div>
</div>
