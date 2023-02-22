import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-overview-gallery',
  templateUrl: './overview-gallery.component.html',
  styleUrls: ['./overview-gallery.component.scss']
})
export class OverviewGalleryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() public images: string = ''

}
