import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { Editor, Toolbar } from 'ngx-editor';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  constructor(private fb: UntypedFormBuilder) {}
  editor: any;
  html: any = '';
  htmlElement: any = '';
  isModalVisible: boolean = false;
  saveForm!: UntypedFormGroup;
  selectedTime: string = '';
  toolbar: Toolbar = [
    // default value
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
    ['horizontal_rule', 'format_clear'],
  ];

  expirationDates = [
    'Never',
    '1 hour',
    '5 hours',
    '12 hours',
    '1 day',
    '2 days',
    '5 days',
  ];
  ngOnInit(): void {
    this.editor = new Editor({ inputRules: true });
    this.saveForm = this.fb.group({
      title: [null, [Validators.required]],
      password: [null],
      expire: ['', [Validators.required]],
    });
    this.selectedTime = 'Never';
  }
  ngAfterViewInit() {
    this.htmlElement = document.getElementsByClassName(
      'ProseMirror NgxEditor__Content'
    )[0];
    this.htmlElement.style.height = '75vh';
    this.htmlElement.style.overflow = 'scroll';
  }
  saveText() {
    let htmlText = this.htmlElement.innerHTML;
    this.isModalVisible = true;
  }
  handleOk() {
    if (this.saveForm.valid) {
      console.log('submit', this.saveForm.value);
    } else {
      Object.values(this.saveForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  onTimeChange(time: string) {
    this.selectedTime = time;
  }
}
