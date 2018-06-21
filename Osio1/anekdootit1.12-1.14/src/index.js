import React from 'react';
import ReactDOM from 'react-dom';

const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>
        {text}
    </button>
)


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 0,
            votes: {0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0}
        }
    }

    nextAnecdote = (randomNote) => {
        return () => {
            this.setState({selected: randomNote})
        }
    }

    vote = (selected, votes) => {
        const copy = {...votes}
        copy[selected] += 1
        return () => {
            this.setState({votes: copy})
        }
    }

    mostVotes = (anecdotes, votes) => {
        let winner = 0
        for (let i = 0; i <= anecdotes.length; i++) {
            if (votes[i] > votes[winner]) {
                winner = i
            }
        }
        return (
            <p>{anecdotes[winner]} <br/> <br/>
                Has the most ({votes[winner]}) votes!
            </p>
        )

    }

    render() {
        const anecdotes = this.props.anecdotes
        const selected = this.state.selected
        const votes = this.state.votes
        const randomNote = Math.floor(Math.random() * (anecdotes.length))
        return (
            <div>
                <h1>Anecdotes</h1>
                <p>
                    {anecdotes[selected]} <br/> <br/>
                    This anecdote has {votes[selected]} votes
                </p>
                <Button
                    handleClick={this.nextAnecdote(randomNote)}
                    text="Next anecdote"
                />
                <Button
                    handleClick={this.vote(selected, votes)}
                    text="Vote for this anecdote"
                />

                <h2>Anecdote with most votes:</h2>
                {this.mostVotes(anecdotes, votes)}

            </div>
        )
    }
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes}/>,
    document.getElementById('root')
)




