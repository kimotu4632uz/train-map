import React, { useEffect, useReducer, useState } from 'react';
import ReactDOM from 'react-dom';
import { makeStyles, createStyles, CssBaseline, Theme, List, Drawer, fade } from '@material-ui/core';

import { GoogleMapWrapper } from './components/google_map_wrapper';
import { CustomHeaderDrawer } from './components/drawer_list';

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
  }),
);

export type visibleReducerAction = {
  type: string;
  value: string;
};

const visibleReducer = (state: Set<string>, action: visibleReducerAction): Set<string> => {
  switch (action.type) {
    case 'add':
      return state.add(action.value)
    case 'del':
      state.delete(action.value);
      return state
    default:
      return state
  }
}
const App: React.FC = () => {
  const classes = useStyles();
  const [gFlag, gFlagDispatch] = useReducer((state: boolean) => !state, false);
  const [visibleList, visibleListDispatch] = useReducer(visibleReducer, new Set<string>());

  return (
    <div className={classes.root}>
      <CssBaseline />
      <CustomHeaderDrawer onGeoJsonImport={gFlagDispatch} onListItemClick={visibleListDispatch} />
     <main className={classes.content}>
        <div className={classes.toolbar} />
        <div className={classes.map}>
        <GoogleMapWrapper
          visibleList={visibleList}
          importGeoJsonFlag={gFlag}
        />
       </div>
      </main>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('contents'));