import { addKeyword, EVENTS } from '@builderbot/bot';
import { JsonFileDB as Database } from '@builderbot/database-json'
import { BaileysProvider as Provider } from '@builderbot/provider-baileys'
import { amtateurFlow } from './ameteur.flow';

export const clienteActualFlow = addKeyword<Provider, Database>('USUARIOS_REGISTRADOS')
.addAnswer(
    [
        '¡Bienvenido de nuevo, FlikFlaker! 🌟',
        'Dinos a qué sede de Flik-Flak perteneces',
        '',
        '1. Poblado: A una cuadra de la estación poblado del metro',
        '2. Palmas: Parque la reserva. A 300m de Indiana Mall',
        '3. Estadio: Coliseo de gimnasia Jorge Hugo Giraldo. Unidad Atanasio Girardot',
    ].join('\n'),
    { delay: 800, capture: true },
    async (ctx, {state, fallBack }) => {

        const  sede = ctx.body;
        if (sede != '1' && sede != '2' && sede != '3') {
            return fallBack('🌟 ¡por favor ingresa una opcion valida! 🌟')
        } else {
            await state.update({ sede: ctx.body })
            return null;
        }
    },

)
.addAnswer(
    [
        '¡FlikFlaker! 🌟',
        'Elije que tipo de deportista eres:',
        '',
        '1. Amateur/Aficionado',
        '2. Élite'
    ].join('\n'),
    { delay: 800, capture: true },
    async (ctx, {state, fallBack }) => {
       const tipoCliente = ctx.body;
       if (!['1', '2'].includes(tipoCliente)) {
           return fallBack('¡por favor ingresa una opcion valida! 🌟')
         }
            await state.update({ tipoCliente: ctx.body })
            return null;

    },
    [amtateurFlow]
)