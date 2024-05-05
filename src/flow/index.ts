import { createFlow } from '@builderbot/bot';
import { clienteActualFlow } from './cliente.actual.flow';
import { welcomeFlow } from "./welcome.flow";
import { idleFlow } from '../idle-custom'
import * as dotenv from 'dotenv';

dotenv.config();
// other flows....

export const flow =  createFlow([welcomeFlow,clienteActualFlow, idleFlow])