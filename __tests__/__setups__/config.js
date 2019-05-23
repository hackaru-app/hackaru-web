import { config } from '@vue/test-utils';

config.mocks['$t'] = () => {};
config.mocks['$ga'] = { event: () => {}, set: () => {} };
config.mocks['$toast'] = { success: () => {} };
config.mocks['$toPx'] = min => min;
config.mocks['$toMin'] = px => px;
config.mocks['localePath'] = path => `/en/${path}`;
