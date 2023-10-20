
/**
 * FlexController class
 * This class represents the controller for the rotational state.
 * Has only one constructor and one method that handles the key press event.
 * @constructor @param {MyApp}  myAppInstance - The instance of the application.
 * @constructor @param {Node}  axisNode - The axisNode of the structure.
 * @method handleKeyPress - The method that handles the key press event.
 */
class FlexController {


    myApp;

  
      constructor(myAppInstance) {
        this.myApp = myAppInstance;
        document.addEventListener('keyup', this.handleKeyPress);
      }
    
      /**
       * This method handle the key press event for the rotational state.
       * It checks for the state and key press and if it is a valid key press for
       * the current state , it dispatch
       * the action to the application.
       * It is a lambda function because we need to bind it to the context.
       * @param {KeyboardEvent} event 
       * @returns 
       */
      handleKeyPress = (event) => {
  
        if(this.myApp.currentState() !== 'FLEX') return;
  
        if (event.key === 'ArrowLeft') {
          this.myApp.dispatch("prev");
        }
    
  
        else if (event.key === 'ArrowRight') {
          this.myApp.dispatch("next");
        }
        
        else if(event.key ==='O' || event.key === 'o'){
          this.myApp.dispatch("open");
        }
      }
    }
  export default FlexController;