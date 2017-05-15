import React from 'react';
import { Swipeable, Holdable, defineHold, holdProgress, defineSwipe } from 'react-touch';


class Touchscreen extends React.Component {

  constructor(props) {
    super(props);
    this.move = this.move.bind(this);
  }

  move(dir){
    this.props.move(dir);
  }

  render(){

    const context = this;
    const hold = defineHold({ updateEvery: 100 }); 
    const swipe = defineSwipe({ swipeDistance: 80 });
    let swipeDir;
    /*
        Use react-touch here for phone movement

        Using holdable, on hold progress, trigger move event passing dir
        this way every other code here will continue working
        jack's list of actions too

        holdable inside of swipe gesture 
        ( because we need to get the direction first )
        keep triggering towards that direction after swipe
    */
    return (


      <Swipeable 
          
        config={ swipe }  

        onSwipeTop={ () => { swipeDir = 'up';
                        console.log("Swiped", swipeDir);
                      } 
                    }

        onSwipeRight={ () => { swipeDir = 'right';
                        console.log("Swiped", swipeDir);
                      } 
                    }

        onSwipeBottom={ () => { swipeDir = 'down';
                        console.log("Swiped", swipeDir);
                      } 
                    }

        onSwipeLeft={ () => { swipeDir = 'left';
                        console.log("Swiped", swipeDir);
                      } 
                    } 
      >

        {/* Now while we havn't ended swipe ( lifted finger ) 
            trigger move action on every holdable progress loop */}

        <Holdable config={ hold } 
                  onHoldComplete={ () => console.log('held out') } >

          {
             ({ holdProgress }) => {

                console.log("HOLD PROGRESS", holdProgress)
                if ( holdProgress > 0 ){
                  context.move( swipeDir );
                }

                return (<div className="touchScreen"></div>);

              }
          }


        </Holdable>
      </Swipeable>
    );
  }

}


export default Touchscreen;