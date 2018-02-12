import { html, render } from "../node_modules/lit-html/lib/lit-extended.js";

export class CharacterDesign extends HTMLElement {
  constructor() {
    super();

    this.NUMBER_OF_IMAGES_HEAD = parseInt(this.getAttribute('number-of-images-head'))
    this.NUMBER_OF_IMAGES_BODY = parseInt(this.getAttribute('number-of-images-body'))
    this.head = parseInt(this.getAttribute('selected-head'))
    this.body = parseInt(this.getAttribute('selected-body'))
    this.silhouette = 1;
    this.myDOM = this.attachShadow({ mode: "open" });
    this.renderME();
  }

  connectedCallback() {
  }

  renderME() {
    render(this.template, this.myDOM);
  }

  get template() {
    return html`

        <style>
           :root {
             box-sizing: border-box;
           }

   
            .displayVertical {
              display: flex;
              flex-direction: column;
            }

            .CharacterCustomizeMain {
              display: grid;
              grid-template-columns: [eyes-start mouth-start silhouette-start] 1fr [ silhouette-end eyes-end mouth-end];
              grid-template-rows: [eyes-start] 30fr [eyes-end mouth-start] 20fr [mouth-end silhouette-start] 50fr [silhouette-end];
              background: url('./images/silhouette/silhouette${this.silhouette}.png') no-repeat center;
              background-size: 70%;
              border: 2px solid black;
              border-radius: 10%;
              width: 95vmin;
              height: 95vmin;
            }

            .CompleteCharacter {
              display: none;
              grid-template-columns: 1fr 1fr;
              grid-template-rows: 1fr 1fr; 
            }

            .head, .body {
                display: flex;
                justify-content: space-between;
                align-items:center;
                height: 100%;
            }

            .character {
                display: flex;
                flex-direction: column;
                align-items: center;
            }    
            
            .bodyselector {
              grid-area: eyes;
            }

            .headselector {
              grid-area: mouth;
            } 

            .silhouette {
              display:flex;
              grid-area: silhouette;
              height: 20vmin;
              width: 90vmin;
              align-self: end;
              justify-content: space-around;
            }

            .silhouettePicker {
              object-fit: contain;
              height: 100%;
              opacity: 0.2;
            }
          

           
            button {
                cursor: pointer;
                border-radius: 0.1rem;      
            }

            .overlay {
                display: grid;
            }

            .LeftArrow {
              margin-left: 3vmin;
              background: url(/images/arrows/previous.png) no-repeat center;
              background-size: contain;
           }

        
          div.LeftArrow:hover {
              transform: scale(1.1);
              cursor: pointer;
            }

            div.RightArrow:hover {
              transform: scale(1.1);
              cursor: pointer;
            }

            .RightArrow, .LeftArrow {
              width: 13vmin;
              height: 13vmin;
              transition: all 0.2s ease-in-out;
            }
            .ArrowDisabled {
              opacity: 0.4;
          }

            .RightArrow {
              margin-right: 3vmin;
                background: url(/images/arrows/next.png) no-repeat center;
                background-size: contain;
           }

           div.CompleteCharacter {
              display: grid;
              grid-template-columns: [col-start] 1fr [col-end] 1fr;
              grid-template-rows: [row-start] 1fr [row-end] 1fr;
           }

           div.CompleteCharacter > img {
              grid-area: row / col;
           }

           .CompleteCharacterBody {
             margin-top: 35px;
             z-index: -1;
           }

        </style>

           <div class="displayVertical CompleteCharacter" style="display:none">
            <img width=50px src=".\\images\\mask${this.head + 1}.png">
            <img class="CompleteCharacterBody" width=50px src=".\\images\\Body\\Body${this.body + 1}.png">
           </div>

            <div class="CharacterCustomizeMain">

                <div class="bodyselector">
                    <div class='body'> 

                        <div id="ArrowBodyLeft" class="LeftArrow"  on-click='${() => this.moveBodyLeft()}'></div>

                          <div style="width:20vmin"> 
                              <img id="body" style="width:100%;"
                              src="./images/eyes/eyes${this.body}.png" style="border: 1px solid black"> 
                          </div>

                        <div id="ArrowBodyRight" class="RightArrow" on-click='${() => this.moveBodyRight()}'> </div>

                    </div>
                </div>

                <div class='headselector'>
                    <div class='head'>

                        <div id='ArrowHeadLeft' class="LeftArrow" on-click='${() => {
                          this.moveHeadLeft();
                        }}'>

                        </div>
                    
                        <div style="width:35vmin"> 
                            <img id="mask" width="100%"
                            src="./images/mouths/mouth${this.head}.png"> 
                        </div>

                        <div id='ArrowHeadRight'  class="RightArrow" on-click='${() => this.moveHeadRight()}'>
                        </div>

                    </div>
                </div>    

                
              <div class='silhouette'>
                        <img class="silhouettePicker" on-click='${() => this.PickSilhouetee(1)}'   src="./images/silhouette/silhouette1.png">
                        <img class="silhouettePicker" on-click='${() => this.PickSilhouetee(2)}'   src="./images/silhouette/silhouette2.png">
                        <img class="silhouettePicker" on-click='${() => this.PickSilhouetee(3)}'   src="./images/silhouette/silhouette3.png">
                        <img class="silhouettePicker" on-click='${() => this.PickSilhouetee(4)}'  src="./images/silhouette/silhouette4.png">
              </div> 

            </div>

  

           
        `;
  }

  PickSilhouetee(item) {
    this.silhouette = item;
    this.renderME();
  }

  moveHeadLeft() {
    if (this.head > 1) {

      this.head--;

      this.shadowRoot.querySelector('#ArrowHeadRight').classList.remove('ArrowDisabled')

      if(this.head === 1) {
        this.shadowRoot.querySelector('#ArrowHeadLeft').classList.add('ArrowDisabled')
      }
      // let to = this.head * (-1 * parseInt(this.imagewidthhead))
      // let from = (this.head + 1) * (-1 * parseInt(this.imagewidthhead))
      // console.log(to);
      // this.AnimateMask(from, to);
      this.renderME();
    }
  }


  
  AnimateBody(from , to) {
   
    this.shadowRoot.querySelector('#body').animate( [
      {transform: 'translateX(' + from + 'px)'},
      {transform: 'translateX(' + to + 'px)'}
    ],
    {
      easing: 'ease-in-out',
      duration: 300,
      fill: 'forwards'
    })

  }

  AnimateMask(from , to) {
   
    this.shadowRoot.querySelector('#mask').animate( [
      {transform: 'translateX(' + from + 'px)'},
      {transform: 'translateX(' + to + 'px)'}
    ],
    {
      easing: 'ease-in-out',
      duration: 300,
      fill: 'forwards'
    })

  }

  moveHeadRight() {
    if (this.head < this.NUMBER_OF_IMAGES_HEAD) {
      this.head++;
      
      this.shadowRoot.querySelector('#ArrowHeadLeft').classList.remove('ArrowDisabled')

      if(this.head === this.NUMBER_OF_IMAGES_HEAD) {
        this.shadowRoot.querySelector('#ArrowHeadRight').classList.add('ArrowDisabled')
      }

      // let to = this.head * (-1 * parseInt(this.imagewidthhead));
      // let from = (this.head - 1) * (-1 * parseInt(this.imagewidthhead));
      // console.log(to);
      // this.AnimateMask(from, to);
      this.renderME();
    }
  }

  moveBodyLeft() {
    if (this.body > 0) {
      if (this.body > 1) {

        this.body--;

        this.shadowRoot.querySelector('#ArrowBodyRight').classList.remove('ArrowDisabled')

        if(this.body === 1) {
          this.shadowRoot.querySelector('#ArrowBodyLeft').classList.add('ArrowDisabled')
        }

        // let to = this.body * (-1 * parseInt(this.imagewidthbody))
        // let from = (this.body + 1) * (-1 * parseInt(this.imagewidthbody))
        // console.log(to);
        // this.AnimateBody(from, to);
        this.renderME();
      }
    }
  }

  moveBodyRight() {
    if (this.body < this.NUMBER_OF_IMAGES_BODY) {
        this.body++;

        this.shadowRoot.querySelector('#ArrowBodyLeft').classList.remove('ArrowDisabled')

        if(this.body === this.NUMBER_OF_IMAGES_BODY) {
          this.shadowRoot.querySelector('#ArrowBodyRight').classList.add('ArrowDisabled')
        }
        // let to = this.body * (-1 * parseInt(this.imagewidthbody))
        // let from = (this.body - 1) * (-1 * parseInt(this.imagewidthbody))
        // console.log(to);
        // this.AnimateBody(from, to);
        this.renderME();
    }
  }

  static get is() {
    return "character-design";
  }

  static get observedAttributes() {
    return ["SelectedHead"];
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (name === "SelectedHead") {
      this.selectedHead = newVal;
    }
  }
}

customElements.define(CharacterDesign.is, CharacterDesign);
