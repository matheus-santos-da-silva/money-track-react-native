import { getStatement } from "../services/GetStatementService";
import { useCallback, useEffect, useRef, useState } from "react";
import { getStatementCache, setStatementCache } from "../utils/cache-helpers";
import {
  StatementFilteredDTO,
  StatementItemDTO,
  StatementPageDTO,
  StatementQueryDTO,
  StatementSummaryDTO,
} from "../services/DTOS/finance/StatementDTO";

interface UseStatementParams {
  userId: string;
  token: string;
  query: StatementQueryDTO;
  // Guarda a primeira página para abrir a tela na hora e para uso sem rede.
  cacheable: boolean;
}

interface StatementState {
  items: StatementItemDTO[];
  dayTotals: Record<string, number>;
  summary: StatementSummaryDTO | null;
  filtered: StatementFilteredDTO | null;
  nextCursor: string | null;
  loading: boolean;
  loadingMore: boolean;
  refreshing: boolean;
  error: string | null;
}

const EMPTY: StatementState = {
  items: [],
  dayTotals: {},
  summary: null,
  filtered: null,
  nextCursor: null,
  loading: false,
  loadingMore: false,
  refreshing: false,
  error: null,
};

const toDayTotals = (days: StatementPageDTO["days"]) =>
  Object.fromEntries(days.map(({ date, total }) => [date, total]));

const fromFirstPage = (page: StatementPageDTO): StatementState => ({
  ...EMPTY,
  items: page.items,
  dayTotals: toDayTotals(page.days),
  summary: page.summary ?? null,
  filtered: page.filtered ?? null,
  nextCursor: page.next_cursor,
});

export const useStatement = ({
  userId,
  token,
  query,
  cacheable,
}: UseStatementParams) => {
  const [state, setState] = useState<StatementState>(EMPTY);

  // Cada carga da primeira página invalida as respostas das cargas anteriores.
  const requestId = useRef(0);
  const isLoadingMore = useRef(false);

  // O objeto da query é recriado a cada render: o que importa é o conteúdo.
  const queryKey = JSON.stringify(query);

  const loadFirstPage = useCallback(
    async (mode: "replace" | "refresh") => {
      if (!userId || !token) return;

      const request = ++requestId.current;
      const isCurrent = () => request === requestId.current;
      const cacheKey = { userId, start: query.start_date, end: query.end_date };

      if (mode === "refresh") {
        setState((current) => ({ ...current, refreshing: true }));
      } else {
        setState({ ...EMPTY, loading: true });

        const cached = cacheable ? await getStatementCache(cacheKey) : null;
        if (cached && isCurrent()) setState(fromFirstPage(cached));
      }

      const response = await getStatement(token, query);
      if (!isCurrent()) return;

      if (response.success && response.page) {
        setState(fromFirstPage(response.page));
        if (cacheable) setStatementCache(cacheKey, response.page);
        return;
      }

      // Sem rede: o que já está na tela (cache ou carga anterior) continua, sem erro.
      setState((current) => ({
        ...current,
        loading: false,
        refreshing: false,
        error: current.summary
          ? null
          : response.message || "Erro ao buscar o extrato",
      }));
    },
    [userId, token, queryKey, cacheable],
  );

  useEffect(() => {
    loadFirstPage("replace");
  }, [loadFirstPage]);

  const refresh = useCallback(() => loadFirstPage("refresh"), [loadFirstPage]);
  const reload = useCallback(() => loadFirstPage("replace"), [loadFirstPage]);

  const loadMore = async () => {
    const { nextCursor, loading, refreshing } = state;
    if (!nextCursor || loading || refreshing || isLoadingMore.current) return;

    const request = requestId.current;
    isLoadingMore.current = true;
    setState((current) => ({ ...current, loadingMore: true }));

    const response = await getStatement(token, query, nextCursor);
    isLoadingMore.current = false;

    // Os filtros mudaram enquanto a página carregava: ela não pertence mais à lista.
    if (request !== requestId.current) return;

    const page = response.success ? response.page : undefined;

    setState((current) =>
      page
        ? {
            ...current,
            items: [...current.items, ...page.items],
            dayTotals: { ...current.dayTotals, ...toDayTotals(page.days) },
            nextCursor: page.next_cursor,
            loadingMore: false,
          }
        : { ...current, loadingMore: false },
    );
  };

  return {
    ...state,
    loadMore,
    refresh,
    reload,
  };
};
