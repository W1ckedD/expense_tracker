<script>
    // Screens
    import ProfileDetails from './screens/ProfileDetails.svelte';
    import CreateProfileScreen from './screens/CreateProfileScreen.svelte';
    import SelectProfileScreen from './screens/SelectProfileScreen.svelte';

    // Components
    import Navbar from './components/Navbar.svelte';

    import { Router, Route } from 'svelte-routing';

    let profile;
    const setProfile = e => {
        const data = e.detail;
        profile = data;
    };
    const logout = () => {
        profile = null;
    }
</script>

<main>
    <Router>
        {#if profile}
            <Navbar profile={true} on:logout={logout}/>
            <div class="container">
                <Route path="/">
                    <ProfileDetails profile={profile} />
                </Route>
            </div>
        {:else}
            <Navbar profile={false} />
            <div class="container">
                <Route path="/create-profile">
                    <CreateProfileScreen on:setProfile={setProfile} />
                </Route>
                <Route path="/">
                    <SelectProfileScreen on:setProfile={setProfile}/>
                </Route>
            </div>
        {/if}
    </Router>
</main>
