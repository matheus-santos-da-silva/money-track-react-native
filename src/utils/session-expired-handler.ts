type RequestError = {
  response?: { status?: number };
  config?: {
    url?: string;
    headers?: {
      get?: (name: string) => unknown;
      Authorization?: unknown;
    };
  };
};

interface SessionExpiredHandlerOptions {
  apiUrls: string[];
  token: string;
  onSessionExpired: () => void;
}

// Handler de erro para um interceptor de resposta do Axios.
// Só considera "sessão expirada" um 401 que:
//  - veio de uma das nossas APIs (não de terceiros);
//  - foi uma requisição autenticada com o token ATUAL (um 401 de login com senha
//    errada não tem token, e uma resposta atrasada de um token antigo é ignorada).
// O backend usa 403 para "senha incorreta" e "sem permissão", então 401 aqui
// significa token ausente, inválido ou expirado.
export const createSessionExpiredHandler = ({
  apiUrls,
  token,
  onSessionExpired,
}: SessionExpiredHandlerOptions) => {
  let alreadyHandled = false;

  return (error: unknown): Promise<never> => {
    const { response, config } = (error ?? {}) as RequestError;

    const sentAuthorization =
      config?.headers?.get?.("Authorization") ?? config?.headers?.Authorization;

    const isFromOurApi = apiUrls.some(
      (apiUrl) => !!apiUrl && !!config?.url?.startsWith(apiUrl)
    );

    if (
      response?.status === 401 &&
      isFromOurApi &&
      sentAuthorization === `Bearer ${token}` &&
      !alreadyHandled
    ) {
      // Várias requisições em paralelo falham juntas: avisa só uma vez.
      alreadyHandled = true;
      onSessionExpired();
    }

    return Promise.reject(error);
  };
};
