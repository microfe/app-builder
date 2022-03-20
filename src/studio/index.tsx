import { Editor } from 'libs/@craftjs/core';
import {
  IApplicationModule,
  IApplicationModuleMountProps
} from 'libs/framework';
import React, { useEffect } from 'react';

import { IStudioContextValue, StudioContext, studioPath } from './configs';
import { onPageSave, onProjectDelete, onProjectLoad } from './events';
import { StudioLayout } from './layouts';
import { pages } from './pages';
import { IProject, pageService } from './services';
import {
  Container,
  Img,
  RenderNode,
  RichText,
  Root,
  WidgetButton,
  WidgetColumn,
  WidgetLink
} from './widgets';

const MountPoint = (props: IApplicationModuleMountProps) => {
  const { children } = props;

  const [contextValue, setcontextValue] = React.useState<IStudioContextValue>({});

  React.useEffect(
    () => {
      const projectLoaded = async (project: IProject) => {
        let pages = await pageService.getMany({
          projectId: project.id!
        });

        if (pages.length == 0) {
          const initPage = await pageService.create({
            name: 'Untitle Page',
            projectId: project.id
          });
          pages = [initPage];
        }

        setcontextValue({
          ...contextValue,
          project: project,
          pages: pages,
          activedPage: pages[0]
        });
      };

      const projectDeleted = () => {
        setcontextValue({});
      };

      onProjectLoad.listen(projectLoaded);
      onProjectDelete.listen(projectDeleted);

      return () => {
        onProjectLoad.unlisten(projectLoaded);
        onProjectDelete.unlisten(projectDeleted);
      };
    },
    [contextValue]
  );

  useEffect(
    () => {
      const pageSaved = (page) => {
        setcontextValue({
          ...contextValue,
          activedPage: page
        });
      };

      onPageSave.listen(pageSaved);
      return () => {
        onPageSave.unlisten(pageSaved);
      };
    },
    [contextValue]
  );

  return (
    <StudioContext.Provider value={contextValue}>
      <Editor
        resolver={{ Root, Container, WidgetButton, RichText, Img, WidgetColumn, WidgetLink }}
        onRender={RenderNode}
      >
        <StudioLayout>
          {children()}
        </StudioLayout>
      </Editor>
    </StudioContext.Provider>
  );
};

const module: IApplicationModule = {
  title: 'Studio',
  path: studioPath + '/*',
  defaultUrl: '/studio',
  pages: pages,
  mount: MountPoint,
  translation: {},
  permissions: {}
};

export default module;