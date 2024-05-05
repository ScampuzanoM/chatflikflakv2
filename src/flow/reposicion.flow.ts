import { addKeyword } from '@builderbot/bot';
import { JsonFileDB as Database } from '@builderbot/database-json'
import { BaileysProvider as Provider } from '@builderbot/provider-baileys'
import json from '../../roles.json';


export const reposicionFlow = addKeyword<Provider, Database>(['1'])
.addAnswer(
    [
        '¡Seras dirigido con un asesor personalizado que te ayudara con tu clase de reposición! 🌟'
        ,
    ].join('\n'),
   null,
    async (_, {flowDynamic, state}) => {

        const myState = state.getMyState();
        const mensaje = `Hola,  mi nombre es ${myState.nombre} y necesito reponer una clase para el deportista ${myState.nonmbreDeportista}`
        const SEDE = json.sedes.find((sede) => sede.id === Number(myState.sede) );
        const TEL = SEDE.roles.numero_reposicion;
        // Codificar el mensaje para usarlo en el enlace
        const enlaceWhatsApp = encodeURI(`https://wa.me/${TEL}?text=${mensaje}`);

        // Mensaje final que se enviará a través de tu flujo dinámico
        const mensajeFinal = `*Haz clic en el siguiente enlace:*
        ${enlaceWhatsApp}`;
        // Enviar el mensaje utilizando tu función flowDynamic
        await flowDynamic([{
            body: mensajeFinal,
            delay: 2000
           }])

    }
)