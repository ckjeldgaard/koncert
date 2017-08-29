import Vue from 'vue';
import Component from 'vue-class-component';
import { mixin as onClickOutside } from 'vue-on-click-outside';

@Component({
  template: require('./select.html'),
  mixins: [onClickOutside]
})
export class SelectComponent extends Vue {

  open: Boolean = false;

  mounted() {
    this.$nextTick(() => {

    });
  }

  close() {
    this.open = false;
  }
}
