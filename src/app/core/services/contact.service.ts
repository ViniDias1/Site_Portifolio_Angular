import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { IContactForm, IContactResponse } from '../models/portfolio.models';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private readonly apiUrl = '/api/contact';
  private readonly useApi = false;

  constructor(private readonly http: HttpClient) {}

  submitContactForm(formData: IContactForm): Observable<IContactResponse> {
    if (this.useApi) {
      return this.http.post<IContactResponse>(this.apiUrl, formData);
    } else {
      console.log('Contact form submitted (demo mode):', formData);
      return of({ status: 'ok', message: 'Message received (demo mode)' });
    }
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
