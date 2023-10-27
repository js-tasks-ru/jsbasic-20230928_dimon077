/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.elem = document.createElement('table');

    this.elem.insertAdjacentHTML('beforeEnd', '<thead><tr><th>Имя</th><th>Возраст</th><th>Зарплата</th><th>Город</th><th></th></tr></thead><tbody></tbody>');

    this.elem.querySelector('tbody').insertAdjacentHTML(
      'beforeEnd',
      rows.map(({ name, age, salary, city }) => `<tr><td>${name}</td><td>${age}</td><td>${salary}</td><td>${city}</td><td><button>X</button></td></tr>`).join(''));

    this.elem.addEventListener('click', this.removeOnClick);
  }

  removeOnClick = (event) => {
    if (event.target.closest('button')) {
      event.target.closest('tr').remove();
    }
  }
}
