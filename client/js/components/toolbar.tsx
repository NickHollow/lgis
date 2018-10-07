import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Drawer    from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import List      from '@material-ui/core/List';
import MenuItem  from '@material-ui/core/MenuItem';
import Select    from '@material-ui/core/Select';
import Toolbar   from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import ChevronLeft  from '@material-ui/icons/ChevronLeft';
import Menu from '@material-ui/icons/Menu';
import * as classNames from 'classnames';
import * as React from 'react';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {
  ActionTypes,
  toggleDrawer,
  inputSettings,
  inputTable,
  selectGeomType,
  addLayer,
} from '../actions/toolbar';
import {RootState} from '../reducers';

interface ToolbarProps {
  classes: any;
  open: boolean;
  dispatchDrawerOpen: () => void;
  settings: string;
  dispatchInputSettings: (settings: string) => void;
  table: string;
  geomType: string;
  dispatchInputTable: (table: string) => void;
  dispatchSelectGeomType: (geomType: string) => void;
  dispatchAddLayer: (settings: string, table: string) => void;
}

const LgisToolbar = (props: ToolbarProps) => {
  const {
    classes,
    open,
    dispatchDrawerOpen,
    settings,
    dispatchInputSettings,
    table,
    dispatchInputTable,
    geomType,
    dispatchSelectGeomType,
    dispatchAddLayer,
  } = props;

  return (
    <div>
      <AppBar
        className={classNames(classes.appBar, {
          [classes.appBarShift]: open,
        })}>
        <Toolbar disableGutters={!open}>
          <IconButton
            color="primary"
            aria-label="Open drawer"
            onClick={(e: React.MouseEvent<HTMLElement>) => dispatchDrawerOpen()}
            className={classNames(classes.menuButton, open && classes.hide)}>
            <Menu />
          </IconButton>
          <Typography variant="title" noWrap={true}>
            Lgis
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="persistent"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}>
        <div className={classes.drawerHeader}>
          <IconButton
            onClick={(e: React.MouseEvent<HTMLElement>) =>
              dispatchDrawerOpen()
            }>
            <ChevronLeft />
          </IconButton>
        </div>
        <TextField
          id="lgis-settings"
          className={classes.textfield}
          label="Settings"
          defaultValue={settings}
          multiline={true}
          rows="10"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            dispatchInputSettings(e.target.value)
          }
        />
        <InputLabel shrink htmlFor="geom-type-label-placeholder">
          Geometry type
        </InputLabel>
        <Select
          value={geomType}
          className={classes.selector}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            dispatchSelectGeomType(e.target.value)
          }
          inputProps={{name: 'GeomType', id: 'geom-type'}}>
          <MenuItem value="point">Point</MenuItem>
          <MenuItem value="linestring">LineString</MenuItem>
          <MenuItem value="polygon">Polygon</MenuItem>
        </Select>
        <TextField
          id="lgis-table"
          className={classes.textfield}
          label="Table"
          defaultValue={table}
          multiline={true}
          rows="8"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            dispatchInputTable(e.target.value)
          }
        />
        <Button
          variant="contained"
          className={classes.button}
          onClick={(e: React.MouseEvent<HTMLElement>) =>
            dispatchAddLayer(settings, table)
          }>
          Show
        </Button>
      </Drawer>
    </div>
  );
};

export interface ToolbarState {
  open: boolean;
  settings: string;
  table: string;
  geomType: string;
}

const mapStateToProps = (state: RootState): ToolbarState => ({
  open: state.toolbar.open,
  settings: state.toolbar.settings,
  table: state.toolbar.table,
  geomType: state.toolbar.geomType,
});

const mapDispatchToProps = (dispatch: Dispatch<ActionTypes>) => ({
  dispatchDrawerOpen: () => {
    dispatch(toggleDrawer());
  },
  dispatchInputSettings: (settings: string) => {
    dispatch(inputSettings(settings));
  },
  dispatchInputTable: (table: string) => {
    dispatch(inputTable(table));
  },
  dispatchSelectGeomType: (geomType: string) => {
    dispatch(selectGeomType(geomType));
  },
  dispatchAddLayer: (settings: string, table: string) => {
    dispatch(addLayer(settings, table));
  },
});

export const LGISToolbar = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LgisToolbar);
