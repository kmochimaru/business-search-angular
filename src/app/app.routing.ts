import { AuthModule } from './auth/auth.module';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ResultComponent } from './result/result.component';
import { CategoryComponent } from './category/category.component';
import { AppURL } from './app.url';
import { Routes, RouterModule } from '@angular/router';

const RouteLists: Routes = [
  { path: '', redirectTo: AppURL.Home, pathMatch: 'full' },
  { path: AppURL.Login, component: LoginComponent },
  { path: AppURL.Home, component: HomeComponent },
  { path: `${AppURL.Category}/:province_id`, component: CategoryComponent },
  { path: `${AppURL.Result}/:province_id/:category_id`, component: ResultComponent },
  { path: AppURL.Auth, loadChildren: () => AuthModule }
];

export const AppRouting = RouterModule.forRoot(RouteLists, { useHash: true });
