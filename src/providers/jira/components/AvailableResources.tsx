import cx from 'classnames';
import { observer } from 'mobx-react';
import React from 'react';

import { settingsStore } from '../../../store';
import { JiraResource } from '../index';

interface IProps {
  resources: JiraResource[];
}

export const AvailableResources = observer(({ resources }: IProps) => {
  if (!resources || !resources.length) {
    return null;
  }

  return (
    <div className="mt-8">
      <div className="font-medium mb-3">Available resources</div>

      {resources.map((resource, index) => (
        <div key={index} className="flex mb-8">
          <div
            className={cx(
              'w-16 h-16 rounded-full overflow-hidden mr-3',
              settingsStore.isDark ? 'bg-gray-700' : 'bg-gray-400'
            )}
          >
            <img src={resource.avatarUrl} />
          </div>
          <div className="pt-2">
            <div className="text-gray-800">{resource.name}</div>
            <div className="text-sm text-gray-600 mt-1">{resource.id}</div>
          </div>
        </div>
      ))}
    </div>
  );
});
