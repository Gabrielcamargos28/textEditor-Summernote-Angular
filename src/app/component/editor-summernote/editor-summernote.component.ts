import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { SummernoteOptions } from 'ngx-summernote/lib/summernote-options';

@Component({
  selector: 'app-editor-summernote',
  templateUrl: './editor-summernote.component.html',
  styleUrls: ['./editor-summernote.component.css']
})
export class EditorSummernoteComponent implements OnInit {

  ngOnInit(): void {
  }
  public editorDisabled = false;
  
  public form: FormGroup = new FormGroup({
    html: new FormControl('', Validators.required)
  });
  constructor(private sanitizer: DomSanitizer) {}

  htmlContent = "<span>QUESTAO 1 - Com rela&#231;&#227;o &#224;s vari&#225;veis em um algoritmo, assinale a alternativa CORRETA:&#160;</span><div><br><div><span>(A) Variaveis do tipo numerico s&#227;o recebem valores inteiros.&#160;</span></div><div><span><br></span></div><div><span>(B) Variaveis booleanas podem receber letras, palavras e numeros.&#160;</span></div><div><span><br></span></div><div><span>(C) Variaveis do tipo caractere recebem valores alfanumericos.&#160;</span></div><div><span><br></span></div><div><span>(D) Variaveis booleanas s&#243; podem receber valores do tipo verdadeiro.</span><br></div></div>"  
  questao = '<p>Este é um teste inicial.</p>';
  
  
  get f() {
    return this.form.controls;
  }

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
      ['view', ['fullscreen', 'codeview', 'help']]
    ],
    fontNames: ['Arial', 'Times New Roman','Inter', 'Comic Sans MS', 'Courier New', 'Roboto', 'Times', 'MangCau', 'BayBuomHep','BaiSau','BaiHoc','CoDien','BucThu', 'KeChuyen', 'MayChu', 'ThoiDai', 'ThuPhap-Ivy', 'ThuPhap-ThienAn'],
    buttons: {
      
    },
  };

}
