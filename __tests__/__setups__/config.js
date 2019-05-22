import { config } from '@vue/test-utils';

config.mocks['$t'] = () => {};
config.mocks['$ga'] = { event: () => {} };
config.mocks['$toast'] = { success: () => {} };
config.mocks['$toPx'] = min => min;
config.mocks['$toMin'] = px => px;
