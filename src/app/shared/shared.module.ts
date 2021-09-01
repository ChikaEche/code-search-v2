import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  NbLayoutModule,
  NbButtonModule, 
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbListModule,
  NbSpinnerModule,
  NbSearchModule
} from '@nebular/theme';
import { FormsModule } from '@angular/forms';


const imports = [
  CommonModule,
  NbLayoutModule,
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbListModule,
  NbSpinnerModule,
  NbSearchModule,
  FormsModule
];
const declarations: any[] = [];
@NgModule({
  declarations: [...declarations],
  imports: [
    ...imports
  ],
  exports: [...declarations, ...imports]
})
export class SharedModule { }
