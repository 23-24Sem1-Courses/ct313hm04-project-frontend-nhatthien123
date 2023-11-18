import { createWebHistory, createRouter } from 'vue-router';
import ComicBook from '@/views/ComicBook.vue';
const routes = [
    {
        path: "/",
        name: "comicbook",
        component: ComicBook,
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'notfound',
        component: ()=> import('@/views/NotFound.vue'),
    },
    {
        path: '/comics/:id',
        name: 'comic.edit',
        component: () => import('@/views/EditComic.vue'),
        props: (route) => ({ comicId: route.params.id })
    },
    {
        path: '/comics/add',
        name: 'comic.add',
        component: () => import('@/views/AddComic.vue'),
        
    },
];

const router = createRouter(
    {
        history: createWebHistory(import.meta.env.BASE_URL),
        routes,
    }  ,
    
);
export default router;