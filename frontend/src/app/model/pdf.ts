export class Pdf {
  filename: string = '';
  userId: string = ''
  file: File | null = null;

  constructor(formData: FormData) {
    this.file = formData.get('pdf') as File;
    this.userId = formData.get('userId') as string;
  }
}
