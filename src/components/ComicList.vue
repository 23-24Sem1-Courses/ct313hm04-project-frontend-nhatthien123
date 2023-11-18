<script setup>
defineProps({
    comics: { type: Array, default: () => [] },
    selectedIndex: { type: Number, default: -1 },
});
const $emit = defineEmits(['update:selectedIndex']);
</script>
<template>
    <ul class="list-group">
        <li class="list-group-item px-3" v-for="(comic, index) in comics" :class="{ active: index === selectedIndex }"
        :key="comic.id" @click="$emit('update:selectedIndex', index)">
        {{ comic.name }}
        </li>
    </ul>
</template>
