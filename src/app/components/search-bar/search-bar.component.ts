import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent  implements OnInit {

  delay: any;
  @Output() filterOutput = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {}

  filterImages(ev: any){
    
    clearTimeout(this.delay);

    this.delay = setTimeout(() => {
      this.filterOutput.emit(ev.detail.value);
    }, 300);


  }

}
