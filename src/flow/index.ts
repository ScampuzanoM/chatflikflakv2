import * as dotenv from 'dotenv';
import { createFlow } from '@builderbot/bot';
import { clienteActualFlow } from './cliente.actual.flow';
import { welcomeFlow } from "./welcome.flow";
import { idleFlow } from '../idle-custom'
import { clienteNuevoFlow } from './cliente.nuevo.flow';
import { polizaFlow } from './poliza.flow';
import { pqrsFlow } from './pqrs.flow';
import { fiestaFlow } from './fiesta.flow';

dotenv.config();
// other flows....

export const flow = createFlow([welcomeFlow, clienteActualFlow, idleFlow, clienteNuevoFlow, polizaFlow, pqrsFlow, fiestaFlow])