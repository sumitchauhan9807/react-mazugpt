export const ACTION_TYPES = {
  SET_PARENT_TEXT:'SET_PARENT_TEXT',
  APPEND_PARENT_TEXT_TRANSLATION:'APPEND_PARENT_TEXT_TRANSLATION',
  SET_PARENT_TEXT_TRANSLATION:'SET_PARENT_TEXT_TRANSLATION',
  SET_USER_TEXT:'SET_USER_TEXT',
  APPEND_USER_TEXT_TRANSLATION:'APPEND_USER_TEXT_TRANSLATION',
  SET_USER_TEXT_TRANSLATION:'SET_USER_TEXT_TRANSLATION',
  APPEND_REPHRASED_TEXT:'APPEND_REPHRASED_TEXT',
  SET_REPHRASED_TEXT:'SET_REPHRASED_TEXT',
  SET_USER_TEXT_TRANSLATION_LANG:'SET_USER_TEXT_TRANSLATION_LANG',
  RESET:"RESET",
  INCREMENT_STEP:"INCREMENT_STEP",
  DECREMENT_STEP:"DECREMENT_STEP",
  SET_LOADING:"SET_LOADING",
}
export const initialState = {
  parentText:"",
  parentTextTranslation:"",
  userText:"",
  userTextTranslation:"",
  rephrasedText:"",
  userTextTranslationLang:"",
  step:0,
  loading:false
};
export const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_PARENT_TEXT:
      return {...state,parentText:action.payload }
    case ACTION_TYPES.SET_USER_TEXT:
      return {...state,userText:action.payload }
    case ACTION_TYPES.SET_REPHRASED_TEXT:
      return {...state,rephrasedText:action.payload }
    case ACTION_TYPES.APPEND_PARENT_TEXT_TRANSLATION:
      return {...state,parentTextTranslation : state.parentTextTranslation + action.payload }
    case ACTION_TYPES.APPEND_USER_TEXT_TRANSLATION:
      return {...state,userTextTranslation : state.userTextTranslation + action.payload }
    case ACTION_TYPES.APPEND_REPHRASED_TEXT:
      return {...state,rephrasedText : state.rephrasedText + action.payload }
    case ACTION_TYPES.SET_PARENT_TEXT_TRANSLATION:
      return {...state,parentTextTranslation : action.payload }
    case ACTION_TYPES.SET_USER_TEXT_TRANSLATION:
      return {...state,userTextTranslation : action.payload }
      case ACTION_TYPES.SET_USER_TEXT_TRANSLATION_LANG:
    return {...state,userTextTranslationLang : action.payload }
    case ACTION_TYPES.INCREMENT_STEP : {
      if(state.step < 3) return  {...state,step : state.step + 1 }
      return state
    }
    case ACTION_TYPES.DECREMENT_STEP : {
      if(state.step > 0) return  {...state,step : state.step - 1 }
      return state
    }
    case ACTION_TYPES.SET_LOADING:
      return {...state,loading : action.payload }
    case ACTION_TYPES.RESET:
      return {...initialState ,userTextTranslationLang:state.userTextTranslationLang };
    default:
      return state;
  }
};