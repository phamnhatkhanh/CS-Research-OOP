"use client";
import { QueryClient, QueryClientProvider } from "react-query";
const UseQueryWrap = ({ children }) => {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </>
  );
};
export default UseQueryWrap;
