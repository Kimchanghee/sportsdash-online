#!/usr/bin/env node
import { App } from 'aws-cdk-lib';
import { BaseStaticSiteStack } from '../../../shared/infrastructure/BaseStack';

const app = new App();

new BaseStaticSiteStack(app, 'ScoreLiveStack', {
  env: {
    account: process.env.AWS_ACCOUNT_ID,
    region: process.env.AWS_REGION || 'us-east-1',
  },
  domain: 'scorelive.online',
  buildOutputDir: '../.next/standalone',
  languages: ['ko', 'en', 'es'],
  description: 'ScoreLive — Live sports scores aggregator (EPL, MLB, KBO)',
});

app.synth();
