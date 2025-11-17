import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

@Injectable()
export class RemoteContentProvider extends IContentProvider {
  private readonly apiUrl = '/api/portfolio';

  constructor(private readonly http: HttpClient) {
    super();
  }

  getPortfolioContent(): Observable<IPortfolioContent> {
    return this.http.get<IPortfolioContent>(this.apiUrl);
  }

  getProfile(): Observable<IProfile> {
    return this.http.get<IProfile>(`${this.apiUrl}/profile`);
  }

  getSkills(): Observable<ISkill[]> {
    return this.http.get<ISkill[]>(`${this.apiUrl}/skills`);
  }

  getExperience(): Observable<IExperience[]> {
    return this.http.get<IExperience[]>(`${this.apiUrl}/experience`);
  }

  getProjects(): Observable<IProject[]> {
    return this.http.get<IProject[]>(`${this.apiUrl}/projects`);
  }

  getProjectById(id: string): Observable<IProject | undefined> {
    return this.http.get<IProject>(`${this.apiUrl}/projects/${id}`);
  }

  getEducation(): Observable<IEducation[]> {
    return this.http.get<IEducation[]>(`${this.apiUrl}/education`);
  }

  getCertificates(): Observable<ICertificate[]> {
    return this.http.get<ICertificate[]>(`${this.apiUrl}/certificates`);
  }

  getSocialLinks(): Observable<ISocialLink[]> {
    return this.http.get<ISocialLink[]>(`${this.apiUrl}/social-links`);
  }

  getMusicProfile(): Observable<IMusicProfile | undefined> {
    return this.http.get<IMusicProfile>(`${this.apiUrl}/music-profile`);
  }

  getMusicReleases(): Observable<IMusicRelease[]> {
    return this.http.get<IMusicRelease[]>(`${this.apiUrl}/music-releases`);
  }
}
