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
      this.selectOption(selectedOptionId);
    });
  }

  public close() {
    this.open = false;
    return false;
  }

  public selectToggle(event) {
    if (event.target) {
      this.selectOption(event.target.value);
    }
  }

  private selectOption(optionId: string) {
    if (this.$props['multiple']) {
      this.selectMultiple(optionId);
    } else {
      this.selectSingle(optionId);
    }
    this.bus.$emit(this.$props['id'], this.selected);
  }

  private selectMultiple(optionId): void {
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

  private selectSingle(optionId): void {
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
