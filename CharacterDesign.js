import {
  Element as PolymerElement, html
} from "@polymer/polymer/polymer-element.js";


import '@polymer/iron-icons/iron-icons.js'

export class CharacterDesign extends PolymerElement {

  constructor() {
      console.log('created')
    super();
  }


  ApplyLockImagesToSilhouettes() {
    for (var i = 1; i < this.NUMBER_OF_IMAGES_SILHOUETTES; i++) {
      let q = `.lock${i}`;
      let sil = this.$.q;
      if (sil != undefined) sil.classList.add("Padlock");
    }

    for (var i = this.level; i > 1; i--) {
      let q = `.lock${i}`;
      let sil = this.$.q;
      if (sil != undefined) {
        sil.classList.remove("Padlock");
      }
    }
  }

  static get properties() {
    return {
      silhouette: { Type: String, Value: "" },
      level: { Type: Number, value: 1 },
      mouth: { Type: Number, value: 1 },
      eyes: { Type: Number, value: 1 },
      NUMBER_OF_IMAGES_EYES: {Type: Number, value:3},
      NUMBER_OF_IMAGES_MOUTH: {Type: Number, value:3},
    };
  }

  ConfigureButtons() {
    if (this.$.ArrowEyesRight == undefined) return;

    if (this.eyes >= this.NUMBER_OF_IMAGES_EYES || this.eyes >= this.level) {
      this.$.ArrowEyesRight.classList.add("ArrowDisabled");
    } else {
      this.$.ArrowEyesRight .classList.remove("ArrowDisabled");
    }

    if (this.eyes <= 1) {
      this.$.ArrowEyesLeft.classList.add("ArrowDisabled");
    } else {
      this.$.ArrowEyesLeft.classList.remove("ArrowDisabled");
    }

    if (this.mouth <= 1) {
      this.$.ArrowMouthLeft.classList.add("ArrowDisabled");
    } else {
      this.$.ArrowMouthLeft.classList.remove("ArrowDisabled");
    }

    if (this.mouth >= this.NUMBER_OF_IMAGES_MOUTH || this.mouth >= this.level) {
      this.$.ArrowMouthRight.classList.add("ArrowDisabled");
    } else {
      this.$.ArrowMouthRight.classList.remove("ArrowDisabled");
    }

    if (this.customize === "false") {
      this.$.ArrowEyesLeft.classList.add("DisableCustomize");
      this.$.ArrowEyesRight.classList.add("DisableCustomize");
      this.$.ArrowMouthLeft.classList.add("DisableCustomize");
      this.$.ArrowMouthRight.classList.add("DisableCustomize");
      this.$.SilhouetteSelector.classList.add("DisableCustomize");
    }

    this.ApplyLockImagesToSilhouettes();
  }

  connectedCallback() {
    super.connectedCallback();
    this.ConfigureButtons();
  }

  static get template() {
    return `
    <style>
    :root {
      box-sizing: border-box;
    }

     .OverlayTwoItemsCharacter{  
         display: grid;
         grid-template-rows: 1fr;
         grid-template-columns: 1fr;
         grid-template-areas: "main";
     }

     .Padlock {
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
       padding:0; margin: 0;
       max-height: 100vh;
       display: grid;
       grid-template-areas: "eyes"
                            "mouth"
                            "

       grid-template-columns: [eyes-start SilhouetteBackground-start mouth-start silhouette-start] 1fr [ SilhouetteBackground-end silhouette-end eyes-end mouth-end];
       grid-template-rows: [eyes-start SilhouetteBackground-start] 20fr [eyes-end mouth-start] 20fr [mouth-end ] 20fr [SilhouetteBackground-end silhouette-start] 20fr [silhouette-end];
       border-radius: 10%;
         align-items:center;
         width:100%;
         height: 100%;
     }

     .CompleteCharacter {
       display: none;
       grid-template-columns: 1fr 1fr;
       grid-template-rows: 1fr 1fr; 
     }

     .eyes, .mouth {
         display: flex;
         justify-content: space-between;
         align-items:center;
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
       align-items:flex-end;
         display:flex;
         align-self:end;
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

     .RightArrow, .LeftArrow {
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
             <img width=80% style='display: block; margin: 0 auto;' src='./images/silhouette/silhouette[[silhouette]].png'>
     </div>

     <div class='eyesselector'>
             <div class='eyes'>

                 <div id='ArrowEyesLeft' class="LeftArrow" on-click='moveEyesLeft'>

                 </div>
         
                 <div style="width:30%"> 
                     <img width="100%"
                     src="./images/eyes/eyes[[eyes]].png"> 
                 </div>

                 <div id='ArrowEyesRight'  class="RightArrow" on-click='moveEyesRight'>
                 </div>

             </div>
     </div>    


     <div class="mouthselector">
         <div class='mouth'> 

             <div id="ArrowMouthLeft" class="LeftArrow"  on-click='moveMouthLeft'></div>

                 <div style="width:30%"> 
                     <img id="mouth" style="width:100%;"
                     src="./images/mouths/mouth[[mouth]].png"> 
                 </div>

             <div id="ArrowMouthRight" class="RightArrow" on-click="moveMouthRight"> </div>

         </div>
     </div>

     <div id='SilhouetteSelector' class='silhouette'>
             
             <div data-silhouette="1" on-click="Pick" class="OverlayTwoItemsCharacter silhouettePicker">
                 <img style="grid-area:main;width:100%" class="sil1" src="./images/silhouette/silhouette1.png">
                 <iron-icon class="lock1" style="grid-area:main;z-index:2;align-self:center;justify-self:center" icon="lock"></iron-icon>
             </div>

             <div data-silhouette="2" on-click="Pick" class="OverlayTwoItemsCharacter silhouettePicker">
             <iron-icon class="lock2" style="grid-area:main;z-index:2;align-self:center;justify-self:center" icon="lock"></iron-icon>
             <img style="grid-area:main;width:100%" class="sil2"  src="./images/silhouette/silhouette2.png">
             </div>

             <div data-silhouette="3" on-click="Pick"  class="OverlayTwoItemsCharacter silhouettePicker">
                 <img style="grid-area:main;width:100%" class="sil3"  src="./images/silhouette/silhouette3.png">
                 <iron-icon class="lock3" style="grid-area:main;z-index:2;align-self:center;justify-self:center" icon="lock"></iron-icon>
             </div>
             <div data-silhouette="4" on-click="Pick" class="OverlayTwoItemsCharacter silhouettePicker">
                 <img style="grid-area:main;width:100%" class="sil4"  on-click='PickSilhouetee(4)'  src="./images/silhouette/silhouette4.png">
                 <iron-icon class="lock4" style="grid-area:main;z-index:2;align-self:center;justify-self:center" icon="lock"></iron-icon>
             </div>
     </div> 

 </div>
        `
  }


  Pick(e) {
    let item = e.currentTarget.dataset.silhouette
    if (item <= this.level) {
      this.silhouette = item
    }
  }

  moveEyesLeft() {
    if (this.eyes > 1) {
      this.eyes--;
      this.$.ArrowEyesRight.classList.remove("ArrowDisabled");
      this.ConfigureButtons();
    }
  }

  moveEyesRight() {
    if (this.eyes < this.NUMBER_OF_IMAGES_EYES && this.eyes < this.level) {
      this.eyes++;
      this.$.ArrowEyesLeft.classList.remove("ArrowDisabled");
      this.ConfigureButtons();
    }
  }

  moveMouthLeft() {
    if (this.mouth > 1) {
      this.mouth--;
      this.$.ArrowMouthRight.classList.remove("ArrowDisabled");
      this.ConfigureButtons();
    }
  }

  moveMouthRight() {
    if (this.mouth < this.NUMBER_OF_IMAGES_MOUTH && this.mouth < this.level) {
      this.mouth++;
      this.$.ArrowMouthLeft.classList.remove("ArrowDisabled");
      this.ConfigureButtons();
    }
  }

  static get is() {
    return "character-design";
  }
}

customElements.define(CharacterDesign.is, CharacterDesign);
