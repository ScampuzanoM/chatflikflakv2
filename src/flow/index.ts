import { createFlow } from '@builderbot/bot';
import { clienteActualFlow } from './cliente.actual.flow';
import { welcomeFlow } from "./welcome.flow";

// other flows....

export const flow =  createFlow([welcomeFlow,clienteActualFlow])