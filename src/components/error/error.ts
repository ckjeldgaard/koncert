import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  template: require('./error.html'),
  props: {
    visible: Boolean,
    errormsg: String
  }
})
export class ErrorComponent extends Vue {
}
