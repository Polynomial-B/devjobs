export type JobItems = {
  id: number;
  badgeLetters: string;
  title: string;
  company: string;
  date: string;
  relevanceScore: number;
  daysAgo: number;
};

export type JobItemDetails = {
  badgeLetters: string;
  company: string;
  companyURL: string;
  coverImgURL: string;
  daysAgo: number;
  description: string;
  duration: string;
  id: number;
  location: string;
  qualifications: string[];
  relevanceScore: number;
  reviews: string[];
  salary: string;
  title: string;
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
