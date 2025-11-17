import { Observable } from 'rxjs';
import {
  IPortfolioContent,
  IProfile,
  ISkill,
  IExperience,
  IProject,
  IEducation,
  ICertificate,
  ISocialLink,
  IMusicProfile,
  IMusicRelease,
} from '../models/portfolio.models';

export abstract class IContentProvider {
  abstract getPortfolioContent(): Observable<IPortfolioContent>;
  abstract getProfile(): Observable<IProfile>;
  abstract getSkills(): Observable<ISkill[]>;
  abstract getExperience(): Observable<IExperience[]>;
  abstract getProjects(): Observable<IProject[]>;
  abstract getProjectById(id: string): Observable<IProject | undefined>;
  abstract getEducation(): Observable<IEducation[]>;
  abstract getCertificates(): Observable<ICertificate[]>;
  abstract getSocialLinks(): Observable<ISocialLink[]>;
  abstract getMusicProfile(): Observable<IMusicProfile | undefined>;
  abstract getMusicReleases(): Observable<IMusicRelease[]>;
}
