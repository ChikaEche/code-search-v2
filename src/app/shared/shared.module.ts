import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbLayoutModule, NbButtonModule, NbCardModule } from '@nebular/theme';


const imports = [
  CommonModule,
  NbLayoutModule,
  NbButtonModule,
  NbCardModule
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
