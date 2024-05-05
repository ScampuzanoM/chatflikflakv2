import { addKeyword, EVENTS } from '@builderbot/bot';
import { JsonFileDB as Database } from '@builderbot/database-json'
import { BaileysProvider as Provider } from '@builderbot/provider-baileys'
import { clienteActualFlow } from './cliente.actual.flow';
import { reset, start } from '../idle-custom'
import { clienteNuevoFlow } from './cliente.nuevo.flow';
import { polizaFlow } from './poliza.flow';
import { pqrsFlow } from './pqrs.flow';
import { fiestaFlow } from './fiesta.flow';


export const welcomeFlow = addKeyword<Provider, Database>(['hola', 'hoola', 'ole', 'alo', 'buenas', 'menu', 'holi', 'hol', 'oe', 'buenos'])
    .addAnswer(`🙌 ¡Hola FlikFlaker! Bienvenid@ a un mundo lleno de piruetas con *Flik-Flak*. Soy tu asistente virtual, *FlikFlakBot*.`,{ delay: 4000})
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
        {capture: true},
        async (ctx, { gotoFlow, fallBack}) => {
                reset(ctx, gotoFlow, Number(process.env.TIEMPOINACTIVIDAD));
                const opcion = ctx.body
                switch (opcion) {
                    case '1': {
                        return gotoFlow(clienteActualFlow)
                    }
                    case '2': {
                        return gotoFlow(clienteNuevoFlow)
                    }
                    case '3': {
                        return gotoFlow(polizaFlow)
                    }
                    case '4': {
                        return gotoFlow(pqrsFlow)
                    }
                    case '5': {
                        return gotoFlow(fiestaFlow)
                    }
                    default: {
                        return fallBack('🌟 ¡por favor ingresa una opcion valida! 🌟')
                    }
                }
            },
        []
    )

