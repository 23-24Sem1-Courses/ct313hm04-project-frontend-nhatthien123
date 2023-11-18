<script setup>
    import { ref } from 'vue';
    import * as yup from 'yup';
    import { Form, Field, ErrorMessage } from 'vee-validate';
    const props = defineProps({
        initialComic: { type: Object, required: true },
    });
    const $emit = defineEmits(['submit:comic', 'delete:comic']);
    const comicFormSchema = yup.object().shape({
        name: yup
            .string()
            .required('Tên phải có giá trị.')
            .min(10, 'Tên phải ít nhất 10 ký tự.')
            .max(255, 'Tên có nhiều nhất 255 ký tự.'),
        email: yup
            .string()
            .email('E-mail không đúng.')
            .max(50, 'E-mail tối đa 50 ký tự.'),
        address: yup.string().min(1, 'Địa chỉ tối thiểu 1 ký tự.'),

    });
    const editedComic = ref({ ...props.initialComic });
    function submitComic() {
        $emit('submit:comic', editedComic.value);
    }
    function deleteComic() {
        $emit('delete:comic', editedComic.value.id);
    }
</script>

<template>
    <Form @submit="submitComic" :validation-schema="comicFormSchema">
        <div class="form-group">
            <label for="name">Tên TRuyện</label>
            <Field name="name" type="text" class="form-control" v-model="editedContact.name" />
            <ErrorMessage name="name" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="email">Link dẫn tới truyện</label>
            <Field name="email" type="email" class="form-control" v-model="editedContact.email" />
            <ErrorMessage name="email" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="chapter">Chapter đang đọc</label>
            <Field name="chapter" type="text" class="form-control" v-model="editedComic.chapter" />
            <ErrorMessage name="chapter" class="error-feedback" />
        </div>
        
        <div class="form-group form-check">
        <Field
            name="favorite"
            type="checkbox"
            class="form-check-input"
            v-model="editedComic.favorite"
            :value="1"
            :unchecked-value="0"
        />
            <label for="favorite" class="form-check-label">
                <strong>Truyện yêu thích</strong>
            </label>
        </div>
        <div class="form-group">
            <button class="btn btn-primary">Lưu</button>
            <button
                v-if="editedComic.id"
                type="button"
                class="ml-2 btn btn-danger"
                @click="deleteComic"
            >
                Xóa
            </button>
        </div>
    </Form >
</template >
<style scoped>
@import '@/assets/form.css';
</style>