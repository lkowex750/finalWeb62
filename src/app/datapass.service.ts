import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class DatapassService {
  
  constructor(private http:HttpClient) { 

  }

  
}
