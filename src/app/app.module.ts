import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { CommonModule } from '@angular/common';
import { ScrollIntoViewDirective } from './scroll-directive';
import { EditorComponent } from './editor/editor.component';
import { EditorModule } from '@tinymce/tinymce-angular';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: 'home', component: AppComponent },
      { path: 'editor', component: EditorComponent },
    ]),
    EditorModule
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    EditorComponent,
    ProductListComponent,
    ScrollIntoViewDirective,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
