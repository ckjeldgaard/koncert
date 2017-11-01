import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import { Link } from './link';

@Component({
  template: require('./drawer.html')
})
export class DrawerComponent extends Vue {
  public open: Boolean = false;

  object: { default: string } = { default: 'Default object property!' }; // objects as default values don't need to be wrapped into functions

  links: Link[] = [
    new Link('Home', '/'),
    new Link('About', '/about'),
    new Link('Subscriptions', '/subscriptions')
  ];

  pathChanged() {
    console.info('Changed current path to: ' + this.$route.path);
  }

  drawerLinkClickListener(event) {
    this.open = false;
  }

  mounted() {

  }
}
