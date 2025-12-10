'use client';

import { useState } from 'react';
import { useChangeCourseStatus } from '@/hooks/useCourses';
import { useParams, useRouter } from 'next/navigation';

export default function ChangeCourseStatusPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = Number(params.id);

  const id = courseId;
  const [status, setStatus] = useState(true);

  const changeStatusMutation = useChangeCourseStatus();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    changeStatusMutation.mutate({ id, status });
  };

  if (changeStatusMutation.isSuccess) {
    setTimeout(() => {
      router.push('/');
    }, 2000);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-96 space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Mudar Status do Curso</h2>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={status}
            onChange={(e) => setStatus(e.target.checked)}
          />
          <span>Ativo</span>
        </label>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-700"
          disabled={changeStatusMutation.isPending}
        >
          {changeStatusMutation.isPending ? 'Atualizando...' : 'Mudar Status'}
        </button>

        {changeStatusMutation.isError && (
          <p className="text-red-500 text-sm">Erro ao mudar status</p>
        )}

        {changeStatusMutation.isSuccess && (
          <p className="text-green-500 text-sm">Status atualizado com sucesso!</p>
        )}
      </form>
    </div>
  );
}
