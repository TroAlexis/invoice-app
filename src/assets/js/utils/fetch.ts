import { timeout } from "utils/common";

export const $fetch = async (...args: Parameters<typeof fetch>) => {
  const response = await fetch(...args);

  if (!response.ok) {
    throw Error(response.statusText);
  }

  return response.json();
};

export const withTimeout = async <T>(
  promise: Promise<T>,
  time = 2000
): Promise<T> => {
  await timeout(time);

  return promise;
};
