import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  template: require('./spinner.html'),
  props: {
    visible: Boolean
  }
})
export class SpinnerComponent extends Vue {

}
