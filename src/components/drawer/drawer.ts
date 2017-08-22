import Vue from 'vue';
import {Component, watch} from 'vue-property-decorator';
import { Link } from './link';
import { Logger } from '../../util/log';

@Component({
  template: require('./drawer.html')
})
export class DrawerComponent extends Vue {
  protected logger: Logger;

  public open: Boolean = false;

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
    this.open = false;
  }

  mounted() {
    if (!this.logger)
      this.logger = new Logger();

    this.$nextTick(() => this.logger.info(this.object.default));
  }
}
