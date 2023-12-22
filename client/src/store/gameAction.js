import axios from "../../helper/axios";

export const fetchGames = (page) => async (dispatch) => {
    try {
        const { data } = await axios.get(`/pub/games?page=${page}`);
        dispatch({
            type: "FETCH_GAMES",
            payload: data,
        });
    } catch (error) {
        console.log(error);
    }
};
