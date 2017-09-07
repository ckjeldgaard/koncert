import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  template: require('./subscriptions.html')
})
export class SubscriptionsComponent extends Vue {

  mounted() {
    this.$nextTick(() => {
      let fixedContent = <HTMLElement>this.$el.querySelector('.fixed-content');

      let list = <HTMLElement>this.$el.querySelector('.subscriptions-list');
      // list.style.marginTop = fixedContent.offsetHeight + 'px';

      console.log('ELEMENT = ', fixedContent.offsetHeight);
      // getComputedStyle(element)[''];
    });
  }
}
