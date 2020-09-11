<script>
    import ProfileDetails from './components/ProfileDetails.svelte';
    import CreateProfileScreen from './screens/CreateProfileScreen.svelte';
    import { Router, Link, Route } from 'svelte-routing';
    let name = 'Edward';
</script>

<main>
    <Router>
        <div class="container">
            <nav>
                <Link to="/create-profile" class="btn btn-primary m-2">Create Profile</Link>
                <Link to="/" class="btn btn-primary m-2">Home</Link>
            </nav>
            <Route path="/create-profile">
                <CreateProfileScreen />
            </Route>
            <Route path="/">
                <ProfileDetails />
            </Route>
        </div>
    </Router>
</main>
