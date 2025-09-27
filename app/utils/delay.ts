/**
 * Utility function to create a delay
 * @param ms - milliseconds to delay
 * @returns Promise that resolves after the specified delay
 */
export const delay = (ms: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Utility function to add a minimum loading time
 * Ensures loading state is shown for at least a minimum duration
 * @param asyncOperation - The async operation to perform
 * @param minimumDelay - Minimum time in milliseconds to show loading
 * @returns Promise that resolves with the operation result
 */
export const withMinimumDelay = async <T>(
    asyncOperation: () => Promise<T>,
    minimumDelay: number = 1000
): Promise<T> => {
    const [result] = await Promise.all([
        asyncOperation(),
        delay(minimumDelay)
    ]);
    return result;
};