import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Modal
class Modal extends React.Component {
  closeModal = e => {
      if (e.target.dataset.closer) {
          this.props.closeHandler()
      }
  }

  render() {
      const { children } = this.props

      return (
          <div className='modal' data-closer onClick={this.closeModal}>
              <div className='inner'>
                  <div className='close' data-closer onClick={this.closeModal}>X</div>
                  {children}
              </div>
          </div>
      )
  }
}

// Just random user
class RandomUser extends React.Component {
  state = {
      randomUserData: null
  }

  fetchRandomUser = _ => {
      fetch('https://randomuser.me/api')
          .then(res => res.json())
          .then(randomUserData => this.setState({ randomUserData }))
  }

  componentDidMount () {
      this.fetchRandomUser()
  }

  render() {
      if (!this.state.randomUserData) return null

      const { picture } = this.state.randomUserData.results[0]

      return <img src={picture.large} alt='' />
  }
}

// App
class App extends React.Component {


  state = {
      modalVisible: false
  }

  showModal = _ => this.setState(_ => ({ modalVisible: true }))
  hideModal = _ => this.setState(_ => ({ modalVisible: false }))

  render() {
      const { modalVisible } = this.state

      return (
          <div>
              <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>

              <button onClick={this.showModal}>Show modal</button>

              {modalVisible && (
                  <Modal closeHandler={this.hideModal}>
                      <RandomUser />
                  </Modal>
              )}
          </div>
      )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))