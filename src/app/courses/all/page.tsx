"use client";

import Navbar from "@/components/Navbar";
import { useAllCourses } from "@/hooks/useCourses";
import { useAuth } from "@/context/AuthContext";
import { CourseList } from "@/components/CourseList";


export default function AllCoursesPage() {
  const { isAuthenticated } = useAuth();
  const { data, isLoading, error } = useAllCourses();

  return (
      <div>
        <Navbar isAuthenticated={isAuthenticated} />
        <main className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Todos os cursos.</h2>
          <CourseList data={data || []} isLoading={isLoading} error={error} />
        </main>
      </div>
    );
}
