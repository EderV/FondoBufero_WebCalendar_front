import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Event} from "../../global/models/Event";
import {Logger} from "../../global/utils/logger";
import {FileLogosService} from "../../global/services/file-logos.service";

interface EventWithImage {
  event: Event,
  imageURL?: string | null
}

@Component({
  selector: 'app-day-event-detail',
  templateUrl: './day-event-detail.component.html',
  styleUrls: ['./day-event-detail.component.scss']
})
export class DayEventDetailComponent implements OnInit, OnDestroy {

  @Input() events: Event[] = []
  @Output() close = new EventEmitter<void>()

  logos: ArrayBuffer[] = []

  eventsWithImages: EventWithImage[] = []

  overlayWait = false

  constructor(
    private readonly logger: Logger,
    private readonly fileLogosService: FileLogosService
  ) {}

  ngOnInit(): void {
    const logosNames = this.extractLogosNames()
    this.logger.i(`Logos names: ${logosNames}`)
    this.downloadLogos(logosNames)
  }

  ngOnDestroy(): void {
    this.eventsWithImages.forEach((eventWithImage) => {
      if (eventWithImage.imageURL) {
        URL.revokeObjectURL(eventWithImage.imageURL);
      }
    });
  }

  onClose() {
    this.close.emit()
  }

  private extractLogosNames(): string[] {
    return this.events
      .filter(event => event.logo !== "")
      .map(event => event.logo)
  }

  private downloadLogos(logosNames: string[]) {
    this.overlayWait = true
    this.fileLogosService.downloadLogos(logosNames).subscribe({
      next: value => value.then(
        (result) => {
          console.log("blobs")
          console.log(result)

          this.createEventWithImage(result)

          console.log(this.eventsWithImages)

          // for (let blob of result) {
          //   const fileReader = new FileReader()
          //   fileReader.onload = (e: any) => {
          //     this.logos.push(e.target.result)
          //   }
          //   fileReader.readAsDataURL(blob)
          // }
          this.logger.i(`Downloaded ${result.length} logos`)
          this.overlayWait = false
        },
        (error) => {
          this.logger.e(`Error extracting logos` + error)
          this.overlayWait = false
        }
      ),
      error: error => {
        this.logger.e(error)
        this.overlayWait = false
      }
    })
  }

  private createEventWithImage(images: [string, Blob][]) {
    this.eventsWithImages = this.events.map((event) => {
      const imageNameAndBlob = images.find(([imageName, blob]) => imageName === event.logo)

      console.log("Downloaded images:")
      console.log(images)

      let stringURL = null
      if (imageNameAndBlob) {
        const [imageName, blob] = imageNameAndBlob
        stringURL = URL.createObjectURL(blob)
      }
      return {
        event: event,
        imageURL: stringURL
      }
    })
  }

}
