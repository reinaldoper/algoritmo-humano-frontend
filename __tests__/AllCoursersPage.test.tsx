import { render, screen } from "@testing-library/react";
import AllCoursesPage from "../src/app/courses/all/page";
import { AuthProvider } from "../src/context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

function renderWithAuth(ui: React.ReactElement) {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{ui}</AuthProvider>
    </QueryClientProvider>
  );
}

describe("AllCoursesPage", () => {
  it("renderiza o título na AllCoursesPage", () => {
    renderWithAuth(<AllCoursesPage />);
    expect(screen.getByText(/Todos os Cursos./i)).toBeInTheDocument();
  });

  it("renderiza o link de voltar", () => {
    renderWithAuth(<AllCoursesPage />);
    expect(screen.getByText(/Voltar para Home/i)).toBeInTheDocument();
  });
  it("renderiza a mensagem de carregando", () => {
    renderWithAuth(<AllCoursesPage />);
    expect(screen.getByText(/Carregando cursos.../i)).toBeInTheDocument();
  });
});
