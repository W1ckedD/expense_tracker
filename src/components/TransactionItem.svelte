<script>
    const { ipcRenderer } = require('electron');
    import moment from 'moment';
    export let transaction;
    export let index;
    const handleDelete = e => {
        ipcRenderer.send('delete-transaction', {
            userId: transaction.userId,
            transactionId: transaction._id,
        });
    };
</script>

<tr>
    <th scope="row">{index + 1}</th>
    <td>
        {transaction.type
            .charAt(0)
            .toUpperCase()
            .concat(transaction.type.slice(1))}
    </td>
    <td>{transaction.title}</td>
    <td class={transaction.type === 'income' ? 'text-success' : 'text-danger'}>
        {transaction.amount} $
    </td>
    <td>{moment(transaction.date).format('MMMM Do YYYY')}</td>
    <td>
        <button class="btn btn-danger btn-sm" on:click={handleDelete}>X</button>
    </td>
</tr>
