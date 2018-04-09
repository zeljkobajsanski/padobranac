import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as Raphael from 'raphael';
import * as $ from 'jquery';
import { Keyboard } from '@ionic-native/keyboard';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  paper;
  image;
  height;
  width;
  isRunning = false;
  constructor(public navCtrl: NavController, private keyboard: Keyboard) {

  }

  ionViewDidLoad() {
    this.width = $(".scroll-content").width();
    this.height = $(".scroll-content").height();
    this.paper = Raphael("content",  this.width, this.height);
    const text = this.paper.text(70, 20, "16 - 6 = ?");
    text.attr("font-size", 32);
    
  }

  start() {
    if (this.isRunning) return;
    this.keyboard.show();
    this.image = this.paper.image("assets/imgs/parachute.png", this.width / 2 - 32, 0, 64, 64);
    let i = 0;
    const tries = 10;
    const dy = this.height / 10;
    const handler = setInterval(() => {
      i++;
      this.image.translate(0, dy);
      if (i == tries) {
        clearInterval(handler);
        this.isRunning = false;
        this.keyboard.close();
      }
    }, 2000);
    this.isRunning = true;
  }

}
