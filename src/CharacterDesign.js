import { html, render } from "../node_modules/lit-html/lib/lit-extended.js";

export class CharacterDesign extends HTMLElement {
  constructor() {
    super();

    this.NUMBER_OF_IMAGES = 6;
    console.log("constructor called");
    this.myDOM = this.attachShadow({ mode: "open" });
   
    console.log('Initial head set by attribute is ' + this.head)
    this.body = 1;
    render(this.template, this.myDOM);
  }

  connectedCallback() {
    this.head = this.getAttribute('selected-head');
    this.imagewidth = this.getAttribute('image-width')
    this.showSelectedMask();
  }

  renderME() {
    render(this.template, this.myDOM);
  }

  get template() {
    console.log("get template called");
    return html`

        <style>

            .head, .body {
                display: flex;
                align-items: center;
            }

            .body {
              display: none;
            }
            .character {
                display: flex;
                flex-direction: column;
                align-items: center;
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
                height: 2rem;
              transition: all 0.2s ease-in-out;
                width: 30px;
                height: 30px;
                background: url(/images/arrows/next.png) no-repeat center;
                background-size: contain;
           }

        </style>

        <div class='character'>

            <div class='headselector'>
          
                <div class='head'>

                    <div class="LeftArrow" on-click='${() => {
                      this.moveHeadLeft();
                    }}'>

                    </div>
                
                    <div class="overlay">
                        <div style="width:100px;overflow: hidden;positive: relative"> 
                            <img id="mask" width=600px height=100px 
                            src="./images/allmasks.png"> 
                        </div>
                    </div>

                    <div class="RightArrow" on-click='${() => this.moveHeadRight()}'>
                    </div>

                </div>

            </div>    
            
            <div class="bodyselector">
            <div class='body'> 

                <div class="LeftArrow" on-click='${() => this.moveBodyLeft()}'></div>

                <div class="overlay">
                        <div style="width:100px;overflow: hidden"> 
                            <img id="mask" width=600px height=100px 
                            src="./images/allmasks.png"> 
                        </div>
                    </div>

                <div class="RightArrow" on-click='${() => this.moveBodyRight()}'> </div>

            </div>
            </div>

            <div class='legs'></div>

        </div> 
        `;
  }

  moveHeadLeft() {
    if (this.head >= 1) {

      this.head--;
      let to = this.head * (-1 * parseInt(this.imagewidth))
      let from = (this.head + 1) * (-1 * parseInt(this.imagewidth))
      console.log(to);
      this.AnimateMask(from, to);
      this.renderME();
    }
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
    if (this.head < this.NUMBER_OF_IMAGES - 1) {
      this.head++;
      let to = this.head * (-1 * parseInt(this.imagewidth));
      let from = (this.head - 1) * (-1 * parseInt(this.imagewidth));
      console.log(to);
      this.AnimateMask(from, to);
      this.renderME();
    }
  }

  moveBodyLeft() {
    if (this.body > 0) {
      this.body--;
      this.renderME();
    }
  }

  moveBodyRight() {
    if (this.body < this.NUMBER_OF_IMAGES) {
      this.body++;
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
