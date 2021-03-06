import { NgModule } from '@angular/core';
import { InsuranceComponent } from './insurance.component';
import { InsuranceRoutingModule } from './insurance-routing.module';
import { CommonModule } from '@angular/common';
import { InsuranceService } from './services/insurance.service';
import { InsuranceApiService } from './services/insurance.api.service';

import { MatCheckboxModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';

import { NgxMaskModule } from 'ngx-mask';
import { CaseModalComponent } from './components/case-modal/case-modal.component';
import { DeleteModalComponent } from './components/delete-modal/delete-modal.component';
import { StoreModule } from '@ngrx/store';
import * as fromInsurance from './reducers/insurance.reducer';
import { EffectsModule } from '@ngrx/effects';
import { InsuranceEffects } from './effects/insurance.effects';
import { ReactiveFormsModule } from '@angular/forms';
import { DigitsDirective } from './directives/digit.directive';

@NgModule({
  declarations: [
    InsuranceComponent,
    CaseModalComponent,
    DeleteModalComponent,
    DigitsDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InsuranceRoutingModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatGridListModule,
    MatCardModule,
    MatStepperModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    NgxMaskModule,
    StoreModule.forFeature(fromInsurance.featureKey, fromInsurance.reducer),
    EffectsModule.forFeature([InsuranceEffects])
  ],
  providers: [
    InsuranceService,
    InsuranceApiService
  ],
  entryComponents: [
    CaseModalComponent,
    DeleteModalComponent
  ]
})
export class InsuranceModule { }
