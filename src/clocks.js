import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import store from "./store.js";

import {decrement, swap_player, start_stop, format_time_int, reset} from "./timer.js";
import css from "../css/clocks.css";

var clock_timer_set = false;


function Clocks (props) {
    const timer = useSelector(state => state.timer);

    const dispatch = useDispatch();

    if (!clock_timer_set) {
        clock_timer_set = true;
        setInterval( () => dispatch(decrement()) , 1000);
    }

    let play_button = !timer.is_running ? "play_arrow" : "paused";
    let top_active_class = timer.is_running && timer.active == "top" ? " active_btn" : " inactive_btn";
    let bottom_active_class = timer.is_running && timer.active == "bottom" ? " active_btn" : " inactive_btn";
    
    return (
        <div id="id_clocks_wrapper">
          <div id="id_clock_pad_top" className="clock_pad noselect" onClick={() => {dispatch(swap_player("top"));}}>
            <div className={"clockpad_inner_colour" + top_active_class}>
              <div className="time_div">{format_time_int(timer.top)}</div>
            </div>
          </div>

          <div id="id_settings" >
            <Link to="/setup">
              <div className="setting_click_area noselect">
                <i className="material-icons md-light big_icons">miscellaneous_services</i>
              </div>
            </Link>
          </div>

          <div id="id_play_button" onClick={() => {dispatch(start_stop());}}>
            <div className="setting_click_area noselect">
              <div id="id_play_wrapper"><i className="material-icons md-light big_icons">{play_button}</i></div>
            </div>
          </div>
          
          <div id="id_restart" onClick={() => {dispatch(reset());}}>
            <div className="setting_click_area noselect">
              <i className="material-icons md-light big_icons">loop</i>
            </div>
          </div>
          
          <div id="id_clock_pad_bottom" className="clock_pad noselect" onClick={() => {dispatch(swap_player("bottom"));}}>
            <div className={"clockpad_inner_colour" + bottom_active_class}>
              <div className="time_div">{format_time_int(timer.bottom)}</div>
            </div>
          </div>
        </div>
    );
}

export default Clocks;
