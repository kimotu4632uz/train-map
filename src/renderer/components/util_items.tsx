import { Collapse, ListItem, ListItemText } from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import React from "react";

export type SelectableItemProps = {
  content: string;
  index: string;
  onClick?: (index: string) => void;
  className?: string;
};

export const SelectableItem: React.FC<SelectableItemProps> = ({ content, index, onClick, className }) => {
  const [select, setSelect] = React.useState(false);

  const handleClick = () => {
    setSelect(!select);

    if (onClick !== undefined) {
      onClick(index);
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
