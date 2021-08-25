import React, { useEffect, useReducer, useRef, useState } from 'react';
import { createStyles, Drawer, List, makeStyles, Theme } from '@material-ui/core';

import { ExpandableItem, SelectableItem } from './util_items';
import { CustomAppBar } from './custom_app_bar';
import { visibleReducerAction } from '../index'

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(0),
    },
    map: {
      width: '100%',
      height: `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  }),
);

type CustomHeaderDrawerProps = {
  onGeoJsonImport: React.DispatchWithoutAction;
  onListItemClick: React.Dispatch<visibleReducerAction>;
};

export const CustomHeaderDrawer: React.FC<CustomHeaderDrawerProps> = ({ onGeoJsonImport, onListItemClick }) => {
  const classes = useStyles();
  const [[menulist, menudict], setMenudict] = useState([new Array<string>(), new Map<string, string[]>()]);
  const [iFlag, _] = useState(null);
  const firstRender = useRef(true);
  const [rFlag, rFlagDispatch] = useReducer((state: boolean) => !state, false);

  useEffect(() => {
    const init = async () => {
      console.log('iFlag effect running');
      const result = await window.api.readRailInfo();
      if (!result) { return; }

      const dict = new Map<string, string[]>();
      for (const detail of result.detail_list) {
        dict.set(detail.comp_name, detail.lines.map((line_info) => line_info.line_name));
      }
      setMenudict([result.comp_list, dict]);
    };

    init();
  }, [iFlag]);

  useEffect(() => {
    const read_json = async () => {
      console.log('mFlag effect running');
      const result = await window.api.fetchRailInfo();
      if (!result) { return; }

      const dict = new Map<string, string[]>();
      for (const detail of result.detail_list) {
        dict.set(detail.comp_name, detail.lines.map((line_info) => line_info.line_name));
      }
      setMenudict([result.comp_list, dict]);
    };

    if (firstRender.current) {
      firstRender.current = false;
    } else {
      read_json();
    }
  }, [rFlag]);

  return (
    <div>
      <CustomAppBar
        onGeoJsonImport={onGeoJsonImport}
        onRailInfoImport={rFlagDispatch}
      />
      <Drawer
        className={classes.drawer}
        variant='permanent'
        classes={{ paper: classes.drawerPaper }}
        anchor='left'
      >
        <List>
          {menulist.map((pContent, pIndex) => (
            <ExpandableItem
              content={pContent}
              child={
                <List component="div" disablePadding>
                  {menudict.get(pContent)?.map((cContent, cIndex) => (
                    <SelectableItem
                      content={cContent}
                      index={`${pIndex}-${cIndex}`}
                      className={classes.nested}
                      onClick={(index, state) => state ? onListItemClick({type: 'add', value: index}) : onListItemClick({type: 'del', value: index})}
                    />
                  ))}
                </List>
              }
            />
          ))}
        </List>
      </Drawer>
    </div>
  )
}

