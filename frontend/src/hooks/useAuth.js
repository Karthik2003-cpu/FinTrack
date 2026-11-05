import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api/axios';

export default function useAuth() {
    const queryClient = useQueryClient();

    const { data: user, isLoading: isCheckingAuth, isError } = useQuery({
        queryKey: ['authUser'],
        queryFn: async () => {
            try {
                const res = await api.get('/auth/me');
                return res.data.user;
            } catch (error) {
                return null;
            }
        },
        retry: false,
        staleTime: 1000 * 60 * 5,
    });

    const loginMutation = useMutation({
        mutationFn: async (credentials) => {
            const res = await res.post('/auth/login', credentials);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['authUser'] });
        }
    });

    const registerMutation = useMutation({
        mutationFn: async (credentials) => {
            const res = await api('/auth/register', credentials);
            return res.data;
        },
    });

    const logoutMutation = useMutation({
        mutationFn: async () => {
            const res = await api.post('/auth/logout');
            return res.data;
        },
        onSuccess: () => {
            queryClient.setQueryData(['authUser'], null);
        },
    });

    return {
        user,
        isCheckingAuth,
        isAuthenticated: !!user, // Helper boolean: true if user object exists 
        login: loginMutation.mutateAsync, // Promise version of mutate for easy try/catch in components 
        loginError: loginMutation.error?.response?.data?.message,
        isLoggingIn: loginMutation.isPending,
        register: registerMutation.mutateAsync,
        registerError: registerMutation.error?.response?.data?.message,
        isRegistering: registerMutation.isPending,
        logout: logoutMutation.mutate,
        isLoggingOut: logoutMutation.isPending,
    };
};