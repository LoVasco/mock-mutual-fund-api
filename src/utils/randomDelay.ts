

/**
 * Random delay function
 *
 * This function is used to simulate a random delay in the API response.
 */
export const randomDelay = () => {
    const min = 100; // 0.1 seconds
    const max = 2500; // 2.5 seconds
    const delay = Math.floor(Math.random() * (max - min + 1)) + min;
    return new Promise(resolve => setTimeout(resolve, delay));
  };