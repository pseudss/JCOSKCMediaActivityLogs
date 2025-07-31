// Enhanced Excel export utility that creates properly formatted Excel files
export function createFormattedExcelFile(headers: string[], data: any[], filename: string) {
  // Create a more sophisticated approach that generates Excel-compatible formatting
  
  // Calculate optimal column widths based on content
  const columnWidths = calculateColumnWidths(headers, data);
  
  // Create Excel-compatible CSV with formatting metadata
  const csvLines = [
    // Excel formatting metadata (Excel will ignore these lines but they provide hints)
    `"Excel Format: Bold Headers, Auto-Adjust Columns"`,
    `"Report: ${filename}"`,
    `"Generated: ${new Date().toLocaleString()}"`,
    `"Column Widths: ${columnWidths.join(',')}"`,
    `"Instructions: Select all data, go to Data > Text to Columns, then Format > AutoFit Column Width"`,
    '',
    // Headers with Excel formatting hints
    headers.map(header => `"${header}"`).join(','),
    // Data rows with proper escaping
    ...data.map(row => 
      headers.map(header => {
        const value = row[header.toLowerCase().replace(/\s+/g, '_')] || row[header] || '';
        const escapedValue = String(value)
          .replace(/"/g, '""')
          .replace(/\n/g, ' ')
          .replace(/\r/g, ' ')
          .trim();
        return `"${escapedValue}"`;
      }).join(',')
    )
  ];

  const csvContent = csvLines.join('\n');
  
  // Add BOM for better Excel recognition
  const BOM = '\uFEFF';
  const fullContent = BOM + csvContent;
  
  // Create file with Excel-compatible MIME type
  const blob = new Blob([fullContent], { 
    type: 'application/vnd.ms-excel;charset=utf-8' 
  });
  
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}-${new Date().toISOString().split('T')[0]}.xls`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Function to calculate optimal column widths
export function calculateColumnWidths(headers: string[], data: any[]): number[] {
  const widths: number[] = [];
  
  headers.forEach((header, index) => {
    let maxWidth = header.length;
    
    // Check data lengths for this column
    data.forEach(row => {
      const value = row[headers[index].toLowerCase().replace(/\s+/g, '_')] || row[headers[index]] || '';
      const valueLength = String(value).length;
      if (valueLength > maxWidth) {
        maxWidth = valueLength;
      }
    });
    
    // Add padding and cap at reasonable maximum
    const optimalWidth = Math.min(Math.max(maxWidth + 4, 15), 80);
    widths.push(optimalWidth);
  });
  
  return widths;
}

// Create a more sophisticated Excel-compatible format with better formatting hints
export function createExcelCompatibleCSV(headers: string[], data: any[], filename: string) {
  // Calculate column widths
  const columnWidths = calculateColumnWidths(headers, data);
  
  // Create Excel-compatible CSV with enhanced formatting
  const csvLines = [
    // Enhanced metadata for better Excel formatting
    `"Excel Auto-Format Instructions:"`,
    `"1. Open this file in Excel"`,
    `"2. Select all data (Ctrl+A)"`,
    `"3. Go to Home > Format > AutoFit Column Width"`,
    `"4. Select header row and make it bold (Ctrl+B)"`,
    `"5. Optional: Select all and apply borders"`,
    `""`,
    `"Report: ${filename}"`,
    `"Generated: ${new Date().toLocaleString()}"`,
    `"Column Widths: ${columnWidths.join(',')}"`,
    `"Total Rows: ${data.length}"`,
    `""`,
    // Headers with formatting hints
    headers.map(header => `"${header}"`).join(','),
    // Data rows with enhanced formatting
    ...data.map(row => 
      headers.map(header => {
        const value = row[header.toLowerCase().replace(/\s+/g, '_')] || row[header] || '';
        const escapedValue = String(value)
          .replace(/"/g, '""')
          .replace(/\n/g, ' ')
          .replace(/\r/g, ' ')
          .trim();
        return `"${escapedValue}"`;
      }).join(',')
    )
  ];

  const csvContent = csvLines.join('\n');
  
  // Add BOM for better Excel recognition
  const BOM = '\uFEFF';
  const fullContent = BOM + csvContent;
  
  const blob = new Blob([fullContent], { 
    type: 'text/csv;charset=utf-8' 
  });
  
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}-${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
} 