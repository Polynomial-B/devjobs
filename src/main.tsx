import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import BookmarksContextProvider from "./contexts/BookmarksContextProvider.tsx";
import ActiveIDContextProvider from "./contexts/ActiveIDContextProvider.tsx";
import SearchTextContextProvider from "./contexts/searchTextContextProvider.tsx";
import JobItemsContextProvider from "./contexts/JobItemsContextProvider.tsx";

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
					<SearchTextContextProvider>
						<JobItemsContextProvider>
							<App />
						</JobItemsContextProvider>
					</SearchTextContextProvider>
				</ActiveIDContextProvider>
			</BookmarksContextProvider>
		</QueryClientProvider>
	</StrictMode>
);
