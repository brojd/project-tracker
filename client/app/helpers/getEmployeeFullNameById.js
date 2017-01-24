export default function (id, items) {
  if (id && items.length) {
    return items.filter(item => item.Id === id)[0].FullName;
  }
  return '';
}
