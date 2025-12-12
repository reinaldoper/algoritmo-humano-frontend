"use client";

import Navbar from "@/components/Navbar";
import { useAllCourses } from "@/hooks/useCourses";
import { Course } from "@/types/courses";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import Link from "next/link";

export default function AllCoursesPage() {
  const { isAuthenticated } = useAuth();
  const { data, isLoading, error } = useAllCourses();

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredCourses = data?.filter((course: Course) =>
    course.title.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = filteredCourses
    ? Math.ceil(filteredCourses.length / itemsPerPage)
    : 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCourses = filteredCourses?.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div>
      <Navbar isAuthenticated={isAuthenticated} />

      <main className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Todos os Cursos.</h2>
          <Link
            href="/"
            className="text-blue-600 underline hover:text-blue-800"
          >
            Voltar para Home
          </Link>
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Buscar por título..."
            className="w-full md:w-1/3 border p-2 rounded"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        {isLoading && (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
            <span className="ml-4 text-blue-600 font-medium">
              Carregando cursos...
            </span>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            <strong className="font-bold">Erro:</strong>
            <span className="block sm:inline">
              {" "}
              Não foi possível carregar os cursos.
            </span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {paginatedCourses?.map((course: Course) => (
            <div
              key={course.id}
              className="p-4 rounded shadow hover:shadow-lg transition-shadow duration-200 bg-amber-100"
            >
              {course.imageUrl && (
                <Image
                  src={course.imageUrl}
                  alt={course.title}
                  width={400}
                  height={200}
                  className="w-full h-40 object-cover rounded mb-3 hover:scale-105 transition-transform duration-300"
                />
              )}
              <h3 className="text-lg font-bold mb-2">{course.title}</h3>
              <p className="text-gray-700 mb-2">{course.description}</p>
              <small className="text-gray-500">
                Duração: {course.duration}h
              </small>

              {course.user && (
                <p className="text-sm text-gray-600 mt-2">
                  <strong>Autor:</strong> {course.user.name} (
                  {course.user.email})
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center mt-6 space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Anterior
          </button>
          <span>
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Próxima
          </button>
        </div>
      </main>
    </div>
  );
}
