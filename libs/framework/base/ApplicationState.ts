import { matchPath } from 'react-router-dom';

import { IApplicationBreadcrumbItem, IApplicationModule } from '../Types';
import { createTreeFromUrlSet, filterTree, flattenTree } from '../ultis';

export class ApplicationState {
  private static readonly _modules: IApplicationModule[] = [];

  public static readonly registerModule = (applicationModule: IApplicationModule) => {
    if (ApplicationState._modules.find(o => o === applicationModule)) {
      return;
    }

    ApplicationState._modules.push(applicationModule);
  }

  public static readonly getAllRouteInfos = () => {
    const pages = ApplicationState._modules.reduce(
      (prevResult, currentModule) => [...prevResult, ...currentModule.pages],
      []
    );

    const routeInfos = pages.reduce(
      (prevResult, currentPage) => [...prevResult, currentPage.routeInfo],
      []
    );

    return routeInfos;
  }

  public static readonly buildPageTree = () => {
    const routeInfos = ApplicationState.getAllRouteInfos();

    let routePaths = routeInfos
      .map(routeInfo => routeInfo.path)
      .concat(ApplicationState._modules.map(o => o.path));

    // Remove duplicate paths
    routePaths = [...new Set(routePaths)];

    const urlSet = routePaths.map(path => {
      const routeInfo = routeInfos.find(o => o.path === path);
      if (routeInfo) {
        return {
          path: path,
          title: routeInfo.title
        };
      }

      const module = ApplicationState._modules.find(o => o.path === path)!;

      return {
        path: path,
        title: module.title
      };
    });

    const pageMap = createTreeFromUrlSet(urlSet);

    return pageMap;
  }

  public static readonly getRoutePath = (urlPathname: string) => {
    const routeInfos = ApplicationState.getAllRouteInfos();
    const match = routeInfos.find(
      routeInfo => matchPath(
        urlPathname,
        {
          path: routeInfo.path,
          exact: routeInfo.exact ?? true
        }
      )
    );

    return match?.path;
  }

  public static readonly getBreadcrumb = (url: string) => {
    const pageTree = ApplicationState.buildPageTree();
    const routePath = ApplicationState.getRoutePath(url);

    const treeFiltered = filterTree(pageTree, 'children', 'value', routePath);
    const breadcrumb = flattenTree(treeFiltered, 'children');

    return breadcrumb.map((o): IApplicationBreadcrumbItem => ({ path: o.value as string, title: o.title as  string }));
  }
}