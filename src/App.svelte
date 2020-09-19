<script>
    const { ipcRenderer } = require('electron');

    let userId;
    import { onMount } from 'svelte';
    import { Router, Route } from 'svelte-routing';

    // Components
    import Navbar from './components/Navbar.svelte';

    // Screens
    import Login from './screens/Login.svelte';
    import Register from './screens/Register.svelte';
    import Main from './screens/Main.svelte';
    import Transactions from './screens/Transactions.svelte';
    import AddTransaction from './screens/AddTransaction.svelte';

    // Functions
    const setUser = e => {
        userId = e.detail._id;
    };

    const logout = () => {
        localStorage.removeItem('userId');
        userId = null;
    };

    onMount(() => {
        userId = localStorage.getItem('userId');
    });
</script>

<main>
    <Router>
        <Navbar isLoggedIn={userId ? true : false} on:logout={logout} />
        <div class="container">
            {#if userId}
                <Route path="/add-transaction">
                    <AddTransaction userId={userId}/>
                </Route>
                <Route path="/transactions">
                    <Transactions userId={userId} />
                </Route>
                <Route path="/">
                    <Main />
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
