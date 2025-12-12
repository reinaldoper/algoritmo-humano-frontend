'use client';

import { useState } from 'react';
import { useRegister } from '../../hooks/useAuth';
import Link from 'next/link';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const registerMutation = useRegister();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerMutation.mutate({ email, password, name });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-80 space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Cadastro</h2>
        <Link className="hover:underline text-blue-500" href="/">Voltar para catalogos.</Link>

        <input  
          minLength={5}
          required
          type="text"
          placeholder="Nome"
          className="w-full border p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          required
          minLength={5}
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input  
          minLength={6}
          required
          type="password"
          placeholder="Senha"
          className="w-full border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
          disabled={registerMutation.isPending}
        >
          {registerMutation.isPending ? 'Cadastrando...' : 'Cadastrar'}
        </button>

        {registerMutation.isError && (
          <p className="text-red-500 text-sm">Erro ao cadastrar usuário</p>
        )}

        {registerMutation.isSuccess && (
          <p className="text-green-500 text-sm">
            Cadastro realizado com sucesso! Agora faça{' '}
            <Link href="/login" className="underline text-blue-600">
              login
            </Link>
            .
          </p>
        )}
      </form>
    </div>
  );
}
