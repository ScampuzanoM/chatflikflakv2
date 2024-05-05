import { addKeyword } from '@builderbot/bot';
import { JsonFileDB as Database } from '@builderbot/database-json'
import { BaileysProvider as Provider } from '@builderbot/provider-baileys'
import { reset, stop } from '../idle-custom'

const TEL = '573134518987'

export const fiestaFlow = addKeyword<Provider, Database>(['_fiesta_'])
    .addAnswer(['¡Conocenos un poco mas sobre nuestras reservas de cumpleaños!'],
        { media: 'https://firebasestorage.googleapis.com/v0/b/flikflka.appspot.com/o/elite-pagos%2Fcumple.jpeg?alt=media&token=19184f81-0659-487c-ac23-7f001ca3b1af' })
    .addAnswer('Cual es el nombre de el/la cumpleañer@', { capture: true },
        async (ctx, { gotoFlow, state }) => {
            reset(ctx, gotoFlow, Number(process.env.TIEMPOINACTIVIDAD));
            await state.update({ nombre_cumpleañero: ctx.body })
            return null;
        })
    .addAnswer('Cuentanos la edad de el/la cumpleañer@', { capture: true },
        async (ctx, { gotoFlow, state }) => {
            reset(ctx, gotoFlow, Number(process.env.TIEMPOINACTIVIDAD));
            await state.update({ edad_cumpleañero: ctx.body })
            return null;
        })
    .addAnswer(['¿Donde deseas tu fiesta?', '1. En alguna de nuestras sedes', '2. En tu casa'],
        { capture: true },
        async (ctx, { gotoFlow, state, fallBack }) => {
            reset(ctx, gotoFlow, Number(process.env.TIEMPOINACTIVIDAD));
            switch (ctx.body) {
                case '1':
                    await state.update({ sede_cumpleaños: 'en una sede de flik flak' })
                    break;
                case '2':
                    await state.update({ sede_cumpleaños: 'en casa' })
                    break;
                default:
                    return fallBack('🌟 ¡por favor ingresa una opcion valida! 🌟')
            }
        })
    .addAnswer('¡Seras dirigido con un asesor personalizado que te ayudara con la reserva.! 🌟',
        { capture: false }, async (ctx, { flowDynamic, state }) => {
            stop(ctx);
            const myState = state.getMyState();
            const mensaje = `Hola, necesito hacer una reserva para una fiesta de cumpleaños ${myState.sede_cumpleaños} para el cumpleañero ${myState.nombre_cumpleañero} que va a cumplir ${myState.edad_cumpleañero}`;

            // Codificar el mensaje para usarlo en el enlace de WhatsApp
            const enlaceWhatsApp = encodeURI(`https://wa.me/${TEL}?text=${mensaje}`);

            // Mensaje final que se enviará a través de tu flujo dinámico
            const mensajeFinal = `*Haz clic en el siguiente enlace:* 
        ${enlaceWhatsApp}`;
            // Enviar el mensaje utilizando tu función flowDynamic
            return flowDynamic(mensajeFinal);

        }
    )


