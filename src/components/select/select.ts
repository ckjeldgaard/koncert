import Vue from 'vue';
import Component from 'vue-class-component';
import { mixin as onClickOutside } from 'vue-on-click-outside';
import {SelectOption} from '../../model/select-option';

@Component({
  template: require('./select.html'),
  mixins: [onClickOutside],
  props: {
    options: Array
  }
})
export class SelectComponent extends Vue {

  public open: Boolean = false;
  public selected: SelectOption[] = [];
  public selectedOptionsText: string = '';

  mounted() {
    this.$nextTick(() => {
      // this.selected.push(new SelectOption('firefox', 'Firefox'));
    });
  }

  public close() {
    this.open = false;
  }

  public selectToggle(event) {
    if (event) {
      const searchOption = this.selected.findIndex(item => item.key === event.target.value);
      if (searchOption !== -1) {
        // Exists. Remove from selected
        this.selected.splice(searchOption, 1);
      } else {
        // Doesn't exist. Add to selected
        this.selected.push(
          this.$props['options'].find(item => item.key === event.target.value)
        );
      }

      this.selectedOptionsText = this.selected.map(o => o.value).join(', ');
      console.log('selectedOptionsText', this.selectedOptionsText);
    }
  }
}
