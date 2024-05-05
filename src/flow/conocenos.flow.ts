import { addKeyword } from '@builderbot/bot';
import { stop } from '../idle-custom';

export const conocenosFlow = addKeyword(['3'])
.addAnswer(
    [
        '¡Conocenos un poco mas! 🌟',
        'https://www.instagram.com/reel/C5msLL2RGjO/?igsh=Z3dlMDByeXdkaGZj'
    ],{capture:false}, async(ctx) =>{
        return stop(ctx);
    }
)
    .addAnswer('Muchas gracias por comunicarse con nosotros, si requiere algo mas escriba *Menu*')


