import Vue from 'vue';
import Component from 'vue-class-component';
import { mixin as onClickOutside } from 'vue-on-click-outside';
import {SelectOption} from '../../model/select-option';
import {bus} from '../../util/constants';
import {Inject} from 'vue-property-decorator';

@Component({
  template: require('./select.html'),
  mixins: [onClickOutside],
  props: {
    id: String,
    options: Array,
    placeholder: String,
    multiple: Boolean
  }
})
export class SelectComponent extends Vue {

  @Inject(bus) bus: Vue;

  public open: Boolean = false;
  public selected: SelectOption[] = [];
  public selectedOptionsText: string = '';

  public close() {
    this.open = false;
    return false;
  }

  public selectToggle(event) {
    if (event) {
      if (this.$props['multiple']) {
        this.selectMultiple(event);
      } else {
        this.selectSingle(event);
      }
      this.bus.$emit(this.$props['id'], this.selected);
    }
  }

  private selectMultiple(event): void {
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
    this.updateSelectedText();
  }

  private selectSingle(event): void {
    this.selected = [];
    this.selected.push(
      this.$props['options'].find(item => item.key === event.target.value)
    );
    this.updateSelectedText();
    this.close();
  }

  private updateSelectedText(): void {
    this.selectedOptionsText = this.selected.map(o => o.value).join(', ');
    if (this.selectedOptionsText.length > 25) {
      this.selectedOptionsText = this.selected.length + ' selected';
    }
  }
}
