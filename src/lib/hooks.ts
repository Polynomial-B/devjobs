import { useEffect, useState } from "react";
import { JobItemDetails, JobItems } from "./types";
import { API_URL } from "./constants";

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
  const [displayedItem, setDisplayedItem] = useState<JobItemDetails | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!paramId) return;
    setIsLoading(true);
    const fetchData = async () => {
      const res = await fetch(`${API_URL}/${paramId}`);
      if (res.ok) {
        const data = await res.json();
        setIsLoading(false);
        setDisplayedItem(data.jobItem);
      }
    };
    fetchData();
  }, [paramId]);
  return [displayedItem, isLoading] as const;
}
