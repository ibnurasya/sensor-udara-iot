import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// import styled from '@emotion/styled'

// const RootStyle = styled.div({
//   '.container': {
//     background: 'pink'
//   }
// })

function App() {

  return (
    <>
      <style>
        {`
          body {
            background-color: #999;
          }
          .container {
            width: 80vw;
            border-radius: 0.5rem;
            padding: 1rem;
            background: white;
          }
          .latest-value {
            display: flex;
            align-items: center;
            justify-content: space-around;
          }
        `}
      </style>
      <div className='container'>
        <div className="latest-value">
          <ValueCard />
          <ValueCard />
          <ValueCard />
        </div>
      </div>
    </>
  )
}

const ValueCard = () => {
  return (
    <>
      <style>
        {`
          .card-value {
            background-color: blue;
            color: white;
            padding: 0.5rem;
            border-radius: 0.5rem;
          } 
          .card-title {
            background-color: magenta;
            margin: -0.5rem -0.5rem 0;
            border-radius: 0.5rem 0.5rem 0 0;
            padding: 0.2rem 1.5rem;
          }
          .container-value {
            display: flex;
            flex: 1 1;
            justify-content: space-evenly;
            padding: 0.2rem 0.5rem 0;
            border-bottom: 1px solid magenta;
            margin: -0.2rem -0.5rem 0;
          }
          .container-value > div {
            padding: 0.5rem;
            width: auto;
            flex: 1;
            flex-grow: 1;
          }
          .ispu-value {
            border-right: 1px solid magenta;
          }
          p {
            margin: 0;
          }
        `}
      </style>
      <div className="card-value">
        <div className="card-title">
          PM 2.5
        </div>

        <div className='container-value'>
          <div className="ispu-value">
            <p>98</p>
            <p>ISPU</p>
          </div>
          <div className="sensor-val">
            <p>100</p>
            <p>Sensor</p>
          </div>
        </div>

        <div className="category">
          sedang
        </div>

      </div>
    </>
  )
}

export default App
