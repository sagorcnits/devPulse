export const sendError = <T>(status: number, message: string, error: T) => {
  return {
    status,
    message,
    error,
  };
};
