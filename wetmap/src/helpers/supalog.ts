import { supabase } from '../supabase';

async function sendLog(severity: string, message: string, ...data: any[]) {
  try {
    console.log(message, ...data);

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

export const supalog = {
  log(message: string, ...data: any[]) {
    sendLog('log', message, ...data);
  },
  info(message: string, ...data: any[]) {
    sendLog('info', message, ...data);
  },
  warn(message: string, ...data: any[]) {
    sendLog('warn', message, ...data);
  },
  error(message: string, ...data: any[]) {
    sendLog('error', message, ...data);
  },
  debug(message: string, ...data: any[]) {
    sendLog('debug', message, ...data);
  },
};
