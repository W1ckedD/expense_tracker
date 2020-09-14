<script>
    const { ipcRenderer } = require('electron');
    let name = '';
    let initialBalance = 0;
    import { createEventDispatcher } from 'svelte';
    import { navigate } from 'svelte-routing';
    const dispatch = createEventDispatcher();
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name) {
            console.log('Please Enter A Name');
            return;
        }
        ipcRenderer.send('create-profile', {  name, initialBalance });
        navigate('/', { replace: true });
    };
    ipcRenderer.on('profile-created', (event, data) => {
        const profile = JSON.parse(data.profile);
        dispatch('setProfile', profile);
    })
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
