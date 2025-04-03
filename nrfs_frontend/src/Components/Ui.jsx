import React from "react";
import { 
  Button, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions, 
  TextField, Snackbar, Alert, Select, MenuItem, FormControl, InputLabel, 
  Checkbox, FormControlLabel, Switch 
} from "@mui/material";

/**
 * Custom Button Component
 * Highly reusable button with default props
 */
export const CustomButton = ({ label, onClick, variant = "contained", color = "primary", ...props }) => (
  <Button variant={variant} color={color} onClick={onClick} {...props}>
    {label}
  </Button>
);

/**
 * Loading Spinner Component
 */
export const Loader = () => (
  <CircularProgress color="primary" sx={{ display: "block", margin: "20px auto" }} />
);

/**
 * Custom Modal Component
 */
export const CustomModal = ({ open, handleClose, title, children }) => (
  <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>{children}</DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="secondary">Close</Button>
    </DialogActions>
  </Dialog>
);

/**
 * Custom Input Field Component
 */
export const CustomInput = ({ label, value, onChange, type = "text", ...props }) => (
  <TextField label={label} value={value} onChange={onChange} type={type} fullWidth margin="normal" {...props} />
);

/**
 * Snackbar Alert Component
 * Used for success/error messages
 */
export const SnackbarAlert = ({ open, handleClose, message, severity = "info" }) => (
  <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
    <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
      {message}
    </Alert>
  </Snackbar>
);

/**
 * Select Dropdown Component
 * Used for selecting from a list of options
 */
export const CustomSelect = ({ label, options, value, onChange }) => (
  <FormControl fullWidth margin="normal">
    <InputLabel>{label}</InputLabel>
    <Select value={value} onChange={onChange}>
      {options.map((option, index) => (
        <MenuItem key={index} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

/**
 * Checkbox Component
 * Used for multi-select choices
 */
export const CustomCheckbox = ({ label, checked, onChange }) => (
  <FormControlLabel control={<Checkbox checked={checked} onChange={onChange} />} label={label} />
);

/**
 * Switch Component
 * Used for toggles
 */
export const CustomSwitch = ({ label, checked, onChange }) => (
  <FormControlLabel control={<Switch checked={checked} onChange={onChange} />} label={label} />
);
