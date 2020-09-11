<script>
    import moment from 'moment';
    export let transaction;
</script>

<div class="list-item">
    <div class="d-flex justify-content-between m-2">
        <p>type: {transaction.type}</p>
        <p>
            amount: {#if transaction.type === 'purchase'}
                <span class="text-danger"> {transaction.amount} </span>
            {:else if transaction.type === 'income'}
                <span class="text-success"> {transaction.amount} </span>
            {/if} $
        </p>
        <p>date: {moment(transaction.date).format('MMMM Do YYYY')}</p>
        <button class="btn btn-danger btn-sm">X</button>
    </div>
</div>
