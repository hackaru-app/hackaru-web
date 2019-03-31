import Factory from '@/__tests__/__setups__/factory';
import Licenses from '@/pages/settings/licenses';

describe('Licenses', () => {
  it('render correctly', () => {
    expect(new Factory(Licenses).shallow().element).toMatchSnapshot();
  });
});
