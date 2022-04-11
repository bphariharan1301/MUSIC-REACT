import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Dimensions, Image, FlatList, Animated } from 'react-native'
import TrackPlayer, {Capability, Event, RepeatMode, State, usePlaybackState, useProgress, useTrackPlayerEvents} from 'react-native-track-player';
import React, {useEffect, useState, useRef} from 'react'
// import Ionicons from 'react-native-vector-icons/Ionicons'
import Slider from '@react-native-community/slider';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import songs from '../model/data';

const { width, height } = Dimensions.get('window')

const setUpPlayer = async () => {
  try {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.Stop,
      ],
    });
    await TrackPlayer.add(songs);
    
  } catch (e) {
    console.log(e)
  }
};

const togglePlayBack = async playBackState => {
  const currentTrack = await TrackPlayer.getCurrentTrack();
  if(currentTrack != null){
    if (playBackState == State.Paused) {
      await TrackPlayer.play();
    } else {
      await TrackPlayer.pause();
    }
  }
};

const MusicPlayer = () => {

  const playBackState = usePlaybackState();
  const progress = useProgress();

  const [songIndex, setsongIndex] = useState(0)
  const [trackTitle, setTrackTitle] = useState();
  const [trackArtist, settrackArtist] = useState();
  const [trackArtwork, settrackArtwork] = useState();
  const [repeatMode, setRepeatMode] = useState('off');

  // Custom references 
  const scrollX = useRef(new Animated.Value(0)).current;
  const songSlider = useRef(null); //FLatList Reference
  
  // Changing the track on complete
  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    if (event.type === Event.PlaybackTrackChanged && event.nextTrack != null) {
      const track = await TrackPlayer.getTrack(event.nextTrack);
      const { title, artwork, artist } = track;
      setTrackTitle(title);
      settrackArtist(artist);
      settrackArtwork(artwork);

    }
  })
  
  const skipTo = async trackId => {
    await TrackPlayer.skip(trackId)
  };

  const repeatIcon = () => {
    if (repeatMode == 'off') {
      return 'repeat-off'
    }
    
    if (repeatMode == 'track') {
      return 'repeat-once'
    }
    
    if (repeatMode == 'repeat') {
      return 'repeat'
    }
  };

  const changeRepeatMode = () => {
    if (repeatMode == 'off') {
      TrackPlayer.setRepeatMode(RepeatMode.Track);
      setRepeatMode('track')
    }
    
    if (repeatMode == 'track') {
      TrackPlayer.setRepeatMode(RepeatMode.Queue);
      setRepeatMode('repeat')
    }
    
    if (repeatMode == 'repeat') {
      TrackPlayer.setRepeatMode(RepeatMode.Off);
      setRepeatMode('off')
    }
  }

  useEffect(() => {
    setUpPlayer();
    scrollX.addListener(({ value }) => {
      // console.log(`ScrollX : ${value} | Device Width : ${width}`);
      const index = Math.round(value / width);
      skipTo(index)
      setsongIndex(index)
      // console.log(index)
    });

    return () => {
      scrollX.removeAllListeners();
      TrackPlayer.destroy();
    }

  }, []);

  const skipToNext = () => {
    songSlider.current.scrollToOffset({
      offset: (songIndex + 1) * width
    })
  };
  
  const skipToPrevious = () => {
    songSlider.current.scrollToOffset({
      offset: (songIndex - 1) * width
    })
  };

  const renderSongs = ({ item, index }) => {
    return (
      <Animated.View style={style.mainImageWrapper}>
      
        <View style={[style.imageWrapper, style.elevation]}>
          <Image
            source={trackArtwork}
            style={style.musicImage}
          />

        </View>

      </Animated.View>
    )
  }

  return (

    <SafeAreaView style={style.container}>
      <View style={style.maincontainer}>
        {/* image */}

        <Animated.FlatList
          ref = {songSlider}
          renderItem={renderSongs}
          data = {songs}
          keyExtractor={item => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator = {false}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset : {x : scrollX},
                }
              }
            ],
            {useNativeDriver : true},
          )}
        />

        {/* Song Content */}
        <View>
          <Text style={[style.songContent, style.songTitle]}>{trackTitle}</Text>
          <Text style={[style.songContent, style.songArtist]}>{trackArtist}</Text>
        </View>

        {/* slider */}
        <View>
          <Slider
            style={style.progressBar}
            value={progress.position}
            minimumValue={0}
            maximumValue={progress.duration}
            thumbTintColor="#FFD369"
            minimumTrackTintColor="#FFD369"
            maximumTrackTintColor="#fff"
            onSlidingComplete={async value => {
              await TrackPlayer.seekTo(value);
            }}
          />
          
          {/* Progess Duration */}
          
          <View style={style.progressLevelDuration}>
            <Text style={style.progressLabelText}>
              {
                new Date(progress.position * 1000).toLocaleTimeString().substring(4)              
              }
            </Text>
            <Text style={style.progressLabelText}>
              {new Date((progress.duration - progress.position) * 1000).toLocaleTimeString().substring(4)}
            </Text>
          </View>

        </View>


        {/* music controls */}

        <View style={style.musicControlsContainer}>
          <TouchableOpacity onPress={skipToPrevious}>
            <Ionicons name='play-skip-back-outline' size={35} color='#FFD369' />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => togglePlayBack(playBackState)}>
            <Ionicons
              name={
                playBackState === State.Playing
                  ? 'ios-pause-circle'
                  : 'ios-play-circle'
              }
              size={75} color='#FFD369' />
          </TouchableOpacity>
          <TouchableOpacity onPress={skipToNext}>
          <Ionicons name='play-skip-forward-outline' size={35} color='#FFD369' />
          </TouchableOpacity>
        </View>

      </View>

      <View style={style.bottomcontainer}>

        <View style={style.bottomIconWrapper}>
        
          <TouchableOpacity onPress={() => { }}>
            <Ionicons name='heart-outline' size={30} color='#888888' />
          </TouchableOpacity>

          <TouchableOpacity onPress={changeRepeatMode}>
            <MaterialCommunityIcons name={`${repeatIcon()}`} size={30} color={repeatMode !== 'off' ? '#FFD369':"#888888"} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {}}>
            <Ionicons name='share-outline' size={30} color='#888888' />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {}}>
            <Ionicons name='ellipsis-horizontal' size={30} color='#888888' />
          </TouchableOpacity>

        </View>


      </View>

    </SafeAreaView>

  )
}

export default MusicPlayer

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222831',
  },

  maincontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  bottomcontainer : {
    width: width,
    alignItems: 'center',
    paddingVertical: 15,
    borderTopColor: '#393E46',
    borderWidth: 1,
  },

  bottomIconWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },

  imageWrapper: {
    width: 300,
    height: 340,
    marginBottom: 25, 
    marginTop: 20,
  },

  mainImageWrapper: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    
  },

  musicImage: {
    width: '100%',
    height: '100%',
    borderRadius:15, 
  },

  elevation: {
    elevation: 5,
    shadowColor: '#ccc',
    shadowOffset: {
      width: 5,
      height:5,
    },
    shadowOpacity: 0.5,
    shadowRadius:3.84,
  },

  songContent: {
    textAlign: 'center',
    color:'#EEEEEE',
  },

  songTitle: {
    fontSize: 18,
    fontWeight: '600',
  },

  songArtist: {
    fontSize: 18,
    fontWeight: '600',
    // textAlign: 'center',
    // color:'#EEEEEE',
  },

  progressBar: {
    width: 350,
    height: 40,
    marginTop: 25,
    flexDirection:'row',
  },

  progressLevelDuration: {
    width: 340,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLabelText : {
    color: '#fff',
    fontWeight:'500',
  },

  musicControlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '60%',
    marginTop: 15,
  },


});
