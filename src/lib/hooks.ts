import { SetStateAction, useContext, useEffect, useState } from "react";
import { API_URL } from "./constants";
import { useQueries, useQuery } from "@tanstack/react-query";
import { AllJobItemsAPIResponse, JobItemAPIResponse } from "./types";
import toast from "react-hot-toast";
import { BookmarksContext } from "../contexts/BookmarksContext";
import { ActiveIDContext } from "../contexts/ActiveIDContext";
import { SearchTextContext } from "../contexts/SearchTextContext";
import { JobItemsContext } from "../contexts/JobItemsContext";

export function useParamId() {
  const [paramId, setParam] = useState<number | null>(null);
  useEffect(() => {
    const handleHashChange = () => {
      const id = +window.location.hash.slice(1);
      setParam(id);
    };
    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);
  return paramId;
}

const fetchJobItem = async (
  paramId: number | null
): Promise<JobItemAPIResponse> => {
  const res = await fetch(`${API_URL}/${paramId}`);
  if (res.ok) {
    const data = await res.json();
    return data;
  } else {
    throw new Error(res.status + res.statusText);
  }
};

export function useDisplayedItem(id: number | null) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["job-item", id],
    queryFn: () => fetchJobItem(id),
    enabled: !!id, // same as Boolean(paramId)
  });
  if (error) {
    if (error instanceof Error) {
      console.error(error);
      toast.error(error.message);
    }
  }
  const jobItem = data?.jobItem;
  return [jobItem, isLoading] as const;
}

const fetchAllJobItems = async (
  searchText: string
): Promise<AllJobItemsAPIResponse> => {
  const res = await fetch(`${API_URL}?search=${searchText}`);
  if (res.ok) {
    const data = await res.json();
    return data;
  } else {
    throw new Error(res.status + res.statusText);
  }
};

export function useSearch(searchText: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["job-items", searchText],
    queryFn: () => fetchAllJobItems(searchText),
    enabled: !!searchText,
  });
  if (error) {
    if (error instanceof Error) {
      console.error(error);
      toast.error(error.message);
    }
  }
  const jobItems = data?.jobItems;
  return { jobItems, isLoading } as const;
}

export function useDebounce<T>(value: T, delay = 500): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, React.Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState(() =>
    JSON.parse(localStorage.getItem(key) || JSON.stringify(initialValue))
  );
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);
  return [value, setValue] as const;
}

export function useBookmarksContext() {
  const context = useContext(BookmarksContext);
  if (!context) {
    throw new Error(
      "useBookmarksContext must be used within BookmarksContextProvider"
    );
  }
  return context;
}

export function useActiveIDContext() {
  const context = useContext(ActiveIDContext);
  if (!context) {
    throw new Error(
      "useActiveIDContext must be used within ActiveIDContextProvider"
    );
  }
  return context;
}
export function useSearchTextContext() {
  const context = useContext(SearchTextContext);
  if (!context) {
    throw new Error(
      "useSearchTextContext must be used within SearchTextContextProvider"
    );
  }
  return context;
}
export function useJobItemsContext() {
  const context = useContext(JobItemsContext);
  if (!context) {
    throw new Error(
      "useJobItemsContext must be used within JobItemsContextProvider"
    );
  }
  return context;
}

export const useJobItems = (ids: number[]) => {
  const results = useQueries({
    queries: ids.map((id) => ({
      queryKey: ["job-item", id],
      queryFn: () => fetchJobItem(id),
    })),
  });
  const jobItems = results
    .map((result) => result.data?.jobItem)
    .filter((jobItem) => jobItem !== undefined);
  const isLoading = results.some((result) => result.isLoading);
  return { jobItems, isLoading };
};

export function useOnClickOutside(
  refs: [React.RefObject<HTMLButtonElement>, React.RefObject<HTMLDivElement>],
  callbackFunction: () => void
) {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        e.target instanceof HTMLElement &&
        refs.every((ref) => !ref.current?.contains(e.target as Node))
      ) {
        callbackFunction();
      }
    };
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [refs, callbackFunction]);
}
