// Advanced Excel export utility that creates properly formatted Excel files
export function createAdvancedExcelFile(headers: string[], data: any[], filename: string) {
  // Create an HTML table that Excel can import with formatting
  const htmlContent = createExcelHTML(headers, data, filename);
  
  // Create a blob with HTML content that Excel can open
  const blob = new Blob([htmlContent], { 
    type: 'application/vnd.ms-excel' 
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

function createExcelHTML(headers: string[], data: any[], filename: string): string {
  // Calculate column widths
  const columnWidths = calculateColumnWidths(headers, data);
  
  const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>${filename}</title>
    <style>
        table {
            border-collapse: collapse;
            width: 100%;
            font-family: Arial, sans-serif;
        }
        th {
            background-color: #f2f2f2;
            font-weight: bold;
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        tr:nth-child(even) {
            background-color: #f9f9f9;
        }
        .header-row {
            background-color: #4CAF50 !important;
            color: white;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <h2>${filename}</h2>
    <p>Generated: ${new Date().toLocaleString()}</p>
    <table>
        <thead>
            <tr class="header-row">
                ${headers.map(header => `<th style="width: ${calculateColumnWidths(headers, data)[headers.indexOf(header)] * 8}px">${header}</th>`).join('')}
            </tr>
        </thead>
        <tbody>
            ${data.map(row => `
                <tr>
                    ${headers.map(header => {
                        const value = row[header.toLowerCase().replace(/\s+/g, '_')] || row[header] || '';
                        return `<td>${String(value).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</td>`;
                    }).join('')}
                </tr>
            `).join('')}
        </tbody>
    </table>
</body>
</html>`;

  return html;
}

function calculateColumnWidths(headers: string[], data: any[]): number[] {
  const widths: number[] = [];
  
  headers.forEach((header, index) => {
    let maxWidth = header.length;
    
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