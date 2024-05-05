import { addKeyword, EVENTS } from '@builderbot/bot';
import { JsonFileDB as Database } from '@builderbot/database-json'
import { BaileysProvider as Provider } from '@builderbot/provider-baileys'
import { clienteActualFlow } from './cliente.actual.flow';
import { idleFlow, reset, start, stop } from '../idle-custom'


export const welcomeFlow = addKeyword<Provider, Database>(['hola', 'hoola', 'ole', 'alo', 'buenas', 'menu', 'holi', 'hol', 'oe', 'buenos'])
    .addAnswer(`🙌 ¡Hola FlikFlaker! Bienvenid@ a un mundo lleno de piruetas con *Flik-Flak*. Soy tu asistente virtual, *FlikFlakBot*.`)
    .addAction(async (ctx, { gotoFlow }) => start(ctx, gotoFlow, Number(process.env.TIEMPOINACTIVIDAD) ))
    .addAnswer(
        [
            '*Menú:*',
            '',
            '1. 🌐 Ya eres cliente.',
            '2. 👋 Nuevo FlikFlaker.',
            '3. 📋 Pólizas.',
            '4. 📪 PQRS',
            '5. 🎊 Agenda tu fiesta de cumpleaños.'
            ,
        ].join('\n'),
        { delay: 800, capture: true},
        async (ctx, { gotoFlow, fallBack}) => {
                reset(ctx, gotoFlow, Number(process.env.TIEMPOINACTIVIDAD));
                const opcion = ctx.body
                switch (opcion) {
                    case '1': {
                        return gotoFlow(clienteActualFlow)
                    }
                    default: {
                        return fallBack('🌟 ¡por favor ingresa una opcion valida! 🌟')
                    }
                }
            },
        []
    )

