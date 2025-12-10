"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const toggleMenu = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-100 shadow relative">
      <h1 className="text-xl font-bold">Algoritmo Humano</h1>
      <div className="space-x-4">
        {!isAuthenticated ? (
          <>
            <Link href="/login" className="hover:underline">
              Login
            </Link>
            <Link href="/register" className="hover:underline">
              Cadastro
            </Link>
          </>
        ) : (
          <>
            
            <div className="inline-block relative">
              <button
                onClick={() => toggleMenu("cursos")}
                className="font-medium hover:text-blue-600"
              >
                Cursos ▾
              </button>
              {openMenu === "cursos" && (
                <div className="absolute bg-white border rounded shadow-md mt-2 z-50">
                  <Link
                    href="/courses/new"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Cadastrar Curso
                  </Link>
                  <Link
                    href="/courses"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Meus Cursos
                  </Link>
                  <Link
                    href="/courses/all"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Todos os Cursos
                  </Link>
                </div>
              )}
            </div>

            
            <div className="inline-block relative">
              <button
                onClick={() => toggleMenu("usuario")}
                className="font-medium hover:text-blue-600"
              >
                Usuário ▾
              </button>
              {openMenu === "usuario" && (
                <div className="absolute bg-white border rounded shadow-md mt-2 z-50">
                  <Link
                    href="/user/edit"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Editar Usuário
                  </Link>
                  <Link
                    href="/user/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Perfil
                  </Link>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </nav>
  );
}
