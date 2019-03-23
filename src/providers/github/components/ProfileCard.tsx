import React, { useContext } from 'react';
import cx from 'classnames';

import { GithubProfile } from '..';
import { IsDarkContext } from '../../../contexts/isDark';

interface IProps {
  profile: GithubProfile;
}

export const ProfileCard = ({ profile }: IProps) => {
  if (!profile) {
    return null;
  }

  const isDark = useContext(IsDarkContext);

  return (
    <div className="flex mb-8">
      <div
        className={cx(
          'w-16 h-16 rounded-full overflow-hidden mr-3',
          isDark ? 'bg-grey-darker' : 'bg-grey-light'
        )}
      >
        <img src={profile.avatar_url} />
      </div>
      <div className="pt-2">
        <div className="text-grey-darkest">{profile.name}</div>
        <a
          href={profile.html_url}
          target="__blank"
          className="text-sm text-grey-dark mt-1"
        >
          {profile.login}
        </a>
      </div>
    </div>
  );
};
