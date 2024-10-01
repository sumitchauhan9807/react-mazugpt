import React, { useState, useEffect, useReducer } from "react";
import backgroundimage from "src/assets/image/bg1.jpg";
import {translateText} from 'src/helpers'
import {initialState,reducer,ACTION_TYPES} from 'src/reducers/reducer'
import Loader from 'src/components/small/Loader'
import TextDisplay from 'src/components/UI/TextDisplay'
import Button from 'src/components/UI/Button'
import Dropdown from "src/components/UI/DropDown";
import UserNav from 'src/components/User/Navigation'
import {useSelector,useDispatch} from 'react-redux'
import { toast } from "react-toastify";
import {playSound} from 'src/components/AudioMedia'
import axios from 'src/axios'

const getLanguageFromAbb = (lang) => {
  if(lang == 'de') return 'german'
  if(lang == 'fr') return 'french'
  if(lang == 'en') return 'english'

}

const TextSlider = () => {
  const [state, dispatch] = useReducer(reducer,initialState);
  const userData = useSelector((state) => state.user);
  console.log(userData)
  const translateParentText = async () => {
    dispatch({ type: ACTION_TYPES.SET_PARENT_TEXT_TRANSLATION, payload: "", });
    dispatch({ type: ACTION_TYPES.SET_LOADING, payload: true, });
    try {
      await translateText({
        toTranslateText :state.parentText,
        operation:"TRANSLATE",
        language:getLanguageFromAbb(userData.userData.first_operation_lang),
        onStream:(decodedChunk)=> {
          dispatch({ type: ACTION_TYPES.APPEND_PARENT_TEXT_TRANSLATION, payload: decodedChunk});
        }
      })
      dispatch({ type: ACTION_TYPES.SET_LOADING, payload: false, });
      dispatch({ type: ACTION_TYPES.INCREMENT_STEP });
    }catch(e) {
      dispatch({ type: ACTION_TYPES.SET_LOADING, payload: false, });
      alert(e)
    }
  };
  //const notify = () => toast("Wow so easy!");
  const translateUserText = async () => {
    dispatch({ type: ACTION_TYPES.SET_USER_TEXT_TRANSLATION, payload: "", });
    dispatch({ type: ACTION_TYPES.SET_LOADING, payload: true, });
    try {
      await translateText({
        toTranslateText :state.userText,
        operation:"TRANSLATE",
        onStream:(decodedChunk)=> {
          dispatch({ type: ACTION_TYPES.APPEND_USER_TEXT_TRANSLATION, payload: decodedChunk});
        },
        language:getLanguageFromAbb(userData.userData.second_operation_lang) 
      })
      dispatch({ type: ACTION_TYPES.SET_LOADING, payload: false, });
      dispatch({ type: ACTION_TYPES.INCREMENT_STEP });
    }catch(e) {
      dispatch({ type: ACTION_TYPES.SET_LOADING, payload: false, });
      alert(e)
    }
  };

  const rephraseFinalText = async () => {
    dispatch({ type: ACTION_TYPES.SET_REPHRASED_TEXT, payload: "", });
    dispatch({ type: ACTION_TYPES.SET_LOADING, payload: true, });
    try {
      await translateText({
        toTranslateText :state.userTextTranslation,
        operation:"RE_PHRASE",
        onStream:(decodedChunk)=> {
          dispatch({ type: ACTION_TYPES.APPEND_REPHRASED_TEXT, payload: decodedChunk});
        },
        language:getLanguageFromAbb(userData.userData.second_operation_lang)
      })
      dispatch({ type: ACTION_TYPES.SET_LOADING, payload: false, });
      dispatch({ type: ACTION_TYPES.INCREMENT_STEP });
    }catch(e) { 
      dispatch({ type: ACTION_TYPES.SET_LOADING, payload: false, });
      alert(e)
    }
  }

  const decrementStep = (step) => {
    if(step == 0) {
      dispatch({ type: ACTION_TYPES.SET_PARENT_TEXT, payload: initialState.parentText});
      dispatch({ type: ACTION_TYPES.SET_PARENT_TEXT_TRANSLATION, payload: ""});
      dispatch({ type: ACTION_TYPES.SET_USER_TEXT, payload: ""});
      dispatch({ type: ACTION_TYPES.DECREMENT_STEP });
    }
    if(step == 1) {
      dispatch({ type: ACTION_TYPES.SET_USER_TEXT_TRANSLATION, payload: ""});
      dispatch({ type: ACTION_TYPES.DECREMENT_STEP });
    }
    if(step == 2) {
      dispatch({ type: ACTION_TYPES.SET_REPHRASED_TEXT, payload: "", });
      dispatch({ type: ACTION_TYPES.DECREMENT_STEP });
    }
  }

  const copyText = async (value) => {
    try {
      dispatch({ type: ACTION_TYPES.SET_LOADING, payload: true, });
      let { data } = await axios.post('api/lang-test',{
        text:value
      })
      dispatch({ type: ACTION_TYPES.SET_LOADING, payload: false, });

      console.log(data)
      if(data.toLocaleLowerCase() != getLanguageFromAbb(userData.userData.second_operation_lang)) {
        toast.error("Sorry there was an error in translation. Please retry rephrasing step")
        decrementStep(2)
        return 
      }
      console.log(data)
      navigator.clipboard.writeText(value);
      toast.success("Text copied !!")
    }catch(e) {
      dispatch({ type: ACTION_TYPES.SET_LOADING, payload: false, });
    }
  }
  const playMessage = () => {

  }
  if(!userData.userData) return
  return (
    <>
     <UserNav/>
    <div
      className="flex justify-center items-center h-screen w-screen z-50"
      style={{
        backgroundImage: `url(${backgroundimage})`,
        backgroundSize: "contain",
      }}
    >
      
      <div className="z-0">
        <h1 className="text-6xl font-black text-gray-50 italic text-center py-5 z-0">
          MAZUGPT <span className="text-yellow-500">1.1</span>
        </h1>
        <center className="mb-4" style={{color:'white'}}>Welcome back <b>{userData?.userData?.username}</b> &nbsp;
        {userData.userData.first_operation_lang}, {userData.userData.second_operation_lang}
        </center>
        <div className="grid grid-cols-3 z-50 gap-8 p-12 shadow-2xl rounded-2xl border-b-8 border-2 border-gray-700 bg-gray-800 ">
          <div className={`bg-gray-800 p-4   border-2 border-gray-600 rounded-2xl ${state.step == 0 && 'border-yellow-500 scale-110'}`}>
            <textarea
              value={state.parentText}
              onChange={(e) => dispatch({type:ACTION_TYPES.SET_PARENT_TEXT,payload:e.target.value})}
              placeholder="Type/Paste your original message here"
              rows="5"
              cols="30"
              className="w-full p-2 border border-gray-500 rounded focus:outline-none "
            />
            <br />
            <TextDisplay
              text={state.parentTextTranslation}
              loading={state.loading && state.step == 0}
            />
            <br />
            <div className="mt-4">
              <Button
                text={'Translate'}
                clickHandler={translateParentText}
                show={state.step == 0}
                loading={state.loading && state.step == 0}
              />
            </div>
          </div>

          <div className={`bg-gray-800 p-4 border-2 border-gray-600 rounded-2xl ${(state.step == 1 || state.step == 2)  && 'border-yellow-500 scale-110'}`}>
            <textarea
              onPaste={(e)=> {e.preventDefault(); toast.error("Pasting text is disabled"); playSound('no_copy')}}
              onCopy={(e)=> {e.preventDefault(); toast.error("Copying text is disabled"); playSound('no_copy')}}
              onCut={(e)=> {e.preventDefault(); toast.error("Cutting text is disabled"); playSound('no_copy')}}
              
              value={state.userText}
              onChange={(e) => dispatch({type:ACTION_TYPES.SET_USER_TEXT,payload:e.target.value})}
              placeholder="Type answerable text here "
              rows="5"
              cols="30"
              disabled={state.step != 1}
              className="w-full p-2 border border-gray-500 rounded focus:outline-none "
            />
            <br />
            
              {/* <Dropdown
                selected={state.userTextTranslationLang}
                itemSelect={(lang)=> dispatch({type:ACTION_TYPES.SET_USER_TEXT_TRANSLATION_LANG,payload:lang})}
                disabled={state.step != 1}
            /> */}
            
            <TextDisplay
              text={state.userTextTranslation}
              loading={state.loading && state.step == 1}
            />
            <br />

            <div className="mt-4">
              <Button
                  text={'Translate'}
                  clickHandler={translateUserText}
                  show={state.step == 1}
                  loading={state.loading && state.step == 1}
                />
              <Button
                text={'Previous'}
                clickHandler={() => decrementStep(0)}
                show={!state.loading && state.step == 1}
              />
              <Button
                text={'Rephrase'}
                clickHandler={() => rephraseFinalText()}
                show={!state.loading && state.step == 2}
              />
              <Button
                text={'Retry'}
                clickHandler={() => decrementStep(1)}
                show={!state.loading && state.step == 2}
              />
            </div>
          </div>

          <div className={`bg-gray-800 p-4 border-2 border-gray-600 rounded-2xl ${state.step == 3 && 'border-yellow-500 scale-110'}`}>
          <TextDisplay
              text={state.rephrasedText}
              loading={state.loading && state.step == 2}
            />
             {state.rephrasedText.length && <p style={{color:'white',fontSize:"12px",padding:"10px"}}>'Rephrased text in <b>{getLanguageFromAbb(userData.userData.second_operation_lang)}'</b></p>}
            <br />
            <div className="mt-4 gap-2 flex">
            <Button
                text={'Copy Text'}
                clickHandler={()=> copyText(state.rephrasedText)}
                show={state.step == 3}
                loading={state.loading && state.step == 3}
                loadingText={'Validating Language'}
              />

              <Button
                text={'Previous'}
                clickHandler={()=>decrementStep(2)}
                show={state.step == 3}
                loading={state.loading && state.step == 0}
              />
            </div>
          </div>

          <button onClick={() => dispatch({type:ACTION_TYPES.RESET})} className="col-span-3 mt-8  w-36 px-6 py-3 bg-red-500 text-white rounded hover:bg-red-600 flex justify-center mx-auto focus:outline-none">
            Reset
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default TextSlider;
