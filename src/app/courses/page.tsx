"use client";

import Link from "next/link";
import { useUserCourses, useDeleteCourse } from "@/hooks/useCourses";
import { Course } from "@/types/courses";
import Image from "next/image";
import { useState } from "react";

export default function UserCoursesPage() {
  const { data, isLoading, error } = useUserCourses();
  const deleteCourseMutation = useDeleteCourse();

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

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

  const handleDelete = (id: number) => {
    if (confirm("Tem certeza que deseja excluir este curso?")) {
      deleteCourseMutation.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
        <span className="ml-4 text-blue-600 font-medium">
          Carregando cursos...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
        <strong className="font-bold">Erro:</strong>
        <span className="block sm:inline">
          {" "}
          Não foi possível carregar seus cursos.
        </span>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Meus Cursos</h2>
        <Link href="/" className="text-blue-600 underline hover:text-blue-800">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            <small className="text-gray-500">Duração: {course.duration}h</small>
            <p className="text-sm text-gray-600 mt-2">
              <strong>Autor:</strong> {course.user.name} ({course.user.email})
            </p>

            <div className="mt-3 flex gap-2">
              <Link
                href={`/courses/edit/${course.id}`}
                className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
              >
                Editar curso
              </Link>
              <Link
                href={`/courses/status/${course.id}`}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Editar status
              </Link>
              <button
                onClick={() => handleDelete(course.id)}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                disabled={deleteCourseMutation.isPending}
              >
                {deleteCourseMutation.isPending ? "Excluindo..." : "Excluir"}
              </button>
            </div>
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
    </div>
  );
}
