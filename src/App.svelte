<script>
    import ProfileDetails from './components/ProfileDetails.svelte';
    import { Router, Link, Route } from 'svelte-routing';
    let name = 'Edward';
</script>

<main>
    <Router>
        <div class="container">
            <nav>
                <Link to="/" class="btn btn-primary m-2">Home</Link>
                <Link to="/about" class="btn btn-primary m-2">About</Link>
            </nav>
            <Route path="/about">
                <h1>About</h1>
            </Route>
            <Route path="/">
                <ProfileDetails />
            </Route>
        </div>
    </Router>
</main>
