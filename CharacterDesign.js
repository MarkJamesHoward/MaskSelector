import {
  LitElement, html
} from "@polymer/lit-element";

import '@polymer/iron-icons/iron-icons.js'

export class CharacterDesign extends LitElement {

  constructor() {
    console.log('created')
    super();
    this.allowMouthMoveLeft = true;
    this.allowMouthMoveRight = true;
    this.allowMoveEyesLeft = true;
    this.allowMoveEyesRight = true;
    // this.level = 5;
    this.eyes = 1;
    this.mouth = 1;
    this.NUMBER_OF_IMAGES_EYES = 6;
    this.NUMBER_OF_IMAGES_MOUTH = 9;
    this.NUMBER_OF_IMAGES_SILHOUETTES = 4;
    this.locks = [];
  }

  ApplyLockImagesToSilhouettes() {

    for (var i = 1; i < this.NUMBER_OF_IMAGES_SILHOUETTES; i++) {
      this.locks[i] = false;
    }

    for (var i = this.level; i >= 1; i--) {
     this.locks[i] = true;
    }

    // for (var i = this.level; i >= 1; i--) {
    //   let q = `lock${i}`;
    //   let sil = this.$[q];
    //   if (sil != undefined) {
    //     sil.classList.add("NoPadlock");
    //   }
    // }
  }

  _levelChanged(newValue, oldValue) {
    console.log('level changed')
    this.ConfigureButtons();
  }

  static get properties() {
    return {
      silhouette: Number,
      level: { Type: Number, value: 1, observer: '_levelChanged' },
      mouth: Number,
      eyes: Number,
      NUMBER_OF_IMAGES_EYES: Number,
      NUMBER_OF_IMAGES_MOUTH: Number,
      NUMBER_OF_IMAGES_SILHOUETTES: Number,
      customize: { Type: Boolean, value: true },
      allowMoveEyesRight: Boolean,
      allowMoveEyesLeft: Boolean,
      showMouthMoveLeft: Boolean,
      showMouthMoveRight: Boolean,
      showMouthMoveLeft: Boolean,
      showMouthMoveRight: Boolean,
      allowMoveEyesRight: Boolean,
      allowMoveEyesLeft: Boolean,
      allowMouthMoveRight: Boolean,
      allowMouthMoveLeft: Boolean,
      locks: Array
    };
  }

  ConfigureButtons() {

    if (this.eyes >= this.NUMBER_OF_IMAGES_EYES || this.eyes >= this.level) {
      this.allowMoveEyesRight = false;
    } else {
      this.allowMoveEyesRight = true;
    }

    if (this.eyes <= 1) {
      this.allowMoveEyesLeft = false;
    } else {
      this.allowMoveEyesLeft = true;
    }

    if (this.mouth <= 1) {
      this.allowMouthMoveLeft = false;
    } else {
      this.allowMouthMoveLeft = true;
    }

    if (this.mouth >= this.NUMBER_OF_IMAGES_MOUTH || this.mouth >= this.level) {
      this.allowMouthMoveRight = false;
    } else {
      this.allowMouthMoveRight = true;
    }

    if (this.customize === "false") {
      this.showMouthMoveLeft = false;
      this.showMouthMoveRight = false;
      this.showMouthMoveLeft = false;
      this.showMouthMoveRight = false;
      // this.$.ArrowEyesLeft.classList.add("DisableCustomize");
      // this.$.ArrowEyesRight.classList.add("DisableCustomize");
      // this.$.ArrowMouthLeft.classList.add("DisableCustomize");
      // this.$.ArrowMouthRight.classList.add("DisableCustomize");
      // this.$.SilhouetteSelector.classList.add("DisableCustomize");
    }

     this.ApplyLockImagesToSilhouettes();
  }

  connectedCallback() {
    super.connectedCallback();
    this.ConfigureButtons();
  }

  _render({ silhouette, level, mouth, eyes, NUMBER_OF_IMAGES_EYES
    , NUMBER_OF_IMAGES_MOUTH, NUMBER_OF_IMAGES_SILHOUETTES, customize,
    allowMouthMoveLeft, allowMouthMoveRight, allowMoveEyesLeft, allowMoveEyesRight,
  locks }) {
    return html`
    <style>
      :root {
        box-sizing: border-box;
      }
    
      .OverlayTwoItemsCharacter {
        display: grid;
        grid-template-rows: 1fr;
        grid-template-columns: 1fr;
        grid-template-areas: "main";
      }
    
      .NoPadlock {
        display: none;
      }
    
      .DisableCustomize {
        visibility: hidden;
      }
    
      .displayVertical {
        display: flex;
        flex-direction: column;
      }
    
      .CharacterCustomizeMain {
        padding: 0;
        margin: 0;
        max-height: 100vmin;
        display: grid;
        grid-template-columns: [eyes-start SilhouetteBackground-start mouth-start silhouette-start] 1fr [ SilhouetteBackground-end silhouette-end eyes-end mouth-end];
        grid-template-rows: [eyes-start SilhouetteBackground-start] 20fr [eyes-end mouth-start] 20fr [mouth-end] 20fr [SilhouetteBackground-end silhouette-start] 40fr [silhouette-end];
        border-radius: 10%;
        align-items: center;
        width: 100%;
        height: 100%;
      }
    
      .CompleteCharacter {
        display: none;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr;
      }
    
      .eyes,
      .mouth {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    
      .character {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    
    
      .SilhouetteBackgroundContainer {
        align-self: center;
        grid-area: SilhouetteBackground;
        width: 100%;
        height: 100%;
      }
    
      .mouthselector {
        grid-area: mouth;
        width: 100%;
      }
    
      .eyesselector {
        grid-area: eyes;
        width: 100%;
      }
    
      .silhouette {
        grid-area: silhouette;
        justify-content: center;
        align-items: flex-end;
        display: flex;
        align-self: end;
      }
    
      .silhouettePicker {
        object-fit: contain;
        width: 20%;
      }
    
      button {
        cursor: pointer;
        border-radius: 0.1rem;
      }
    
      .overlay {
        display: grid;
      }
    
      .LeftArrow {
        margin-left: 2%;
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
    
      .RightArrow,
      .LeftArrow {
        width: 5vmin;
        height: 5vmin;
        transition: all 0.2s ease-in-out;
      }
    
      .ArrowDisabled {
        opacity: 0.4;
      }
    
      .RightArrow {
        margin-right: 2%;
        background: url(/images/arrows/next.png) no-repeat center;
        background-size: contain;
      }
    </style>
    
    <div class="CharacterCustomizeMain">
    
      <div class='SilhouetteBackgroundContainer'>
        <img width=80% style='display: block; margin: 0 auto' src='./images/silhouette/silhouette${silhouette}.png'>
      </div>
    
      <div class='eyesselector'>
        <div class='eyes'>
    
          <div class$="${allowMoveEyesLeft ? 'LeftArrow' : 'LeftArrow ArrowDisabled'}" on-click='${() => this.moveEyesLeft()}'>
          </div>
    
          <div style="width:30%">
            <img width="100%" src="./images/eyes/eyes${eyes}.png">
          </div>
    
          <div class$="${allowMoveEyesRight ? 'RightArrow' : 'RightArrow ArrowDisabled'}" on-click='${() => this.moveEyesRight()}'>
          </div>
    
        </div>
      </div>
    
    
      <div class="mouthselector">
        <div class='mouth'>
    
          <div class$="${allowMouthMoveLeft ? 'LeftArrow' : 'LeftArrow ArrowDisabled'}" on-click="${() => this.moveMouthLeft()}"></div>
    
          <div style="width:30%">
            <img id="mouth" style="width:100%;" src="./images/mouths/mouth${mouth}.png">
          </div>
    
          <div  class$="${allowMouthMoveRight ? 'RightArrow' : 'RightArrow ArrowDisabled'}" on-click="${() => this.moveMouthRight()}">
          </div>
    
        </div>
      </div>
    
      <div id='SilhouetteSelector' class='silhouette'>
    
        <div on-click="${() => this.Pick(1)}" class="OverlayTwoItemsCharacter silhouettePicker">
          <img style="grid-area:main;width:100%" class="sil1" src="./images/silhouette/silhouette1.png">
          <iron-icon class$="${locks[1] ? 'NoPadlock' : '' }" style="grid-area:main;z-index:2;align-self:center;justify-self:center" icon="lock"></iron-icon>
        </div>
    
        <div on-click="${() => this.Pick(2)}" class="OverlayTwoItemsCharacter silhouettePicker">
          <iron-icon class$="${locks[2] ? 'NoPadlock' : '' }" style="grid-area:main;z-index:2;align-self:center;justify-self:center" icon="lock"></iron-icon>
          <img style="grid-area:main;width:100%" class="sil2" src="./images/silhouette/silhouette2.png">
        </div>
    
        <div on-click="${() => this.Pick(3)}" class="OverlayTwoItemsCharacter silhouettePicker">
          <img style="grid-area:main;width:100%" class="sil3" src="./images/silhouette/silhouette3.png">
          <iron-icon class$="${locks[3] ? 'NoPadlock' : '' }" style="grid-area:main;z-index:2;align-self:center;justify-self:center" icon="lock"></iron-icon>
        </div>
        <div on-click="${() => this.Pick(4)}" class="OverlayTwoItemsCharacter silhouettePicker">
          <img style="grid-area:main;width:100%" class="sil4" on-click='PickSilhouetee(4)' src="./images/silhouette/silhouette4.png">
          <iron-icon class$="${locks[4] ? 'NoPadlock' : '' }" style="grid-area:main;z-index:2;align-self:center;justify-self:center" icon="lock"></iron-icon>
        </div>
      </div>
    
    </div>
        `
  }


  Pick(e) {
    console.log(e)
    // let item = e.currentTarget.dataset.silhouette
    // if (item <= this.level) {
    //   this.silhouette = item
    // }

    if (e <= this.level) {
      this.silhouette = e
    }

  }

  moveEyesLeft() {
    console.log(this.eyes)
    if (this.eyes > 1) {
      this.eyes--;
      this.allowMoveEyesRight = true;
      this.ConfigureButtons();
    }
  }

  moveEyesRight() {
    console.log(this.eyes)
    if (this.eyes < this.NUMBER_OF_IMAGES_EYES && this.eyes < this.level) {
      this.eyes++;
      this.allowMoveEyesLeft = true;
      this.ConfigureButtons();
    }
  }

  moveMouthLeft() {
    console.log('move mouth left ' + this.mouth)
    if (this.mouth > 1) {
      this.mouth--;
      this.allowMouthMoveRight = true;
      this.ConfigureButtons();
    }
  }

  moveMouthRight() {
    if (this.mouth < this.NUMBER_OF_IMAGES_MOUTH && this.mouth < this.level) {
      this.mouth++;
      this.allowMouthMoveLeft = true;
      this.ConfigureButtons();
    }
  }

  static get is() {
    return "character-design";
  }
}

customElements.define(CharacterDesign.is, CharacterDesign);
