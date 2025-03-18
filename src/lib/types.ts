import { ReactNode } from "react";

export type JobItems = {
  id: number;
  badgeLetters: string;
  title: string;
  company: string;
  date: string;
  relevanceScore: number;
  daysAgo: number;
};

export type JobItemDetails = JobItems & {
  companyURL: string;
  coverImgURL: string;
  description: string;
  duration: string;
  location: string;
  qualifications: string[];
  reviews: string[];
  salary: string;
};

export type JobItemsProps = {
  jobItems: JobItems;
  isActive: boolean;
  id: number;
};

export type ContainerProps = {
  jobItems?: JobItems[];
  isLoading?: boolean;
  isActive?: boolean;
  totalJobCount?: number;
  handleChangePage?: (direction: "next" | "previous") => void;
  currentPage?: number;
  totalPageNumber?: number;
  handleSortBy?: (sortBy: "relevant" | "recent") => void;
  sortBy?: string;
};

export type JobItemAPIResponse = {
  jobItem: JobItemDetails;
  public: boolean;
};

export type AllJobItemsAPIResponse = {
  jobItems: JobItems[];
  public: boolean;
  sorted: boolean;
};

export type SortBy = "relevant" | "recent";
export type Direction = "next" | "previous";

export type SortingButtonProps = {
  children: ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  sortBy?: string;
};

export type BookmarksContextType = {
  bookmarkedIDs: number[];
  handleToggleBookmark: (id: number) => void;
  bookmarkedJobItems: JobItemDetails[];
  isLoading: boolean;
};

export type ActiveIDContextType = {
  paramId: number | null;
};
export type SearchTextContextType = {
  debouncedSearchText: string;
  searchText: string;
  handleChangeSearchText: (newSearchText: string) => void;
};

export type JobItemsContextType = {
  jobItems: JobItems[] | undefined;
  slicedJobItems: JobItems[];
  isLoading: boolean;
  totalJobCount: number;
  totalPageNumber: number;
  currentPage: number;
  sortBy: SortBy;
  handleChangePage: (direction: Direction) => void;
  handleSortBy: (sortBy: SortBy) => void;
};
