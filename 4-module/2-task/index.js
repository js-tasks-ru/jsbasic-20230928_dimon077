function makeDiagonalRed(table) {
  let rows = table.querySelectorAll('tr');

  for (let tr of rows) {
    tr.querySelectorAll('td').forEach(td => {
      if (td.cellIndex == tr.rowIndex) {
        td.style.backgroundColor = 'red';
      }
    })
  }
}
