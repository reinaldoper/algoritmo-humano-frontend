import { render, screen } from "@testing-library/react";
import NewCoursePage from "../src/app/courses/new/page";
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

describe("NewCoursePage", () => {
  it("renderiza o título na NewCoursePage", () => {
    renderWithAuth(<NewCoursePage />);
    expect(screen.getByText(/Cadastrar Curso/i)).toBeInTheDocument();
  });

  it("renderiza o link de voltar", () => {
    renderWithAuth(<NewCoursePage />);
    expect(screen.getByText(/Voltar para o Catálogo/i)).toBeInTheDocument();
  });
  it("renderiza o checkbox de checar", () => {
    renderWithAuth(<NewCoursePage />);
    expect(screen.getByText(/Ativo/i)).toBeInTheDocument();
  });
});
