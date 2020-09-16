<script>
    export let user;
</script>

<h1>Hello {user.username}</h1>
<h3>
    Your Balance: <span class={user.currentBalance > 0 ? 'text-success' : 'text-danger'}> {user.currentBalance}
        $ </span>
</h3>
