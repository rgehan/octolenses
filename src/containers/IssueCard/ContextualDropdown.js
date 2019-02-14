import React, { useEffect } from 'react';
import styled from 'styled-components';
import ClipboardJS from 'clipboard';

import { toast } from '../../components/ToastManager/ToastManager';

const Wrapper = styled.div`
  .overlay {
    display: none;
  }

  :hover {
    .overlay {
      display: flex;
    }
  }
`;

const Overlay = styled.div`
  top: 16px;
  left: 2px;

  :before {
    content: '';
    height: 0px;
    width: 1px;
    border-bottom: 4px solid #606f7b;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    position: absolute;
    top: -4px;
    left: 6px;
  }
`;

const makeActions = issue => {
  const type = issue.pull_request ? 'Pull request' : 'Issue';

  return [
    {
      label: 'Copy Link',
      'data-clipboard-text': issue.html_url,
      onClick: () => toast(`${type} link was copied to the clipboard`, 'info'),
    },
    {
      label: 'Copy Title',
      'data-clipboard-text': issue.title,
      onClick: () => toast(`${type} title was copied to the clipboard`, 'info'),
    },
  ];
};

export const ContextualDropdown = ({ issue }) => {
  useEffect(() => {
    const clipboard = new ClipboardJS('[data-clipboard-text]');
    return () => clipboard.destroy();
  });

  const actions = makeActions(issue);

  return (
    <Wrapper className="inline-block relative">
      <i className="fa fa-caret-down  py-1 px-2 -mt-1" />
      <Overlay
        className={[
          'overlay',
          'absolute bg-grey-darker py-1',
          'whitespace-no-wrap rounded shadow',
          'flex flex-col',
        ]}
      >
        {actions.map(
          ({ isAvailable = true, label, ...otherProps }) =>
            isAvailable && (
              <div
                className="text-sm px-4 py-1 cursor-pointer hover:underline"
                key={label}
                {...otherProps}
              >
                {label}
              </div>
            )
        )}
      </Overlay>
    </Wrapper>
  );
};
