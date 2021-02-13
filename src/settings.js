// (C) Daniel Stojanov
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import css from "../css/settings.css";
import store from "./store.js";
import { set_start_times } from "./timer.js";

function SetupPanel (props) {
    // Get the current number of seconds.
    const timer = useSelector(state => state.timer);
    
    // Initially set the form's values to the store values.
    const [current_clock, setClock] = React.useState({
        start_seconds: timer.start_seconds,
        start_mins: timer.start_mins,
        start_increment: timer.start_increment
    });
    const history = useHistory();
    const dispatch = useDispatch();

    function mins_change (ev) {
        const new_value = Number(ev.target.value);
        const new_clock = {...current_clock};
        // Figure out the item that was changed.
        const change_item = ev.target.dataset.changeItem;
        new_clock[change_item] = new_value;
        setClock(new_clock);
    }

    function go_to_clocks () {
        history.push("/");
    }

    function set_times () {
        const set_times_action = set_start_times({
            start_mins: current_clock.start_mins,
            start_seconds: current_clock.start_seconds,
            start_increment: current_clock.start_increment,
        });

        dispatch(set_times_action);
        go_to_clocks();
    }
    
    return <div id="id_setup_panel">
             <form>
               <div className="label_input_wrap">
                 <label htmlFor="id_starting_mins" >Minutes</label>
                 <input id="id_starting_mins"
                        type="number"
                        data-change-item="start_mins"
                        value={current_clock.start_mins}
                        onChange={mins_change} />
               </div>
               <div className="label_input_wrap">
                 <label htmlFor="id_starting_seconds" >Seconds</label>
                 <input id="id_starting_seconds"
                        type="number"
                        data-change-item="start_seconds"
                        value={current_clock.start_seconds}
                        onChange={mins_change} />
               </div>
               <div className="label_input_wrap">
                 <label htmlFor="id_turn_bonus" >Turn bonus</label>
                 <input id="id_turn_bonus"
                        type="number"
                        data-change-item="start_increment"
                        value={current_clock.start_increment}
                        onChange={mins_change}/>
               </div>
               
               <div id="id_buttons_div">
                 <button type="button"
                         onClick={set_times}>OK</button>
                 <button type="button"
                         onClick={go_to_clocks} >Cancel</button>
               </div>
               
             </form>
           </div>;
}

export default SetupPanel;
