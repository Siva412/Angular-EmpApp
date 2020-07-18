import { NgModule } from "@angular/core";
import {
    MatButtonModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatSelectModule,
    MatRadioModule,
    MatSnackBarModule
} from '@angular/material';

const MaterialComponents = [
    MatButtonModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatSelectModule,
    MatRadioModule,
    MatSnackBarModule
];

@NgModule({
    imports: [MaterialComponents],
    exports: [MaterialComponents]
})
export class MaterialModule { }
