import { Collapse, ListItem, ListItemText } from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import React, { useReducer } from "react";

export type SelectableItemProps = {
  content: string;
  index: string;
  onClick?: (index: string, state: boolean) => void;
  className?: string;
};

export const SelectableItem: React.FC<SelectableItemProps> = ({ content, index, onClick, className }) => {
  const [select, selectDispatch] = useReducer((state: boolean) => !state, false);

  const handleClick = () => {
    selectDispatch();

    if (onClick !== undefined) {
      onClick(index, select);
    }
  }

  return (
    <ListItem
      button
      selected={select}
      onClick={handleClick}
      className={className}
    >
      <ListItemText primary={content} />
    </ListItem>
  )
}

export type ExpandableItemProps = {
  content: string;
  child: object;
  className?: string;
};

export const ExpandableItem: React.FC<ExpandableItemProps> = ({ content, child, className }) => {
  const [open, setOpen] = React.useState(false);
  
  const handleClick = () => {
    setOpen(!open);
  }

  return (
    <div>
      <ListItem
        button
        onClick={handleClick}
        className={className}
      >
        <ListItemText primary={content} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto">
        {child}
      </Collapse>
    </div>
  )
}
