import { addKeyword } from '@builderbot/bot';
import { JsonFileDB as Database } from '@builderbot/database-json'
import { BaileysProvider as Provider } from '@builderbot/provider-baileys'
import { reset, stop } from '../idle-custom'
import json from '../../roles.json';

let id_sede = null;

export const clasePruebaFlow = addKeyword<Provider, Database>(['1'])
    .addAnswer('¿Cual es tu nombre ? ',
        { capture: true },
        async (ctx, { gotoFlow, state }) => {
            reset(ctx, gotoFlow, Number(process.env.TIEMPOINACTIVIDAD));
            await state.update({ nombre: ctx.body })
            return;
        })
    .addAnswer('¿Cual es el nombre del deportista?',
        { capture: true },
        async (ctx, { gotoFlow, state }) => {
            reset(ctx, gotoFlow, Number(process.env.TIEMPOINACTIVIDAD));
            await state.update({ nonmbreDeportista: ctx.body })
            return;

        })
    .addAnswer('¿Cual es la experiencia del deportista en meses?',
        { capture: true },
        async (ctx, { gotoFlow, state }) => {
            reset(ctx, gotoFlow, Number(process.env.TIEMPOINACTIVIDAD));
            await state.update({ experiencia: ctx.body })
            return null;
        })
    .addAnswer('¿Cual es la edad del deportista?',
        { capture: true },
        async (ctx, { gotoFlow, state }) => {
            reset(ctx, gotoFlow, Number(process.env.TIEMPOINACTIVIDAD));
            await state.update({ edad: ctx.body })
            return;

        })
    .addAnswer(['*¿Para que la clase de prueba?*', ''])
    .addAnswer(['Flikflakers, recuerda que en tu clase de prueba no solo podrás conocernos a nosotros, a nuestros profesores y la metodología de las clases; sino que también aprovecharemos para conocerte e identificar el nivel de fuerza, flexibilidad y destreza motriz. De esta manera, asignar un grupo adecuado para que tengas un mejor desarrollo y aprendizaje.', ''])
    .addAnswer(['Después de la clase de prueba, se acordará el horario según el nivel. Tenemos clases de lunes a domingo. 🤸🏻‍♂️🤸🏻‍♂️🤸🏻‍♂️', ''])
    .addAnswer(['¡Conoce un poco mas! 🌟', 'https://www.instagram.com/reel/C5v9jrmR0E4/?igsh=a3R6bzhqY3I5YjMx'])
    .addAnswer(
        [
            '*¿En cual de nuestras clases de prueba estas interesad@?*',
            '1. 🤰Madres gestantes',
            '2. 👩‍🍼Estimulación 6 meses hasta 48 meses',
            '3. 🤸‍♀️Gimnasia Básica',
            '4. 🤸Gimnasia Artistica',
            '5. 🏃‍♂️Parkour',
            '6. 🤸‍♂️Acrobacia adultos',
            '7. 🏋️‍♀️Centro de alto rendimiento'
            ,
        ],
        { capture: true },
        async (ctx, { state, gotoFlow, fallBack }) => {
            reset(ctx, gotoFlow, Number(process.env.TIEMPOINACTIVIDAD));
            const opcion = ctx.body
            switch (opcion) {
                case '1': {
                    await state.update({ clasePruebaDesc: '"Madres gestantes"' })
                    break;
                }
                case '2': {
                    await state.update({ clasePruebaDesc: '"Estimulación 6 meses hasta 48 meses"' })
                    break;
                }
                case '3': {
                    await state.update({ clasePruebaDesc: '"Gimnasia Básica"' })
                    break;
                }
                case '4': {
                    await state.update({ clasePruebaDesc: '"Gimnasia Artistica"' })
                    break;
                }
                case '5': {
                    await state.update({ clasePruebaDesc: '"Parkour"' })
                    break;
                }
                case '6': {
                    await state.update({ clasePruebaDesc: '"Acrobacia adultos' })
                    break;
                }
                case '7': {
                    await state.update({ clasePruebaDesc: '"Centro de alto rendimiento"' })
                    break;
                }
                default: {
                    return fallBack('🌟 ¡por favor ingresa una opcion valida! 🌟')
                }
            }
            return
        })
    .addAnswer('¿En cual de nuestras sedes deseas reservar la clase de prueba')
    .addAnswer(['1. Poblado: A una cuadra de la estación poblado del metro',
        '2. Palmas: Parque la reserva. A 300m de Indiana Mall',
        '3. Estadio: Coliseo de gimnasia Jorge Hugo Giraldo. Unidad Atanasio Girardot'],
        { capture: true },
        async (ctx, { state, gotoFlow, fallBack }) => {
            reset(ctx, gotoFlow, Number(process.env.TIEMPOINACTIVIDAD));
            id_sede = ctx.body;
            if (!['1', '2', '3'].includes(id_sede)) {
                return fallBack('🌟 ¡por favor ingresa una opcion valida! 🌟')
            } else {
                await state.update({ id_sede: ctx.body })
                return;
            }

        })
    .addAction(
        async (ctx, { flowDynamic, state }) => {
            stop(ctx);
            const myState = state.getMyState();
            const mensaje = `Hola, mi nombre es ${myState.nombre} y estoy interesad@ en la clase de prueba ${myState.clasePruebaDesc} para el deportista ${myState.nonmbreDeportista} que tiene una edad de ${myState.edad} años y una experiencia de ${myState.experiencia} meses `;
            const SEDE = json.sedes.find((sede) => sede.id === Number(id_sede));
            const TEL = SEDE.roles.numero_clase_pruebas
            // Codificar el mensaje para usarlo en el enlace de WhatsApp
            const enlaceWhatsApp = encodeURI(`https://wa.me/${TEL}?text=${mensaje}`);
            // Mensaje final que se enviará a través de tu flujo dinámico
            const mensajeFinal = `*Para reservar una clase de prueba haz clic en el siguiente enlace:* 
        ${enlaceWhatsApp}`;
            // Enviar el mensaje utilizando tu función flowDynamic
            return flowDynamic(mensajeFinal);
        }
    )


