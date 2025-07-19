import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ResoService } from './../../services/reso.service';
import { ServerRequest } from '../../models/ServerRequest.interface';
import { ServerResponse } from '../../models/ServerResponse.interface';
import { Reso } from '../../models/reso.interface';
import { HttpErrorResponse } from '@angular/common/http';

export interface EmailDialogData {
  recipient: string;
}

@Component({
  selector: 'app-gestione-ordini-invia-email',
  templateUrl: './gestione-ordini-invia-email.component.html',
  styleUrls: ['./gestione-ordini-invia-email.component.css']
})

export class GestioneOrdiniInviaEmailComponent implements OnInit {
  emailForm: FormGroup = this.fb.group({
    recipient: ['', [Validators.required, Validators.email]],
    subject: ['', Validators.required],
    body: ['', Validators.required],
    attachment: [null]
  });
  selectedFile: File | null = null;
  idReso : number | undefined;

  constructor(
    private fb: FormBuilder,
    private resoService : ResoService,
    private dialogRef: MatDialogRef<GestioneOrdiniInviaEmailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { _id : number | undefined }
  ) {
    this.idReso = data._id;
    if(!this.idReso){
      return;
    }
    this.resoService.getReso(this.idReso)
    .then(response => {
      response.subscribe({
        next: (response : Promise<Reso>) => {
          response.then(reso => {
            /*ìthis.emailForm.patchValue({
              recipient: reso.,
              subject: `Reso #${reso.id} - ${reso.prodotto}`,
              body: `Richiesta di reso per il prodotto ${reso.prodotto}`
            });  */
            console.log('Reso recuperato:', reso);       
          }).catch(error => console.error(error));
        },
        error: (error : HttpErrorResponse) => {
          console.error(error);
        }
      })
    })
  }

  ngOnInit(): void {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.selectedFile = input.files[0];
      this.emailForm.patchValue({ attachment: this.selectedFile });
      this.emailForm.get('attachment')!.updateValueAndValidity();
    }
  }

  sendEmail(): void {
    if (this.emailForm.invalid || !this.selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append('recipient', this.emailForm.value.recipient);
    formData.append('subject', this.emailForm.value.subject);
    formData.append('body', this.emailForm.value.body);
    formData.append('attachment', this.selectedFile, this.selectedFile.name);

    // Qui chiameresti il tuo servizio email
    // this.emailService.sendEmail(formData).subscribe(...);

    // Dopo l'invio, chiudi la dialog
    this.dialogRef.close({ success: true });
  }

  close(): void {
    this.dialogRef.close({ success: false });
  }
}