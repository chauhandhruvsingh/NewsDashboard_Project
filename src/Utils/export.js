// src/utils/export.js
import jsPDF from 'jspdf'
import Papa from 'papaparse'

export const exportToPDF = (articles, totalPayout) => {
  const doc = new jsPDF()
  
  // Title
  doc.setFontSize(20)
  doc.text('News Dashboard Report', 20, 20)
  
  // Summary
  doc.setFontSize(12)
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 35)
  doc.text(`Total Articles: ${articles.length}`, 20, 45)
  doc.text(`Total Payout: $${totalPayout}`, 20, 55)
  
  // Article details
  doc.setFontSize(14)
  doc.text('Article Details:', 20, 75)
  
  let yPosition = 90
  
  articles.slice(0, 20).forEach((article, index) => { // Limit to first 20 articles
    if (yPosition > 250) {
      doc.addPage()
      yPosition = 20
    }
    
    doc.setFontSize(10)
    doc.text(`${index + 1}. ${article.title.substring(0, 60)}...`, 20, yPosition)
    doc.text(`   Author: ${article.author || 'Unknown'}`, 25, yPosition + 8)
    doc.text(`   Type: ${article.type} | Date: ${new Date(article.publishedAt).toLocaleDateString()}`, 25, yPosition + 16)
    
    yPosition += 25
  })
  
  if (articles.length > 20) {
    doc.text(`... and ${articles.length - 20} more articles`, 20, yPosition + 10)
  }
  
  // Save the PDF
  doc.save('news-dashboard-report.pdf')
}

export const exportToCSV = (articles, totalPayout) => {
  const csvData = articles.map(article => ({
    Title: article.title,
    Author: article.author || 'Unknown',
    Type: article.type,
    'Published Date': new Date(article.publishedAt).toLocaleDateString(),
    Source: article.source?.name || 'Unknown',
    URL: article.url || ''
  }))
  
  // Add summary row
  csvData.unshift({
    Title: 'SUMMARY',
    Author: `Total Articles: ${articles.length}`,
    Type: `Total Payout: $${totalPayout}`,
    'Published Date': `Generated: ${new Date().toLocaleDateString()}`,
    Source: '',
    URL: ''
  })
  
  csvData.unshift({}) // Empty row for separation
  
  const csv = Papa.unparse(csvData)
  
  // Create and download the CSV file
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  
  link.setAttribute('href', url)
  link.setAttribute('download', 'news-dashboard-report.csv')
  link.style.visibility = 'hidden'
  
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// Google Sheets integration would require OAuth setup
// For demo purposes, we'll show how it could be implemented
export const exportToGoogleSheets = async (articles, totalPayout) => {
  // This would require Google Sheets API setup
  // For now, we'll just show a message
  alert('Google Sheets integration requires API setup. For demo purposes, use CSV export and import to Google Sheets manually.')
  
  // Real implementation would look like:
  /*
  try {
    const response = await gapi.client.sheets.spreadsheets.values.update({
      spreadsheetId: 'your-spreadsheet-id',
      range: 'Sheet1!A1',
      valueInputOption: 'RAW',
      resource: {
        values: [
          ['Title', 'Author', 'Type', 'Published Date', 'Source'],
          ...articles.map(article => [
            article.title,
            article.author || 'Unknown',
            article.type,
            new Date(article.publishedAt).toLocaleDateString(),
            article.source?.name || 'Unknown'
          ])
        ]
      }
    })
  } catch (error) {
    console.error('Error exporting to Google Sheets:', error)
  }
  */
}

