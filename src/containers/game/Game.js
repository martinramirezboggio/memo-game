import React,{ Component, Fragment } from "react"
import Header from "../header/Header"
import Card from "../../components/card/card"
import classes from "./Game.module.css"
import backImage from  '../../assets/img/family.jpg'
import { cardsDeck, WON_MESSAGE } from '../../assets/utils'
import Modal from '../../components/modal/Modal'

class Game extends Component{
  state= {
    cards: [...cardsDeck.sort(()=> Math.random() - 0.5)],
    points: 0,
    firstCardId: null,
    secondCardId: null,
    firstName: null,
    won:false,
    showModal: false
  }

  flipCard = (e, name) =>{
    e.preventDefault()
    const {firstCardId,secondCardId} = this.state
    const id = e.currentTarget.id
    if(firstCardId === null){
      e.currentTarget.classList.add("flip")
      this.setState({firstCardId: id, firstName: name})
    }else if(firstCardId !== id && secondCardId === null){
      e.currentTarget.classList.add("flip")
      this.setState({secondCardId: id},()=> {
        setTimeout(()=>{
          this.check(name)
        },500)
      })
    }
  }

  check = (secondCardName) =>{
    const { firstName } = this.state
    secondCardName === firstName ? this.success() : this.fail()
    this.checkWon()
  }

  success = () =>{
    const {firstCardId, secondCardId} = this.state
    document.getElementById(firstCardId).classList.add("dontShow")
    document.getElementById(secondCardId).classList.add("dontShow")
    this.setState(prevState => { return {points: prevState.points + 1 }})
    this.resetState()
  }

  checkWon(){
    const {points, cards} = this.state
    if(points === cards.length / 2){
      this.toggleModal()
    }
  }

  fail = () => {
    const {firstCardId, secondCardId} = this.state
    document.getElementById(firstCardId).classList.remove("flip")
    document.getElementById(secondCardId).classList.remove("flip")
    this.resetState()
  }

  resetState = () =>{
    this.setState({
      firstCardId: null,
      secondCardId: null,
      firstName: null,
    })
  }

  toggleModal(){
    this.setState(prevState => {
      return {showModal: !prevState.showModal};
    })
  }

  resetGame =()=>{
    window.location.reload();
  }

  render() {
    const {cards} = this.state
    return(
      <Fragment>
          <Header points={this.state.points}/>
          <section className={classes.CardsContainer}>
            {
              cards.map((card, index) =>
                <Card key={card.id + "_" + index} backImage={backImage} frontImage={card.image} flipCard={this.flipCard} id={card.id + "_" + index} name={card.id}/>
              )
            }
          </section>
          <Modal show={this.state.showModal} >
            {WON_MESSAGE}
            <br/>
            <button onClick={this.resetGame}>Play again</button>
          </Modal>
      </Fragment>
    )
  }
}

export default Game
