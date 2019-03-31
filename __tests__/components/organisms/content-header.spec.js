import Factory from '@/__tests__/__setups__/factory';
import ContentHeader from '@/components/organisms/content-header';

describe('ContentHeader', () => {
  it('render correctly', () => {
    expect(new Factory(ContentHeader).shallow().element).toMatchSnapshot();
  });
});
