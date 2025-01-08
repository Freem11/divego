import { toast } from 'react-toastify';
import screenData from '../components/newModals/screenData.json';

type SupabaseCall<T> = () => Promise<{ data: T | null; error: any }>;

export const safeCall = async <T>(
    supabaseCall: SupabaseCall<T>,
    successMessage?: string,
    errorMessage: string = screenData.Toast.generalError
) => {
        const { data, error } = await supabaseCall();

        if (error) {
            toast.error(errorMessage);
        }

        if (successMessage) {
            toast.success(successMessage);
        }

        return data;
};
