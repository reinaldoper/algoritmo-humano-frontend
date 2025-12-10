'use client';

import Link from 'next/link';
import { useUserProfile, useLogout, useDeleteAccount } from '@/hooks/useUser';


export default function UserProfilePage() {
  const { data, isLoading, error } = useUserProfile();
  const logoutMutation = useLogout();
  const deleteAccountMutation = useDeleteAccount();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
        <span className="ml-4 text-blue-600 font-medium">Carregando perfil...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
        <strong className="font-bold">Erro:</strong>
        <span className="block sm:inline"> Não foi possível carregar seu perfil.</span>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Perfil do Usuário</h2>
      <Link href="/" className="text-blue-600 underline hover:text-blue-800 mb-4 block">Voltar para catalogos.</Link>
      {data && (
        <div className="space-y-2 mb-6">
          <p><strong>ID:</strong> {data.id}</p>
          <p><strong>Nome:</strong> {data.name}</p>
          <p><strong>Email:</strong> {data.email}</p>
          <p><strong>Criado em:</strong> {new Date(data.createdAt).toLocaleDateString('pt-BR')}</p>
        </div>
      )}

      <div className="flex flex-col gap-3">
        <Link
          href="/user/edit"
          className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 text-center"
        >
          Editar Usuário
        </Link>

        <button
          onClick={() => logoutMutation.mutate()}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          disabled={logoutMutation.isPending}
        >
          {logoutMutation.isPending ? 'Saindo...' : 'Logout'}
        </button>

        <button
          onClick={() => {
            if (confirm('Tem certeza que deseja deletar sua conta?')) {
              deleteAccountMutation.mutate();
            }
          }}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          disabled={deleteAccountMutation.isPending}
        >
          {deleteAccountMutation.isPending ? 'Deletando...' : 'Deletar Conta'}
        </button>
      </div>
    </div>
  );
}
