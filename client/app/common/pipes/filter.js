import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'filter' })
export class FilterPipe implements PipeTransform {
  transform(allItems, searchText, propName) {
    if (!searchText) {
      return allItems;
    }
    return allItems.filter(item => {
      searchText = searchText ? searchText.toLowerCase() : null;
      return item[propName].toLowerCase().indexOf(searchText) !== -1;
    });
  }
}
