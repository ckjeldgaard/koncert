import Vue from 'vue';
import {Component, watch} from 'vue-property-decorator';
import { Link } from './link';
import { Logger } from '../../util/log';
import {DrawerProvider} from './drawer-provider';
import {DrawerProviderImpl} from './drawer-provider-impl';


@Component({
  template: require('./drawer.html')
})
export class DrawerComponent extends Vue {
  protected logger: Logger;
  protected drawer: DrawerProvider;

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
    this.drawer.close();
  }

  mounted() {
    if (!this.logger)
      this.logger = new Logger();

    if (!this.drawer) {
      let tempDrawer = new DrawerProviderImpl(this.$refs.dre);
      this.drawer = tempDrawer;
      document.querySelector('.menu-button').addEventListener('click', function () {
        tempDrawer.open();
      });
    }

    this.$nextTick(() => this.logger.info(this.object.default));
  }
}
