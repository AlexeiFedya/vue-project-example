<template>
        <b-navbar toggleable="lg" type="dark" variant="dark" >
            <b-navbar-brand  to="/">{{text}}</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item to="/">cript</b-nav-item>
                    <b-nav-item to="/rate">rate</b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
</template>

<script>
    export default {
        
        props: {
            text: String,
        }
    }
</script>