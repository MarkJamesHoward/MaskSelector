import {
  Element as PolymerElement, html
} from "@polymer/polymer/polymer-element.js";


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
      eyes: { Type: Number, value: 1 }
    };
  }

  ConfigureButtons() {
    if (this.$.ArrowEyesRight == undefined) return;

    if (this.eyes >= this.NUMBER_OF_IMAGES_EYES || this.eyes >= this.level) {
      this.shadowRoot
        .querySelector("#ArrowEyesRight")
        .classList.add("ArrowDisabled");
    } else {
      this.shadowRoot
        .querySelector("#ArrowEyesRight")
        .classList.remove("ArrowDisabled");
    }

    if (this.eyes <= 1) {
      this.shadowRoot
        .querySelector("#ArrowEyesLeft")
        .classList.add("ArrowDisabled");
    } else {
      this.shadowRoot
        .querySelector("#ArrowEyesLeft")
        .classList.remove("ArrowDisabled");
    }

    if (this.mouth <= 1) {
      this.shadowRoot
        .querySelector("#ArrowMouthLeft")
        .classList.add("ArrowDisabled");
    } else {
      this.shadowRoot
        .querySelector("#ArrowMouthLeft")
        .classList.remove("ArrowDisabled");
    }

    if (this.mouth >= this.NUMBER_OF_IMAGES_MOUTH || this.mouth >= this.level) {
      this.shadowRoot
        .querySelector("#ArrowMouthRight")
        .classList.add("ArrowDisabled");
    } else {
      this.shadowRoot
        .querySelector("#ArrowMouthRight")
        .classList.remove("ArrowDisabled");
    }

    if (this.customize === "false") {
      this.shadowRoot
        .querySelector("#ArrowEyesLeft")
        .classList.add("DisableCustomize");
      this.shadowRoot
        .querySelector("#ArrowEyesRight")
        .classList.add("DisableCustomize");
      this.shadowRoot
        .querySelector("#ArrowMouthLeft")
        .classList.add("DisableCustomize");
      this.shadowRoot
        .querySelector("#ArrowMouthRight")
        .classList.add("DisableCustomize");
      this.shadowRoot
        .querySelector("#SilhouetteSelector")
        .classList.add("DisableCustomize");
    }

    this.ApplyLockImagesToSilhouettes();
  }

  connectedCallback() {
    //this.RetriveAttributeSettings()
    //this.ConfigureButtons();
  }

  static get template() {
    return `
            <button>test</button>
        `
  }

  connectedCallback() {
      console.log('connected callback')
  }

  PickSilhouetee(item) {
    console.log("pick item " + item);
    if (item <= this.level) {
      this.silhouette = item;
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
