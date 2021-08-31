import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  NbLayoutModule,
  NbButtonModule, 
  NbCardModule,
  NbIconModule 
} from '@nebular/theme';


const imports = [
  CommonModule,
  NbLayoutModule,
  NbButtonModule,
  NbCardModule,
  NbIconModule
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
