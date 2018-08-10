const initialState = {
    good: 0,
    ok: 0,
    bad: 0,
    average: 0,
    positive: 0,
    feedback: 0

}

const feedbackReducer = (state = initialState, action) => {
    console.log(action)

    const feedback = state.feedback + 1
    let average
    let positive

    switch (action.type) {
        case 'GOOD':
            const good = state.good + 1
            average = (((good) + (0) + (state.bad * -1)) / feedback).toFixed(1)
            positive = (good * 100 / feedback).toFixed(1)
            return {feedback: feedback, good: good, bad: state.bad, ok: state.ok, average: average, positive: positive}
        case 'OK':
            const ok = state.ok + 1
            average = (((state.good) + (0) + (state.bad * -1)) / feedback).toFixed(1)
            positive = (state.good * 100 / feedback).toFixed(1)
            return {feedback: feedback, good: state.good, bad: state.bad, ok: ok, average: average, positive: positive}
        case 'BAD':
            const bad = state.bad + 1
            average = (((state.good) + (0) + (bad * -1)) / feedback).toFixed(1)
            positive = (state.good * 100 / feedback).toFixed(1)
            return {feedback: feedback, good: state.good, bad: bad, ok: state.ok, average: average, positive: positive}
        case 'ZERO':
            return initialState
        default:
            return state
    }
}

export default feedbackReducer