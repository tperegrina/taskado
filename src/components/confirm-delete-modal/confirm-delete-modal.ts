import { Component } from '@angular/core';
import {ViewController} from 'ionic-angular';

// Shows a confirmation modal before deleting tasklists, could be abstracted to be a general confirmation modal

@Component({
  selector: 'confirm-delete-modal',
  templateUrl: 'confirm-delete-modal.html'
})
export class ConfirmDeleteModal {

  constructor(public viewCtrl: ViewController ) {

  }

  dismiss() {
    this.viewCtrl.dismiss(false);
  }

  accept() {
    this.viewCtrl.dismiss(true)
  }
}
