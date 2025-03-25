<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { fetchTipoCentro } from '@/composables/fetch';

const route = useRoute();
const router = useRouter();

const años = ref([]);
const cargando = ref(false);
const error = ref(null);

onMounted(async () => {
    try{
        años.value = await fetchTipoCentro(route.params.año); //probar con any
    } catch (error) {
        error.value = "Error al obtener los datos del año";
    } finally {
        cargando.value = false;
    }
});    

const volver = () => {
    router.push('/lista');
};

</script>

<template>
    <div>
        <h1>Informe de l'any {{ route.params.año }}</h1>
        <h5>Centres:</h5>
        <ul>
            <li v-for="año in años" :key="año.any">
                {{ año.tipo }}
            </li>
        </ul>
        <button @click="volver">Volver</button>
    </div>
</template>