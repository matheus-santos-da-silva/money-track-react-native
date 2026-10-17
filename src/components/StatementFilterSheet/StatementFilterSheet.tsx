import { Chip } from "../Chip/Chip";
import { styles } from "./StatementFilterSheetStyles";
import { Colors } from "../../styles/colors";
import { CategoryDTO } from "../../services/DTOS/finance/CategoryDTO";
import { sheetStyles } from "../../styles/sheet";
import { formatAmount } from "../../utils/format-amount";
import { useCloseOnBack } from "../../hooks/useCloseOnBack";
import { useModalAnimation } from "../../hooks/useModalAnimation";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { fromCents, toCents } from "../../utils/money";
import { FC, useEffect, useState } from "react";
import { parseDateOnly, toDateOnlyString } from "../../utils/date-only";
import {
  StatementMode,
  StatementSort,
} from "../../services/DTOS/finance/StatementDTO";
import {
  defaultFilters,
  MODE_OPTIONS,
  PERIOD_OPTIONS,
  periodFromOption,
  PeriodOption,
  periodOptionOf,
  SORT_OPTIONS,
  StatementFilters,
} from "../../utils/statement-filters";
import {
  Animated,
  Dimensions,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";

interface StatementFilterSheetProps {
  visible: boolean;
  onClose: () => void;
  filters: StatementFilters;
  categories: CategoryDTO[];
  onApply: (filters: StatementFilters) => void;
}

// O que o usuário está montando no sheet, antes de aplicar.
interface Draft {
  // null: um mês escolhido no cabeçalho que não é o atual nem o passado.
  periodOption: PeriodOption | null;
  customStart: string;
  customEnd: string;
  categoryIds: string[];
  // Valores digitados, em centavos ("" = sem limite).
  minCents: string;
  maxCents: string;
  modes: StatementMode[];
  sort: StatementSort;
}

const MAX_AMOUNT_DIGITS = 9;

const toCentsText = (amount: number | null) =>
  amount === null ? "" : String(toCents(amount));

const toAmount = (cents: string) => (cents ? fromCents(Number(cents)) : null);

const toDraft = (filters: StatementFilters, now: Date): Draft => {
  const { period } = filters;
  const isCustom = period.kind === "custom";

  return {
    periodOption: periodOptionOf(period, now),
    // Sugestão inicial do período personalizado: do dia 1º até hoje.
    customStart: isCustom
      ? period.start
      : toDateOnlyString(new Date(now.getFullYear(), now.getMonth(), 1)),
    customEnd: isCustom ? period.end : toDateOnlyString(now),
    categoryIds: filters.categoryIds,
    minCents: toCentsText(filters.minAmount),
    maxCents: toCentsText(filters.maxAmount),
    modes: filters.modes,
    sort: filters.sort,
  };
};

const toggle = <T,>(list: T[], item: T): T[] =>
  list.includes(item) ? list.filter((other) => other !== item) : [...list, item];

const formatDate = (dateOnly: string) =>
  parseDateOnly(dateOnly).toLocaleDateString("pt-BR");

export const StatementFilterSheet: FC<StatementFilterSheetProps> = ({
  visible,
  onClose,
  filters,
  categories,
  onApply,
}) => {
  const insets = useSafeAreaInsets();

  const [draft, setDraft] = useState<Draft>(() => toDraft(filters, new Date()));
  const [dateBeingPicked, setDateBeingPicked] = useState<
    "customStart" | "customEnd" | null
  >(null);

  // O conteúdo define a altura do sheet; a animação parte de fora da tela.
  const { translateY, panResponder } = useModalAnimation(
    visible,
    onClose,
    Dimensions.get("window").height,
  );

  useCloseOnBack(visible, onClose);

  useEffect(() => {
    if (visible) setDraft(toDraft(filters, new Date()));
  }, [visible, filters]);

  if (!visible) return null;

  const update = (changes: Partial<Draft>) =>
    setDraft((current) => ({ ...current, ...changes }));

  const handleDatePicked = (selected: Date) => {
    const picked = toDateOnlyString(selected);
    const next = { ...draft, [dateBeingPicked as string]: picked };

    // Mantém o intervalo válido: a outra ponta acompanha a data escolhida.
    if (next.customStart > next.customEnd) {
      next.customStart = picked;
      next.customEnd = picked;
    }

    setDraft(next);
  };

  const handleClear = () => {
    const now = new Date();
    setDraft(toDraft(defaultFilters(now.getMonth(), now.getFullYear()), now));
  };

  const handleApply = () => {
    const { periodOption, customStart, customEnd } = draft;
    const [minAmount, maxAmount] = [
      toAmount(draft.minCents),
      toAmount(draft.maxCents),
    ];
    const isInverted =
      minAmount !== null && maxAmount !== null && minAmount > maxAmount;

    let period = filters.period;
    if (periodOption === "custom") {
      period = { kind: "custom", start: customStart, end: customEnd };
    } else if (periodOption) {
      period = periodFromOption(periodOption);
    }

    onApply({
      ...filters,
      period,
      categoryIds: draft.categoryIds,
      minAmount: isInverted ? maxAmount : minAmount,
      maxAmount: isInverted ? minAmount : maxAmount,
      modes: draft.modes,
      sort: draft.sort,
    });
    onClose();
  };

  const renderAmountField = (label: string, field: "minCents" | "maxCents") => (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={styles.amountInputRow}>
        <Text style={styles.amountPrefix}>R$</Text>
        <TextInput
          style={styles.amountInput}
          keyboardType="number-pad"
          placeholder="0,00"
          placeholderTextColor={Colors.muted}
          value={draft[field] ? formatAmount(Number(draft[field]) / 100) : ""}
          onChangeText={(text) =>
            update({
              [field]: text
                .replace(/\D/g, "")
                .replace(/^0+/, "")
                .slice(0, MAX_AMOUNT_DIGITS),
            })
          }
          accessibilityLabel={`Valor ${label.toLowerCase()}`}
        />
      </View>
    </View>
  );

  const renderDateButton = (
    label: string,
    field: "customStart" | "customEnd",
  ) => (
    <TouchableOpacity
      style={styles.field}
      activeOpacity={0.8}
      onPress={() => setDateBeingPicked(field)}
      accessibilityRole="button"
      accessibilityLabel={`${label} ${formatDate(draft[field])}`}
    >
      <Text style={styles.fieldLabel}>{label}</Text>
      <Text style={styles.dateValue}>{formatDate(draft[field])}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={sheetStyles.overlay}>
      <Pressable style={sheetStyles.backdrop} onPress={onClose} />

      <Animated.View
        style={[
          sheetStyles.sheet,
          styles.sheet,
          { paddingBottom: 20 + insets.bottom, transform: [{ translateY }] },
        ]}
      >
        {/* Só o topo arrasta o sheet: o conteúdo abaixo rola. */}
        <View style={styles.dragArea} {...panResponder.panHandlers}>
          <View style={sheetStyles.handle} />
          <Text style={styles.title}>Filtros</Text>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Período</Text>
            <View style={styles.chips}>
              {PERIOD_OPTIONS.map(({ id, label }) => (
                <Chip
                  key={id}
                  variant="tint"
                  label={label}
                  selected={draft.periodOption === id}
                  onPress={() => update({ periodOption: id })}
                />
              ))}
            </View>

            {draft.periodOption === "custom" && (
              <View style={styles.row}>
                {renderDateButton("De", "customStart")}
                {renderDateButton("Até", "customEnd")}
              </View>
            )}
          </View>

          {categories.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Categorias</Text>
              <View style={styles.chips}>
                {categories.map(({ id, name }) => (
                  <Chip
                    key={id}
                    variant="tint"
                    label={name}
                    selected={draft.categoryIds.includes(id)}
                    onPress={() =>
                      update({ categoryIds: toggle(draft.categoryIds, id) })
                    }
                  />
                ))}
              </View>
            </View>
          )}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Valor</Text>
            <View style={styles.row}>
              {renderAmountField("Mínimo", "minCents")}
              {renderAmountField("Máximo", "maxCents")}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Modalidade</Text>
            <View style={styles.chips}>
              {MODE_OPTIONS.map(({ id, label }) => (
                <Chip
                  key={id}
                  variant="tint"
                  label={label}
                  selected={draft.modes.includes(id)}
                  onPress={() => update({ modes: toggle(draft.modes, id) })}
                />
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ordenar por</Text>
            <View style={styles.chips}>
              {SORT_OPTIONS.map(({ id, label }) => (
                <Chip
                  key={id}
                  variant="tint"
                  label={label}
                  selected={draft.sort === id}
                  onPress={() => update({ sort: id })}
                />
              ))}
            </View>
          </View>
        </ScrollView>

        <View style={styles.row}>
          <TouchableOpacity
            style={[styles.footerButton, styles.clearButton]}
            activeOpacity={0.8}
            onPress={handleClear}
            accessibilityRole="button"
          >
            <Text style={styles.clearText}>Limpar tudo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.footerButton, styles.applyButton]}
            activeOpacity={0.8}
            onPress={handleApply}
            accessibilityRole="button"
          >
            <Text style={styles.applyText}>Aplicar</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      {dateBeingPicked && (
        <DateTimePicker
          value={parseDateOnly(draft[dateBeingPicked])}
          mode="date"
          display="calendar"
          onChange={(event, selectedDate) => {
            setDateBeingPicked(null);
            if (event.type === "set" && selectedDate) {
              handleDatePicked(selectedDate);
            }
          }}
        />
      )}
    </View>
  );
};
