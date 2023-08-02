import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import * as JSZip from "jszip";

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

  // uploadFiles(filenames: string[]): Observable<Blob[]> {

  // }

  getLogosNames(): Observable<string[]> {
    return this.http.get<string[]>(`${this.API}/admin/logos-list`)
  }

  downloadLogo(): Observable<Blob> {
    return this.http.get(`${this.API}/admin/logos/Captura.PNG`, {responseType: 'blob'})
  }

  downloadZip(): Observable<Promise<Blob[]>> {
    return this.http.get(`${this.API}/admin/logos/multiple`, {responseType: 'blob'}).pipe(
      map((zipBlob: Blob) => {
        return new Promise<Blob[]>((resolve, reject) => {
          const zip = new JSZip()

          zip.loadAsync(zipBlob).then((zipFile) => {
            const imagePromises: Promise<Blob>[] = [];

            zipFile.forEach((relativePath, file) => {
              if (!file.dir) {
                const imagePromise = file.async('blob');
                imagePromises.push(imagePromise);
              }
            });

            Promise.all(imagePromises).then((images: Blob[]) => {
              resolve(images);
            }).catch((error) => {
              reject(error);
            })
          }).catch((error) => {
            reject(error)
          })
        })
      })
    )
  }

  downloadLogos(logosNames: string[]): Observable<Promise<[string, Blob][]>> {
    console.log("imagesNames")
    console.log(logosNames)
    return this.http.post(`${this.API}/logos-zip`, logosNames, {responseType: 'blob'}).pipe(
      map((zipBlob: Blob) => {
        return new Promise<[string, Blob][]>((resolve, reject) => {
          const zip = new JSZip()

          zip.loadAsync(zipBlob).then((zipFile) => {
            const imagePromises: Promise<[string, Blob]>[] = [];

            zipFile.forEach((relativePath, file) => {
              if (!file.dir) {
                const imagePromise = file.async('blob').then((blob) => {
                  return [file.name, blob] as [string, Blob];
                })
                imagePromises.push(imagePromise)
                console.log(imagePromise)
              }
            });

            Promise.all(imagePromises).then((images) => {
              console.log("images")
              console.log(images)
              resolve(images);
            }).catch((error) => {
              reject(error);
            })
          }).catch((error) => {
            reject(error)
          })
        })
      })
    )
  }

}
