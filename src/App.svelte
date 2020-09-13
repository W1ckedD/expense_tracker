<script>
    import ProfileDetails from './components/ProfileDetails.svelte';
    import CreateProfileScreen from './screens/CreateProfileScreen.svelte';
    import SelectProfileScreen from './screens/SelectProfileScreen.svelte';
    import { Router, Link, Route } from 'svelte-routing';
    let profile;
</script>

<main>
    <Router>
        <div class="container">
            {#if profile}
                <ProfileDetails />
            {:else}
                <nav>
                    <Link to="/" class="btn btn-primary m-2">
                        Select Profile
                    </Link>
                    <Link to="/create-profile" class="btn btn-primary m-2">
                        Create Profile
                    </Link>
                </nav>
                <Route path="/create-profile">
                    <CreateProfileScreen />
                </Route>
                <Route path="/">
                    <SelectProfileScreen />
                </Route>
            {/if}
        </div>
    </Router>
</main>
