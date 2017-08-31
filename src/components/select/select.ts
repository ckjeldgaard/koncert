import Vue from 'vue';
import Component from 'vue-class-component';
import { mixin as onClickOutside } from 'vue-on-click-outside';
import {SelectOption} from '../../model/select-option';

@Component({
  template: require('./select.html'),
  mixins: [onClickOutside],
  props: {
    id: String,
    options: Array,
    placeholder: String
  }
})
export class SelectComponent extends Vue {

  public open: Boolean = false;
  public selected: SelectOption[] = [];
  public selectedOptionsText: string = '';

  public close() {
    this.open = false;
    return false;
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
      if (this.selectedOptionsText.length > 25) {
        this.selectedOptionsText = this.selected.length + ' selected';
      }
    }
  }
}
