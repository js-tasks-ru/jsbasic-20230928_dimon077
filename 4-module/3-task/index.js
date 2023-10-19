function highlight(table) {
  let rows = table.querySelectorAll('tbody > tr');

  for (let tr of rows) {
    let dots = tr.querySelectorAll('td');

    if (dots[3].hasAttribute('data-available')) {
      dots[3].dataset.available == "true" ? tr.classList.add('available') : tr.classList.add('unavailable');
    } else {
      tr.hidden = true;
    }

    if (dots[2].innerHTML == 'm') {
      tr.classList.add('male');
    } else if (dots[2].innerHTML == 'f') {
      tr.classList.add('female');
    }

    if (dots[1].innerHTML < 18) {
      tr.style.textDecoration = 'line-through';
    }
  }
}
