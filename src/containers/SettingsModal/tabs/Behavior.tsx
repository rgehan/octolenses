import React, { useState, useEffect } from 'react';

import { RadioCard } from '../../../components/RadioCard';

export const Behavior = () => {
  const [useNewTab, setUseNewTab] = useState(getNewTabSetting());

  useEffect(() => saveNewTabSetting(useNewTab), [useNewTab]);

  return (
    <div>
      <div className="font-medium mb-4">When should OctoLenses appear?</div>
      <RadioCard
        title="In each new tab"
        text="Every time you open a new tab, OctoLenses will appear and show you the current state of your filters."
        icon="fas fa-folder-plus"
        selected={useNewTab}
        onClick={() => setUseNewTab(true)}
      />
      <RadioCard
        title="On click of the icon"
        text="OctoLenses will only appear when you click on the icon of the extension. It won’t replace your new tab page"
        icon="fas fa-mouse-pointer"
        selected={!useNewTab}
        onClick={() => setUseNewTab(false)}
      />
    </div>
  );
};

function getNewTabSetting() {
  if (localStorage.getItem('useNewTab') === 'false') {
    return false;
  }

  return true;
}

function saveNewTabSetting(useNewTab: boolean) {
  localStorage.setItem('useNewTab', JSON.stringify(useNewTab));
}
