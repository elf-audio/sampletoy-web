/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React, { useState } from 'react'

const containerStyle = css`
	z-index:2;
	position: absolute;
	display: flex;
	justify-content: center;
	background-color: rgb(0,0,0,0.5);
	-webkit-backdrop-filter: blur(20px);
  backdrop-filter: blur(20px);
	align-items: center;
	width: 100vw;
	height: 100vh;
`
const innerStyle = css`
	z-index:2;
	position: absolute;
	background-color: #444;
	padding: 2em;
	border-radius: 0.25em;
	text-align: center;
`

const buttonStyle = css`
	background-color: white;
	border: none;
	border-radius: 0.25em;
	color: black;
	padding: 0.5em 1em;
	text-align: center;
	text-decoration: none;
	display: inline-block;
	font-size: 16px;
	&:hover {
		background-color: #ccc;
	}
	&:active {
		background-color: black;
		color: white
	}

  `
const Welcome = () => {

	const [isVisible, setIsVisible] = useState(true)
	const handleClick = () => {
		if (typeof window.startAudioFn === "function") {
			setIsVisible(false);
			window.startAudioFn()
		  } else {
			console.error("Couldn't find window.startAudioFn")
		  }
	}
	return isVisible && (<div css={containerStyle}>
		<div css={innerStyle}>
		<h1>SAMPLETOY</h1>
		<input type="button" css={buttonStyle} onClick={handleClick} value="start" />
		</div>
		</div>)
}
export default Welcome