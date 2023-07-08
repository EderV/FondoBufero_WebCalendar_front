import { Component } from '@angular/core';
import {Logger} from "../../global/utils/logger";
import {FileLogosService} from "../../global/services/file-logos.service";

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent {

  private maxFileSize = 150.0 * 1024 // bytes

  selectedImage?: File | null
  previewUrl?: string | ArrayBuffer | null

  constructor(
    private readonly logger: Logger,
    private readonly fileLogosService: FileLogosService,
    //private readonly fileReader: FileReader
  ) { }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.selectedImage = file;

    if (file) {
      if (file.size > this.maxFileSize) {
        this.logger.e(`File size ${file.size}bytes exceeds max file size ${this.maxFileSize}bytes`)
      }
      else {
        const fileReader = new FileReader()
        fileReader.onload = (e: any) => {
          this.previewUrl = e.target.result;
        };
        fileReader.readAsDataURL(file);
      }
    } else {
      this.previewUrl = null;
    }
  }

  onUploadImage() {
    if (this.selectedImage) {
      this.fileLogosService.uploadFile(this.selectedImage).subscribe({
        next: (res) => {
          this.logger.i(`Image uploaded. Res: ${res}`)

          this.selectedImage = null
          this.previewUrl = null
        },
        error: (error) => {
          this.logger.e(`Failed uploading image.`)
          this.logger.e(error)
        }
      })
    }
    else {
      this.logger.e("Please select an image to upload")
    }
  }

}
