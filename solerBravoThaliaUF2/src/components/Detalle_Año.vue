<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { fetchTipoCentro } from '@/composables/fech';

const route = useRoute();
const router = useRouter();

const datos = ref([]);
const cargando = ref(true);
const error = ref(null);

onMounted(async () => {
    try {
        console.log(route.params);  
        const año = route.params.any;  
        datos.value = await fetchTipoCentro(año); 
    } catch (err) {
        error.value = "Error al obtener los datos del any";
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
        <h1>Informe de l'any {{ route.params.any }}</h1>
        <h5>Centres:</h5>
        <ul>
            <li v-for="(any, index) in datos" :key="index">
                {{ any.tipo_centro }}
            </li>
        </ul>
        <button @click="volver">Volver</button>
    </div>
</template>
