import { toast } from 'react-toastify';
import screenData from '../components/newModals/screenData.json';

class SupabaseError extends Error {
    constructor(message: string, public details?: string) {
        super(`${"[Supabase] Error: " + message}`);
        this.name = "SupabaseError";
    }
}

type SupabaseCall<T> = () => Promise<{ data: T | null; error: any }>;

export const safeCall = async <T>(
    supabaseCall: SupabaseCall<T>,
    successMessage?: string,
    errorMessage: string = screenData.Toast.generalError
) => {

    try {
        const { data, error } = await supabaseCall();

        if (error) {
            toast.error(errorMessage);
            throw new SupabaseError(error.message, error.details);
        }

        if (successMessage) {
            toast.success(successMessage);
        }

        return data;
        
    } catch (err) {
        toast.error(errorMessage);
        console.error('[safeCall] Error: ', err);
        return null;
    }
};
