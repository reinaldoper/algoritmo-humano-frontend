import { render, screen } from "@testing-library/react";
import EditCoursePage from "../src/app/courses/edit/[id]/page";
import { AuthProvider } from "../src/context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  useParams: () => ({ id: "1" }),
}));

function renderWithAuth(ui: React.ReactElement) {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{ui}</AuthProvider>
    </QueryClientProvider>
  );
}

describe("EditCoursePage", () => {
  it("renderiza o título na EditCoursePage", () => {
    renderWithAuth(<EditCoursePage />);
    expect(screen.getByText(/Editar Curso #/i)).toBeInTheDocument();
  });

  it("renderiza o link de voltar", () => {
    renderWithAuth(<EditCoursePage />);
    expect(screen.getByText(/Voltar para o Catálogo/i)).toBeInTheDocument();
  });
  it("renderiza o botão de atualizar", () => {
    renderWithAuth(<EditCoursePage />);
    expect(screen.getByText(/Atualizar/i)).toBeInTheDocument();
  });
});
