import Vue from 'vue';
import Component from 'vue-class-component';
import { mixin as onClickOutside } from 'vue-on-click-outside';
import {SelectOption} from '../../model/select-option';
import {Inject, Prop} from 'vue-property-decorator';

@Component({
  template: require('./select.html'),
  mixins: [onClickOutside]
})
export class SelectComponent extends Vue {

  @Inject() bus: Vue;

  @Prop() id: string;
  @Prop() options: string[];
  @Prop() placeholder: string;
  @Prop() multiple: boolean;

  public open: Boolean = false;
  public selected: SelectOption[] = [];
  public selectedOptionsText: string = '';

  created() {
    this.bus.$on('selectOption', (selectedOptionId) => {
      const searchIndex = (<Element[]>this.$refs.options).findIndex(item => item.id === this.id + '-' + selectedOptionId);
      if (searchIndex !== -1) {
        this.$refs.options[searchIndex].click();
      }
    });
  }

  public close() {
    this.open = false;
    return false;
  }

  public selectToggle(event) {
    if (event) {
      if (this.$props['multiple']) {
        this.selectMultiple(event.target.value);
      } else {
        this.selectSingle(event.target.value);
      }
      this.bus.$emit(this.$props['id'], this.selected);
    }
  }

  private selectMultiple(optionId: string): void {
    const searchOption = this.selected.findIndex(item => item.key === optionId);
    if (searchOption !== -1) {
      // Exists. Remove from selected
      this.selected.splice(searchOption, 1);
    } else {
      // Doesn't exist. Add to selected
      this.selected.push(
        this.$props['options'].find(item => item.key === optionId)
      );
    }
    this.updateSelectedText();
  }

  private selectSingle(optionId: string): void {
    this.selected = [];
    this.selected.push(
      this.$props['options'].find(item => item.key === optionId)
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
