import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicService } from 'src/app/app.service';
import { Artista } from 'src/app/model/Artista';
import { Observer } from 'rxjs';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styles: []
})
export class ArtistaComponent{

  artista:Artista[]=[];
  index:string=null;
  constructor(private route: ActivatedRoute,
              private _musicService: MusicService) {
    this.route.params.subscribe( params => {
      this.index = params['id'];
      console.log(params['id']);
      this.getArtista(params['id']);
      
    });
    
  }

  getArtista(id: String){
    let observador:Observer<Artista[]>={
      next: (data) => {
        console.log(data);
        this.artista=data;
        console.log(this.artista);
      },
      error: (error) => {
        console.log(error);
        console.log('se produjo el siguiente error al recuperar un paquete');
      },
      complete: () => {
        console.log('proceso finalizado');
      }
    };
    this._musicService.getArtista(id)
    .subscribe(observador);
  }

}
