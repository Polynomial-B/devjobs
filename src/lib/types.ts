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
};
export type HeaderProps = {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
};

export type ContainerProps = {
  jobItems?: JobItems;
  isLoading?: boolean;
  displayedItem?: JobItemDetails | null;
};
