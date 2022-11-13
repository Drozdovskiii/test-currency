import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';

interface Food {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-converter-form',
  templateUrl: './converter-form.component.html',
  styleUrls: ['./converter-form.component.scss']
})



export class ConverterFormComponent implements OnInit {
  value = 'Clear me';

  constructor() { }

  ngOnInit(): void {
  }

}


