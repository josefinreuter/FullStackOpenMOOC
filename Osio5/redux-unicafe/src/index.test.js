import deepFreeze from 'deep-freeze'
import feedbackReducer from './feedbackReducer'

describe('unicafe reducer', () => {
    const initialState = {
        good: 0,
        ok: 0,
        bad: 0,
        average: 0,
        positive: 0,
        feedback: 0
    }

    it('should return a proper initial state when called with undefined state', () => {
        const state = {}
        const action = {
            type: 'DO_NOTHING'
        }

        const newState = feedbackReducer(undefined, action)
        expect(newState).toEqual(initialState)
    })

    it('good is incremented', () => {
        const action = {
            type: 'GOOD'
        }
        const state = initialState

        deepFreeze(state)
        const newState = feedbackReducer(state, action)
        console.log(newState)
        expect(newState).toEqual({
            good: 1,
            ok: 0,
            bad: 0,
            average: '1.0',
            positive: '100.0',
            feedback: 1
        })
    })

    it('ok is incremented', () => {
        const action = {
            type: 'OK'
        }
        const state = initialState

        deepFreeze(state)
        const newState = feedbackReducer(state, action)
        console.log(newState)
        expect(newState).toEqual({
            good: 0,
            ok: 1,
            bad: 0,
            average: '0.0',
            positive: '0.0',
            feedback: 1

        })
    })

    it('bad is incremented', () => {
        const action = {
            type: 'BAD'
        }
        const state = initialState

        deepFreeze(state)
        const newState = feedbackReducer(state, action)
        console.log(newState)
        expect(newState).toEqual({
            good: 0,
            ok: 0,
            bad: 1,
            average: '-1.0',
            positive: '0.0',
            feedback: 1
        })
    })

    it('all values back to zero', () => {
        const action = {
            type: 'ZERO'
        }
        const state = initialState

        deepFreeze(state)
        const newState = feedbackReducer(state, action)
        console.log(newState)
        expect(newState).toEqual({
            good: 0,
            ok: 0,
            bad: 0,
            average: 0,
            positive: 0,
            feedback: 0
        })
    })
})