import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FibService } from './fib.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  state: any = {
    seenIndexes: [],
    values: [],
    index: '',
  };

  valueForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private fibService: FibService
  ) {
    this.createForm();
    // tslint:disable-next-line: deprecation
    this.valueForm.valueChanges.subscribe((value) => {
      this.state.index = value;
    });

    this.fetchData();
  }

  getIndex(): string {
    return this.state.seenIndexes.map((n) => (n = n.number)).join(', ');
  }

  createForm(): void {
    this.valueForm = this.formBuilder.group({
      index: ['', Validators.required],
    });
  }

  fetchData(): void {
    this.fetchIndexes();
    this.fetchValues();
  }

  fetchValues(): void {
    this.fibService.fetchValues().subscribe((res: any) => {
      for (const key in res) {
        if (Object.prototype.hasOwnProperty.call(res, key)) {
          this.state.values[key] = res[key];
        }
      }
      console.log(this.state.values);
    });
  }

  fetchIndexes(): void {
    this.fibService.fetchIndexes().subscribe((res: any) => {
      this.state.seenIndexes = res;
      console.log(this.state.seenIndexes);
    });
  }

  handleSubmit(form: FormGroup): void {
    this.fibService.sendValue(form.value.index).subscribe((res: any) => {
      if (res.working) {
        this.state.index = '';
        this.fetchData();
      }
    });
  }
}
