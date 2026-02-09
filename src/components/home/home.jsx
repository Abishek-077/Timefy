import React, { useState, useContext } from 'react'
import Stopwatch from './stopwatch/stopwatch'
import "./home.css"
import Pomodoro from './pomodo/pomodo'
import SettingContext from '../settings/settingcontext'
import Todowrap from './todo/todowrap'
import { Box, Container, Grid } from '@mui/material'
import MaterialUISwitch from "./todo/materialuiswitch"
import rain from "../../images/rain.png";
import RainASMR from "../../sounds/rain.mp3";
import OceanASMR from "../../sounds/Ocean.mp3";
import whiteNoiseASMR from "../../sounds/whiteNoise.mp3";
import waves from "../../images/waves.png";
import WhiteNoise from "../../images/whiteNoise.png";

const Rain = new Audio(RainASMR);
const Ocean = new Audio(OceanASMR);
const whiteNoise = new Audio(whiteNoiseASMR);


export default function Home() {

  let settingcontext = useContext(SettingContext);
  const [toggleState, setToggleState] = useState(false);
  const [rainVolume, setRainVolume] = useState(0);
  const [oceanVolume, setOceanVolume] = useState(0);
  const [whiteNoiseVolume, setWhiteNoiseVolume] = useState(0);


  Rain.loop = true;
  Ocean.loop = true;
  whiteNoise.loop = true;
  
  Ocean.volume = oceanVolume;
  Rain.volume = rainVolume;
  whiteNoise.volume = whiteNoiseVolume;

  Rain.play();
  Ocean.play();
  whiteNoise.play();


  const togglestate = () => {
    let state = !toggleState ? true : false;
    setToggleState(state);
  };


  return (
    <Box
      component="main"
      className="home-root"
      sx={{ flexGrow: 1 }}
    >
      <Container maxWidth="lg">
        <section className="home-hero content-surface">
          <div className="hero-copy">
            <span className="hero-eyebrow">Timefy Focus Studio</span>
            <h1>The sexiest, most productive focus ritual ever.</h1>
            <p>
              A calm, modern workspace for Pomodoro sessions, task planning, and
              focus-friendly soundscapes. Stay on track, one polished sprint at a time.
            </p>
            <div className="hero-actions">
              <div className="hero-pill">Pomodoro-ready</div>
              <div className="hero-pill">Soundscapes</div>
              <div className="hero-pill">Task clarity</div>
              <div className="hero-pill">Glassy focus UI</div>
            </div>
          </div>
          <div className="hero-stats">
            <div className="stat-card">
              <span>Focus Mode</span>
              <strong>25 / 5</strong>
              <p>Classic cycle with customizable rounds.</p>
            </div>
            <div className="stat-card">
              <span>Daily Intention</span>
              <strong>3 Tasks</strong>
              <p>Keep priorities light and achievable.</p>
            </div>
          </div>
        </section>

        <Grid spacing={6} container justifyContent={"space-evenly"} className="home-grid">
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <div className="focus-panel content-surface">
              <div className="panel-header">
                <div>
                  <h2>Focus Timer</h2>
                  <p className="muted-text">Switch between Pomodoro and Stopwatch.</p>
                </div>
                <MaterialUISwitch
                  sx={{ m: 1 }}
                  onChange={togglestate}
                  disabled={settingcontext.stateswitch ? true : false}
                />
              </div>

              <div className="content-tabs">
                <div className="app">
                  {
                    (!toggleState) ? <Pomodoro /> : <Stopwatch />
                  }
                </div>
              </div>

              <Box className="soundscape">
                <div className="sound-card">
                  <div className="sound-icon">
                    <img src={rain} className="imgSizing" alt="Rain" />
                  </div>
                  <div>
                    <p>Rain</p>
                    <input
                      className="soundDial"
                      type="range"
                      min={0}
                      max={1}
                      value={rainVolume}
                      onChange={(event) => {
                        setRainVolume(event.target.valueAsNumber);
                      }}
                      step={0.2}
                    />
                  </div>
                </div>
                <div className="sound-card">
                  <div className="sound-icon">
                    <img src={waves} className="imgSizing" alt="Waves" />
                  </div>
                  <div>
                    <p>Ocean</p>
                    <input
                      className="soundDial"
                      type="range"
                      min={0}
                      max={1}
                      value={oceanVolume}
                      onChange={(event) => {
                        setOceanVolume(event.target.valueAsNumber);
                      }}
                      step={0.2}
                    />
                  </div>
                </div>
                <div className="sound-card">
                  <div className="sound-icon">
                    <img src={WhiteNoise} className="imgSizing" alt="Whitenoise" />
                  </div>
                  <div>
                    <p>White Noise</p>
                    <input
                      className="soundDial"
                      type="range"
                      min={0}
                      max={1}
                      value={whiteNoiseVolume}
                      onChange={(event) => {
                        setWhiteNoiseVolume(event.target.valueAsNumber);
                      }}
                      step={0.2}
                    />
                  </div>
                </div>
              </Box>
            </div>
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <div className="task-panel content-surface">
              <div className="panel-header">
                <div>
                  <h2>Task Flow</h2>
                  <p className="muted-text">Break the day into focused, doable work.</p>
                </div>
              </div>
              <Todowrap />
            </div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
