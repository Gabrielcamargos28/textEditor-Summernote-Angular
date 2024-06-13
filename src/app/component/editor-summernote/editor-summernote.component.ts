import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { SummernoteOptions } from 'ngx-summernote/lib/summernote-options';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { MatDialog } from '@angular/material/dialog';
import { EditDialogComponent } from 'src/app/edit-dialog/edit-dialog.component';

interface DynamicFields {
  content: string;
  alternativa1: string;
  alternativa2: string;
  alternativa3: string;
  alternativa4: string;
}


@Component({
  selector: 'app-editor-summernote',
  templateUrl: './editor-summernote.component.html',
  styleUrls: ['./editor-summernote.component.css']
})

export class EditorSummernoteComponent implements OnInit, DynamicFields {

  ngOnInit(): void { }

  public editorDisabled = false;
  
  public form: FormGroup = new FormGroup({
    html: new FormControl('', Validators.required)
  });

  constructor(private sanitizer: DomSanitizer, private dialog: MatDialog) { }

  content = "Digite o as";
  corpo = "Digite o corpo";
  alternativa1 = "Digite o conteúdo";
  alternativa2 = "Digite o conteúdo";
  alternativa3 = "Digite o conteúdo";
  alternativa4 = "Digite o conteúdo";

  openDialog(field: keyof DynamicFields): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '80%',
      data: { content: this[field] }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this[field] = result.content;
        this.atualizarPrevia()
      }
    });
  }

  previewContent = ` 
    <div>
      <h1>Questão</h1>
      <div>${this.corpo}</div><br>
      <p><strong>1)</strong> ${this.alternativa1}</p>
      <p><strong>2)</strong> ${this.alternativa2}</p>
      <p><strong>3)</strong> ${this.alternativa3}</p>
      <p><strong>4)</strong> ${this.alternativa4}</p>
    </div>`;

  get f() {
    return this.form.controls;
  }

  htmlContentSend(texto: string) {
    console.log(texto);
  }

  public configPre: SummernoteOptions = {
    airMode: false,
    toolbar: [      
      ['print', ['print']]
    ],
  };

  public config: SummernoteOptions = {
    airMode: false,
    popover: {
      table: [
        ['add', ['addRowDown', 'addRowUp', 'addColLeft', 'addColRight']],
        ['delete', ['deleteRow', 'deleteCol', 'deleteTable']]
      ],
      image: [
        ['image', ['resizeFull', 'resizeHalf', 'resizeQuarter', 'resizeNone']],
        ['float', ['floatLeft', 'floatRight', 'floatNone']],
        ['remove', ['removeMedia']]
      ],
      link: [['link', ['linkDialogShow', 'unlink']]],
      air: [
        [
          'font',
          [
            'bold',
            'italic',
            'underline',
            'strikethrough',
            'superscript',
            'subscript',
            'clear'
          ]
        ]
      ]
    },
    uploadImagePath: '/api/upload',
    toolbar: [
      ['misc', ['codeview', 'undo', 'redo', 'codeBlock']],
      [
        'font',
        [
          'bold',
          'italic',
          'underline',
          'strikethrough',
          'superscript',
          'subscript',
          'clear'
        ]
      ],
      ['fontsize', ['fontname', 'fontsize', 'color']],
      ['para', ['style0', 'ul', 'ol', 'paragraph', 'height']],
      ['insert', ['table', 'picture', 'link', 'video', 'hr']],
      ['customButtons', ['testBtn']],
      ['view', ['fullscreen', 'codeview', 'help']],
      ['print', ['print']]
    ],
    fontNames: ['Arial', 'Times New Roman', 'Inter', 'Comic Sans MS', 'Courier New', 'Roboto', 'Times', 'MangCau', 'BayBuomHep', 'BaiSau', 'BaiHoc', 'CoDien', 'BucThu', 'KeChuyen', 'MayChu', 'ThoiDai', 'ThuPhap-Ivy', 'ThuPhap-ThienAn'],
    buttons: { }
  };

  public configAlternativa: SummernoteOptions = {
    airMode: false,
    popover: {
      image: [
        ['image', ['resizeFull', 'resizeHalf', 'resizeQuarter', 'resizeNone']],
        ['float', ['floatLeft', 'floatRight', 'floatNone']],
        ['remove', ['removeMedia']]
      ],
      air: [
        [
          'font',
          [
            'bold',
            'italic',
            'underline',
            'strikethrough',
            'superscript',
            'subscript',
            'clear'
          ]
        ]
      ]
    },
    uploadImagePath: '/api/upload',
    toolbar: [
      ['misc', []],
      [
        'font',
        [
          'bold',
          'italic',
          'underline',
          'strikethrough',
          'superscript',
          'subscript',
          'clear'
        ]
      ],
      ['fontsize', ['fontname', 'fontsize', 'color']],
      ['para', ['style0', 'ul', 'ol', 'paragraph', 'height']],
      ['insert', ['picture', 'hr']],
      ['view', []],
    ],
    fontNames: ['Arial', 'Times New Roman', 'Inter', 'Comic Sans MS', 'Courier New', 'Roboto', 'Times', 'MangCau', 'BayBuomHep', 'BaiSau', 'BaiHoc', 'CoDien', 'BucThu', 'KeChuyen', 'MayChu', 'ThoiDai', 'ThuPhap-Ivy', 'ThuPhap-ThienAn'],
    buttons: { }
  };

  atualizarPrevia() {
    this.previewContent = this.getPreviewContent();
  }
  getPreviewContent(): string {
    return `
      <div>
        <h1>Questão</h1>
        <div>${this.content}</div><br>
        <p><strong>1)</strong> ${this.alternativa1}</p>
        <p><strong>2)</strong> ${this.alternativa2}</p>
        <p><strong>3)</strong> ${this.alternativa3}</p>
        <p><strong>4)</strong> ${this.alternativa4}</p>
      </div>
    `;
  }

  salvarConteudo() {
    const content = `
      <div>
        <h2>Questão</h2>
        <div>${this.corpo}</div>
        <br>
        <span>(1) ${this.alternativa1}</span><br>
        <span>(2) ${this.alternativa2}</span><br>
        <span>(3) ${this.alternativa3}</span><br>
        <span>(4) ${this.alternativa4}</span><br>
      </div>
    `;
    const tempElement = document.createElement('div');
    tempElement.innerHTML = content;
    document.body.appendChild(tempElement);

    html2canvas(tempElement).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const doc = new jsPDF('p', 'mm', 'a4');
      const imgProps = doc.getImageProperties(imgData);
      const pdfWidth = doc.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      doc.save('conteudo.pdf');
      document.body.removeChild(tempElement);
    });
  }
}
