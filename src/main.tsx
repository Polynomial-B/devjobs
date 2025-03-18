import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import BookmarksContextProvider from "./contexts/BookmarksContextProvider.tsx";
import ActiveIDContextProvider from "./contexts/ActiveIDContextProvider.tsx";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 60,
			refetchOnWindowFocus: true,
			retry: false,
		},
	},
});

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<BookmarksContextProvider>
				<ActiveIDContextProvider>
					<App />
				</ActiveIDContextProvider>
			</BookmarksContextProvider>
		</QueryClientProvider>
	</StrictMode>
);
