import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConfirmDeleteModal } from './confirm-delete-modal';

@NgModule({
  declarations: [
    ConfirmDeleteModal,
  ],
  imports: [
    IonicPageModule.forChild(ConfirmDeleteModal),
  ],
  exports: [
    ConfirmDeleteModal
  ]
})
export class ConfirmDeleteModalModule {}
