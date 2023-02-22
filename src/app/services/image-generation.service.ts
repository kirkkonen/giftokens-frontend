import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ImageGenerationService {

  constructor() { }

  private readonly httpClient = inject(HttpClient)

  public getImages(prompt: string, numberOfImages: number): Observable<string[]> {
    console.log('arguments: ', prompt, numberOfImages)
    return this.httpClient.get<string[]>(`http://localhost:3000/api/images?prompt=${prompt}&n=${numberOfImages}`)
  }
}
