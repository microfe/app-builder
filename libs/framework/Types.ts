import React, { LazyExoticComponent } from 'react';

import { ApplicationPage } from './base';
import { I18nResource } from './i18n';

export type ApplicationPolicy = (appContext: IApplicationContext) => boolean | string;

export type ApplicationPolityResult = boolean | string;

export interface IApplicationPermission {
  readonly name: string;
  readonly policy: string;
}

export interface IApplicationRole {
  readonly id: string;
  readonly name: string;
  readonly defaultUrl: string;
  readonly permissions: IApplicationPermission[];
}

export interface IApplicationUser {
  readonly id: unknown;
  readonly displayName: string;
  readonly username: string;
  readonly email: string;
}

export interface IApplicationMenuItem {
  readonly label: string;
  readonly url: string;
  readonly icon?: React.ReactNode;
  readonly permission?: IApplicationPermission;
  readonly children?: IApplicationMenuItem[];
}

export interface IApplicationMenu {
  readonly name: string;
  readonly items: IApplicationMenuItem[];
}

export interface IApplicationContext {
  readonly user?: IApplicationUser | null;
  readonly roles?: IApplicationRole[];
  readonly menus?: IApplicationMenu[];
}

export interface IApplicationModuleMountProps {
  readonly children: () => React.ReactNode;
}

export interface IApplicationPageLazy {
  readonly routeInfo: IApplicationRouteInfo;
  readonly Page: LazyExoticComponent<any>;
}

export type ApplicationPageType = typeof ApplicationPage | IApplicationPageLazy;
export interface IApplicationModule {
  readonly title: string;
  readonly path: string;
  readonly defaultUrl: string;
  readonly pages: Array<ApplicationPageType>;
  readonly mount: React.ComponentType<IApplicationModuleMountProps>;
  readonly permissions: { [key: string]: IApplicationPermission };
  readonly translation: I18nResource;
}

export interface IApplicationRouteInfo {
  readonly title: string;
  readonly path: string;
  readonly exact?: boolean;
  readonly policies: ApplicationPolicy[];
}

export interface IApplicationRootProps {
  readonly initialContext: IApplicationContext;
  readonly modules: IApplicationModule[];
}

export interface IApplicationBreadcrumbItem {
  readonly path: string;
  readonly title: string;
}

export interface DecodedJWT {
  readonly sub: number;
  readonly name: string;
  readonly email: string;
  readonly exp: number;
  readonly iss: string;
  readonly aud: string;
}