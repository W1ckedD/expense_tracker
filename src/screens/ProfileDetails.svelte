<script>
    import TransactionsList from '../components/TransactionsList.svelte';
    const { ipcRenderer } = require('electron');
    export let profile;
    let name = profile.name;
    let balance = profile.balance;
    ipcRenderer.on('test-result', (e, res) => {
        results = res;
    })
    const testConnection = e => {
        ipcRenderer.send('test-connection', 'test-data');
    }
    let transactions = [
        {
            id: 1,
            type: 'purchase',
            amount: 300,
            date: new Date('2012-02-13')
        },
        {
            id: 2,
            type: 'income',
            amount: 1200
        },{
            id: 3,
            type: 'purchase',
            amount: 280
        },{
            id: 4,
            type: 'purchase',
            amount: 20
        },
    ];
</script>

<div class="card card-body">
    <h2>Hello {name}</h2>
    <h4>Your balance: 
        {#if balance > 0}
        <span class="text-success">{balance}</span>
        {:else if balance === 0}
        <span>{balance}</span>
        {:else}
        <span class="text-danger">{balance}</span>
        {/if}
        $
    </h4>
    <h4>Recent Transactions</h4>
    <TransactionsList transactions={transactions}/>
</div>