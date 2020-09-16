<script>
    const { ipcRenderer } = require('electron');
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    let error = null;
    let username = '';
    let password = '';
    const handleSubmit = e => {
        e.preventDefault();
        ipcRenderer.send('login', { username, password });
    };
    // IPC listeners
    ipcRenderer.on('user-logged-in', (event, data) => {
        const user = JSON.parse(data.user);
        console.log(user);
        dispatch('setUser', user);
    });
    ipcRenderer.on('error', (event, data) => {
        error = data;
    });
</script>

<form on:submit={handleSubmit}>
    <h3 class="text-center">Login</h3>
    {#if error}
        <div class="alert alert-danger" role="alert">{error}</div>
    {/if}
    <div class="form-group">
        <label>Username</label>
        <input type="text" class="form-control" bind:value={username} />
    </div>
    <div class="form-group">
        <label>Password</label>
        <input type="password" class="form-control" bind:value={password} />
    </div>
    <button type="submit" class="btn btn-primary btn-block mt-2">Login</button>
</form>
