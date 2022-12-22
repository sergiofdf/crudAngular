import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { State } from '../../models/state.model';
import { User } from '../../models/user.model';
import { DateAdapter } from '@angular/material/core';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent implements OnInit {
  public userForm!: FormGroup;
  public user!: User;
  public states!: State[];
  public userEditId: string = '';

  constructor(
    private router: Router,
    private dateAdapter: DateAdapter<Date>,
    private usersService: UsersService,
    private route: ActivatedRoute
  ) {
    this.dateAdapter.setLocale('pt-BR');
  }

  ngOnInit(): void {
    this.getStates();
    this.buildForm();
    const user = this.getUserData();
    if (user) this.loadEditForm(user);
  }

  private buildForm(): void {
    this.userForm = new FormGroup({
      id: new FormControl(),
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      profession: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      birthDate: new FormControl(null, Validators.required),
      documentNumber: new FormControl(null, Validators.required),
      address: new FormGroup({
        id: new FormControl(),
        street: new FormControl(null, Validators.required),
        number: new FormControl(null),
        complement: new FormControl(null),
        neighborhood: new FormControl(null),
        city: new FormControl(null, [Validators.required]),
        state: new FormControl(null, [Validators.required]),
        zipCode: new FormControl(null, [Validators.required]),
      }),
      contact: new FormGroup({
        phone: new FormControl(null, Validators.required),
        email: new FormControl(null, [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ]),
      }),
    });
  }

  private getStates(): void {
    this.states = this.usersService.getStatesOfBrazil();
  }

  public getErrorMessage(field: string): string {
    if (this.userForm.get(field)?.hasError('required')) {
      return 'Campo obrigatório';
    }

    if (
      this.userForm.get(field)?.hasError('email') ||
      this.userForm.get(field)?.hasError('pattern')
    ) {
      return 'Email digitado inválido';
    }

    if (this.userForm.get(field)?.hasError('minlength')) {
      return 'Mínimo 3 caracteres';
    }

    return 'Preenchimento inválido';
  }

  public submitForm(): void {
    this.user = this.userForm.getRawValue();
    if (!this.userEditId) {
      this.usersService.saveUser(this.user);
    } else {
      this.usersService.updateUser(this.user);
    }
    this.router.navigate(['/users']);
  }

  public cancelForm(): void {
    this.userForm.reset();
    this.router.navigate(['/users']);
  }

  private getUserData(): User | undefined {
    this.userEditId = this.route.snapshot.params['id'];
    if (!this.userEditId) {
      return;
    }
    return this.usersService.getUserById(this.userEditId);
  }

  private loadEditForm(user: User): void {
    this.userForm.patchValue(user);
  }
}
