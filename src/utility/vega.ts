export const baseSpecUI = ({ width, height }) => ({
  $schema: "https://vega.github.io/schema/vega-lite/v3.json",
  width,
  height,
  padding: 0,
  autosize: {
    type: "fit",
    contains: "content",
  },
})
