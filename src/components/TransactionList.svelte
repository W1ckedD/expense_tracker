<script>
    import TransactionItem from './TransactionItem.svelte';
    export let transactions;
</script>

<div class="card- card-body">
    {#if transactions.length === 0}
        <h3>No transactions found</h3>
    {:else}
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Type</th>
                    <th scope="col">Title</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Date</th>
                    <th scope="col" />
                </tr>
            </thead>
            <tbody>
                {#each transactions as transaction, index}
                    <TransactionItem {transaction} {index}/>
                {/each}
            </tbody>
        </table>
    {/if}
</div>
