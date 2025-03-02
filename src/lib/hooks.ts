import { useEffect, useState } from "react";
import { API_URL } from "./constants";
import { useQuery } from "@tanstack/react-query";
import { JobItems } from "./types";

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

export function useDisplayedItem(paramId: number | null) {
  const { data, isLoading } = useQuery({
    queryKey: ["job-item", paramId],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/${paramId}`);
      if (res.ok) {
        const data = await res.json();
        return data;
      } else {
        throw new Error("404: Bad request");
      }
    },
    onError: () => {
      console.error("Error fetching job item: ");
    },
    enabled: Boolean(paramId),
  });
  const jobItem = data?.jobItem;
  return [jobItem, isLoading] as const;
}

export function useJobItems(searchText: string) {
  const [jobItems, setJobItems] = useState<JobItems[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const slicedJobItems = jobItems.slice(0, 7);
  const totalJobCount = jobItems.length;

  useEffect(() => {
    if (!searchText) return;

    const fetchData = async () => {
      setIsLoading(true);
      const res = await fetch(`${API_URL}?search=${searchText}`);
      const data = await res.json();
      setIsLoading(false);
      setJobItems(data.jobItems);
    };
    fetchData();
  }, [searchText]);
  return { isLoading, jobItems: slicedJobItems, totalJobCount } as const;
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
