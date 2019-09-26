<template>
  <div class="m-footer-box flex">
    <div class="next flex f-button f-item" @click="prev"><i class="iconfont icon-mediaprevious"></i></div>
    <div class="play flex f-button f-item" @click="triggerPlay"><i class="iconfont icon-play" :class="{'icon-pause':isPlay}"></i></div>
    <div class="next flex f-button f-item" @click="next"><i class="iconfont icon-medianext"></i></div>
    <div class="grow-1 flex f-item">
      <el-slider v-model="currentTimeValue" :show-tooltip="false" class="grow-1" @change="playProgressChange"></el-slider>
      <span class="play-time">{{currentTime}}</span>
      <span class="total-time">{{duration}}</span>
    </div>
    <div class="volume flex f-item">
      <i class="iconfont icon-volume-" :class="{'icon-volume':volumeValue===0}"></i>
      <el-slider v-model="volumeValue" :show-tooltip="false" class="grow-1 volum-slider" @change="volumeChange"></el-slider>
    </div>
    <div class="lyric f-item"><i class="iconfont icon-bofangqi_shouyegeci_"></i></div>
    <audio :src="current_play_music_url" id="audioPlay" controls="controls" autoplay="autoplay" @canplay="initAudioTime" @loadedmetadata="loadedmetadata" @timeupdate="timeupdate" @ended="ended" @seeked="seeked" @seeking="seeking" v-show="false"/>
  </div>
</template>
// @canplay="initAudioTime" @loadedmetadata="loadedmetadata" @timeupdate="timeupdate" @ended="ended"
<script>
import {ipcRenderer} from 'electron'
import {mapGetters} from 'vuex'
import {common} from '@/api/service'
export default {
  name: 'Footer',
  data () {
    return {
      currentTimeValue: 0,
      currentTime: '00:00',
      duration: '00:00',
      volumeValue: 100,
      isPlay: true,
      audioUrl: ''// 'http://m10.music.126.net/20180503162328/837d4ddaf294cbe88db9990d6cf84ffd/ymusic/da3a/13a1/5c17/2308117200afe95d4c732616892d97c4.mp3'
    }
  },
  mounted () {
    let dom = document.getElementsByClassName('el-tooltip')[0]
    console.log(dom)
    dom.addEventListener('mousedown', function () {
      const audio = document.getElementById('audioPlay')
      audio.pause()
      this.isPlay = false
    })
    ipcRenderer.on('triggerPlay', (event) => {
      this.triggerPlay()
    }).on('volumeUp', (event) => {
      this.volumeUpOrDown(+0.1)
    }).on('volumeDown', e => {
      this.volumeUpOrDown(-0.1)
    }).on('nextMusic', (event) => {
      this.next()
    }).on('prevMusic', (event) => {
      this.prev()
    })
  },
  computed: {
    ...mapGetters([
      'current_play_music_url',
      'current_album_musics',
      'current_play_muisc'
    ])
  },
  methods: {
    initAudioTime () {
      const audio = document.getElementById('audioPlay')
      if (audio.currentTime) {
        this.currentTime = this.padLeft(~~(audio.currentTime / 60)) + ':' + this.padLeft(~~(audio.currentTime % 60))
      }
      this.duration = this.padLeft(~~(audio.duration / 60)) + ':' + this.padLeft(~~(audio.duration % 60))
      // console.log(audio.duration, audio.currentTime)
      this.volumeValue = audio.volume * 100
      console.log(audio.volume)
    },
    triggerPlay () {
      const audio = document.getElementById('audioPlay')
      if (audio.paused) {
        audio.play()
      } else {
        audio.pause()
      }
      this.isPlay = !audio.paused
    },
    next () {
      console.log(this.current_album_musics)
      let music = this.current_album_musics.tracks[this.current_album_musics.tracks.indexOf(this.current_play_muisc) + 1]
      if (music) {
        this.$store.dispatch('setCurrentPlayMuisc', music)
        this.getMusic(music.id)
      }
    },
    prev () {
      let music = this.current_album_musics.tracks[this.current_album_musics.tracks.indexOf(this.current_play_muisc) - 1]
      if (music) {
        this.$store.dispatch('setCurrentPlayMuisc', music)
        this.getMusic(music.id)
      }
    },
    getMusic (id) {
      let obj = common(`/song/url?id=${id}`)
      this.$store.dispatch('setCurrentPlayMusicUrl', obj).then(({data}) => {
        console.log(data)
        // const notification = new window.Notification(`${this.current_play_muisc.name}`, {
        //   title: `${this.current_play_muisc.name}`,
        //   subtitle: '通知副标题适用macOS',
        //   body: `${this.current_play_muisc.name}`,
        //   icon: require('path').join(__dirname, '../assets/logo.png')
        // })
        // notification.show()
      })
    },
    loadedmetadata () {
      // console.log('dd')
    },
    padLeft (val) {
      return String.prototype.padStart.apply(val, [2, '0'])
    },
    timeupdate (e) {
      if (e.target.paused) return
      // console.log('timeupdate')
      let _currentTime = e.target.currentTime
      let _duration = e.target.duration
      this.currentTime = this.padLeft(~~(_currentTime / 60)) + ':' + this.padLeft(~~(_currentTime % 60))
      // requestAnimationFrame(this.animation)
      let _percent = _currentTime / _duration
      this.currentTimeValue = _percent * 100
    },
    animation (percent) {
      const flag = document.getElementById('progress-flag')
      requestAnimationFrame(function () {
        let _percent = flag.style.left.replace('%', '')
        console.log(+_percent)
        flag.style.left = (+_percent + percent) + '%'
      })
    },
    ended (e) {
      this.next()
    },
    volumeChange (val) {
      // console.log(val)
      const audio = document.getElementById('audioPlay')
      audio.volume = val / 100
    },
    volumeUpOrDown (step) {
      const audio = document.getElementById('audioPlay')
      let volume = audio.volume
      volume = volume + (+step)
      if (volume > 1) {
        volume = 1
      } else if (volume < 0) {
        volume = 0
      }
      this.volumeValue = volume * 100
      audio.volume = volume
    },
    playProgressChange (val) {
      console.log(val)
      const audio = document.getElementById('audioPlay')

      console.log(audio.duration, val * audio.duration / 100)
      // let _currentTime = val * audio.duration / 100
      // this.currentTime = this.padLeft(~~(_currentTime / 60)) + ':' + this.padLeft(~~(_currentTime % 60))
      audio.currentTime = val * audio.duration / 100
      // audio.pause()
    },
    seeked (e) {
      console.log(e.target.currentTime)
      e.target.play()
      this.isPlay = true
    },
    seeking () {
      console.log('seeking')
    }
  },
  watch: {
    current_play_muisc: (val, oldVal) => {
      console.log(val)

      let myNotification = new Notification(val.name, {
        body: `${val.ar[0].name}--${val.name}`
        // icon: `${val.album.artists[0].img1v1Url}`,
        // closeButtonText: '关闭'
      })
      myNotification.onclick = () => {
        console.log('Notification clicked')
      }
    }
  }
}
</script>

<style lang="less">
@background-color:#EFF0EF;
@border-color:#BEBFBE;
@button-color:#D63A39;
.m-footer-box{
  background-color: @background-color;
  border-top: 1px solid @border-color;
  height: 100%;
  align-items: center;
  padding: 0 20px;
  .f-button{
    color: #FFFFFF;
    background-color: @button-color;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
  }
  .play{
    width: 50px;
    height: 50px;
  }
  .next{
    width: 40px;
    height: 40px;
  }
  .play-time{
    margin-left: 10px;
    &::after{
      content: "/";
    }
  }
  .volume{
    width: 120px;
    .volum-slider{
      margin-left: 10px;
    }
  }
  .f-item{
    margin: 0 5px;
    &.flex{
      align-items: center;
    }
  }
  .lyric{
    .iconfont{
      font-size: 25px;
    }
  }
  // .el-progress{
  //   &::after{
  //     position: absolute;
  //     content: '\2022';
  //     // width: 14px;
  //     // height: 14px;
  //     border: 1px solid transparent;
  //     border-radius: 100%;
  //     left: 30px;
  //     background-color: #FFFFFF;
  //     padding: 0 4px;
  //     color: @button-color;
  //   }
  //   .el-progress-bar{
  //     padding-right: 0;
  //   }
  //   .el-progress-bar__outer{
  //     background-color: #AAABAA;
  //   }
  // }
  .el-slider__runway{
    background-color: #AAABAA;
  }
  .el-slider__bar{
    background-color: @button-color;
  }
  .el-slider__button{
    border: 2px solid @button-color;
    width: 12px;
    height: 12px;
  }
}
</style>
