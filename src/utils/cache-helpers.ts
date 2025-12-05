import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserTransactionsDTO } from "../services/DTOS/UserTransactionsDTO";

export const getTransactionsCache = async (
  user_id: string,
  month: number,
  year: number
): Promise<UserTransactionsDTO | null> => {
  try {
    const cacheKey = `@money-track-transactions_${user_id}_${year}_${month}`;
    const cachedData = await AsyncStorage.getItem(cacheKey);

    return cachedData ? JSON.parse(cachedData) : null;
  } catch (error) {
    return null;
  }
};

export const setTransactionsCache = async (
  userId: string,
  month: number,
  year: number,
  data: any
) => {
  try {
    const cacheKey = `@money-track-transactions_${userId}_${year}_${month}`;
    await AsyncStorage.setItem(cacheKey, JSON.stringify(data));
  } catch (error) {
    return null;
  }
};

export const clearOldCache = async (user_id: string) => {
  try {
    const allKeys = await AsyncStorage.getAllKeys();
    const userKeys = allKeys.filter((key) =>
      key.startsWith(`@money-track-transactions_${user_id}_`)
    );

    if (userKeys.length > 0) await AsyncStorage.multiRemove(userKeys);
  } catch (error) {
    console.error("Error clearing cache:", error);
  }
};