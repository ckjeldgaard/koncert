import Vue from 'vue';
import Component from 'vue-class-component';
import {Inject} from 'vue-property-decorator';

@Component({
  template: require('./search.html')
})
export class SearchComponent extends Vue {

  @Inject() bus: Vue;

  public updateValue(value: string) {
    this.bus.$emit('search', value);
  }
}
