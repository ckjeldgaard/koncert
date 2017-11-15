import { AboutComponent } from '../../../src/components/about/about';
import Vue from 'vue';
import {mount, Wrapper} from 'vue-test-utils';

describe('About component', () => {
  it('should render correct contents', async () => {
    const wrapper: Wrapper<Vue> = mount(AboutComponent);
    expect(wrapper.find('.repo-link').element.getAttribute('href')).toBe('https://github.com/ducksoupdev/vue-webpack-typescript');
  });
});
