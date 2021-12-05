import {Component, EventEmitter, Input, OnChanges, Output} from "@angular/core";

@Component({
  selector: 'pm-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css'],
})
export class StarComponent implements OnChanges {
  @Input() rating: number = 0;
  // Width of 75 px
  cropWidth: number = 75;
  @Output() ratingClicked: EventEmitter<string> = new EventEmitter<string>();

  ngOnChanges(): void {
    this.cropWidth = this.rating * (75/5);
  }

  onClick(): void {
    // Use a template literal ` to use a ${placeholder} in a string
    this.ratingClicked.emit(`the rating ${this.rating} was clicked!`);
  }
}
