import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  template: require('./concert_details.html'),
  props: {
    concert: Object
  }
})
export class ConcertDetailsComponent extends Vue {

  mounted() {
    this.$nextTick(() => {
      console.log('ready', this.$props.concert);
    });
  }
}
