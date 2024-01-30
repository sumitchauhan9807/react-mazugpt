export const ACTION_TYPES = {
  SET_PARENT_TEXT:'SET_PARENT_TEXT',
  APPEND_PARENT_TEXT_TRANSLATION:'APPEND_PARENT_TEXT_TRANSLATION',
  SET_PARENT_TEXT_TRANSLATION:'SET_PARENT_TEXT_TRANSLATION',
  RESET:"RESET"
}
export const initialState = {
  parentText:"",
  parentTextTranslation:""
};
export const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_PARENT_TEXT:
      return {...state,parentText:action.payload }
    case ACTION_TYPES.APPEND_PARENT_TEXT_TRANSLATION:
      return {...state,parentTextTranslation : state.parentTextTranslation + action.payload }
    case ACTION_TYPES.SET_PARENT_TEXT_TRANSLATION:
      return {...state,parentTextTranslation : action.payload }
    case ACTION_TYPES.RESET:
      return initialState;
    default:
      return state;
  }
};