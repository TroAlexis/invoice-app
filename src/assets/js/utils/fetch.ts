export const $fetch = async (...args: Parameters<typeof fetch>) => {
  try {
    const response = await fetch(...args);

    if (!response.ok) {
      throw Error(response.statusText);
    }

    return response.json();
  } catch (e) {
    console.error(e);
  }
};
