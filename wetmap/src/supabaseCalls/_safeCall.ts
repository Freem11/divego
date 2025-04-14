// import { toast } from 'react-toastify';
// import screenData from '../components/newModals/screenData.json';

// type SupabaseCall<T> = () => Promise<{ data: T | null, error: any }>;

// export const safeSupabase = async <T>(
//   supabaseCall: SupabaseCall<T>,
//   successMessage?: string,
//   errorMessage?: string,
// ) => {
//   try {
//     const { data, error } = await supabaseCall();

//     if (error) {
//       toast.error(errorMessage || screenData.Toast.generalError);
//       console.error('[Supabase] Error: ', error);
//       return null;
//     }

//     if (successMessage) {
//       toast.success(successMessage);
//     }

//     return data;
//   } catch (err) {
//     toast.error(errorMessage || screenData.Toast.generalError);
//     return null;
//   }
// };
