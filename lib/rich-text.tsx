import { Fragment } from "react"

function renderInline(line: string) {
  return line.split(/(\*[^*]+\*)/g).map((segment, index) => {
    if (segment.startsWith("*") && segment.endsWith("*")) {
      return <em key={`${segment}-${index}`}>{segment.slice(1, -1)}</em>
    }

    return <Fragment key={`${segment}-${index}`}>{segment}</Fragment>
  })
}

export function RichText({ text }: { text: string }) {
  return (
    <>
      {text.split("\n").map((line, index, lines) => (
        <Fragment key={`${line}-${index}`}>
          {renderInline(line)}
          {index < lines.length - 1 ? <br /> : null}
        </Fragment>
      ))}
    </>
  )
}
