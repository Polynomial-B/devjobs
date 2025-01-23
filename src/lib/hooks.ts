import { useEffect, useState } from "react";
import { JobItems } from "./types";

export function useJobItems(searchText: string) {
  const [jobItems, setJobItems] = useState<JobItems[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const slicedJobItems = jobItems.slice(0, 7);

  useEffect(() => {
    if (!searchText) return;

    const fetchData = async () => {
      setIsLoading(true);
      const res = await fetch(
        `https://bytegrad.com/course-assets/projects/rmtdev/api/data?search=${searchText}`
      );
      const data = await res.json();
      setIsLoading(false);
      setJobItems(data.jobItems);
    };
    fetchData();
  }, [searchText]);
  return { isLoading, jobItems: slicedJobItems } as const;
}
