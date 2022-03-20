import React from 'react';
import Frame, { FrameContextConsumer } from 'react-frame-component';
import { StyleSheetManager, ThemeProvider, withTheme } from 'styled-components';

import { BrowserFrameAgent } from './';
import frameBaseHtml from './BrowserFrameBody.html';

export const BrowserFrameBody = withTheme((props) => {
  const {
    theme,
    children,
    ...rest
  } = props;

  return (
    <Frame
      initialContent={frameBaseHtml}
      mountTarget="body"
      {...rest}
    >
      <>
        <BrowserFrameAgent />
        <FrameContextConsumer>
          {(frameContext) => (
            <StyleSheetManager target={frameContext.document?.head}>
              {theme ? (
                <ThemeProvider theme={theme}>
                  {children}
                </ThemeProvider>
              ) : (
                children
              )}
            </StyleSheetManager>
          )}
        </FrameContextConsumer>
      </>
    </Frame>
  );
});