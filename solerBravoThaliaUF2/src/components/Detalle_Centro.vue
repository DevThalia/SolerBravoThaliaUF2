<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { fetchDatos } from '@/composables/fetch';

const route = useRoute();
const router = useRouter();

const años = ref([]);
const cargando = ref(false);
const error = ref(null);
onMounted(async () => {
    try {
        años.value = await fetchDatos('/centro/' + route.params.tipus_de_centres + '/' + route.params.any);

    } catch (err) {
        error.value = "Error al obtener los datos del tipo de centro";
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
        <h1>Detalle del centro</h1>
        <button @click="volver">Volver</button>
        <div v-if="cargando">Cargando...</div>
        <div v-else>
            <div v-if="error">{{ error }}</div>
            <div v-else>
                <table>
                    <thead>
                        <tr>
                            <th>Centro</th>
                            <th>Curso</th>
                            <th>Alumnos</th>
                            <th>Alumnas</th>
                            <th>Formación</th>
                            <th>Formación</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="dato in años">
                            <td>{{ dato.mobilitat_homes }}</td>
                            <td>{{ dato.mobilitat_dones }}</td>
                            <td>{{ dato.formaci_homes }}</td>
                            <td>{{ dato.formaci_dones }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>