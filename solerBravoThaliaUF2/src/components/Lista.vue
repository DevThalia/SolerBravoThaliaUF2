<script setup>
import { fetchAños } from '@/composables/fech';
import { RouterLink } from 'vue-router';
return { años, cargando, error }= fetchAños();
</script>

<template>
    <div>
        <h1>Años</h1>
        <ul>
            <li v-for="año in años" :key="año.any">
                <RouterLink :to="'/any/' + año.any">
                    {{ año.any }}
                </RouterLink>
            </li>
        </ul>
    </div>
</template>