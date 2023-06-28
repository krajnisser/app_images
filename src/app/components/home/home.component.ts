import { Component } from '@angular/core';
import { LoremIpsum } from 'lorem-ipsum';
import { InfiniteScrollCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss']
})
export class HomeComponent {

  URL_BASE = `https://picsum.photos/id/`;
  randomPhotos: Image[] = [];
  filteredPhotos: Image[] = [];
  page = 1;

  //Configuración
  width = 500;
  height = 500;
  iterations = 4000;
  numberOfRandoms = 1000;
  loremIpsumMinLength = 5;
  loremIpsumMaxLength = 20;
  photoPerPage = 12;
  loremIpsumLength = 10;

  constructor() {}

  async ngOnInit() {
    this.loadImages();
    this.filteredPhotos = this.randomPhotos.slice(0, this.photoPerPage * this.page);
  }

  //Se van cargando las fotos que se mostraran en pantalla
  loadImages(){
    for (let i = 0; i < this.iterations; i++) {
      const randomNumber = Math.floor(Math.random() * this.numberOfRandoms); //Generamos un id random para la imagen
      const lorem: String = new LoremIpsum().generateWords(this.loremIpsumLength); //Generamos un texto random
      this.randomPhotos.push(
        {
          id: randomNumber,
          photo: `${this.URL_BASE}${randomNumber}/${this.width}/${this.height}`,
          text: lorem
        }
      );
    }
  }

  //Filtrado de imagenes
  filterImages(ev: any){
    this.filteredPhotos = this.randomPhotos.slice(0, this.photoPerPage*this.page);
    if(ev !== ''){
      this.filteredPhotos = this.filteredPhotos.filter(photo => (photo.text.includes(ev) || photo.id.toString().includes(ev)));
    }
  }

  //Funcion que realiza la carga de imagenes conforme el usuario hace scroll
  onScroll(ev: any){
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
    if(this.filteredPhotos.length < this.iterations){
      this.page++;
      this.filteredPhotos = this.randomPhotos.slice(0, this.photoPerPage*this.page);
    }
  }

}

//Creamos la interfaz para cada una de las imagenes que mostraremos
export interface Image {
  id: number;
  photo: String;
  text: String;
}
