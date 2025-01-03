import { toast } from 'react-toastify';
import screenData from '../components/newModals/screenData.json';

export class SupabaseError extends Error {
    constructor(message: string, public details?: string) {
        super(message);
        this.name = "[SupabaseError]";

        if (details) {
            this.message = `${message} - ${details}`;
        }
        throw this;
    }

}

type SupabaseCall<T> = () => Promise<{ data: T | null; error: any }>;

export const safeCall = async <T>(
    supabaseCall: SupabaseCall<T>,
    successMessage?: string,
    errorMessage: string = screenData.Toast.generalError
) => {
        const { data, error } = await supabaseCall();

        if (error) {
            toast.error(errorMessage);
            throw new SupabaseError(error.message, error.details);
        }

        if (successMessage) {
            toast.success(successMessage);
        }

        return data;

};
