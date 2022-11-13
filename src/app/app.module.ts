import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConverterFormComponent } from './converter-form/converter-form.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { NgxsModule } from '@ngxs/store';
import { environment } from 'src/environments/environment';
import { ConvertorState } from './state/convertor.state';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ConverterFormComponent,
    ToolbarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    MatInputModule,
    HttpClientModule,
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsModule.forRoot([ConvertorState], {
      developmentMode: !environment.production
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }





