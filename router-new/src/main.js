import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import App from "./App.vue";
import AboutPageVue from "./pages/AboutPage.vue";
import HomePageVue from "./pages/HomePage.vue";
import ArticlePageVue from "./pages/ArticlePage.vue";
import NotFoundPageVue from "./pages/NotFoundPage.vue";
import ArticlesByTagPage from "./pages/ArticlesByTagPage.vue";
import ArticleCommentList from './pages/ArticlePage/ArticleCommentList.vue'
import ArticleAuthor from './pages/ArticlePage/ArticleAuthor.vue'

const routes = [
  
  {
    path: "/",
    name: "home",
    component: HomePageVue,
  },
  { 
    path:"/home",
    redirect: {
      name:'home',
      alias: ['/home', '/homepage']
    },
  },
  {
    path: "/about",
    name: "about",
    component: AboutPageVue,
  },
  {
    path: '/articles/:id(\\d+)',
    name: 'articles',
    component: ArticlePageVue,
    props: true,
    children: [
      {
        name: 'articles.comments',
        path: '',
        component: ArticleCommentList,
        props: true
      },
      {
        name: 'articles.author',
        path: 'author',
        component: ArticleAuthor,
        props: true
      }
    ]
  },
  {
    path: '/tags/:tags+',
    name: 'tags',
    component: ArticlesByTagPage,
    props: true
  },
  {
    //path: "/:url(.*)",
    path: "/:url(.+)?",
    name: "not-found",
    component: NotFoundPageVue,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const app = createApp(App);
app.use(router);
app.mount("#app");
