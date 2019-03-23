import React from 'react';
import { find } from 'lodash';

import { AbstractProvider } from '../AbstractProvider';
import { availablePredicates } from './predicates';
import { Settings } from './components/Settings';
import { IssueCard } from './components/IssueCard';
import { fetchFilter } from './fetchers';
import { Filter } from '../../store/filters';

export interface JiraSettings {
  auth: {
    access_token: string;
    refresh_token: string;
    scope: string;
  };
}

class JiraProvider extends AbstractProvider<JiraSettings> {
  public id = 'jira';
  public label = 'Jira';
  public settingsComponent = () => <Settings settings={this.settings} />;
  public cardComponent = IssueCard;

  public async fetchFilter(filter: Filter) {
    return fetchFilter(filter, this.settings);
  }

  public getAvailablePredicates = () => availablePredicates;

  public findPredicate(name: string) {
    return find(this.getAvailablePredicates(), { name });
  }
}

export const jira = new JiraProvider();
