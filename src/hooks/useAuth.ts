import { useMutation } from '@tanstack/react-query';
import api  from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export function useLogin() {
  const { setAuthenticated } = useAuth();
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const res = await api.post('/auth/login', data);
      return res.data;
    },
    onSuccess: () => {
      setAuthenticated(true);
      router.push('/');
    },
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: async (data: { email: string; password: string; name: string }) => {
      const res = await api.post('/auth/register', data);
      return res.data;
    }
  });
}
