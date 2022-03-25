import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})


export class RegisterService {
  constructor(private data: DataService, private http: HttpClient) { }
  public checkIfUserExists(body) {
    return this.http.post('http://localhost:5000/register/validate', body, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  public citiesArray: string[] = [
    'Bat-Yam', 'Holon', 'Tel-Aviv', 'Rishon-Letzion', 'Rehovot', 'Sderot', 'Azur', 'Beer-Sheba', 'Kiryat-Shemona', 'Petah-Tikva'
  ]

  public register(body) {
    return this.http.post('http://localhost:5000/register', body, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
