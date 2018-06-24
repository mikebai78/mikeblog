import { NgModule } from '@angular/core';
import { RouterModule} from "@angular/router";
import { FormsModule} from "@angular/forms";
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  imports: [
    RouterModule,
    FormsModule,
    CommonModule,
    MaterialModule
  ],
  exports: [
    CommonModule,
    MaterialModule,
    NavbarComponent,
    RouterModule,
    FormsModule
  ],
  declarations: [NavbarComponent]
})
export class SharedModule { }
