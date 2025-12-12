"use client";

import { useState, useEffect } from "react";
import { useUpdateUser } from "@/hooks/useUser";
import { useUserProfile } from "@/hooks/useUser";
import Link from "next/link";

export default function EditUserPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const updateUserMutation = useUpdateUser();
  const { data: user, isLoading } = useUserProfile();
  useEffect(() => {
    const initializeForm = () => {
      if (user) {
        setName(user.name);
        setEmail(user.email);
      }
    };
    if (!isLoading) {
      initializeForm();
    }
  }, [user, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserMutation.mutate({ name, email, password });
  };

  if (isLoading) {
    return <div className="flex justify-center items-center py-10">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
      <span className="ml-4 text-blue-600 font-medium">
        Carregando dados do usuário......
      </span>
    </div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-96 space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Editar Usuário</h2>
        <Link className="hover:underline text-blue-500" href="/">
          Voltar para o Catálogo
        </Link>

        <input
          required
          min={5}
          type="text"
          placeholder="Nome"
          className="w-full border p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          required
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          required
          min={6}
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
          {updateUserMutation.isPending ? "Salvando..." : "Atualizar"}
        </button>

        {updateUserMutation.isError && (
          <p className="text-red-500 text-sm">Erro ao atualizar usuário</p>
        )}

        {updateUserMutation.isSuccess && (
          <p className="text-green-500 text-sm">
            Usuário atualizado com sucesso!
          </p>
        )}
      </form>
    </div>
  );
}
