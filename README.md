# Money Track · app

[![CI](https://github.com/matheus-santos-da-silva/money-track-react-native/actions/workflows/ci.yml/badge.svg)](https://github.com/matheus-santos-da-silva/money-track-react-native/actions/workflows/ci.yml)

App Android do [Money Track](https://github.com/matheus-santos-da-silva/money-track), de finanças pessoais: registre despesas e receitas (com parcelamento e recorrência), acompanhe o saldo do mês, consulte o extrato e os relatórios, e assine o plano Premium pela Google Play.

**Stack:** React Native · TypeScript · React Navigation · Reanimated · Axios · AsyncStorage · `react-native-iap`

<p align="center">
  <img src="https://raw.githubusercontent.com/matheus-santos-da-silva/money-track/main/docs/assets/home.png" width="230" alt="Tela inicial com saldo do mês e últimos lançamentos" />
  <img src="https://raw.githubusercontent.com/matheus-santos-da-silva/money-track/main/docs/assets/statement.png" width="230" alt="Extrato agrupado por dia" />
  <img src="https://raw.githubusercontent.com/matheus-santos-da-silva/money-track/main/docs/assets/new-expense.png" width="230" alt="Formulário de despesa parcelada" />
</p>

## Funcionalidades

- Cadastro, login, edição de perfil, troca de senha e exclusão de conta
- Despesas e receitas: à vista, parceladas (com prévia das parcelas) ou recorrentes, com edição e exclusão de "esta" ou "esta e as seguintes"
- Início com saldo do mês; extrato com busca, filtros e paginação; relatórios com evolução de 6 meses e gastos por categoria
- Categorias padrão e personalizadas
- Trial de 7 dias e assinatura Premium via Google Play Billing

## Arquitetura

```
src/
├── App.tsx        withIAPContext → AuthProvider → TransactionsProvider → navegação
├── routes/        Stack: rotas públicas (login/cadastro) ou protegidas, conforme o token
├── contexts/      AuthContext (token, usuário, isPremium) e TransactionsContext
├── hooks/         chamadas e estado de cada tela
├── services/      chamadas Axios aos dois serviços
├── screens/       telas
├── components/    componentes compartilhados
└── utils/         dinheiro, datas, cache e filtros
```

- **Estado global só com Context API**, sem Redux.
- **Cache com revalidação em segundo plano.** As transações do mês ficam no AsyncStorage com a hora da gravação: o app mostra o cache na hora e revalida em segundo plano quando ele tem mais de 60 s.
- **Dinheiro em centavos inteiros** nas somas ([`utils/money.ts`](src/utils/money.ts)), para não acumular erro de ponto flutuante.
- **Datas como dia de calendário** ([`utils/date-only.ts`](src/utils/date-only.ts)): o app envia `AAAA-MM-DD` e nunca converte datas do servidor com o fuso local.
- **O servidor decide o plano.** O app só lê `isPremium` e `isTrialActive`; a compra é validada no backend.

## Rodando

Pré-requisitos: Node 20+, JDK 17 e Android SDK com um emulador (ou aparelho). O backend sobe pelo [repositório principal](https://github.com/matheus-santos-da-silva/money-track).

```bash
cp .env.example .env
npm install         # instala pelo package-lock.json
npm start           # Metro
npm run android     # em outro terminal (variante playDebug)
```

`.env` para o emulador Android:

```
USERS_SERVICE_URL=http://10.0.2.2:3002
FINANCE_SERVICE_URL=http://10.0.2.2:3001/finance
```

As variáveis são embutidas no bundle pelo `react-native-dotenv`: depois de alterá-las, reinicie o Metro com `npm start -- --reset-cache`.

## Testes

```bash
npm test
```
