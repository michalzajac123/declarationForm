import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import type State from './store'

export default async function pdfCreator(formData: State): Promise<void> {
  console.log('Starting PDF creation with data:', formData)

  try {
    // Create a new PDF document
    const pdfDoc = await PDFDocument.create()
    const page = pdfDoc.addPage([595.28, 841.89]) // A4 size in points

    // Get fonts
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

    const { width, height } = page.getSize()
    const margin = 50
    let y = height - margin

    // Helper function to convert Polish characters to ASCII-safe equivalents
    const toAsciiSafe = (text: string): string => {
      if (!text) return ''

      return (
        text
          .normalize('NFC')
          // Polish characters to ASCII equivalents
          .replace(/[ąĄ]/g, 'A')
          .replace(/[ćĆ]/g, 'C')
          .replace(/[ęĘ]/g, 'E')
          .replace(/[łŁ]/g, 'L')
          .replace(/[ńŃ]/g, 'N')
          .replace(/[óÓ]/g, 'O')
          .replace(/[śŚ]/g, 'S')
          .replace(/[źŹ]/g, 'Z')
          .replace(/[żŻ]/g, 'Z')
          // Remove any remaining non-ASCII characters
          .replace(/[^\x00-\x7F]/g, '')
      )
    }

    // Helper function to draw text safely
    const drawText = (text: string, x: number, yPos: number, options: any = {}) => {
      const safeText = toAsciiSafe(text)

      page.drawText(safeText, {
        x,
        y: yPos,
        size: options.size || 10,
        font: options.bold ? boldFont : font,
        color: rgb(0, 0, 0),
        ...options,
      })
    }

    // Helper function to draw checkbox
    const drawCheckbox = (x: number, yPos: number, checked: boolean = false) => {
      // Draw checkbox border
      page.drawRectangle({
        x,
        y: yPos - 2,
        width: 12,
        height: 12,
        borderColor: rgb(0, 0, 0),
        borderWidth: 1,
      })

      // Draw check mark if checked - using 'X' instead of checkmark
      if (checked) {
        drawText('X', x + 3, yPos + 1, { size: 9, bold: true })
      }
    }

    // Title
    drawText('Zalacznik 3', margin, y, { size: 10 })
    y -= 20
    drawText('UCZEN / SLUCHACZ / ABSOLWENT', margin, y, { bold: true, size: 12 })
    y -= 20
    drawText('DEKLARACJA PRZYSTAPIENIA DO EGZAMINU', margin, y, { bold: true, size: 14 })
    y -= 30

    // Date and place
    const currentDate = new Date().toLocaleDateString('pl-PL')
    drawText(`miejscowosc, data ${currentDate}`, width - 200, y, { size: 10 })
    y -= 40

    // Personal data section
    drawText(
      'Dane osobowe ucznia/sluchacza/absolwenta (wypelnic drukowanymi literami):',
      margin,
      y,
      { bold: true },
    )
    y -= 25

    drawText('Nazwisko:', margin, y)
    if (formData.surname) {
      drawText(formData.surname.toUpperCase(), margin + 80, y, { bold: true })
    }
    y -= 20

    drawText('Imie (imiona):', margin, y)
    if (formData.name) {
      drawText(formData.name.toUpperCase(), margin + 100, y, { bold: true })
    }
    y -= 25

    drawText('Data i miejsce urodzenia:', margin, y)
    const formattedBirthDate = formData.birthDate
      ? new Date(formData.birthDate).toLocaleDateString('pl-PL')
      : ''
    if (formData.birthDate) {
      drawText(`${formattedBirthDate}`, margin + 150, y, { bold: true })
    } else {
      drawText(formattedBirthDate, margin + 150, y, { bold: true })
    }
    y -= 20

    drawText('Numer PESEL:', margin, y)
    if (formData.pesel) {
      drawText(formData.pesel, margin + 100, y, { bold: true })
    }
    y -= 15

    drawText(
      'w przypadku braku numeru PESEL - seria i numer paszportu lub innego dokumentu potwierdzajacego tozsamosc',
      margin,
      y,
      { size: 8 },
    )
    y -= 30

    // Address section
    drawText('Adres korespondencyjny (wypelnic drukowanymi literami):', margin, y, { bold: true })
    y -= 25

    drawText('miejscowosc:', margin, y)
    if (formData.city) {
      drawText(formData.city.toUpperCase(), margin + 80, y, { bold: true })
    }
    y -= 20

    drawText('ulica i numer domu:', margin, y)
    if (formData.street && formData.numberOfHouse) {
      drawText(`${formData.street.toUpperCase()} ${formData.numberOfHouse}`, margin + 120, y, {
        bold: true,
      })
    }
    y -= 20

    drawText('kod pocztowy i poczta:', margin, y)
    if (formData.postalCode && formData.city) {
      drawText(`${formData.postalCode} ${formData.city.toUpperCase()}`, margin + 130, y, {
        bold: true,
      })
    }
    y -= 25

    if (formData.phoneNumber) {
      drawText(`numer telefonu: ${formData.phoneNumber}`, margin, y, { bold: true })
    }
    if (formData.email) {
      drawText(`mail: ${formData.email}`, margin + 200, y, { bold: true })
    }
    y -= 40

    // Exam declaration
    drawText(
      'Deklaruje przystapienie do egzaminu potwierdzajacego kwalifikacje w zawodzie',
      margin,
      y,
    )
    y -= 20

    if (formData.proffesionName) {
      drawText(formData.proffesionName.toUpperCase(), margin, y, { bold: true })
    }
    y -= 20

    const examTerm = formData.winter
      ? 'zimowym'
      : formData.summer
        ? 'letnim'
        : '........................'
    drawText(`przeprowadzanego w terminie ${examTerm}`, margin, y)
    y -= 30

    // Qualification info
    // First draw the data
    if (formData.qualificationID) {
      drawText(formData.qualificationID, margin, y, { bold: true })
    }
    if (formData.proffesionName) {
      drawText(formData.proffesionName.toUpperCase(), margin + 100, y, { bold: true })
    }
    y -= 15

    // Then draw the labels underneath
    drawText('oznaczenie kwalifikacji zgodne', margin, y, { size: 8 })
    drawText('nazwa kwalifikacji', margin + 100, y, { size: 8 })
    y -= 10
    drawText('z podstawa programowa', margin, y, { size: 8 })
    y -= 15

    drawText('symbol cyfrowy zawodu nazwa zawodu', margin, y, { size: 8 })
    y -= 25

    // Exam type
    drawCheckbox(margin, y, formData.whichExam?.first)
    drawText('po raz pierwszy*', margin + 20, y)

    drawCheckbox(
      margin + 150,
      y,
      formData.whichExam?.anotherInWrittenPart || formData.whichExam?.anotherInPracticalPart,
    )
    drawText('po raz kolejny* do czesci', margin + 170, y)

    drawCheckbox(margin + 300, y, formData.whichExam?.anotherInWrittenPart)
    drawText('pisemnej*', margin + 320, y)

    drawCheckbox(margin + 380, y, formData.whichExam?.anotherInPracticalPart)
    drawText('praktycznej*', margin + 400, y)
    y -= 25

    drawText('dostosowania', margin, y)
    y -= 40

    // GDPR consent
    drawText(
      'Wyrazam zgode na przetwarzanie moich danych osobowych do celow zwiazanych z egzaminem potwierdzajacym',
      margin,
      y,
      { size: 9 },
    )
    y -= 15
    drawText('kwalifikacje w zawodzie.', margin, y, { size: 9 })
    y -= 25

    drawText('*wlasciwe zaznaczyc', margin, y, { size: 8 })

    // Signature line
    drawText('.......................................................', width - 200, y - 20)
    drawText('czytelny podpis', width - 150, y - 35, { size: 8 })
    y -= 60

    // Attachments
    drawText('Do deklaracji dolaczam:', margin, y, { bold: true })
    y -= 20

    drawCheckbox(margin, y, formData.schoolEnded)
    drawText('Swiadectwo ukonczenia szkoly*', margin + 20, y)
    y -= 18

    drawCheckbox(margin, y, formData.pedagogicalSupport)
    drawText(
      'Orzeczenie/opinie publicznej poradni psychologiczno-pedagogicznej (w przypadku wystepowania dysfunkcji)*',
      margin + 20,
      y,
      { size: 9 },
    )
    y -= 18

    drawCheckbox(margin, y, formData.healthCondition)
    drawText(
      'Zaswiadczenie o stanie zdrowia wydane przez lekarza* (w przypadku choroby lub niesprawnosci czasowej)*',
      margin + 20,
      y,
      { size: 9 },
    )
    y -= 25

    drawText('*wlasciwe zaznaczyc', margin, y, { size: 8 })

    // Second signature line
    drawText('.......................................................', width - 200, y - 15)
    drawText('czytelny podpis', width - 150, y - 30, { size: 8 })
    y -= 50

    // School confirmation section
    drawText('Potwierdzam przyjecie deklaracji', margin, y)
    y -= 30

    drawText('………………………………………………….', margin, y)
    drawText('.......................................................', margin + 200, y)
    y -= 15
    drawText('Pieczec szkoly', margin + 50, y, { size: 8 })
    drawText('data, czytelny podpis osoby przyjmujacej', margin + 200, y, { size: 8 })
    y -= 40

    // Footer GDPR info
    const gdprText =
      'Obowiazek informacyjny wynikajacy z art. 13 i 14 Rozporzadzenia Parlamentu Europejskiego i Rady (UE) 2016/679 z 27 kwietnia 2016 r. w sprawie ochrony\nosob fizycznych w zwiazku z przetwarzaniem danych osobowych i w sprawie swobodnego przeplywu takich danych oraz uchylenia dyrektywy 95/46/WE,\nw zakresie przeprowadzania egzaminu potwierdzajacego kwalifikacje zawodowe, zgodnie z przepisami ustawy o systemie oswiaty oraz aktami wykonawczymi\nwydanymi na jej podstawie, zostal spelniony poprzez zamieszczenie klauzuli informacyjnej na stronie internetowej wlasciwej okregowej komisji\negzaminacyjnej.'

    const lines = gdprText.split('\n')
    lines.forEach((line, index) => {
      drawText(line, margin, y - index * 12, { size: 7 })
    })

    // Generate PDF bytes
    const pdfBytes = await pdfDoc.save()

    // Create blob and download
    const blob = new Blob([pdfBytes as BlobPart], { type: 'application/pdf' })
    const url = URL.createObjectURL(blob)

    // Create download link
    const link = document.createElement('a')
    link.href = url
    const surname = formData.surname ? toAsciiSafe(formData.surname) : 'nieznane'
    const name = formData.name ? toAsciiSafe(formData.name) : 'nieznane'
    link.download = `deklaracja_egzamin_${surname}_${name}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    // Clean up
    URL.revokeObjectURL(url)

    console.log('PDF generated and downloaded successfully!')
  } catch (error) {
    console.error('Error generating PDF:', error)
    throw error
  }
}
