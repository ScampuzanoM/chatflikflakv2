import { addKeyword } from '@builderbot/bot';
import { JsonFileDB as Database } from '@builderbot/database-json'
import { BaileysProvider as Provider } from '@builderbot/provider-baileys'
import { reset, stop } from '../idle-custom'
import json from '../../roles.json';

let id_sede = null;

export const matriculaFlow = addKeyword<Provider, Database>(['2'])
    .addAnswer('¿Cual es tu nombre ? ', { capture: true },
        async (ctx, { gotoFlow, state }) => {
            reset(ctx, gotoFlow, Number(process.env.TIEMPOINACTIVIDAD));
            await state.update({ nombre: ctx.body })
            return null;

        })
    .addAnswer('¿Cual es el nombre del deportista?', { capture: true },
        async (ctx, { gotoFlow, flowDynamic, state }) => {
            reset(ctx, gotoFlow, Number(process.env.TIEMPOINACTIVIDAD));
            await state.update({ nonmbreDeportista: ctx.body })
            return null;

        })
    .addAnswer('¿Cuantos dias a la semana desea asistir el deportista?', { capture: true },
        async (ctx, { gotoFlow, flowDynamic, state }) => {
            reset(ctx, gotoFlow, Number(process.env.TIEMPOINACTIVIDAD));
            await state.update({ diasSemana: ctx.body })
            return null;

        })
    .addAnswer('¿En cual de nuestras sedes deseas matricularte?')
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
                await state.update({ sede: ctx.body })
                return;
            }
        })
    .addAnswer(
        [
            '¡Seras dirigido con un asesor personalizado que te ayudara con tu proceso de matricula.! 🌟',

        ], null, async (ctx, { flowDynamic, state }) => {
            stop(ctx);
            const myState = state.getMyState();
            const SEDE = json.sedes.find((sede) => sede.id === Number(id_sede));
            const TEL = SEDE.roles.numero_matriculas
            const SEDE_DESC = SEDE.sede

            const mensaje = `Hola, mi nombre es ${myState.nombre} y estoy interesad@ en el proceso de matrícula para el deportista ${myState.nonmbreDeportista}, desea asistir ${myState.diasSemana} dias en la sede ${SEDE_DESC}  `;

            // Codificar el mensaje para usarlo en el enlace de WhatsApp
            const enlaceWhatsApp = encodeURI(`https://wa.me/${TEL}?text=${mensaje}`);

            // Mensaje final que se enviará a través de tu flujo dinámico
            const mensajeFinal = `*Haz clic en el siguiente enlace:* 
        ${enlaceWhatsApp}`;

            // Enviar el mensaje utilizando tu función flowDynamic
            return flowDynamic(mensajeFinal);

        }
    )


