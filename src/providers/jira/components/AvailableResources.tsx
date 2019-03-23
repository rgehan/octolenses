import React, { useContext } from 'react';
import cx from 'classnames';
import { observer } from 'mobx-react-lite';

import { JiraResource } from '..';
import { IsDarkContext } from '../../../contexts/isDark';

interface IProps {
  resources: JiraResource[];
}

export const AvailableResources = observer(({ resources }: IProps) => {
  const isDark = useContext(IsDarkContext);

  if (!resources || !resources.length) {
    return null;
  }

  return (
    <div className="mt-8">
      <div className="font-medium mb-3">Available resources</div>

      {resources.map(resource => (
        <div className="flex mb-8">
          <div
            className={cx(
              'w-16 h-16 rounded-full overflow-hidden mr-3',
              isDark ? 'bg-grey-darker' : 'bg-grey-light'
            )}
          >
            <img src={resource.avatarUrl} />
          </div>
          <div className="pt-2">
            <div className="text-grey-darkest">{resource.name}</div>
            <div className="text-sm text-grey-dark mt-1">{resource.id}</div>
          </div>
        </div>
      ))}
    </div>
  );
});
