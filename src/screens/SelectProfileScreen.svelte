<script>
    const { ipcRenderer } = require('electron');
    import { onMount, createEventDispatcher } from 'svelte';
    let names = [];
    let name = '';
    const dispatch = createEventDispatcher();
    onMount(() => {
        ipcRenderer.send('get-all-profiles', null);
    });
    ipcRenderer.on('all-profiles-sent', (event, data) => {
        const profiles = JSON.parse(data.profiles);
        names = profiles.map(profile => profile['name']);
        console.log(names);
    });
    ipcRenderer.on('profile-selected', (event, data) => {
        const profile = JSON.parse(data.profile);
        dispatch('setProfile', profile);
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        ipcRenderer.send('select-profile', { name });
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
    <button class="btn btn-primary" type="submit">Create Profile</button>
</form>
