import FileSaver from 'file-saver'
import JSZip from 'jszip'

export async function exportCSV(sheets) {
  const zip = new JSZip()
  const folder = zip.folder('sheets')

  sheets.forEach((sheet) => {
    const blob = new Blob([sheet.data], { type: 'text/csv' })
    folder.file(`${sheet.title}.csv`, blob)
  })

  const blob = await zip.generateAsync({ type: 'blob' })
  FileSaver.saveAs(blob, 'cv_export')
}
