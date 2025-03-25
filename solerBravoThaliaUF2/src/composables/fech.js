import { ref, onMounted } from 'vue';
import axios from 'axios';

const API_URL = 'https://analisi.transparenciacatalunya.cat/resource/rsgi-8ymj.json';

/* Ejemplo de salida json

    {
    "tipus_de_centres": "CSIC i altres centres d'R+D+I",
    "any": "2004",
    "formaci_dones": "33",
    "formaci_homes": "27",
    "import_formaci_k": "784.5",
    "incorporaci_dones": "0",
    "incorporaci_homes": "1",
    "import_incorporaci_k": "9.6",
    "mobilitat_dones": "4",
    "mobilitat_homes": "4",
    "import_mobilitat_k": "86.1"
},
*/

export async function fetchAños() {
    try {
        const respuesta = await axios.get(API_URL);
        const datos = respuesta.data;
        const unico = new Set();
        return datos.filter(año => {
            if (!unico.has(año.any)) {
                unico.add(año.any);
                return true;
            }
        }).map(año => ({
            año: año.any,
        }));
    } catch (err) {
        throw new Error('Error al obtener los datos de los años');
    }
}

export async function fetchTipoCentro(año) {
    try {
        const respuesta = await axios.get(API_URL + '?any=' + año);
        const datos = respuesta.data;
        const unico = new Set();
        return datos.filter(tipo => {
            if (!unico.has(tipo.tipus_de_centres)) {
                unico.add(tipo.tipus_de_centres);
                return true;
            }
        }).map(tipo => ({
            tipo_centro: tipo.tipus_de_centres
        }));
    } catch (err) {
        throw new Error('Error al obtener los datos del año');
    }
}


export async function fetchDatos(año, tipo_centro) {
    try {
        const respuesta = await axios.get(API_URL + '?any=' + año + '&tipus_de_centres=' + tipo_centro);
        const datos = respuesta.data;
        return datos.map(dato => ({
            mobilitat_homes: dato.mobilitat_homes,
            mobilitat_dones: dato.mobilitat_dones,
            formaci_homes: dato.formaci_homes,
            formaci_dones: dato.formaci_dones
        }));
    } catch (err) {
        throw new Error('Error al obtener los datos de los centros');
    }
}




