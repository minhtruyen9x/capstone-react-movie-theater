import React, { useRef, useState } from 'react'
import ReactPlayer from 'react-player/lazy'
import { VscMute, VscUnmute } from "react-icons/vsc"

import "./Banners.scss"

const Banners = () => {
    const [isMute, setIsMute] = useState(false)
    const playerRef = useRef(null)

    return (
        <div className='intro'>
            <div className="video-wrapper">
                <ReactPlayer
                    playing={true}
                    loop={true}
                    controls={false}
                    ref={playerRef}
                    onReady={() => playerRef.current?.seekTo(2, 'seconds')}
                    width="100%"
                    height="100%"
                    volume={1}
                    muted={isMute}
                    url="https://www.youtube.com/watch?v=rrGMENN1iaY"
                    className="trailers" />
            </div>
            <div className="banners">
                <h1 className="heading">Avengers: Endgame</h1>
                <p className="overview">Whatever it takes. Watch the brand-new trailer for Marvel Studios’ Avengers: Endgame. In theaters April 26.</p>
            </div>

            {isMute ? (
                <VscMute className='btnVolume'
                    onClick={() => setIsMute(prev => !prev)} />
            ) : (
                <VscUnmute className='btnVolume'
                    onClick={() => setIsMute(prev => !prev)} />
            )}

        </div>

    )
}

export default Banners

