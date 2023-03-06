import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-image-generator',
  templateUrl: './image-generator.component.html',
  // imports: [ReactiveFormsModule, FormsModule],
  styleUrls: ['./image-generator.component.scss']
})

export class ImageGeneratorComponent implements OnInit {

  isLoading: boolean
  showProgressBar() {
    this.isLoading = true
    setTimeout(()=> {
    this.isLoading = false;
    }, 7000)
  }

  constructor() { }

  ngOnInit(): void {
  }

  @Output() public readonly prompted = new EventEmitter<string>()

  public readonly form = new FormGroup({
    prompt: new FormControl<string | null>(null, Validators.required)
  })

  public generateImage(): void {

    this.showProgressBar()

    if (this.form.valid && this.form.value.prompt) {
      this.prompted.emit(this.form.value.prompt)
      // this.form.reset()
    }
  }
}