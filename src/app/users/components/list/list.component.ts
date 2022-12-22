import { DialogComponent } from './../dialog/dialog.component';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { UsersService } from '../../services/users.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  public users!: User[];

  constructor(
    private usersService: UsersService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  public openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    userId: string
  ): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        title: 'Excluir Usuário',
        text: 'Tem certeza que deseja excluir o cadastro?',
      },
    });

    dialogRef.afterClosed().subscribe( data => {
      if(data === 'delete'){
        this.usersService.deleteUser(userId);
        this.getUsers();
      }
    });
  }

  ngOnInit(): void {
    this.getUsers();
  }

  private getUsers(): void {
    this.users = this.usersService.listUsers();
  }

  public editUser(id: string): void {
    this.router.navigate(['/users/edit', id]);
  }

  public deleteUser(userId: string): void {
    this.usersService.deleteUser(userId);
    this.getUsers();
  }
}
