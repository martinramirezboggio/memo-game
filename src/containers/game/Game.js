import React,{ Component, Fragment } from "react";
import Header from "../header/Header";
import Card from "../../components/card/card"
import classes from "./Game.module.css"
import backImage from  '../../assets/img/family.jpg';
import { cards } from '../../assets/utils';

class Game extends Component{
  state= {
    cards: cards.sort(()=> Math.random() - 0.5),
    points: 0,
    firstCardId: null,
    secondCardId: null,
    firstName: null,
    won:false
  }

  flipCard = (e, name) =>{
    e.preventDefault()
    const {firstCardId} = this.state
    e.currentTarget.classList.add("flip")
    const id = e.currentTarget.id
    if(firstCardId === null)
      this.setState({firstCardId: id, firstName: name})
    else {
      if(firstCardId !== id){
        this.setState({secondCardId: id},()=> {
          setTimeout(()=>{
            this.check(name)
          },300)
        })
      }
    }
  }

  check = (secondCardName) =>{
    const { firstName } = this.state
    secondCardName === firstName ? this.success() : this.fail()
  }

  success = () =>{
    const {firstCardId, secondCardId, points} = this.state

    document.getElementById(firstCardId).classList.add("dontShow")
    document.getElementById(secondCardId).classList.add("dontShow")
    this.setState({points:points + 1})
    this.resetState()
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

  render() {
    const {cards} = this.state
    console.log({cards})
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
      </Fragment>
    )
  }
}

export default Game
