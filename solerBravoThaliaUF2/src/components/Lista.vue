<script setup>
import { fetchAños } from '@/composables/fech';
import { RouterLink } from 'vue-router';
import { ref } from 'vue';

const { años, cargando, error } = fetchAños();
</script>

<template>
    <div>
        <h1>Años</h1>
        <ul>
            <li v-for="año in años" :key="año.any">
                <RouterLink :to="'/any/' + año.any">
                    {{ año.año }}
                </RouterLink>
            </li>
        </ul>
    </div>
</template>