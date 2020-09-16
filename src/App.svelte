<script>
    const { ipcRenderer } = require('electron');

    let user;
    import { onMount } from 'svelte';
    import { Router, Route } from 'svelte-routing';

    // Components
    import Navbar from './components/Navbar.svelte';

    // Screens
    import Login from './screens/Login.svelte';
    import Register from './screens/Register.svelte';
    import Main from './screens/Main.svelte';

    // Functions
    const setUser = e => {
        user = e.detail;
    };

    const logout = () => {
        user = null;
    };

    onMount(() => {
        // error = null;
    });
</script>

<main>
    <Router>
        <Navbar isLoggedIn={user ? true : false} on:logout={logout} />
        <div class="container">
            {#if user}
                <Route path="/">
                    <Main {user} />
                </Route>
            {:else}
                <Route path="/register">
                    <Register on:setUser={setUser} />
                </Route>
                <Route path="/">
                    <Login on:setUser={setUser} />
                </Route>
            {/if}
        </div>
    </Router>
</main>
