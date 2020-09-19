<script>
    const { ipcRenderer } = require('electron');
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    let error = null;
    let username = '';
    let password = '';
    let password2 = '';
    let initialBalance = 0;
    const handleSubmit = e => {
        e.preventDefault();
        if (username.length < 3) {
            error = 'Username must be at least 3 characters';
            return;
        }

        if (password.length < 6) {
            error = 'Password must be at least 6 characters';
            return;
        }

        if (password !== password2) {
            error = 'Passwords do not match';
            return;
        }
        ipcRenderer.send('register', { username, password, initialBalance });
    }
    // IPC listeners
    ipcRenderer.on('user-registered', (event, data) => {
        const user = JSON.parse(data.user);
        localStorage.setItem('userId', user._id);
        dispatch('setUser', user);
    })
    ipcRenderer.on('error', (event, data) => {
        error = data;
    });
</script>

<form on:submit={handleSubmit}>
    <h3 class="text-center">Register</h3>
    {#if error}
        <div class="alert alert-danger" role="alert">{error}</div>
    {/if}
    <div class="form-group">
        <label>Username</label>
        <input type="text" class="form-control" bind:value={username}>
    </div>
    <div class="form-group">
        <label>Password</label>
        <input type="password" class="form-control" bind:value={password}>
    </div>
    <div class="form-group">
        <label>Confirm Password</label>
        <input type="password" class="form-control" bind:value={password2}>
    </div>
    <div class="form-group">
        <label>Initial Balance ($)</label>
        <input type="number" class="form-control" bind:value={initialBalance}>
    </div>
    <button type="submit" class="btn btn-primary btn-block mt-2">Register</button>
</form>