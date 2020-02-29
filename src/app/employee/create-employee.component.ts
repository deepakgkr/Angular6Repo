import { Component, OnInit } from '@angular/core';
// Import FormGroup and FormControl classes
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { CustomValidators } from '../shared/custom.validators';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  // This FormGroup contains fullName and Email form controls
  employeeForm: FormGroup;

  // This object will hold the messages to be displayed to the user
  // Notice, each key in this object has the same name as the
  // corresponding form control
  formErrors = {
    'fullName': '',
    'email': '',
    'phone': '',
    'skillName': '',
    'experienceInYears': '',
    'proficiency': ''
  };

  // This object contains all the validation messages for this form
  validationMessages = {
    'fullName': {
      'required': 'Full Name is required.',
      'minlength': 'Full Name must be greater than 2 characters',
      'maxlength': 'Full Name must be less than 10 characters.',
    },
    'email': {
      'required': 'Email is required.',
      'emailDomain': 'Email domian should be dell.com'
    },
    'phone': {
      'required': 'Phone is required.'
    },
    'skillName': {
      'required': 'Skill Name is required.',
    },
    'experienceInYears': {
      'required': 'Experience is required.',
    },
    'proficiency': {
      'required': 'Proficiency is required.',
    },
  };



  constructor(private fb: FormBuilder) { }

  // Initialise the FormGroup with the 2 FormControls we need.
  // ngOnInit ensures the FormGroup and it's form controls are
  // created when the component is initialised
  // ngOnInit() {
  //   this.employeeForm = new FormGroup({
  //     fullName: new FormControl(),
  //     email: new FormControl(),
  //     // Create skills form group
  //     skills: new FormGroup({
  //       skillName: new FormControl(),
  //       experienceInYears: new FormControl(),
  //       proficiency: new FormControl()
  //     })
  //   });
  // }

  // ngOnInit() {
  //   this.employeeForm = this.fb.group({
  //     fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
  //     email: [''],
  //     skills: this.fb.group({
  //       skillName: [''],
  //       experienceInYears: [''],
  //       proficiency: ['beginner']
  //     }),
  //   });
  // }

  // ngOnInit() {

  //   this.employeeForm = this.fb.group({
  //     fullName: ['',
  //       [
  //         Validators.required,
  //         Validators.minLength(2),
  //         Validators.maxLength(10)]
  //     ],
  //     email: [''],
  //     skills: this.fb.group({
  //       skillName: ['C#'],
  //       experienceInYears: [''],
  //       proficiency: ['beginner']
  //     }),
  //   });

  //   // Subscribe to valueChanges observable
  //   this.employeeForm.get('fullName').valueChanges.subscribe(
  //     value => {
  //       console.log(value);
  //     }
  //   );
  // }

  ngOnInit() {
    // Include FormControls for contactPreference, email & phone
    // contactPreference has email as the default value
    this.employeeForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      contactPreference: ['email'],
      email: ['', [Validators.required, CustomValidators.emailDomain('dell.com')]],
      phone: [''],
      skills: this.fb.group({
        skillName: ['', Validators.required],
        experienceInYears: ['', Validators.required],
        proficiency: ['', Validators.required]
      }),
    });

    // this.employeeForm.valueChanges.subscribe((data) => {
    //   this.logValidationErrors(this.employeeForm);
    // });

    this.employeeForm.get('contactPreference')
      .valueChanges.subscribe((data: string) => {
        this.onContactPrefernceChange(data);
      });

  }

  // If the Selected Radio Button value is "phone", then add the
  // required validator function otherwise remove it
  onContactPrefernceChange(selectedValue: string) {
    const phoneFormControl = this.employeeForm.get('phone');
    if (selectedValue === 'phone') {
      phoneFormControl.setValidators(Validators.required);
    } else {
      phoneFormControl.clearValidators();
    }
    phoneFormControl.updateValueAndValidity();
  }

  logValidationErrors(group: FormGroup = this.employeeForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      } else {
        this.formErrors[key] = '';
        if (abstractControl && !abstractControl.valid
          && (abstractControl.touched || abstractControl.dirty)) {
          const messages = this.validationMessages[key];
          for (const errorKey in abstractControl.errors) {
            if (errorKey) {
              this.formErrors[key] += messages[errorKey] + ' ';
            }
          }
        }
      }
    });
  }

  // onLoadDataClick(): void {
  //   this.logKeyValuePairs(this.employeeForm);
  // }

  onLoadDataClick(): void {
    this.logValidationErrors(this.employeeForm);
    console.log(this.formErrors);
  }

  onSubmit(): void {
    console.log(this.employeeForm.value);
  }
}