<script>
    import { createEventDispatcher } from 'svelte';
    import { links } from 'svelte-routing';
    export let profile;
    const dispatch = createEventDispatcher();
    const logout = () => {
        dispatch('logout');
    };
</script>

<nav class="navbar navbar-expand navbar-dark bg-primary" use:links>
    <a class="navbar-brand" href="/">Expense Tracker</a>
    {#if profile}
        <div class="d-flex justify-content-between">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" href="/">Main <span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/transactions">Transactions <span class="sr-only">(current)</span></a>
                </li>
            </ul>
            <ul class="navbar-nav float-right">
                <li class="nav-item">
                    <button class="nav-link btn btn-primary" on:click={logout}>Logout</button>
                </li>
            </ul>
        </div>
    {:else}
        <ul class="navbar-nav">
            <li class="nav-item">
                <a class="nav-link" href="/">Select Profile <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/create-profile">Create Profile</a>
            </li>
        </ul>
    {/if}
</nav>
