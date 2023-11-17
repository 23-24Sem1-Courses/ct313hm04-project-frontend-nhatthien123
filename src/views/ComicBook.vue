<script setup>
import { ref, computed, onMounted, watch, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import ComicCard from '@/components/ComicCard.vue';
import Search from '@/components/Search.vue';
import ComicList from '@/components/ComicList.vue';
import Pagination from '@/components/Pagination.vue';
import createComicServices from '@/services/comics.service.js';
const $router = useRouter();
const totalPages = ref(1);
const currentPage = ref(1);
const comics = ref([]);
const selectedIndex = ref(-1);
const searchText = ref('');
const searchableComics = computed(() =>
    comics.value.map((comic) => {
        const { name, link, chapter } = comic;
        return [name, link, chapter].join('');
    })
);
const filteredComics = computed(() => {
    if (!searchText.value) return comics.value;
    return comics.value.filter((comic, index) =>
        searchableComics.value[index].includes(searchText.value)
    );
});
const selectedComic = computed(() => {
    if (selectedIndex.value < 0) return null;
    return filteredComics.value[selectedIndex.value];
});
async function retrieveComics(page) {
    try {
        const chunk = await createComicServices.getMany(page);
        totalPages.value = chunk.metadata.lastPage ?? 1;
        comics.value = chunk.comics.sort((current, next) =>
            current.name.localeCompare(next.name)
        );
        selectedIndex.value = -1;
    } catch (error) {
        console.log(error);
    }
}
async function onDeleteAll() {
    if (confirm('Bạn muốn xóa tất cả truyện trong danh sách?')) {
        try {
            await createComicServices.deleteAll();
            totalPages.value = 1;
            currentPage.value = 1;
            comics.value = [];
            selectedIndex.value = -1;
        } catch (error) {
            console.log(error);
        }
    }
}
function goToAddComic() {
    $router.push({ name: 'comic.add' });
}
onMounted(() => retrieveComics(1));
watch(searchText, () => (selectedIndex.value = -1));
watchEffect(() => retrieveComics(currentPage.value));
</script>
<template>
    <div class="page row mb-5">
        <div class="mt-3 col-md-6">
            <h4>
                Danh bạ
                <i class="fas fa-address-book"></i>
            </h4>
            <div class="my-3">
                <Search v-model="searchText" />
            </div>
            <ComicList v-if="filteredComics.length > 0" 
                :comics="filteredComics"
                v-model:selectedIndex="selectedIndex" />
            <p v-else>
                Không có truyện nào trong danh sách.
            </p>
            <div class="mt-3 d-flex justify-content-center align-items-center">
                <Pagination :totalPages="totalPages" v-model:currentPage="currentPage" />
            </div>
            <div class="mt-3 row justify-content-around align-items-center">
                <button class="btn btn-sm btn-primary" @click="retrieveComics(currentPage)">
                    <i class="fas fa-redo"></i> Làm mới
                </button>
                <button class="btn btn-sm btn-success" @click="goToAddComic">
                    <i class="fas fa-plus"></i> Thêm Truyện mới

                </button>
                <button class="btn btn-sm btn-danger" @click="onDeleteAll">
                    <i class="fas fa-trash"></i> Xóa tất cả truyện trong danh sách
                </button>
            </div>
        </div>
        <div class="mt-3 col-md-6">
            <div v-if="selectedComic">
                <h4>
                    Chi tiết truyện
                    <i class="fas fa-address-card"></i>
                </h4>
                <ComicCard :comic="selectedComic" />
                <router-link :to="{
                    name: 'comic.edit',
                    params: { id: selectedComic.id },
                }">
                    <span class="mt-2 badge badge-warning">
                        <i class="fas fa-edit"></i>Chỉnh sửa</span>
                </router-link>
                <router-link :to="{
                    name: 'comic.add',
                    params: { id: activeComic.id },
                }">
                    <span class="mt-2 badge badge-warning">
                        <i class="fas fa-edit" /> Thêm vào</span>
                </router-link>
            </div>
        </div>
    </div>
</template>
<style scoped>
.page {
    text-align: left;
    max-width: 750px;
}
</style>