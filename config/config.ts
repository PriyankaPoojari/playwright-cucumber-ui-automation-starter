import { LaunchOptions, devices } from '@playwright/test';

export const browserOptions: LaunchOptions = {
    slowMo: 0,
    args: ['--start-fullscreen'],
    channel: process.env.npm_config_browserName || 'chrome',
    timeout: 60000
}