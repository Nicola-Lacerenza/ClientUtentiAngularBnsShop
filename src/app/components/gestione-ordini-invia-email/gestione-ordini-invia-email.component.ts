/* gestione-ordini-invia-email.component.ts */
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface EmailDialogData {
  recipient: string;
}

@Component({
  selector: 'app-gestione-ordini-invia-email',
  templateUrl: './gestione-ordini-invia-email.component.html',
  styleUrls: ['./gestione-ordini-invia-email.component.css']
})

export class GestioneOrdiniInviaEmailComponent implements OnInit {
  emailForm: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<GestioneOrdiniInviaEmailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EmailDialogData
  ) {
    // Inizializzo il form con il destinatario passato dal parent
    this.emailForm = this.fb.group({
      recipient: [data.recipient || '', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      body: ['', Validators.required],
      attachment: [null, Validators.required]
    });
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