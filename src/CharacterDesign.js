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

            .ShowMaskNumber6 {
                transition: 0.5s all;
                transform: TranslateX(0);
            }

            .ShowMaskNumber5 {
                transition: 0.5s all;
                transform: TranslateX(-100px);
            }

            .ShowMaskNumber4 {
                transition: 0.5s all;
                transform: TranslateX(-200px);
            }

            .ShowMaskNumber3 {
                transition: 0.5s all;
                transform: TranslateX(-300px);
            }

             .ShowMaskNumber2 {
                transition: 0.5s all;
                transform: TranslateX(-400px);
            }

            .ShowMaskNumber1 {
                transition: 0.5s all;
                transform: TranslateX(-500px);
            }
          

            .head, .body {
                display: flex;
                align-items: center;
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
                            <img id="mask" style="position:absolute;left:0" width=600px height=100px 
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

  makeEaseInOut(timing) {
    return function(timeFraction) {
      if (timeFraction < .5)
        return timing(2 * timeFraction) / 2;
      else
        return (2 - timing(2 * (1 - timeFraction))) / 2;
    }
  }

  quad(timeFraction) {
    return Math.pow(timeFraction, 2)
  }

  moveHeadLeft() {
    if (this.head > 1) {

      this.head--;

      let to = parseInt(this.shadowRoot.querySelector('#mask').style.left) - 100;

        this.animate({
          duration: 2000,
          timing: this.makeEaseInOut(this.quad),
          draw: (progress) => {
            this.shadowRoot.querySelector('#mask').style.left = to * progress + 'px'
          }
        });

      //this.showSelectedMask()
      this.renderME();
    }
  }

  showSelectedMask() {
    let mask = this.shadowRoot.querySelector("#mask");
    mask.classList = "";
    mask.classList.add(`ShowMaskNumber${this.head}`);
  }

  animate({timing, draw, duration}) {

    console.log('called animate')
    let start = performance.now();
  
    requestAnimationFrame(function animate(time) {
      // timeFraction goes from 0 to 1
      let timeFraction = (time - start) / duration;
      if (timeFraction > 1) timeFraction = 1;
  
      // calculate the current animation state
      let progress = timing(timeFraction);
  
      draw(progress); // draw it
  
      if (timeFraction < 1) {
        requestAnimationFrame(animate);
      }
  
    });
  }

  moveHeadRight() {
    if (this.head < this.NUMBER_OF_IMAGES) {
      this.head++;


      let mask = this.shadowRoot.querySelector("#mask");
      mask.classList = "";
      mask.classList.add(`ShowMaskNumber${this.head}`);

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
