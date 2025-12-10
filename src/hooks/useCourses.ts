import { useQuery, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { Course } from '@/types/courses';
import { useMutation } from '@tanstack/react-query';


export function usePublishedCourses() {
  return useQuery<Course[]>({
    queryKey: ['publishedCourses'],
    queryFn: async () => {
      const res = await api.get<Course[]>('/courses/published');
      return res.data;
    },
  });
}

export function useCreateCourse() {
  return useMutation({
    mutationFn: async (course: {
      title: string;
      description: string;
      duration: string;
      imageUrl: string;
      status: boolean;
    }) => {
      const res = await api.post<Course>('/courses', course);
      return res.data;
    },
  });
}

export function useUserCourses() {
  return useQuery<Course[]>({
    queryKey: ['userCourses'],
    queryFn: async () => {
      const res = await api.get<Course[]>('/courses/me');
      return res.data;
    },
  });
}

export function useUpdateCourse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (course: {
      id: number;
      title?: string;
      description?: string;
      duration?: string;
      imageUrl?: string;
      status?: boolean;
    }) => {
      const res = await api.put<Course>(`/courses/${course.id}`, course);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userCourses'] });
    }
  });
}

export function useChangeCourseStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { id: number; status: boolean }) => {
      const res = await api.patch(`/courses/${data.id}/status`, {
        status: data.status,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userCourses'] });
    }
  });
}

export function useDeleteCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/courses/${id}`);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userCourses'] });
    },
  });
}

