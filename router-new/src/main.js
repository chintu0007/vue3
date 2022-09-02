import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import AboutPageVue from './pages/AboutPage.vue'
import HomePageVue from './pages/HomePage.vue'
import ArticlePageVue from './pages/ArticlePage.vue'
import NotFoundPageVue from './pages/NotFoundPage.vue'


const routes = [
    {
        path: "/",
        name:"home",
        component:HomePageVue,        
    },
    {
        path: "/about",
        name: "about",
        component:AboutPageVue,        
    },
    {
        path:"/articles/:id",
        name:"articles",
        component: ArticlePageVue,        
    },
    {
        path: '/:url(.*)',
        name: "not-found",        
        component:NotFoundPageVue 
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

const app = createApp(App);
app.use(router);
app.mount('#app')
