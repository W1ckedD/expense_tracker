<script>
    let names = ['Kate', 'Edward', 'James'];
    let name = '';
    const handleSubmit = (e) => {
        e.preventDefault();
    };
</script>

<form on:submit={handleSubmit}>
    <div class="form-group">
        <label>Profile</label>
        <select class="form-control" bind:value={name}>
            <option value="" disabled>Select a profile</option>
            {#each names as name}
                <option value={name}>{name}</option>
            {/each}
        </select>
    </div>
</form>
