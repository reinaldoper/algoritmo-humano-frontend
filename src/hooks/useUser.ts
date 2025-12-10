import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { UserProfile } from '@/types/user';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export function useUserProfile() {
  return useQuery<UserProfile>({
    queryKey: ['userProfile'],
    queryFn: async () => {
      const res = await api.get<UserProfile>('/users/me');
      return res.data;
    },
  });
}

export function useLogout() {
  const router = useRouter();
  const { setAuthenticated } = useAuth();

  return useMutation({
    mutationFn: async () => {
      await api.post('/auth/logout');
    },
    onSuccess: () => {
      setAuthenticated(false);
      router.push('/login');
    },
  });
}

export function useDeleteAccount() {
  const router = useRouter();
  const { setAuthenticated } = useAuth();

  return useMutation({
    mutationFn: async () => {
      await api.delete('/users/me');
    },
    onSuccess: () => {
      setAuthenticated(false);
      router.push('/register');
    },
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { setAuthenticated } = useAuth();

  return useMutation({
    mutationFn: async (data: { name?: string; email?: string; password?: string }) => {
      const res = await api.put('/users/me', data);
      return res.data;
    },
    onSuccess: () => {
      setAuthenticated(true);
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
      router.push('/user/profile');
    },
  });
}
