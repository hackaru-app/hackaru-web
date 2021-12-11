import { config, RouterLinkStub } from '@vue/test-utils';

config.mocks['$t'] = () => '';
config.mocks['$route'] = { fullPath: '' };
config.mocks['$toPx'] = (min) => min;
config.mocks['$toMin'] = (px) => px;
config.mocks['localePath'] = (path) => `/en/${path}`;

config.stubs['NuxtLink'] = RouterLinkStub;
config.stubs['NuxtChild'] = { render: (h) => h };
config.stubs['ClientOnly'] = { render: (h) => h };
config.stubs['I18n'] = { render: (h) => h };
