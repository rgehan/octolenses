import React, { useEffect, useState } from 'react';

import { RadioCard } from '../../../components/RadioCard';
import { DARK_MODE } from '../../../constants/darkMode';
import { SettingsStore } from '../../../store/settings';

interface IProps {
  settings: SettingsStore;
}

export const NightMode = ({ settings }: IProps) => {
  const [darkMode, setDarkMode] = useState(settings.darkMode);

  useEffect(() => settings.updateDarkMode(darkMode), [darkMode]);

  return (
    <div>
      <div>
        <div className="font-medium mb-4">
          When should dark mode be enabled?
        </div>
        <RadioCard
          title="Never"
          text="The interface will stay bright, no matter what time of the day or night it is."
          icon="fas fa-sun"
          selected={darkMode === DARK_MODE.DISABLED}
          onClick={() => setDarkMode(DARK_MODE.DISABLED)}
          dark={settings.isDark}
        />
        <RadioCard
          title="Always"
          text="The interface will always be dark, protecting your eyes from bright lights. It’s really useful at night."
          icon="fas fa-moon"
          selected={darkMode === DARK_MODE.ENABLED}
          onClick={() => setDarkMode(DARK_MODE.ENABLED)}
          dark={settings.isDark}
        />
        <RadioCard
          title="Only at night (from 7PM to 7AM)"
          text="The perfect compromise between the two other options. Bright and legible during the day, but dark at night."
          icon="fas fa-clock"
          selected={darkMode === DARK_MODE.AT_NIGHT}
          onClick={() => setDarkMode(DARK_MODE.AT_NIGHT)}
          dark={settings.isDark}
        />
      </div>
    </div>
  );
};
