import { addKeyword, EVENTS } from '@builderbot/bot';
import { JsonFileDB as Database } from '@builderbot/database-json'
import { BaileysProvider as Provider } from '@builderbot/provider-baileys'
import { reposicionFlow } from './reposicion.flow';
import { reset } from '../idle-custom'

export const amtateurFlow = addKeyword<Provider, Database>('1')
.addAnswer(
    [
        '¿Cual es el nombre del deportista? 🌟',
    ].join('\n'),
    { delay: 800, capture: true },
    async (ctx, {state,gotoFlow}) => {
        reset(ctx, gotoFlow, Number(process.env.TIEMPOINACTIVIDAD));
        await state.update({ nonmbreDeportista: ctx.body })
        return null;
    },
)
.addAnswer(
    [
        '¿Cual es tu nombre completo? 🌟',
    ].join('\n'),
    { delay: 800, capture: true },
    async (ctx, {state,gotoFlow }) => {
        reset(ctx, gotoFlow, Number(process.env.TIEMPOINACTIVIDAD));
        await state.update({ nombre: ctx.body })
        return null;
    },
).addAnswer(
    [
        '*Menu*',
        '',
        '1. 🔁 Reposición de clases.',
        '2. 🗓️ Cambio horario.',
        '3. 💊 Reportar Incapacidad.',
        '4. 💵 Realizar pago.',
        '5. 🏅 Inscripción a eventos deportivos.',
    ].join('\n'),
    { delay: 800, capture: true },
    async (ctx, {state, gotoFlow, fallBack }) => {
        reset(ctx, gotoFlow, Number(process.env.TIEMPOINACTIVIDAD));
       const numero = ctx.body;
       if (!['1', '2','3','4','5'].includes(numero)) {
           return fallBack('¡por favor ingresa una opcion valida! 🌟')
         }
            await state.update({ tipoCliente: ctx.body })
            return null;

    },
    [reposicionFlow]
)