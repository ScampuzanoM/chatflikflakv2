import { addKeyword } from '@builderbot/bot';
import { stop } from '../idle-custom';

export const polizaFlow =  addKeyword(['POLIZA_'])
    .addAnswer('*Mas informacion sobre el uso de la poliza*')
    .addAnswer('https://www.instagram.com/reel/C5oxMo6RB-N/?igsh=MXVtaHRiaDI5emRtZA=='
        , { capture: false }, async (ctx) => {
            return stop(ctx);
        }
    )


