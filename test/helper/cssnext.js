import postcss from 'postcss'
import cssnext from 'postcss-cssnext'

export default function (css) {
  return { code: postcss([cssnext]).process(css).css }
}
