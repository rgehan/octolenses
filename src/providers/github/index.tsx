import React from 'react';
import { find } from 'lodash';
import { action } from 'mobx';

import { AbstractProvider } from '../AbstractProvider';
import { availablePredicates } from './predicates';
import { fetchFilter } from './fetchers';
import { Settings } from './components/Settings';
import { IssueCard } from './components/IssueCard';
import { Filter } from '../../store/filters';
import { fetchProfile } from './fetchers/rest/profile';

export interface GithubSettings {
  token: string;
}

export interface GithubProfile {
  login: string;
  name: string;
  avatar_url: string;
  html_url: string;
}

export class GithubProvider extends AbstractProvider<GithubSettings> {
  public id = 'github';
  public label = 'GitHub';
  public settingsComponent = () => <Settings provider={this} />;
  public cardComponent = IssueCard;

  public profile: GithubProfile = null;

  @action.bound
  public async initialize() {
    await this.fetchProfile();
  }

  @action.bound
  public async fetchProfile() {
    if (!this.settings.token) {
      return;
    }

    this.profile = await fetchProfile(this.settings.token);
  }

  public async fetchFilter(filter: Filter) {
    return fetchFilter(filter, this.settings);
  }

  public getAvailablePredicates = () => availablePredicates;

  public findPredicate(name: string) {
    return find(this.getAvailablePredicates(), { name });
  }
}

export const github = new GithubProvider();
