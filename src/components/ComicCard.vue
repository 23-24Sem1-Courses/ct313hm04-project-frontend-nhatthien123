<script setup>
defineProps({
    comic: { type: Object, required: true },
});
</script>
<template>
    <div>
        <div class="p-1">
            <strong>Tên truyện:</strong>
            {{ comic.name }}
        </div>
        <div class="p-1">
            <strong>Link:</strong>
            {{ comic.link }}
        </div>
        <div class="p-1">
            <strong>Chapter:</strong>
            {{ comic.chapter }}
        </div>
        <div class="p-1">
            <strong>Liên hệ yêu thích:&nbsp;</strong>
            <i v-if="comic.favorite" class="fas fa-check"></i>
            <i v-else class="fas fa-times"></i>
        </div>
    </div>
</template>