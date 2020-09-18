<script>
    const { ipcRenderer } = require('electron');
    import { onMount } from 'svelte';
    import { links } from 'svelte-routing';
    
    // Components
    import TransactionList from '../components/TransactionList.svelte';

    const transactions = [
        {
            id: 1,
            type: 'purchase',
            title: 'Shoes',
            amount: 70,
            date: new Date('2017-02-15')
        },
        {
            id: 2,
            type: 'income',
            title: 'Salary',
            amount: 1200,
            date: new Date('2017-03-01')
        },
        {
            id: 3,
            type: 'purchase',
            title: 'Headphones',
            amount: 40,
            date: new Date('2017-03-02')
        }
    ]

    export let userId;
</script>
<div class="d-flex justify-content-between mt-2" use:links>
    <h3>Transactions</h3>
    <a href="/add-transaction" class="btn btn-primary btn-lg">+</a>
</div>

<TransactionList transactions={transactions}/>
