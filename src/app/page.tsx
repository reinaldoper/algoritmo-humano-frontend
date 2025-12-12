'use client';

import Navbar from '@/components/Navbar';
import { useAuth } from '@/context/AuthContext';
import { usePublishedCourses } from '@/hooks/useCourses';
import { CourseList } from '@/components/CourseList';

export default function HomePage() {
  const { isAuthenticated } = useAuth();
  const { data, isLoading, error } = usePublishedCourses();

  return (
    <div>
      <Navbar isAuthenticated={isAuthenticated} />
      <main className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Catálogo de Cursos publicados.</h2>
        <CourseList data={data || []} isLoading={isLoading} error={error} />
      </main>
    </div>
  );
}
