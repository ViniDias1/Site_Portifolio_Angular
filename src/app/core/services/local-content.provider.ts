import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';
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

@Injectable()
export class LocalContentProvider extends IContentProvider {
  private readonly basePath = '/assets/content';

  constructor(private readonly http: HttpClient) {
    super();
  }

  getPortfolioContent(): Observable<IPortfolioContent> {
    return forkJoin({
      profile: this.getProfile(),
      skills: this.getSkills(),
      experience: this.getExperience(),
      projects: this.getProjects(),
      education: this.getEducation(),
      certificates: this.getCertificates(),
      socialLinks: this.getSocialLinks(),
      musicProfile: this.getMusicProfile(),
      musicReleases: this.getMusicReleases(),
    }).pipe(
      map((data) => ({
        ...data,
        musicProfile: data.musicProfile || undefined,
      }))
    );
  }

  getProfile(): Observable<IProfile> {
    return this.http.get<IProfile>(`${this.basePath}/profile.json`);
  }

  getSkills(): Observable<ISkill[]> {
    return this.http.get<ISkill[]>(`${this.basePath}/skills.json`);
  }

  getExperience(): Observable<IExperience[]> {
    return this.http.get<IExperience[]>(`${this.basePath}/experience.json`);
  }

  getProjects(): Observable<IProject[]> {
    return this.http.get<IProject[]>(`${this.basePath}/projects.json`);
  }

  getProjectById(id: string): Observable<IProject | undefined> {
    return this.getProjects().pipe(
      map((projects: IProject[]) => projects.find((p: IProject) => p.id === id))
    );
  }

  getEducation(): Observable<IEducation[]> {
    return this.http.get<IEducation[]>(`${this.basePath}/education.json`);
  }

  getCertificates(): Observable<ICertificate[]> {
    return this.http.get<ICertificate[]>(`${this.basePath}/certificates.json`);
  }

  getSocialLinks(): Observable<ISocialLink[]> {
    return this.http.get<ISocialLink[]>(`${this.basePath}/social-links.json`);
  }

  getMusicProfile(): Observable<IMusicProfile | undefined> {
    return this.http.get<IMusicProfile>(`${this.basePath}/music-profile.json`);
  }

  getMusicReleases(): Observable<IMusicRelease[]> {
    return this.http.get<IMusicRelease[]>(`${this.basePath}/music-releases.json`);
  }
}
