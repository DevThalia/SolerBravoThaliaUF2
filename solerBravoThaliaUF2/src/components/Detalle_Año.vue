<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { fetchTipoCentro } from '@/composables/fech';

const route = useRoute();
const router = useRouter();

const tiposCentro = ref([]);
const cargando = ref(true);
const error = ref(null);

const año = route.params.any;

onMounted(async () => {
    if (año) {
        try {
            tiposCentro.value = await fetchTipoCentro(año);
        } catch (err) {
            error.value = `Error al obtener los datos del año: ${err.message}`;
        } finally {
            cargando.value = false;
        }
    } else {
        error.value = 'Año no especificado';
        cargando.value = false;
    }
});

const volver = () => {
    router.push('/lista');
};
</script>

<template>
    <div>
        <h1>Informe de l'any {{ route.params.any }}</h1>
        <div v-if="cargando">Cargando...</div>
        <div v-if="error">{{ error }}</div>
        <div v-if="!cargando && !error">
            <h5>Centres:</h5>
            <ul>
                <li v-for="(tipo, index) in tiposCentro" :key="index">
                    {{ tipo.tipo_centro }}
                </li>
            </ul>
        </div>
        <button @click="volver">Volver</button>
    </div>
</template>

