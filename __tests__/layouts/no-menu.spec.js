import Factory from '@/__tests__/__setups__/factory';
import NoMenu from '@/layouts/no-menu';

describe('NoMenu', () => {
  it('render correctly', () => {
    const factory = new Factory(NoMenu, { stubs: ['nuxt'] });
    expect(factory.shallow().element).toMatchSnapshot();
  });
});
