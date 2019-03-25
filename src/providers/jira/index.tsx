import React from 'react';
import { find, get } from 'lodash';
import { action, observable } from 'mobx';

import { AbstractProvider } from '../AbstractProvider';
import { availablePredicates } from './predicates';
import { Settings } from './components/Settings';
import { IssueCard } from './components/IssueCard';
import { fetchFilter } from './fetchers';
import { Filter } from '../../store/filters';
import { fetchResources } from './fetchers/resources';
import { refreshToken } from './fetchers/refreshToken';
import { SwapResult } from './fetchers/swapToken';

export interface JiraSettings {
  auth: {
    access_token: string;
    refresh_token: string;
    expires_at: number;
  };
}

export interface JiraResource {
  avatarUrl: string;
  id: string;
  name: string;
  scopes: string[];
}

export class JiraProvider extends AbstractProvider<JiraSettings> {
  public id = 'jira';
  public label = 'Jira';
  public settingsComponent = () => <Settings provider={this} />;
  public cardComponent = IssueCard;

  @observable
  public resources: JiraResource[] = [];

  public async initialize() {
    await this.refreshToken();
  }

  public async fetchFilter(filter: Filter) {
    return fetchFilter(filter, this.settings);
  }

  public getAvailablePredicates = () => availablePredicates;

  public findPredicate(name: string) {
    return find(this.getAvailablePredicates(), { name });
  }

  @action.bound
  public async refreshToken() {
    const refresh_token = get(this.settings, 'auth.refresh_token');

    if (!refresh_token) {
      return;
    }

    const { access_token, expires_in } = await refreshToken(refresh_token);
    this.setAuth({ access_token, expires_in, refresh_token });
  }

  @action.bound
  public setAuth({ access_token, expires_in, refresh_token }: SwapResult) {
    this.settings.auth = {
      refresh_token,
      access_token,
      expires_at: Date.now() + expires_in,
    };

    this.fetchResources();
  }

  @action.bound
  public disconnect() {
    this.settings.auth = null;
    this.resources = [];
  }

  @action.bound
  public async fetchResources() {
    const token = get(this.settings, 'auth.access_token');

    if (!token) {
      return;
    }

    this.resources = await fetchResources(token);
  }
}

export const jira = new JiraProvider();
