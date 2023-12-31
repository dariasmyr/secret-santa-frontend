import { ReactElement } from 'react';
import {
  Dialog as MUIDialog,
  DialogActions as OrigDialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { Button, ButtonVariant } from 'src/components/ui/common/button';
import styled from 'styled-components';

export interface IDialogButtonProperties {
  title: string;
  onClick: () => void;
  type: ButtonVariant;
}

export interface IDialogProperties {
  open: boolean;
  title: string;
  content: ReactElement;
  buttons: IDialogButtonProperties[];
}

const DialogActions = styled(OrigDialogActions)<{ buttonCount: number }>`
  display: flex;
  flex-direction: ${(properties): string =>
    // eslint-disable-next-line no-magic-numbers
    properties.buttonCount >= 3 ? 'column' : 'row'};
  justify-content: center;
  gap: 16px;
`;

export const Dialog = (properties: IDialogProperties): ReactElement => {
  return properties.open ? (
    <MUIDialog
      open={properties.open}
      sx={{
        borderRadius: '16px',
      }}
    >
      <DialogTitle>{properties.title}</DialogTitle>
      <DialogContent>{properties.content}</DialogContent>
      <DialogActions buttonCount={properties.buttons.length}>
        {properties.buttons.map((button) => (
          <Button
            onClick={button.onClick}
            variant={button.type}
            key={button.title}
          >
            {button.title}
          </Button>
        ))}
      </DialogActions>
    </MUIDialog>
  ) : (
    <></>
  );
};
