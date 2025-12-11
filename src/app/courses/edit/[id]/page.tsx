'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useUpdateCourse } from '@/hooks/useCourses';
import Image from 'next/image';
import Link from 'next/link';

export default function EditCourseByIdPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = Number(params.id);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [imageBase64, setImageBase64] = useState<string>('');

  const updateCourseMutation = useUpdateCourse();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageBase64(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateCourseMutation.mutate(
      { id: courseId, title, description, duration, imageUrl: imageBase64 },
      {
        onSuccess: () => {
          router.push('/');
        },
      }
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-96 space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Editar Curso #{courseId}</h2>
        <Link className="hover:underline text-blue-500" href="/">Voltar para o Catálogo</Link>

        <input                            
          required
          min={6}
          type="text"
          placeholder="Título"
          className="w-full border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea 
          required
          rows={4}
          placeholder="Descrição"
          className="w-full border p-2 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input  
          required
          type="text"
          placeholder="Duração (horas)"
          className="w-full border p-2 rounded"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />

        <input  
          required
          type="file"
          accept="image/*"
          className="w-full"
          onChange={handleImageUpload}
        />

        {imageBase64 && (
          <Image
            src={imageBase64}
            alt="Preview"
            width={400}
            height={200}
            className="w-full h-40 object-cover rounded mb-2"
          />
        )}

        <button
          type="submit"
          className="w-full bg-yellow-600 text-white p-2 rounded hover:bg-yellow-700"
          disabled={updateCourseMutation.isPending}
        >
          {updateCourseMutation.isPending ? 'Salvando...' : 'Atualizar'}
        </button>

        {updateCourseMutation.isError && (
          <p className="text-red-500 text-sm">Erro ao atualizar curso</p>
        )}
      </form>
    </div>
  );
}
