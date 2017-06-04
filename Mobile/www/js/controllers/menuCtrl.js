import { Component } from '@angular/core';
import { MenuController } from 'ionic-angular';

@Component({...})
export class MyPage {

 constructor(public menuCtrl: MenuController) {

 }

 openMenu() {
   this.menuCtrl.open();
 }

 closeMenu() {
   this.menuCtrl.close();
 }

 toggleLeftMenu() {
   this.menuCtrl.toggle();
 }


}
