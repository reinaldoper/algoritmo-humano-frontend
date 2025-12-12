'use client';

import Image from 'next/image';
import { CourseCardProps } from '@/types/courses';


export function CourseCard({ course }: CourseCardProps) {
  return (
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
    </div>
  );
}
