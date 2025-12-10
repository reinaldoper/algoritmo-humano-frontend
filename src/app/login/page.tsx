'use client';

import { useState } from 'react';
import { useLogin } from '@/hooks/useAuth';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const loginMutation = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ email, password });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-80 space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Login</h2>
        <Link className="hover:underline text-blue-500" href="/register">Ainda não tem uma conta? Cadastre-se</Link>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          className="w-full border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          disabled={loginMutation.isPending}
        >
          {loginMutation.isPending ? 'Entrando...' : 'Entrar'}
        </button>

        {loginMutation.isError && (
          <p className="text-red-500 text-sm">Credenciais inválidas</p>
        )}
      </form>
    </div>
  );
}
