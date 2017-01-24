import { LoggedInGuard } from './guards/logged-in.guard';
import { LoggedOutGuard } from './guards/logged-out.guard';
import { isAdminGuard } from './guards/isAdmin.guard';
import { isPMGuard } from './guards/isPM.guard';
import { isAdminOrPMGuard } from './guards/isAdminOrPM.guard';

import { MenuComponent } from './components/menu/menu.component';
import { AppComponent } from './components/app/app.component';

import { HttpWrapper } from './services/HttpWrapper.service';

export { AppComponent };

export const CORE_PROVIDERS = [LoggedInGuard, LoggedOutGuard, isAdminGuard, isPMGuard, isAdminOrPMGuard, HttpWrapper];
export const CORE_DECLARATIONS = [MenuComponent, AppComponent];
