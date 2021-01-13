const innitialState = {
    loading: true,
    services: null,
};

const Services = (state = innitialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case "LOAD_SERVICES":
            return {
                loading: false,
                services: payload
            }
        case "ERR_LOAD":
            return {
                ...state,
                loading: false,
            }
        default:
            return state;
    }
}

export default Services;