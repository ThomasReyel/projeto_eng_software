import { IconButton, Tooltip } from '@mui/material';

function HeaderIconButton({ title, onClick, ariaLabel, children }) {
  return (
    <Tooltip title={title} enterDelay={800}>
      <IconButton
        size="small"
        onClick={onClick}
        aria-label={ariaLabel || title}
        sx={{
          width: 36,
          height: 36,
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: '8px',
          transition: 'border-color 0.2s, background-color 0.2s',
          '&:hover': {
            backgroundColor: 'action.hover',
            borderColor: 'text.secondary',
          },
        }}
      >
        {children}
      </IconButton>
    </Tooltip>
  );
}

export default HeaderIconButton;