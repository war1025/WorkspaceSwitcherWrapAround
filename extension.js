const St = imports.gi.St;
const Main = imports.ui.main;
const Search = imports.ui.search;
const SearchDisplay = imports.ui.searchDisplay;
const IconGrid = imports.ui.iconGrid;
const GLib = imports.gi.GLib;
const WorkspaceSwitcherPopup = imports.ui.workspaceSwitcherPopup;

function lastWSIndex() { return global.screen.n_workspaces - 1 }

function indexDown(activeWorkspaceIndex) {
	if ( activeWorkspaceIndex < lastWSIndex() ) {
		return activeWorkspaceIndex + 1;
	}
  return 0;
}

function indexUp(activeWorkspaceIndex) {
	if (activeWorkspaceIndex > 0) {
    return activeWorkspaceIndex - 1;
  }
  return lastWSIndex();
}

let chooseIndex = { Up: indexUp, Left: indexUp, Down: indexDown, Right: indexDown };

function wrapAround(dir) {
  return function() {
    let activeWorkspaceIndex = global.screen.get_active_workspace_index();
    let indexToActivate = chooseIndex[dir](activeWorkspaceIndex);

    if (indexToActivate != activeWorkspaceIndex)
      global.screen.get_workspace_by_index(indexToActivate).activate(global.get_current_time());

    if (!Main.overview.visible)
      this._workspaceSwitcherPopup.display(WorkspaceSwitcherPopup.UP, indexToActivate);
  }
}

let old = {};

function init() {
  ['Left', 'Right', 'Up', 'Down'].forEach(function(dir) {
    old[dir] = Main.wm['actionMoveWorkspace' + dir];
  });
}

function enable() {
  ['Left', 'Right', 'Up', 'Down'].forEach(function(dir) {
    Main.wm['actionMoveWorkspace' + dir] = wrapAround(dir);
  });
}

function disable() {
  ['Left', 'Right', 'Up', 'Down'].forEach(function(dir) {
    Main.wm['actionMoveWorkspace' + dir] = old[dir];
  });
}
