import { useEffect, useState } from "react";
import { API_URL } from "./constants";
import { useQuery } from "@tanstack/react-query";
import { AllJobItemsAPIResponse, JobItemAPIResponse, JobItems } from "./types";

export function useParamId() {
  const [param, setParam] = useState<number | null>(null);
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
  return param;
}

const fetchJobItem = async (
  paramId: number | null
): Promise<JobItemAPIResponse> => {
  const res = await fetch(`${API_URL}/${paramId}`);
  if (res.ok) {
    const data = await res.json();
    return data;
  } else {
    throw new Error(`Error! ${res.status}: ${res.statusText}`);
  }
};

export function useDisplayedItem(paramId: number | null) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["job-item", paramId],
    queryFn: () => fetchJobItem(paramId),
    enabled: !!paramId, // same as Boolean(paramId)
  });
  if (error) {
    console.error(error);
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
    throw new Error(`Error! ${res.status}: ${res.statusText}`);
  }
};

export function useJobItems(searchText: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["job-items", searchText],
    queryFn: () => fetchAllJobItems(searchText),
    enabled: !!searchText,
  });
  if (error) {
    console.error(error);
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
