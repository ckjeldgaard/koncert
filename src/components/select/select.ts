import Vue from 'vue';
import Component from 'vue-class-component';
import { mixin as onClickOutside } from 'vue-on-click-outside';
import {SelectOption} from '../../model/select-option';
import {bus} from '../../util/constants';
import {Inject, Prop} from 'vue-property-decorator';

@Component({
  template: require('./select.html'),
  mixins: [onClickOutside]
})
export class SelectComponent extends Vue {

  @Inject(bus) bus: Vue;

  @Prop() id: string;
  @Prop() options: string[];
  @Prop() placeholder: string;
  @Prop() multiple: boolean;

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
      if (this.bus) {
        this.bus.$emit(this.$props['id'], this.selected);
      }
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
