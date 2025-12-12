"use client";

import { useState } from "react";
import { useCreateCourse } from "@/hooks/useCourses";
import Image from "next/image";
import Link from "next/link";

export default function NewCoursePage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [status, setStatus] = useState(true);
  const [imageBase64, setImageBase64] = useState<string>("");

  const createCourseMutation = useCreateCourse();

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
    createCourseMutation.mutate({
      title,
      description,
      duration,
      imageUrl: imageBase64,
      status,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-96 space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Cadastrar Curso</h2>
        <Link className="hover:underline text-blue-500" href="/">Voltar para o Catálogo</Link>

        <input
          required
          minLength={6}
          type="text"
          placeholder="Título"
          className="w-full border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea 
          required
          minLength={10}
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
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          disabled={createCourseMutation.isPending}
        >
          {createCourseMutation.isPending ? "Salvando..." : "Cadastrar"}
        </button>

        {createCourseMutation.isError && (
          <p className="text-red-500 text-sm">Erro ao cadastrar curso</p>
        )}

        {createCourseMutation.isSuccess && (
          <p className="text-green-500 text-sm">
            Curso cadastrado com sucesso!
          </p>
        )}
      </form>
    </div>
  );
}
