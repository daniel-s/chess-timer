import { createSlice } from '@reduxjs/toolkit';


function format_time_int (time_int) {
    const hours = Math.floor(time_int / 3600);
    const rem1 = time_int % 3600;
    const mins = Math.floor(rem1 / 60);
    const mins_str = mins >= 10 ? String(mins) : "0" + String(mins);
    const secs = rem1 % 60;
    const secs_str = secs >= 10 ? String(secs) : "0" + String(secs);

    let result;
    if (hours > 0) {
        result = `${hours}:${mins_str}:${secs_str}`;
    } else if (mins > 0) {
        result = `${mins_str}:${secs_str}`;
    } else  {
        result = `${secs_str}`;
    }

    return result;
}

/*
 * Rounds a number up to zero if below.
 */
function level_to_zero (value) {
    return value < 0 ? 0 : value;
}

const timerSlice = createSlice({
    name: "time",
    initialState: {
        start_mins: 15,
        start_seconds: 0,
        start_increment: 0,
        top: 15*60,
        bottom: 15*60,
        active: "top",
        is_running: false
    },
    reducers: {
        decrement: state => {
            // Decrement based on who is currently active.
            if (state.is_running && state.active == "top") {
                return {...state, top: level_to_zero(state.top-1)};
            } else if (state.is_running && state.active == "bottom") {
                return {...state, bottom: level_to_zero(state.bottom-1)};
            } else {
                return {...state};
            }
        },

        swap_player: (state, action) => {
            let next_active;
            const increments = {"top": 0, "bottom": 0};
            if (state.active == "top" && action.payload == "top") {
                next_active = "bottom";
                // Increment the top player.
                increments.top += state.start_increment;
                
            } else if (state.active == "bottom" && action.payload == "bottom") {
                next_active = "top";
                increments.bottom += state.start_increment;
            } else {
                next_active = state.active;
            }

            const new_state = {...state, active: next_active, is_running: true};
            // Add the increments.
            new_state.top += increments.top;
            new_state.bottom += increments.bottom;

            return new_state;
        },

        start_stop: (state) => {
            return {...state, is_running: !state.is_running};
        },

        reset: (state) => {
            const reset_values = state.start_mins*60 + state.start_seconds;
            return {...state, top: reset_values, bottom: reset_values, is_running: false};
        },

        set_start_times: (state, action) => {
            const times = action.payload;
            const new_state = {...state};
            // Set the start values.
            new_state.start_mins = times.start_mins;
            new_state.start_seconds = times.start_seconds;
            new_state.start_increment = times.start_increment;
            // Set the new times.
            new_state.top = new_state.start_mins*60 + new_state.start_seconds;
            new_state.bottom = new_state.top;
            new_state.is_running = false;

            return new_state;
        }
    }
});

export default timerSlice.reducer;
export const {decrement, swap_player, start_stop, reset, set_start_times} = timerSlice.actions;
export {format_time_int};
