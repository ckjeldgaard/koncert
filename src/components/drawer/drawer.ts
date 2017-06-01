import Vue from 'vue';
import {Component, watch} from 'vue-property-decorator';
import { Link } from './link';
import { Logger } from '../../util/log';
import * as mdc from 'material-components-web';
import {MDCTemporaryDrawer, MDCTemporaryDrawerFoundation, util} from '@material/drawer';

@Component({
  template: require('./drawer.html')
})
export class DrawerComponent extends Vue {
  protected logger: Logger;
  protected drawer: MDCTemporaryDrawer;

  object: { default: string } = { default: 'Default object property!' }; // objects as default values don't need to be wrapped into functions

  links: Link[] = [
    new Link('Home', '/'),
    new Link('About', '/about')
  ];

  @watch('$route.path')
  pathChanged() {
    this.logger.info('Changed current path to: ' + this.$route.path);
  }

  drawerLinkClickListener(event) {
    let foundation: MDCTemporaryDrawerFoundation = this.drawer.getDefaultFoundation();
    foundation.close();
  }

  mounted() {
    if (!this.logger) this.logger = new Logger();
    this.$nextTick(() => this.logger.info(this.object.default));

    let drawerEl = this.$refs.dre;
    let MDCTemporaryDrawer = mdc.drawer.MDCTemporaryDrawer;
    let tempDrawer = new MDCTemporaryDrawer(drawerEl);
    this.drawer = tempDrawer;
    document.querySelector('.menu-button').addEventListener('click', function() {
      tempDrawer.open = true;
    });

  }
}
