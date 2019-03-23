import React from 'react';
import { find } from 'lodash';

import { AbstractProvider } from '../AbstractProvider';
import { availablePredicates } from './predicates';
import { fetchFilter } from './fetchers';
import { Settings } from './components/Settings';
import { IssueCard } from './components/IssueCard';
import { Filter } from '../../store/filters';

export interface GithubSettings {
  token: string;
}

class GithubProvider extends AbstractProvider<GithubSettings> {
  public id = 'github';
  public label = 'GitHub';
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

export const github = new GithubProvider();
