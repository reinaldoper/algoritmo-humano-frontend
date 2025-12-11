import { render, screen } from "@testing-library/react";
import RegisterPage from "../src/app/register/page";
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

describe("RegisterPage", () => {
  it("renderiza o título do formulário", () => {
    renderWithAuth(<RegisterPage />);
    expect(screen.getByText(/Cadastro/i)).toBeInTheDocument();
  });

  it("renderiza o botão de Cadastrar", () => {
    renderWithAuth(<RegisterPage />);
    expect(screen.getByRole("button", { name: /Cadastrar/i })).toBeInTheDocument();
  });
});
