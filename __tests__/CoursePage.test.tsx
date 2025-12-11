import { render, screen, fireEvent } from '@testing-library/react';
import NewCoursePage from '../src/app/courses/new/page';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function renderWithClient(ui: React.ReactElement) {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      {ui}
    </QueryClientProvider>
  );
}

describe('NewCoursePage', () => {
  it('renderiza o título do formulário', () => {
    renderWithClient(<NewCoursePage />);
    expect(screen.getByText(/Cadastrar Curso/i)).toBeInTheDocument();
  });

  it('permite digitar no campo título', () => {
    renderWithClient(<NewCoursePage />);
    const input = screen.getByPlaceholderText(/Título/i);
    fireEvent.change(input, { target: { value: 'Curso Teste' } });
    expect(input).toHaveValue('Curso Teste');
  });
});
