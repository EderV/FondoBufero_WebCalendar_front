import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FileLogosService {
  private readonly API = environment.api + '/api/logos';

  constructor(private http: HttpClient) { }

  uploadFile(file: File): Observable<string> {
    const formData = new FormData()
    formData.append('file', file);

    return this.http.post(`${this.API}/admin/upload-logo`, formData, {responseType: 'text'})
  }

  getLogosNames(): Observable<string[]> {
    return this.http.get<string[]>(`${this.API}/admin/logos-list`)
  }

}
