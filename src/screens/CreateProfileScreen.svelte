<script>
    let name = '';
    let initialBalance = 0;
    const handleSubmit = (e) => {
        e.preventDefault();
    };
</script>

<form on:submit={handleSubmit}>
    <div class="form-group">
        <label>Name</label>
        <input type="text" bind:value={name} class="form-control" />
    </div>
    <div class="form-group">
        <label>Initial Balance</label>
        <input type="number" bind:value={initialBalance} class="form-control" />
    </div>
    <button class="btn btn-primary" type="submit">Create Profile</button>
</form>
