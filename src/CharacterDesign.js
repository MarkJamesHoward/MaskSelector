import { html, render } from "../node_modules/lit-html/lib/lit-extended.js";

export class CharacterDesign extends HTMLElement {
  constructor() {
    super();

    this.NUMBER_OF_IMAGES_HEAD = parseInt(this.getAttribute('number-of-images-head'))
    this.NUMBER_OF_IMAGES_BODY = parseInt(this.getAttribute('number-of-images-body'))

    console.log("constructor called");
    this.myDOM = this.attachShadow({ mode: "open" });
   
    console.log('Initial head set by attribute is ' + this.head)
    this.body = 1;
    render(this.template, this.myDOM);
  }

  connectedCallback() {
    this.head = this.getAttribute('selected-head');
    this.imagewidthhead = this.getAttribute('image-width-head')
    this.imagewidthbody = this.getAttribute('image-width-body')

    this.showSelectedMask();
  }

  renderME() {
    render(this.template, this.myDOM);
  }

  get template() {
    return html`

        <style>
           :root {
             font-size: 3vmin;
             box-sizing: border-box;
           }

            .displayVertical {
              display: flex;
              flex-direction: column;
            }

            .CharacterCustomizeMain {
              display: grid;
              grid-template-columns: [eyes-start mouth-start] 1fr [eyes-end mouth-end];
              grid-template-rows: [eyes-start] 20fr [eyes-end mouth-start] 20fr [mouth-end] 60fr;
              background: url(./images/silhouette/silhouette1.png) no-repeat center;
              background-size: contain;
              border: 2px solid black;
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
                align-items: center;
                object-fit: cover;
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
          

            .headselector, .bodyselector {
                display:flex;
                justify-content: space-around;
            }

            button {
                cursor: pointer;
                border-radius: 0.1rem;      
            }

            .overlay {
                display: grid;
            }

            .LeftArrow {
              z-index:1;
              margin-right: 1rem;
                width: 2rem;
                height: 2rem;
                background: url(/images/arrows/previous.png) no-repeat center;
                background-size: contain;
                transition: all 0.2s ease-in-out;

           }

          div.LeftArrow:hover {
              transition: all 0.2s ease-in-out;
              transform: scale(1.1);
              cursor: pointer;
            }

            div.RightArrow:hover {
              transition: all 0.2s ease-in-out;
              transform: scale(1.1);
              cursor: pointer;
            }


            .RightArrow {
              z-index:1;
              width: 2rem;
              margin-left: 1rem;
                height: 2rem;
              transition: all 0.2s ease-in-out;
                width: 30px;
                height: 30px;
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

                    <div class="LeftArrow" style="width:3rem" on-click='${() => this.moveBodyLeft()}'></div>

                    <div class="overlay">
                      <div style="width:5rem;overflow: hidden"> 
                          <img id="body" style="width:100%;"
                          src="./images/eyes/alleyes.png" style="border: 1px solid black"> 
                      </div>
                    </div>

                    <div class="RightArrow" on-click='${() => this.moveBodyRight()}'> </div>

                </div>
            </div>

            <div class='headselector'>
                <div class='head'>

                    <div class="LeftArrow" on-click='${() => {
                      this.moveHeadLeft();
                    }}'>

                    </div>
                
                    <div class="overlay">
                        <div style="width:100px;overflow: hidden"> 
                            <img id="mask" width="350rem" height=50rem 
                            src="./images/mouths/allmouths.png"> 
                        </div>
                    </div>

                    <div class="RightArrow" on-click='${() => this.moveHeadRight()}'>
                    </div>

                </div>
            </div>    
                
            <div class='legs'></div>

            </div> 
        `;
  }

  moveHeadLeft() {
    if (this.head >= 1) {

      this.head--;
      let to = this.head * (-1 * parseInt(this.imagewidthhead))
      let from = (this.head + 1) * (-1 * parseInt(this.imagewidthhead))
      console.log(to);
      this.AnimateMask(from, to);
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
    if (this.head < this.NUMBER_OF_IMAGES_HEAD - 1) {
      this.head++;
      let to = this.head * (-1 * parseInt(this.imagewidthhead));
      let from = (this.head - 1) * (-1 * parseInt(this.imagewidthhead));
      console.log(to);
      this.AnimateMask(from, to);
      this.renderME();
    }
  }

  moveBodyLeft() {
    if (this.body > 0) {
      if (this.body >= 1) {

        this.body--;
        let to = this.body * (-1 * parseInt(this.imagewidthbody))
        let from = (this.body + 1) * (-1 * parseInt(this.imagewidthbody))
        console.log(to);
        this.AnimateBody(from, to);
        this.renderME();
      }
    }
  }

  moveBodyRight() {
    if (this.body < this.NUMBER_OF_IMAGES_BODY) {
        this.body++;
        let to = this.body * (-1 * parseInt(this.imagewidthbody))
        let from = (this.body - 1) * (-1 * parseInt(this.imagewidthbody))
        console.log(to);
        this.AnimateBody(from, to);
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
