import React from 'react';

import { Button, ButtonType } from '../../../components/Button';
import { toast } from '../../../components/ToastManager';
import { Cache } from '../../../lib/cache';

export const CacheSettings = () => {
  function flushCache() {
    Cache.flush();
    toast('Cache was successfully cleared', 'info');
  }

  return (
    <div>
      <div className="font-medium mb-4">Cached data</div>
      <p className="leading-normal">
        In order to limit the amount of requests to the various providers, a lot
        of them are actually cached. If for some reason you noticed
        inconsistencies or outdated data, please file an issue.
      </p>
      <p className="mt-3">
        In the meantime, you can clear the cached data to get back to a coherent
        state.
      </p>
      <Button type={ButtonType.PRIMARY} onClick={flushCache} className="mt-4">
        Clear cache
      </Button>
    </div>
  );
};
