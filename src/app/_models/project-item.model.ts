export interface ProjectItem {
  name: string;
  path: string;
  date: string;
  url: string;
  github: string;
  development: string[];
  goal: string;
  tools: string[];
  objectives: string[];
  functionalities: {};
  images: ProjectImages;
  siteImages: string[]
}

export interface ProjectImages {
  main: string;
  desktop: string;
  tablet: string;
  mobile: string;
}
