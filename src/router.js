import { createRouter, createWebHistory } from 'vue-router';
import HomeApp from './components/HomeApp.vue';


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: HomeApp
        },
        // {
        //     path: '/events/:id',
        //     name: 'SingleEvent',
        //     component: SingleEvent
        // },
        // {
        //     path: '/:pathMatch(.*)*',
        //     name: 'not-found',
        //     component: NotFound
        // },
    ]
})

export { router };