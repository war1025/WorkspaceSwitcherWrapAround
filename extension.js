const St = imports.gi.St;
const Main = imports.ui.main;
const Search = imports.ui.search;
const SearchDisplay = imports.ui.searchDisplay;
const IconGrid = imports.ui.iconGrid;
const GLib = imports.gi.GLib;
const WorkspaceSwitcherPopup = imports.ui.workspaceSwitcherPopup;

let oldUp = "";
let oldDown = "";


function wrapAroundDown() {
	let activeWorkspaceIndex = global.screen.get_active_workspace_index();
	let indexToActivate = activeWorkspaceIndex;
	if (activeWorkspaceIndex < global.screen.n_workspaces - 1) {
		indexToActivate++;
	} else {
		indexToActivate = 0;
	}

	if (indexToActivate != activeWorkspaceIndex)
		global.screen.get_workspace_by_index(indexToActivate).activate(global.get_current_time());

	if (!Main.overview.visible)
		this._workspaceSwitcherPopup.display(WorkspaceSwitcherPopup.DOWN, indexToActivate);
}


function wrapAroundUp() {
	let activeWorkspaceIndex = global.screen.get_active_workspace_index();
	let indexToActivate = activeWorkspaceIndex;
	if (activeWorkspaceIndex > 0) {
		indexToActivate--;
	} else {
		indexToActivate = global.screen.n_workspaces - 1;
	}

	if (indexToActivate != activeWorkspaceIndex)
		global.screen.get_workspace_by_index(indexToActivate).activate(global.get_current_time());

	if (!Main.overview.visible)
		this._workspaceSwitcherPopup.display(WorkspaceSwitcherPopup.UP, indexToActivate);
}

function init() {
	oldUp = Main.wm.actionMoveWorkspaceUp;
	oldDown = Main.wm.actionMoveWorkspaceDown;
}

function enable() {
	Main.wm.actionMoveWorkspaceUp = wrapAroundUp;
	Main.wm.actionMoveWorkspaceDown = wrapAroundDown;
}

function disable() {
	Main.wm.actionMoveWorkspaceUp = oldUp;
	Main.wm.actionMoveWorkspaceDown = oldDown;
}
