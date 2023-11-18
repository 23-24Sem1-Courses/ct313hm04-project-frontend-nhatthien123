<script setup>
import { ref } from 'vue';
import ComicForm from '@/components/ComicForm.vue';
import comicsService from '@/services/comics.service.js';

const comic = ref(null);
const message = ref('');

async function onCreateComic(comic) {
    try {
        await comicsService.create(comic);
        message.value = "Truyện đã được thêm vào danh sách!";
    } catch (error) {
        console.log(error);
    }
}
</script>

<template>
    <div class="page">
        <h4>Hiệu chỉnh thông tin truyện</h4>
        <ComicForm :initial-comic="comic" @submit:comic="onCreateComic" />
        <p>{{ message }}</p>
    </div>
</template>

