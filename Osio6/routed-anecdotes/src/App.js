import React from 'react'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import {ListGroup, ListGroupItem, Grid, Row, Col, Navbar, Nav, NavItem, FormGroup, FormControl, ControlLabel, Button, Alert } from 'react-bootstrap'

const Menu = () => {

    const linkStyle = {
        textDecoration: 'none',
        color: 'white'
    }

    return (
  <Navbar inverse collapseOnSelect>
      <Navbar.Header >
          <Navbar.Brand><NavLink exact to='/'>Software Anecdotes</NavLink></Navbar.Brand>
          <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
      <Nav>
          <NavItem href="#"><NavLink exact to='/' activeStyle={{fontWeight: 'bold'}} style={linkStyle}>ANECDOTES</NavLink></NavItem>
          <NavItem href="#"><NavLink exact to='/create' activeStyle={{fontWeight: 'bold'}} style={linkStyle}>CREATE NEW</NavLink></NavItem>
          <NavItem href="#"><NavLink exact to='/about'activeStyle={{fontWeight: 'bold'}} style={linkStyle}>ABOUT</NavLink></NavItem>
      </Nav>
      </Navbar.Collapse>
  </Navbar>
)}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ListGroup>
      {anecdotes.map(anecdote => <ListGroupItem key={anecdote.id} > <NavLink to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</NavLink></ListGroupItem>)}
    </ListGroup>
  </div>
)

const Anecdote = ({anecdote}) => (
  <div>
    <h2>{anecdote.content} by {anecdote.author}</h2>
    <p>has {anecdote.votes} votes</p>
    <p>for more info see: <a href={anecdote.info}>{anecdote.info}</a></p>
  </div>

)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
      <Grid style={{cssFloat: 'left', width: '100%'}}>
        <Row className="show-grid">
            <Col lg={6} md={6} >

                <p>According to Wikipedia:</p>
    
                <em>An anecdote is a brief, revealing account of an individual person or an incident.
                    Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
                    such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
                    An anecdote is "a story with a point."</em>

                    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
            </Col>
            <Col lg={3} md={3}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/a/ad/Commodore_Grace_M._Hopper%2C_USN_%28covered%29.jpg" alt="Software Engineer" height="250" width="200"/>

            </Col>
        </Row>
      </Grid>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code.
  </div>
)

const Notification =({notification}) => (
    <Alert color="success">
        {notification}
    </Alert>
)


class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    }, this.props.history)
  }

  render() {
    return(
      <div>
        <h2>Create a new anecdote</h2>
        <form onSubmit={this.handleSubmit}>
          <FormGroup>
              <ControlLabel>Content:</ControlLabel>
              <FormControl
                  type="text"
                  name="content"
                  onChange={this.handleChange}
              />
              <ControlLabel>Author:</ControlLabel>
              <FormControl
                  type="text"
                  name="author"
                  onChange={this.handleChange}
              />
              <ControlLabel>URL for more info:</ControlLabel>
              <FormControl
                  type="text"
                  name="info"
                  onChange={this.handleChange}
              />
          <Button type="submit">create</Button>
          </FormGroup>
        </form>
      </div>  
    )

  }
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    } 
  }

  addNew = (anecdote, history) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
      history.push('/')
    this.setState({ anecdotes: this.state.anecdotes.concat(anecdote),  notification: `You successfully created: '${anecdote.content}'`})
      setTimeout(()=> {
          this.setState({notification: ''})
      }, 10000)


  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

  render() {
    const mapToId = (id) =>
        this.state.anecdotes.find(anecdote => anecdote.id === String(id))

    return (
      <div style={{padding: '5%', margin: 'auto'}}>
        <Router>
        <div>
          <Menu/>
            {this.state.notification === '' ? '' : <Notification notification={this.state.notification}/>}
          <Route exact path="/" render={() => <AnecdoteList anecdotes={this.state.anecdotes} />}/>
          <Route exact path="/create" render={({history}) => <CreateNew addNew={this.addNew} history={history}/>}/>
          <Route exact path="/about" render={() =>  <About />  }/>
          <Route exact path="/anecdotes/:id" render={({match}) => <Anecdote anecdote={mapToId(match.params.id)}/>}/>
        </div>
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;
