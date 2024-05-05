import { addKeyword } from '@builderbot/bot';
import { JsonFileDB as Database } from '@builderbot/database-json'
import { BaileysProvider as Provider } from '@builderbot/provider-baileys'
import { reset } from '../idle-custom'
import { clasePruebaFlow } from './claseprueba.flow'
import { matriculaFlow } from './matricula.flow'
import { conocenosFlow } from './conocenos.flow';
// import { conocenosFlow } from './conocenos'
// import { defaultFlow } from './conocenos'


/**
 * FLujo Inteligente (va a ser activado por una intencion de una persona o por palabra clave)
 * Flujo de bienvenida
 */
export const clienteNuevoFlow = addKeyword<Provider, Database>('USUARIOS_NO_REGISTRADOS')
    .addAnswer(
        [
            '*Menu:*',
            '',
            '1. 📋 Clase Prueba: Reservar nuestra clase de prueba.',
            '2. 🧑‍🎓 Matriculas: Inicia nuestro proceso de matricula.',
            '3. ⚠️ Conócenos: Conócenos un poco mas.',
        ],
        { capture: true },
        async (ctx, { gotoFlow, fallBack }) => {
            reset(ctx, gotoFlow, Number(process.env.TIEMPOINACTIVIDAD));
            const opcion = ctx.body
            if (!['1', '2','3'].includes(opcion)) {
                //await gotoFlow(defaultFlow)
                return fallBack('🌟 ¡por favor ingresa una opcion valida! 🌟')
            }
        },
        [clasePruebaFlow,matriculaFlow, conocenosFlow]
    )

