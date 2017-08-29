import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  template: require('./select.html')
})
export class SelectComponent extends Vue {
  mounted() {
    this.$nextTick(() => {

    });
  }
}
