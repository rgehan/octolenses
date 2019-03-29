import React from 'react';

import { Button, ButtonType } from '../../components/Button';
import { RadioCard } from '../../components/RadioCard';
import { ProviderType } from '../../providers';

interface IProps {
  provider: ProviderType;
  onChange: (provider: ProviderType) => void;
  previous: () => void;
  next: () => void;
}

export const ProviderStep = ({
  provider,
  onChange,
  previous,
  next,
}: IProps) => {
  return (
    <div className="flex-1 flex flex-col items-stretch">
      <div className="font-medium mb-4">
        Where do you want to get data from?
      </div>
      <RadioCard
        title="GitHub"
        text="Filter issues and pull requests from public and private repositories."
        icon="fab fa-github"
        selected={provider === ProviderType.GITHUB}
        onClick={() => onChange(ProviderType.GITHUB)}
      />
      <RadioCard
        title="Jira"
        text="Filter and retrieve tickets from any Jira organization you may have access to."
        icon="fab fa-jira"
        selected={provider === ProviderType.JIRA}
        onClick={() => onChange(ProviderType.JIRA)}
      />
      <div className="flex justify-end mt-10">
        <Button onClick={previous} className="mr-3">
          Cancel
        </Button>
        <Button onClick={next} type={ButtonType.PRIMARY}>
          Continue
        </Button>
      </div>
    </div>
  );
};
