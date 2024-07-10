type CSAnnotationsProps = {
   annotationCount?: number
}

export function CSAnnotations({ annotationCount }: CSAnnotationsProps) {
   // use measurementEventAdd to get current annotation count.
   // reset annotation count on image change.
   return <div>There are {String(annotationCount ?? 0)} annotations completed!</div>
}
