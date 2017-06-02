import {DrawerProvider} from './drawer-provider';
import * as mdc from 'material-components-web';
import {MDCTemporaryDrawer, MDCTemporaryDrawerFoundation, util} from '@material/drawer';

export class DrawerProviderImpl implements DrawerProvider {

  private readonly drawer: mdc.drawer.MDCTemporaryDrawer;

  constructor(drawerEl) {
    this.drawer = new MDCTemporaryDrawer(drawerEl);
  }

  open() {
    this.drawer.open = true;
  }

  close() {
    this.drawer.open = false;
  }

}
