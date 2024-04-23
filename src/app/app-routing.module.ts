import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { EditorSummernoteComponent } from './component/editor-summernote/editor-summernote.component';
import { HomeComponent } from './component/home/home.component';

const routes: Routes = [
  {
    path: "home",
    component: HomeComponent,
  },
  {
    path: "editor",
    pathMatch: "full",
    component: EditorSummernoteComponent
  },
  ]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }




