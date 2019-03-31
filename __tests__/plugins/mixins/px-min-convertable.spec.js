import Factory from '@/__tests__/__setups__/factory';
import PxMinConvertable from '@/plugins/mixins/px-min-convertable';

describe('PxMinConvertable', () => {
  let factory;

  const mock = {
    render: () => {},
    mixins: [PxMinConvertable]
  };

  const parent = {
    provide: { pxPerMin: 40 / 60 },
    components: { mock },
    template: '<mock ref="mock" />'
  };

  beforeEach(() => {
    factory = new Factory(parent);
  });

  it('convert to min correctly', () => {
    expect(
      factory
        .mount()
        .find({ ref: 'mock' })
        .vm.toPx(60)
    ).toBe(40);
  });

  it('convert to px correctly', () => {
    expect(
      factory
        .mount()
        .find({ ref: 'mock' })
        .vm.toMin(60)
    ).toBe(90);
  });
});
