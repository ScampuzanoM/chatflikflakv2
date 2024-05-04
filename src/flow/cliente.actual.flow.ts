import { addKeyword, EVENTS } from '@builderbot/bot';
import { JsonFileDB as Database } from '@builderbot/database-json'
import { BaileysProvider as Provider } from '@builderbot/provider-baileys'

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
    async (ctx, {gotoFlow, fallBack }) => {
        const opcion = ctx.body

        return fallBack(`${opcion}`)
    },
    []
)