import type { SampleProps } from './Sample.types'
import './Sample-styles.css'

export function Sample ( { value } : SampleProps ) {

  return (
    <div className={"Sample-container"}>
      <h1>Sample</h1>
      <h2>{value}</h2>
    </div>
  )
}