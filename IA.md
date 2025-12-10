da pra configurar para que o diretório principal no nextjs fique dentro da pasta src?
{
"compilerOptions": {
"target": "ES2017",
"lib": ["dom", "dom.iterable", "esnext"],
"allowJs": true,
"skipLibCheck": true,
"strict": true,
"noEmit": true,
"esModuleInterop": true,
"module": "esnext",
"moduleResolution": "bundler",
"resolveJsonModule": true,
"isolatedModules": true,
"jsx": "react-jsx",
"incremental": true,
"plugins": [
{
"name": "next"
}
],
"paths": {
"@/*": ["./*"]
}
},
"include": [
"next-env.d.ts",
"**/*.ts",
"**/*.tsx",
".next/types/**/*.ts",
".next/dev/types/**/*.ts",
"**/*.mts"
],
"exclude": ["node_modules"]
}
Dá sim: o Next.js suporta totalmente usar src/ como diretório “raiz” de código, tanto para pages quanto para app, mas precisa ajustar a estrutura de pastas e um detalhe no tsconfig.json.​

Estrutura de pastas
No Next 13+ você pode usar:

src/app (App Router) ou

src/pages (Pages Router).

Basta mover a pasta atual para dentro de src (ex.: de app/ para src/app/).​
A pasta public/ e arquivos de config (next.config.js, package.json, etc.) continuam na raiz do projeto, não entram em src/.​

Ajustando o tsconfig
Hoje seu paths está assim:

json
"paths": {
  "@/*": ["./*"]
}
Se você quer que @/ aponte para src, ajuste para:

json
"compilerOptions": {
  "baseUrl": ".",
  "paths": {
    "@/*": ["src/*"]
  }
}
Assim, import X from "@/components/X" resolve para src/components/X, mantendo tudo organizado dentro de src.​

Include / arquivos TS
Seu include com **/*.ts e **/*.tsx já cobre src/**, então não precisa mudar nada para o TypeScript encontrar os arquivos.​
Só garanta que não existam app/ ou pages/ na raiz, porque se houver, o Next vai ignorar as versões dentro de src.
-------------------------
o que vc acharia melhor usar ja pasta principal, de entreda? - ter ja renderizados os cursos publicos, mas com uma nav bar com opções de login e cadastro e somente depois de logado aparecer as outras opções, ou na página de entrada da aplicação aparecer ja um form para login e caso não seja cadastrado, levar o usuario a página de registro?

📌 Opção 1 — Catálogo público como página inicial
O que aparece: lista de cursos ativos já renderizados.

Comportamento: uma navbar no topo com botões de Login e Cadastro.

Depois de logado: a navbar ganha novas opções (meus cursos, criar curso, etc.).

Vantagens:

Cumpre o requisito de ter um catálogo público acessível sem login.

Dá uma boa primeira impressão: o visitante já vê o conteúdo da plataforma.

É mais natural para quem chega sem saber se vai se cadastrar.

Desvantagem: exige que o usuário clique para logar/cadastrar, não força o fluxo de autenticação logo de cara.

📌 Opção 2 — Página inicial focada em login/registro
O que aparece: formulário de login logo na entrada.

Comportamento: se não tiver conta, link para registro.

Depois de logado: redireciona para catálogo ou dashboard.

Vantagens:

Fluxo direto para autenticação, útil se a aplicação fosse 100% privada.

Mais simples de implementar.

Desvantagem: não mostra os cursos públicos logo de cara, o que vai contra o requisito de catálogo aberto.

✅ Melhor escolha
Opção 1 é mais alinhada:

O desafio pede explicitamente um catálogo público de cursos ativos.

Mostrar esse catálogo já na página inicial valoriza o requisito.

A navbar com login/cadastro dá clareza e mantém a experiência fluida.

Depois de logado, o usuário vê as opções extras (CRUD de cursos).