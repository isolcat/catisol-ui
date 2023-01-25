import { defineComponent, createVNode, ref, openBlock, createElementBlock, createTextVNode } from "vue";
const __uno = "";
const props$3 = {
  size: {
    type: String,
    default: "medium"
  },
  color: {
    type: String,
    default: "blue"
  },
  round: {
    type: Boolean,
    default: false
  },
  plain: {
    type: Boolean,
    default: false
  },
  icon: {
    type: String,
    default: ""
  },
  disabled: {
    type: Boolean,
    default: false
  }
};
const MyButton = defineComponent({
  name: "CButton",
  props: props$3,
  setup(props2, {
    slots
  }) {
    const size = {
      small: {
        x: "2",
        y: "1",
        text: "sm"
      },
      medium: {
        x: "3",
        y: "1.5",
        text: "base"
      },
      large: {
        x: "4",
        y: "2",
        text: "lg"
      }
    };
    return () => createVNode("button", {
      "disabled": props2.disabled,
      "onClick": () => {
        if (!props2.disabled)
          ;
      },
      "class": `
          py-${size[props2.size].y}
          px-${size[props2.size].x}
          ${props2.round ? "rounded-full" : "rounded-lg"}
          bg-${props2.color}-${props2.plain ? "100" : "500"}
          hover:bg-${props2.color}-400
          border-${props2.color}-${props2.plain ? "500" : "500"}
          cursor-pointer
          border-solid
          text-${props2.plain ? props2.color + "-500" : "white"}
          text-${size[props2.size].text}
          hover:text-white
          transition duration-300 ease-in-out transform hover:scale-105
          mx-1
          ${props2.disabled ? "cursor-not-allowed opacity-50" : ""}
          `
    }, [props2.icon !== "" ? createVNode("i", {
      "class": `i-ic-baseline-${props2.icon} p-3`
    }, null) : "", slots.default ? slots.default() : ""]);
  }
});
const Input = defineComponent({
  name: "CInput",
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup(props2) {
    return () => createVNode("div", {
      "class": "op80 text-lg fw300 m1"
    }, [createVNode("input", {
      "type": "text",
      "placeholder": "Please Input",
      "class": "b-rd-1",
      "disabled": props2.disabled
    }, null)]);
  }
});
const props$2 = {
  type: {
    type: String,
    default: "default"
  },
  color: {
    type: String,
    default: "black"
  },
  plain: {
    type: Boolean,
    default: true
  },
  href: {
    type: String,
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  }
};
const Link = defineComponent({
  name: "CLink",
  props: props$2,
  setup(props2, {
    slots
  }) {
    return () => createVNode("a", {
      "class": `
        text-${props2.plain ? props2.color + "-500" : "white"}
        hover:text-${props2.color}-400
        cursor-pointer
        text-lg
        ${props2.disabled ? "" : "hover:text-white transition duration-300 ease-in-out transform hover:scale-105"}
        mx-1
        decoration-none
        `,
      "href": props2.href,
      "disabled": props2.disabled,
      "onClick": (e) => {
        if (props2.disabled) {
          e.preventDefault();
        }
      }
    }, [slots.default ? slots.default() : "Link"]);
  }
});
const props$1 = {
  size: {
    type: String,
    default: "medium"
  },
  color: {
    type: String,
    default: "blue"
  },
  text: {
    type: String,
    default: ""
  }
};
const Title = defineComponent({
  name: "CTitle",
  props: props$1,
  setup(props2, {
    slots
  }) {
    const size = {
      small: {
        x: "4",
        text: "sm"
      },
      medium: {
        x: "2",
        text: "base"
      },
      large: {
        x: "3",
        text: "lg"
      }
    };
    return () => createVNode("p", {
      "class": `
          text-${props2.color}-500
          text-${size[props2.size].x}xl
          `
    }, [props2.text, slots.default ? slots.default() : ""]);
  }
});
const props = {
  size: {
    type: String,
    default: "medium"
  },
  text: {
    type: String,
    default: ""
  },
  disabled: {
    type: Boolean,
    default: false
  },
  selectableDisabled: {
    type: Boolean,
    default: false
  }
};
const CheckBox = defineComponent({
  name: "Checkbox",
  props,
  setup(props2, {
    slots
  }) {
    const checkboxRef = ref(false);
    const size = {
      small: {
        x: "2",
        y: "1",
        text: "sm"
      },
      medium: {
        x: "3",
        y: "1.5",
        text: "base"
      },
      large: {
        x: "4",
        y: "2",
        text: "lg"
      }
    };
    return () => createVNode("div", null, [createVNode("input", {
      "ref": checkboxRef,
      "type": "checkbox",
      "class": `
            ${size[props2.size].text}
            ${props2.disabled || props2.selectableDisabled ? "cursor-not-allowed opacity-50" : ""}
          `,
      "style": {
        width: `${size[props2.size].x}rem`,
        height: `${size[props2.size].y}rem`
      },
      "disabled": props2.disabled && !props2.selectableDisabled,
      "onClick": () => {
        if (!props2.disabled) {
          checkboxRef.value = !checkboxRef.value;
        }
      }
    }, null), createVNode("label", {
      "class": `
            ${size[props2.size].text}
            ${props2.disabled || props2.selectableDisabled ? "cursor-not-allowed opacity-50" : ""}
          `
    }, [props2.text, slots.default ? slots.default() : ""])]);
  }
});
const _sfc_main = {
  name: "SFCButton"
};
const _export_sfc = (sfc, props2) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props2) {
    target[key] = val;
  }
  return target;
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("button", null, "SFC Button");
}
const SFCButton = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
const JSXButton = defineComponent({
  name: "JSXButton",
  render() {
    return createVNode("button", null, [createTextVNode("JSX Button")]);
  }
});
const entry = {
  install(app) {
    app.component(MyButton.name, MyButton);
    app.component(SFCButton.name, SFCButton);
    app.component(JSXButton.name, JSXButton);
    app.component(Link.name, Link);
    app.component(Input.name, Input);
    app.component(Title.name, Title);
    app.component(CheckBox.name, CheckBox);
  }
};
export {
  CheckBox,
  Input,
  JSXButton,
  Link,
  MyButton,
  SFCButton,
  entry as default
};
