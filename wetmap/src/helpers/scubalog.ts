import { supabase } from '../supabase';

async function sendLog(severity: string, message: string, ...data: any[]) {
  try {
    const response = await supabase.functions.invoke('weblog', {
      body: { message, platform: 'web', severity, data },
    });

    if (response.error) {
      throw response.error;
    }
  } catch (error: any) {
    console.error('Failed to send log:', error);
  }
}

export const scubalog = {
  log(message: string, ...data: any[]) {
    console.log(message, ...data);
    sendLog('log', message, ...data);
  },
  info(message: string, ...data: any[]) {
    console.info(message, ...data);
    sendLog('info', message, ...data);
  },
  warn(message: string, ...data: any[]) {
    console.warn(message, ...data);
    sendLog('warn', message, ...data);
  },
  error(message: string, ...data: any[]) {
    console.error(message, ...data);
    sendLog('error', message, ...data);
  },
  debug(message: string, ...data: any[]) {
    console.debug(message, ...data);
    sendLog('debug', message, ...data);
  },
};
