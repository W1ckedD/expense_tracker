<script>
    const { ipcRenderer } = require('electron');
    import { onMount } from 'svelte';
    let userId;
    let user;

    onMount(() => {
        userId = localStorage.getItem('userId');
        ipcRenderer.send('get-user', { userId });
    });

    // IPC Listeners
    ipcRenderer.on('user-sent', (event, data) => {
        user = JSON.parse(data.user);
    });
</script>

<h1>Hello {user ? user.username : ''}</h1>
<h3>
    Your Balance: {#if user}<span
            class={user.currentBalance > 0 ? 'text-success' : 'text-danger'}>
            {user.currentBalance} $
        </span>{/if}
</h3>
