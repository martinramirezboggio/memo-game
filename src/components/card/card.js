import React from "react";
import classes from './card.module.css'

const card = props => {
  return(
    <div id={props.id} className={classes.CardWrapper} onClick={(e)=> props.flipCard(e, props.name)}>
      <div className={classes.Front}>
        <img src={props.frontImage} alt="" />
      </div>
      <div className={classes.Back}>
        <img src={props.backImage} alt="" />
      </div>
    </div>
  )
}

export default card
