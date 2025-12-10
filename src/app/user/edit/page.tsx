'use client';

import { useState } from 'react';
import { useUpdateUser } from '@/hooks/useUser';

export default function EditUserPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const updateUserMutation = useUpdateUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserMutation.mutate({ name, email, password });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-96 space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Editar Usuário</h2>

        <input
          type="text"
          placeholder="Nome"
          className="w-full border p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Nova senha"
          className="w-full border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
          disabled={updateUserMutation.isPending}
        >
          {updateUserMutation.isPending ? 'Salvando...' : 'Atualizar'}
        </button>

        {updateUserMutation.isError && (
          <p className="text-red-500 text-sm">Erro ao atualizar usuário</p>
        )}

        {updateUserMutation.isSuccess && (
          <p className="text-green-500 text-sm">Usuário atualizado com sucesso!</p>
        )}
      </form>
    </div>
  );
}
