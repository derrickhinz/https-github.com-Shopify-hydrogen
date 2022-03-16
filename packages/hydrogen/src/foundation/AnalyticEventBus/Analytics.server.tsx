import React from 'react';
import {ServerAnalytics} from './index';
import {Analytics as AnalyticsClient} from './Analytics.client';
import {useServerRequest} from '../ServerRequestProvider';

export function Analytics() {
  const cache = useServerRequest().ctx.cache;

  // Make sure all queries have returned before rendering the Analytics server component
  cache.forEach((cacheFn) => {
    const result = cacheFn.call();
    if (result instanceof Promise) throw result;
  });

  const analyticData = ServerAnalytics.getDatalayer();
  return <AnalyticsClient analyticDataFromServer={analyticData} />;
}