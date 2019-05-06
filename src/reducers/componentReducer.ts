import {
  LOAD_INIT_DATA,
  ADD_COMPONENT,
  ADD_CHILD,
  DELETE_CHILD,
  UPDATE_COMPONENT,
  DELETE_COMPONENT,
  CHANGE_FOCUS_COMPONENT,
  CHANGE_FOCUS_CHILD,
  CHANGE_COMPONENT_FOCUS_CHILD,
  UPDATE_CHILDREN,
  REASSIGN_PARENT,
  SET_SELECTABLE_PARENTS,
  EXPORT_FILES,
  CREATE_APPLICATION,
  EXPORT_FILES_SUCCESS,
  EXPORT_FILES_ERROR,
  CREATE_APPLICATION_ERROR,
  HANDLE_CLOSE,
  HANDLE_TRANSFORM,
  MOVE_TO_BOTTOM,
  MOVE_TO_TOP,
  OPEN_EXPANSION_PANEL,
  DELETE_ALL_DATA,
  CHANGE_IMAGE_PATH,
  ADD_PROP,
  DELETE_PROP,
  UPDATE_HTML_ATTR,
} from '../actionTypes';

import {
  addComponent,
  addChild,
  deleteChild,
  updateComponent,
  deleteComponent,
  changeFocusComponent,
  changeComponentFocusChild,
  changeFocusChild,
  updateChildren,
  reassignParent,
  setSelectableP,
  exportFilesSuccess,
  exportFilesError,
  handleClose,
  handleTransform,
  moveToBottom,
  moveToTop,
  openExpansionPanel,
  changeImagePath,
  addProp,
  deleteProp,
  updateHtmlAttr,
} from '../utils/componentReducer.util';
import cloneDeep from '../utils/cloneDeep.ts';

// import { updateHtmlAttr } from "../actions/components";

interface Child {
  childId: number;
  componentRef: number; // references the component this child instance belongs to
  position: object;
}

interface Component {
  componentId: number;
  title: string;
  childrenArray: Child[];
  nextChildId: number;
  focusChild: Component;
}

const appComponent = {
  id: 1,
  stateful: false,
  title: 'App',
  parentIds: [],
  color: '#FF6D00',
  draggable: true,
  childrenIds: [],
  selectableParents: [],
  props: [],
  nextPropId: 1,
  position: {
    x: 25,
    y: 25,
    width: 600,
    height: 400,
  },

  childrenArray: [],
  nextChildId: 1,
  focusChildId: 0,
};

const initialApplicationFocusChild = {
  childId: 0,
  componentName: null,
  position: {
    x: 25,
    y: 25,
    width: 600,
    height: 400,
  },
  draggable: true,
  childType: null,
};

const initialApplicationState = {
  totalComponents: 1,
  nextId: 2,
  // imagePath: '',
  successOpen: false,
  errorOpen: false,
  focusComponent: appComponent,
  selectableChildren: [],
  ancestors: [],
  initialApplicationFocusChild,
  focusChild: cloneDeep(initialApplicationFocusChild),
  components: [appComponent],
  appDir: '',
  loading: false,
  componentTree: { name: 'App', attributes: {}, children: {} },
};

const componentReducer = (state = initialApplicationState, action) => {
  switch (action.type) {
    case LOAD_INIT_DATA:
      return {
        ...state,
        ...action.payload.data,
        loading: false,
        appDir: '',
        successOpen: false,
        errorOpen: false,
      };
    case ADD_COMPONENT:
      return addComponent(state, action.payload);
    case ADD_CHILD:
      return addChild(state, action.payload);
    case DELETE_CHILD:
      return deleteChild(state, action.payload);
    case UPDATE_COMPONENT:
      return updateComponent(state, action.payload);
    case DELETE_COMPONENT:
      return deleteComponent(state, action.payload);
    case CHANGE_FOCUS_COMPONENT:
      return changeFocusComponent(state, action.payload);
    case CHANGE_FOCUS_CHILD:
      return changeFocusChild(state, action.payload);
    case CHANGE_COMPONENT_FOCUS_CHILD:
      return changeComponentFocusChild(state, action.payload);
    // case UPDATE_CHILDREN:
    //   return updateChildren(state, action.payload);
    // case REASSIGN_PARENT:
    //   return reassignParent(state, action.payload);
    // case SET_SELECTABLE_PARENTS:
    //   return setSelectableP(state);
    case CREATE_APPLICATION:
    case EXPORT_FILES:
      return { ...state, loading: true };
    case EXPORT_FILES_SUCCESS:
      return exportFilesSuccess(state, action.payload);
    case CREATE_APPLICATION_ERROR:
    case EXPORT_FILES_ERROR:
      return exportFilesError(state, action.payload);
    case HANDLE_CLOSE:
      return handleClose(state, action.payload);
    case HANDLE_TRANSFORM:
      return handleTransform(state, action.payload);

    case MOVE_TO_BOTTOM:
      return moveToBottom(state, action.payload);
    case MOVE_TO_TOP:
      return moveToTop(state, action.payload);
    case OPEN_EXPANSION_PANEL:
      return openExpansionPanel(state, action.payload);
    case DELETE_ALL_DATA:
      return initialApplicationState;
    case CHANGE_IMAGE_PATH:
      return changeImagePath(state, action.payload);
    case ADD_PROP:
      return addProp(state, action.payload);
    case DELETE_PROP:
      return deleteProp(state, action.payload);
    case UPDATE_HTML_ATTR:
      return updateHtmlAttr(state, action.payload);
    default:
      return state;
  }
};

export default componentReducer;