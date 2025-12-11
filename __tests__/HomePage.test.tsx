import { render, screen } from "@testing-library/react";
import HomePage from "../src/app/page";
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

describe("HomePage", () => {
  it("renderiza o título na HomePage", () => {
    renderWithAuth(<HomePage />);
    expect(screen.getByText(/Catálogo de Cursos publicados./i)).toBeInTheDocument();
  });

  it("renderiza a mensagem de carregando", () => {
    renderWithAuth(<HomePage />);
    expect(screen.getByText(/Carregando cursos.../i)).toBeInTheDocument();
  });
});
