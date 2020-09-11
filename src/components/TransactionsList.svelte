<script>
    import TransactionItem from './TransactionItem.svelte';
    export let transactions;
</script>

<div class="card card-body">
    {#if transactions.length === 0}
    <p>No recent transactions</p>
    {:else}
        {#each transactions as transaction}
            <TransactionItem transaction={transaction}/>
        {/each}
    {/if}
</div>