<script>
    import { links } from 'svelte-routing';
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    export let isLoggedIn;

    // Fucntions
    const logout = () => {
      dispatch('logout', null);
    }
</script>

<nav class="navbar navbar-expand navbar-dark bg-primary" use:links>
    <a class="navbar-brand" href="/">Expense Tracker</a>
  
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        {#if isLoggedIn}
        <li class="nav-item">
            <a class="nav-link" href="/">Main</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/transactions">Transactions</a>
          </li>
          <li class="nav-item">
            <button class="btn btn-primary text-light" on:click={logout}>Logout</button>
          </li>
        {:else}
        <li class="nav-item">
          <a class="nav-link" href="/">Login</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/register">Register</a>
        </li>
        {/if}
      </ul>
    </div>
  </nav>