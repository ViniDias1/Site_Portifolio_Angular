export interface IProfile {
  name: string;
  title: string;
  bio: string;
  photo: string;
  email?: string;
  phone?: string;
  location?: string;
}

export interface ISkill {
  name: string;
  level: number;
  category: string | string[]; // Pode ser string única ou array de categorias
  icon?: string;
}

export interface IExperience {
  company: string;
  role: string;
  from: string;
  to: string;
  description: string;
  responsibilities?: string[];
  technologies?: string[];
  location?: string;
  relatedProjects?: string[]; // IDs dos projetos relacionados
}

export interface IProject {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  tags: string[];
  images: string[];
  links: {
    github?: string;
    demo?: string;
    website?: string;
  };
  featured?: boolean;
  isPublic?: boolean;
  startDate?: string;
  endDate?: string;
  status?: 'completed' | 'in-progress' | 'planned'; // Status do projeto
  progress?: number; // Porcentagem de progresso (0-100) para projetos em andamento
  participants?: { name: string; github: string }[];
}

export interface IEducation {
  institution: string;
  degree: string;
  field: string;
  from: string;
  to: string;
  description?: string;
}

export interface ICertificate {
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
  credentialUrl?: string;
}

export interface ISocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface IMusicRelease {
  id: string;
  title: string;
  artist: string;
  releaseDate: string;
  coverImage: string;
  streamingLinks: {
    spotify?: string;
    youtube?: string;
    youtubeMusic?: string;
    appleMusic?: string;
    deezer?: string;
    tidal?: string;
    amazonMusic?: string;
    soundcloud?: string;
  };
  type: 'single' | 'album' | 'ep';
  previewUrl?: string;
  duration?: string;
  genre?: string[];
  tracklist?: {
    number: number;
    title: string;
    duration: string;
  }[];
  description?: string;
}

export interface IMusicProfile {
  artistName: string;
  bio: string;
  photo: string;
  genres: string[];
  spotifyUrl?: string;
  youtubeUrl?: string;
  instagramUrl?: string;
  statistics?: {
    totalStreams?: string;
    monthlyListeners?: string;
    followers?: string;
  };
}

export interface IPortfolioContent {
  profile: IProfile;
  skills: ISkill[];
  experience: IExperience[];
  projects: IProject[];
  education?: IEducation[];
  certificates?: ICertificate[];
  socialLinks: ISocialLink[];
  musicProfile?: IMusicProfile;
  musicReleases?: IMusicRelease[];
}

export interface IContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface IContactResponse {
  status: 'ok' | 'error';
  message?: string;
}
