'use client';

import { useState } from 'react';
import { CourseCard } from './CourseCard';
import { Pagination } from './Pagination';
import { CourseListProps } from '@/types/courses';

export function CourseList({ data, isLoading, error }: CourseListProps) {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredCourses = data?.filter((course) =>
    course.title.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = filteredCourses ? Math.ceil(filteredCourses.length / itemsPerPage) : 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCourses = filteredCourses?.slice(startIndex, startIndex + itemsPerPage);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
        <span className="ml-4 text-blue-600 font-medium">Carregando cursos...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
        <strong className="font-bold">Erro:</strong>
        <span className="block sm:inline"> Não foi possível carregar os cursos.</span>
      </div>
    );
  }

  return (
    <div>
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {paginatedCourses?.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
