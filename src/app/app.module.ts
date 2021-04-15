import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ScrollComponent } from './comp/scroll/scroll.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { HashSpyDirective } from './directive/hash-spy.directive';

@NgModule({
  declarations: [
    AppComponent,
    ScrollComponent,
   
    HashSpyDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ScrollingModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
