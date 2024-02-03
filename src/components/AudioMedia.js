import SoundMessage from 'src/assets/sounds/message.mp3'



export const soundMessage = new Audio(SoundMessage)




export const playSound = (soundType) => {
  if(soundType == 'no_copy') {
    playAudio(soundMessage)
  }
}
 const playAudio = (audio,repeat = true) => {
  if (audio.paused) {
    if(repeat) audio.currentTime = 0
    audio.play().catch((e)=>{
      console.log(e)
    }).then(()=>{
      console.log('music')
    })
    }else{
      if(repeat) audio.currentTime = 0 
    }
}


