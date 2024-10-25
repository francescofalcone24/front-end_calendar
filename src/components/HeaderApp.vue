<script>
import store from '../data/store.js';
import Function from '../helpers/function.js';




export default {
    name: 'HeaderApp',


    data() {
        return {
            store,
            Function,

        }
    },
}

</script>

<template>
    <section class="bg-warning mb-2">
        <div class="container d-flex justify-content-between">

            <!-- LOGO -->
            <div class="nav-element">
                <img src="../assets/img/Google_Icons.webp" alt="">
            </div>

            <!-- SEARCH INPUT -->
            <div class="nav-element align-content-center">
                <span>Filtra eventi per email</span>
                <input class="mx-2" type="search" v-model="store.userInput" name="" id="">
            </div>

        </div>
    </section>

</template>

<style scoped>
.container {
    height: 5rem;

    div {
        height: 5rem;

        img {
            height: 5rem;
        }
    }
}
</style>