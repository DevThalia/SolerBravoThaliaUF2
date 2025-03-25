<script setup>
import { fetchAños } from '@/composables/fech';
import { RouterLink } from 'vue-router';
import { ref, onMounted } from 'vue';

const años = ref([]);
const cargando = ref(true);
const error = ref(null);

onMounted(async () => {
    try {
        const data = await fetchAños();
        años.value = data;
    } catch (err) {
        error.value = err.message;
    } finally {
        cargando.value = false;
    }
});
</script>

<template>
    <div>
        <h1>Años</h1>
        <ul v-if="!cargando && !error">
            <li v-for="año in años" :key="año.año">
                <RouterLink :to="'/any/' + año.año">
                    {{ año.año }}
                </RouterLink>
            </li>
        </ul>
        <p v-if="cargando">Cargando...</p>
        <p v-if="error">Error: {{ error }}</p>
    </div>
</template>
