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
  NbSearchModule,
  NbSidebarModule
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
  NbSidebarModule,
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
