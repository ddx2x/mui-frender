import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import MuiInput from "@mui/material/Input";

const Input = styled(MuiInput)`
  width: 100%;
`;

export default function InputSlider({ schema, value, onChange }) {
  const { title, min = 0, max = 100, step = 10, suffix } = schema;

  const handleSliderChange = (event, newValue) => {
    onChange(newValue);
  };

  const handleInputChange = (event) => {
    onChange(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 0) {
      onChange(0);
    } else if (value > 100) {
      onChange(100);
    }
  };

  return (
    <Box sx={{ width: "100%", padding: "0 12px" }}>
      {title && (
        <Typography id="input-slider" gutterBottom>
          {title}
        </Typography>
      )}
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <Slider
            value={typeof value === "number" ? value : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
          />
        </Grid>
        <Grid item style={{ width: "15%" }}>
          <Input
            value={value}
            size="small"
            variant="outlined"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step,
              min,
              max,
              type: "number",
              "aria-labelledby": "input-slider",
            }}
          />
        </Grid>
        {suffix && (
          <Grid item>
            <span>{suffix}</span>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

export const sliderSetting = {
  text: "滑块",
  name: "slider",
  schema: {
    title: "滑块",
    type: "any",
    widget: "slider",
  },
  setting: {
    required: {
      title: "必填",
      type: "boolean",
    },
    disabled: {
      title: "是否禁用",
      type: "boolean",
      default: false,
    },
    min: {
      title: "最小值",
      type: "number",
      default: 0,
    },
    max: {
      title: "最大值",
      type: "number",
      default: 100,
    },
    step: {
      title: "最大值",
      type: "number",
      default: 10,
    },
    // html5type: {
    // 	title: 'html5 type',
    // 	type: 'any',
    // 	enum: ['text', 'email', 'number', 'password', 'search', 'url'],
    // 	enumNames: ['text', 'email', 'number', 'password', 'search', 'url'],
    // 	default: 'text',
    // },
    // size: {
    // 	title: '尺寸',
    // 	type: 'any',
    // 	widget: 'select',
    // 	enum: ['medium', 'small'],
    // 	enumNames: ['medium', 'small'],
    // 	default: 'small',
    // },
    // variant: {
    // 	title: 'Variant',
    // 	type: 'any',
    // 	label: 'variant',
    // 	enum: ['standard', 'filled', 'outlined'],
    // 	enumNames: ['standard', 'filled', 'outlined'],
    // 	default: 'outlined',
    // },
    default: {
      title: "默认值",
      type: "string",
      default: "",
    },
    helperText: {
      title: "提示",
      type: "string",
    },
    suffix: {
      title: "后缀",
      type: "string",
    },
    // placeholder: {
    //   title: "占位符",
    //   type: "string",
    // },
    // width: {
    //   title: "元素宽度",
    //   type: "string",
    //   placeholder: "eg 50%",
    // },
  },
};
