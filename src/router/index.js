import { createWebHistory, createRouter } from 'vue-router';
import ConmicList from '@/views/ComicList.vue';
const routes = [
    {
        path: '/',
        name: 'comicList',
        component: ComicList,
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'notfound',
        component: ()=> import('@/views/NotFound.vue'),
    },
    {
        path: '/comics/:id',
        name: 'comic.edit',
        component: () => import('@/views/ComicEdit.vue'),
        props: (route) => ({ comicId: route.params.id })
    },
    {
        path: '/comics/add',
        name: 'comic.add',
        component: () => import('@/views/ComicAdd.vue'),
        
    },
];

const router = createRouter(
    {
        history: createWebHistory(import.meta.env.BASE_URL),
        routes,
    }  ,
    
);
export default router;