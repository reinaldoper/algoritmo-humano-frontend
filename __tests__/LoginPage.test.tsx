import { render, screen } from "@testing-library/react";
import LoginPage from "../src/app/login/page";
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

describe("LoginPage", () => {
  it("renderiza o título do formulário", () => {
    renderWithAuth(<LoginPage />);
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });

  it("renderiza o botão de login", () => {
    renderWithAuth(<LoginPage />);
    expect(screen.getByRole("button", { name: /Entrar/i })).toBeInTheDocument();
  });
});
