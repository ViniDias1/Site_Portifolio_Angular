import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IContentProvider } from '../interfaces/content-provider.interface';
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

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  constructor(private readonly contentProvider: IContentProvider) {}

  getPortfolioContent(): Observable<IPortfolioContent> {
    return this.contentProvider.getPortfolioContent();
  }

  getProfile(): Observable<IProfile> {
    return this.contentProvider.getProfile();
  }

  getSkills(): Observable<ISkill[]> {
    return this.contentProvider.getSkills();
  }

  getExperience(): Observable<IExperience[]> {
    return this.contentProvider.getExperience();
  }

  getProjects(): Observable<IProject[]> {
    return this.contentProvider.getProjects();
  }

  getProjectById(id: string): Observable<IProject | undefined> {
    return this.contentProvider.getProjectById(id);
  }

  getEducation(): Observable<IEducation[]> {
    return this.contentProvider.getEducation();
  }

  getCertificates(): Observable<ICertificate[]> {
    return this.contentProvider.getCertificates();
  }

  getSocialLinks(): Observable<ISocialLink[]> {
    return this.contentProvider.getSocialLinks();
  }

  getMusicProfile(): Observable<IMusicProfile | undefined> {
    return this.contentProvider.getMusicProfile();
  }

  getMusicReleases(): Observable<IMusicRelease[]> {
    return this.contentProvider.getMusicReleases();
  }
}
