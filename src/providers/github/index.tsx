import { find } from 'lodash';
import { action, observable } from 'mobx';
import React from 'react';

import { Filter } from '../../store/filters';
import { AbstractProvider } from '../AbstractProvider';
import { IssueCard } from './components/IssueCard';
import { Settings } from './components/Settings';
import { fetchFilter } from './fetchers';
import { fetchProfile } from './fetchers/rest/profile';
import { availablePredicates } from './predicates';

export interface IGithubSettings {
  token: string;
}

export interface IGithubProfile {
  login: string;
  name: string;
  avatar_url: string;
  html_url: string;
}

export class GithubProvider extends AbstractProvider<IGithubSettings> {
  public id = 'github';
  public label = 'GitHub';
  public settingsComponent = () => <Settings provider={this} />;
  public cardComponent = IssueCard;

  @observable
  public profile: IGithubProfile = null;

  @action.bound
  public async initialize() {
    await this.fetchProfile();
  }

  public async fetchFilter(filter: Filter) {
    return fetchFilter(filter, this.settings);
  }

  public resolveFilterItemIdentifier(item: any) {
    return item.number;
  }

  public getAvailablePredicates = () => availablePredicates;

  public findPredicate(name: string) {
    return find(this.getAvailablePredicates(), { name });
  }

  @action.bound
  public async fetchProfile() {
    if (!this.settings.token) {
      return;
    }

    this.profile = await fetchProfile(this.settings.token);
  }

  @action.bound
  public setToken(token: string) {
    this.settings.token = token;

    if (token) {
      this.fetchProfile();
    } else {
      this.profile = null;
    }
  }
}

export const github = new GithubProvider();
