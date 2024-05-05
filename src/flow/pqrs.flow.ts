import { addKeyword } from '@builderbot/bot';
import { stop } from '../idle-custom';

const TEL = '573016453429'

export const pqrsFlow = addKeyword(['PQRS'])
.addAnswer('¡Seras dirigido con un asesor personalizado que te ayudara con la queja.! 🌟', 
    {capture: false}, async(ctx,{flowDynamic, state}) => {
        stop(ctx);
        const mensaje = `Hola,  necesito dejar una PQR's .`;
        // Codificar el mensaje para usarlo en el enlace de WhatsApp
        const enlaceWhatsApp = encodeURI(`https://wa.me/${TEL}?text=${mensaje}`);
        // Mensaje final que se enviará a través de tu flujo dinámico
        const mensajeFinal = `*Haz clic en el siguiente enlace:* 
        ${enlaceWhatsApp}`;
        // Enviar el mensaje utilizando tu función flowDynamic
        return flowDynamic(mensajeFinal);

    }
    )


