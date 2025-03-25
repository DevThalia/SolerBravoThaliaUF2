import { ref, onMounted } from 'vue';

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

/* Opció menú Beques: Accedeix a la pàgina que llista d’anys (Tenim dades des de 2004)*/

export function fetchAños() {
    const años = ref([]);
    const cargando = ref(true);
    const error = ref(null);

    onMounted(async () => {
        try {
            const respuesta = await fetch(API_URL);
            const datos = await respuesta.json();

            años.value = datos.map(año => ({
                año: año.any
            }));
        } catch (error) {
            error.value = 'Error al obtener los datos de los embalses';
        } finally {
            cargando.value = false;
        }
    });

    return { años, cargando, error };
}

/* Obtener tipus_de_centres, mediante el año que se pasa
    parámetro: año
    devuelve un array con los tipos de centros
    lanza error si la peticion falla
*/

export default function fetchTipoCentro(año) {
    try {
        const tipoCentro = ref([]);
        const cargando = ref(true);
        const error = ref(null);
        onMounted(async () => {
            try {
                const respuesta = await fetch(`${API_URL}?any=${año}`);
                const datos = await respuesta.json();

                tipoCentro.value = datos.map(tipo => ({
                    tipo: tipo.tipus_de_centres
                }));
            } catch (error) {
                error.value = 'Error al obtener los datos de los embalses';
            } finally {
                cargando.value = false;
            }
        });
        return { tipoCentro, cargando, error };
    } catch (error) {
        throw new Error('Error al obtener los datos de los centros');
    }
}

/* Obtener mobilitat_homes, mobilitat_dones, formaci_homes, formaci_homes
    parametro: año
    parametro: tipo_centro
    devuelve un array con los datos de mobilitat_homes, mobilitat_dones, formaci_homes, formaci_homes
*/

export default function fetchDatos(año, tipo_centro) {
    try {
        const datos = ref([]);
        const cargando = ref(true);
        const error = ref(null);
        onMounted(async () => {
            try {
                const respuesta = await fetch(`${API_URL}?any=${año}&tipus_de_centres=${tipo_centro}`);
                const datos = await respuesta.json();

                datos.value = datos.map(dato => ({
                    mobilitat_homes: dato.mobilitat_homes,
                    mobilitat_dones: dato.mobilitat_dones,
                    formaci_homes: dato.formaci_homes,
                    formaci_dones: dato.formaci_dones
                }));
            } catch (error) {
                error.value = 'Error al obtener los datos de los embalses';
            } finally {
                cargando.value = false;
            }
        });
        return { datos, cargando, error };
    } catch (error) {
        throw new Error('Error al obtener los datos de los centros');
    }
}